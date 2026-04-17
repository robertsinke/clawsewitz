import { basename, dirname } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

function isCasePath(path: string): boolean {
  return path.includes("/clawsewitz/cases/") || path.includes("/.clawsewitz/cases/");
}

function stageOf(path: string): string | null {
  const base = basename(path);
  const match = base.match(/^(\d{2})-/);
  return match ? match[1] : null;
}

function isAutoCommitEnabled(): boolean {
  try {
    const settingsPath = resolve(homedir(), ".clawsewitz", "agent", "settings.json");
    if (!existsSync(settingsPath)) return false;
    const settings = JSON.parse(readFileSync(settingsPath, "utf8")) as Record<string, unknown>;
    return settings.autoCommit === true;
  } catch {
    return false;
  }
}

export function registerAutoCommit(pi: ExtensionAPI): void {
  pi.on("tool_result", async (event) => {
    if (event.toolName !== "write" && event.toolName !== "edit") return;
    if (event.isError) return;
    if (!isAutoCommitEnabled()) return;

    const path = (event.input as Record<string, unknown>)?.path as string | undefined ?? "";
    if (!isCasePath(path)) return;

    const stage = stageOf(path);
    const slug = basename(dirname(path));
    const label = `stage-${stage ?? "x"}`;
    const msg = `cw(${slug}): ${label} ${basename(path)}`;

    try {
      // Use pi.exec (Pi SDK method) to safely run git commands
      const run = pi.exec.bind(pi);
      await run("git", ["add", path]);
      // git diff --cached exits non-zero when there are staged changes to commit
      await run("git", ["diff", "--cached", "--quiet", "--", path]).catch(async () => {
        await run("git", ["commit", "-m", msg, "--", path]);
      });
    } catch {
      // Silently ignore git errors
    }
  });
}
