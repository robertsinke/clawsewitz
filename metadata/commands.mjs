import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return {};

  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!key) continue;
    frontmatter[key] = value;
  }
  return frontmatter;
}

export function readPromptSpecs(appRoot) {
  const dir = resolve(appRoot, "prompts");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const text = readFileSync(resolve(dir, f), "utf8");
      const fm = parseFrontmatter(text);
      return {
        name: f.replace(/\.md$/, ""),
        description: fm.description ?? "",
        args: fm.args ?? "",
        section: fm.section ?? "Strategy Workflows",
        topLevelCli: fm.topLevelCli === "true",
      };
    });
}

export const cliCommandSections = [
  {
    title: "Core",
    commands: [
      { usage: "clawsewitz", description: "Launch interactive strategy session." },
      { usage: "clawsewitz chat [prompt]", description: "Start session with an initial prompt." },
      { usage: "clawsewitz help", description: "Show CLI help." },
      { usage: "clawsewitz setup", description: "Run first-time setup." },
      { usage: "clawsewitz doctor", description: "Diagnose config and runtime." },
    ],
  },
];

export const topLevelCommandNames = ["chat", "doctor", "help", "setup"];

export function formatCliWorkflowUsage(command) {
  return `clawsewitz ${command.name}${command.args ? ` ${command.args}` : ""}`;
}
