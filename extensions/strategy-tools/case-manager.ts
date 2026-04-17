import { existsSync, readdirSync, renameSync, mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { homedir } from "node:os";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

function getCaseRoots(cwd: string): string[] {
  const roots: string[] = [];
  const local = resolve(cwd, "docs", "clawsewitz", "cases");
  if (existsSync(local)) roots.push(local);
  const global = resolve(homedir(), ".clawsewitz", "cases");
  if (existsSync(global)) roots.push(global);
  return roots;
}

function findCase(roots: string[], slug: string): string | null {
  for (const root of roots) {
    const dir = resolve(root, slug);
    if (existsSync(dir) && statSync(dir).isDirectory()) return dir;
  }
  return null;
}

function getLatestStage(caseDir: string): string {
  const files = readdirSync(caseDir).filter((f) => /^\d{2}-/.test(f) && f.endsWith(".md"));
  if (files.length === 0) return "--";
  return files.sort().pop()!.slice(0, 2);
}

export function registerCaseCommand(pi: ExtensionAPI): void {
  pi.registerCommand("case", {
    description: "List, resume, or archive engagement workspaces",
    async handler(args, ctx) {
      const parts = args.trim().split(/\s+/);
      const action = parts[0] || "list";
      const slug = parts[1];

      const roots = getCaseRoots(ctx.cwd);

      if (action === "list" || !action) {
        if (roots.length === 0) {
          ctx.ui.notify("No case workspaces found. Start one with /clawsewitz.", "info");
          return;
        }

        const cases: string[] = [];
        for (const root of roots) {
          for (const entry of readdirSync(root)) {
            const dir = resolve(root, entry);
            if (!statSync(dir).isDirectory()) continue;
            const stage = getLatestStage(dir);
            cases.push(`  ${entry.padEnd(30)} stage ${stage}`);
          }
        }

        if (cases.length === 0) {
          ctx.ui.notify("No cases found. Start one with /clawsewitz.", "info");
          return;
        }

        pi.sendMessage({
          customType: "case-list",
          content: [{ type: "text", text: `**Open Cases**\n\n${cases.join("\n")}` }],
          display: true,
        });
        return;
      }

      if (action === "resume") {
        if (!slug) {
          ctx.ui.notify("Usage: /case resume <slug>", "warning");
          return;
        }
        const caseDir = findCase(roots, slug);
        if (!caseDir) {
          ctx.ui.notify(`Case "${slug}" not found.`, "error");
          return;
        }
        const stage = getLatestStage(caseDir);
        const stageNames = ["intake", "define", "split", "analyse", "insight", "story", "decide", "act"];
        const nextIdx = Math.min(Number(stage) + 1, 7);
        const nextSkill = `cw-${stageNames[nextIdx]}`;

        pi.sendUserMessage(`Resume case "${slug}" from stage ${stage}. Next: invoke ${nextSkill}.`);
        return;
      }

      if (action === "archive") {
        if (!slug) {
          ctx.ui.notify("Usage: /case archive <slug>", "warning");
          return;
        }
        const caseDir = findCase(roots, slug);
        if (!caseDir) {
          ctx.ui.notify(`Case "${slug}" not found.`, "error");
          return;
        }
        const root = resolve(caseDir, "..");
        const archiveDir = resolve(root, "archived");
        mkdirSync(archiveDir, { recursive: true });
        renameSync(caseDir, resolve(archiveDir, slug));
        ctx.ui.notify(`Archived case "${slug}".`, "info");
        return;
      }

      ctx.ui.notify(`Unknown action: ${action}. Use list, resume, or archive.`, "warning");
    },
  });
}
