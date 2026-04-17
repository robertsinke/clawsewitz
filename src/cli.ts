import "dotenv/config";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

import { syncBundledAssets } from "./bootstrap/sync.js";
import { ensureClawsewitzHome, getClawsewitzAgentDir, getClawsewitzHome, getDefaultSessionDir } from "./config/paths.js";
import { launchPiChat } from "./pi/launch.js";
import { normalizeClawsewitzSettings, normalizeThinkingLevel } from "./pi/settings.js";
import { validatePiInstallation } from "./pi/runtime.js";
import { readPromptSpecs, topLevelCommandNames, cliCommandSections, formatCliWorkflowUsage } from "../metadata/commands.mjs";

function loadPackageVersion(appRoot: string): { version?: string } {
  try {
    return JSON.parse(readFileSync(resolve(appRoot, "package.json"), "utf8")) as { version?: string };
  } catch {
    return {};
  }
}

export function resolveInitialPrompt(
  command: string | undefined,
  rest: string[],
  oneShotPrompt: string | undefined,
  workflowCommands: Set<string>,
): string | undefined {
  if (oneShotPrompt) return oneShotPrompt;
  if (!command) return undefined;
  if (command === "chat") return rest.length > 0 ? rest.join(" ") : undefined;
  if (workflowCommands.has(command)) return [`/${command}`, ...rest].join(" ").trim();
  if (!TOP_LEVEL_COMMANDS.has(command)) return [command, ...rest].join(" ");
  return undefined;
}

// TOP_LEVEL_COMMANDS: "chat", "doctor", "help", "setup"
const TOP_LEVEL_COMMANDS = new Set(topLevelCommandNames);

function printHelp(appRoot: string): void {
  const workflowCommands = readPromptSpecs(appRoot).filter(
    (command) => command.topLevelCli,
  );

  console.log("\n  clawsewitz — the open source AI strategy agent\n");

  for (const section of cliCommandSections) {
    console.log(`  ${section.title}`);
    for (const command of section.commands) {
      const padding = Math.max(1, 36 - command.usage.length);
      console.log(`    ${command.usage}${" ".repeat(padding)}${command.description}`);
    }
    console.log();
  }

  console.log("  Strategy Workflows");
  for (const command of workflowCommands) {
    const usage = formatCliWorkflowUsage(command);
    const padding = Math.max(1, 36 - usage.length);
    console.log(`    ${usage}${" ".repeat(padding)}${command.description}`);
  }
  console.log();
}

function runDoctor(paths: { settingsPath: string; appRoot: string; sessionDir: string; workingDir: string }): void {
  console.log("clawsewitz doctor\n");
  const missing = validatePiInstallation(paths.appRoot);
  if (missing.length > 0) {
    console.log("Missing files:");
    for (const path of missing) console.log(`  \u2717 ${path}`);
    process.exitCode = 1;
  } else {
    console.log("  \u2713 Pi runtime found");
    console.log("  \u2713 Extension found");
    console.log("  \u2713 Prompt templates found");
    console.log("\nAll checks passed.");
  }
}

export async function main(): Promise<void> {
  const here = dirname(fileURLToPath(import.meta.url));
  const appRoot = resolve(here, "..");
  const clawsewitzVersion = loadPackageVersion(appRoot).version;
  const bundledSettingsPath = resolve(appRoot, ".clawsewitz", "settings.json");
  const clawsewitzHome = getClawsewitzHome();
  const clawsewitzAgentDir = getClawsewitzAgentDir(clawsewitzHome);

  ensureClawsewitzHome(clawsewitzHome);
  syncBundledAssets(appRoot, clawsewitzAgentDir);

  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      cwd: { type: "string" },
      help: { type: "boolean" },
      version: { type: "boolean" },
      prompt: { type: "string" },
      "session-dir": { type: "string" },
      thinking: { type: "string" },
      model: { type: "string" },
    },
  });

  if (values.help) { printHelp(appRoot); return; }

  if (values.version) {
    if (clawsewitzVersion) { console.log(clawsewitzVersion); return; }
    throw new Error("Unable to determine version.");
  }

  const workingDir = resolve(values.cwd ?? process.cwd());
  const sessionDir = resolve(values["session-dir"] ?? getDefaultSessionDir(clawsewitzHome));
  const clawsewitzSettingsPath = resolve(clawsewitzAgentDir, "settings.json");
  const thinkingLevel = normalizeThinkingLevel(values.thinking ?? process.env["CLAWSEWITZ_THINKING"]) ?? "high";

  normalizeClawsewitzSettings(clawsewitzSettingsPath, bundledSettingsPath);

  const [command, ...rest] = positionals;

  if (command === "help") { printHelp(appRoot); return; }

  if (command === "setup") {
    console.log("Run `clawsewitz` to start an interactive strategy session.");
    return;
  }

  if (command === "doctor") {
    runDoctor({ settingsPath: clawsewitzSettingsPath, appRoot, sessionDir, workingDir });
    return;
  }

  const workflowNames = new Set(
    readPromptSpecs(appRoot).filter((s) => s.topLevelCli).map((s) => s.name)
  );

  await launchPiChat({
    appRoot,
    workingDir,
    sessionDir,
    clawsewitzAgentDir,
    clawsewitzVersion,
    thinkingLevel,
    model: values.model,
    oneShotPrompt: values.prompt,
    initialPrompt: resolveInitialPrompt(command, rest, values.prompt, workflowNames),
  });
}
