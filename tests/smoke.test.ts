import { test } from "node:test";
import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

import { syncBundledAssets } from "../src/bootstrap/sync.js";
import { validatePiInstallation } from "../src/pi/runtime.js";
import { readPromptSpecs } from "../metadata/commands.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");

test("--version returns the version from package.json", () => {
  const pkg = JSON.parse(readFileSync(resolve(appRoot, "package.json"), "utf8"));
  assert.ok(pkg.version);
  assert.equal(pkg.version, "1.0.0");
});

test("bundled settings.json parses correctly", () => {
  const settings = JSON.parse(
    readFileSync(resolve(appRoot, ".clawsewitz", "settings.json"), "utf8"),
  );
  assert.equal(settings.defaultProvider, "anthropic");
  assert.equal(settings.defaultModel, "claude-opus-4-6");
  assert.equal(settings.theme, "prussian");
  assert.equal(settings.autoCommit, false);
  assert.ok(Array.isArray(settings.packages));
});

test("bootstrap sync copies assets to agent dir", () => {
  const testDir = resolve(tmpdir(), `clawsewitz-test-${Date.now()}`);
  const agentDir = resolve(testDir, "agent");
  mkdirSync(agentDir, { recursive: true });

  const origHome = process.env.CLAWSEWITZ_HOME;
  process.env.CLAWSEWITZ_HOME = testDir;

  try {
    const result = syncBundledAssets(appRoot, agentDir);
    assert.ok(result.copied.length > 0 || result.updated.length > 0 || result.skipped.length > 0);
    assert.ok(existsSync(resolve(agentDir, "themes")));
    assert.ok(existsSync(resolve(agentDir, "agents")));
    assert.ok(existsSync(resolve(agentDir, "skills")));
  } finally {
    if (origHome === undefined) delete process.env.CLAWSEWITZ_HOME;
    else process.env.CLAWSEWITZ_HOME = origHome;
    rmSync(testDir, { recursive: true, force: true });
  }
});

test("only utility skills remain (no stage skills)", () => {
  const skillsDir = resolve(appRoot, "skills");
  const skills = readdirSync(skillsDir).filter((d) => {
    const skillPath = resolve(skillsDir, d, "SKILL.md");
    return existsSync(skillPath);
  });
  assert.equal(skills.length, 2, `Expected 2 utility skills, found ${skills.length}: ${skills.join(", ")}`);
  assert.ok(skills.includes("cw-framework-library"));
  assert.ok(skills.includes("session-search"));
});

test("4 agent prompts are bundled", () => {
  const agentsDir = resolve(appRoot, ".clawsewitz", "agents");
  const agents = readdirSync(agentsDir).filter((f) => f.endsWith(".md"));
  assert.equal(agents.length, 4, `Expected 4 agents, found ${agents.length}: ${agents.join(", ")}`);
  const expected = ["analyst.md", "challenger.md", "researcher.md", "writer.md"];
  for (const name of expected) {
    assert.ok(agents.includes(name), `Missing agent: ${name}`);
  }
});

test("8 workflow prompts are present", () => {
  const promptsDir = resolve(appRoot, "prompts");
  const prompts = readdirSync(promptsDir).filter((f) => f.endsWith(".md"));
  assert.equal(prompts.length, 8, `Expected 8 prompts, found ${prompts.length}: ${prompts.join(", ")}`);
});

test("prompt specs parse correctly", () => {
  const specs = readPromptSpecs(appRoot);
  assert.ok(specs.length >= 8);
  const clawsewitz = specs.find((s: { name: string }) => s.name === "clawsewitz");
  assert.ok(clawsewitz);
  assert.equal(clawsewitz.topLevelCli, false);
  assert.equal(clawsewitz.section, "Strategy Workflows");
  const topLevel = specs.filter((s: { topLevelCli: boolean }) => s.topLevelCli);
  assert.ok(topLevel.length >= 7, `Expected >= 7 top-level CLI workflows, found ${topLevel.length}`);
});

test("validatePiInstallation detects key files", () => {
  const missing = validatePiInstallation(appRoot);
  assert.ok(Array.isArray(missing));
  assert.ok(!missing.some((p) => p.includes("strategy-tools")), "Extension should exist");
  assert.ok(!missing.some((p) => p.includes("prompts")), "Prompts should exist");
});
