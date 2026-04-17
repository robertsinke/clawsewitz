import { existsSync, readdirSync } from "node:fs";
import { basename, dirname } from "node:path";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

function isCasePath(path: string): boolean {
  return path.includes("/clawsewitz/cases/") || path.includes("/.clawsewitz/cases/");
}

function stageOf(path: string): string | null {
  const base = basename(path);
  const match = base.match(/^(\d{2})-/);
  return match ? match[1] : null;
}

function caseDirOf(path: string): string | null {
  let dir = dirname(path);
  while (dir !== "/" && dir.length > 0) {
    if (existsSync(`${dir}/CASE.md`)) return dir;
    dir = dirname(dir);
  }
  return null;
}

export function registerChainGate(pi: ExtensionAPI): void {
  pi.on("tool_call", (event) => {
    if (event.toolName !== "write" && event.toolName !== "edit") return;

    const path = (event.input as Record<string, unknown>)?.path as string | undefined ?? "";
    if (!isCasePath(path)) return;

    const stage = stageOf(path);
    if (!stage || stage === "00") return;

    const caseDir = caseDirOf(path);
    if (!caseDir) return;

    const prevStage = String(Number(stage) - 1).padStart(2, "0");
    const files = readdirSync(caseDir).filter((f) => f.startsWith(`${prevStage}-`) && f.endsWith(".md"));

    if (files.length === 0) {
      return {
        block: true,
        reason: `Chain gate: cannot write stage ${stage} before stage ${prevStage} artefact exists. Complete the prior stage first.`,
      };
    }
  });
}
