import { existsSync, readdirSync, renameSync, mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { homedir } from "node:os";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const ARTEFACTS = [
  "intake.md",
  "frame.md",
  "decomposition.md",
  "research-brief.md",
  "analysis.md",
  "insights.md",
  "brief.md",
  "recommendation.md",
  "plan.md",
];

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

function getArtefacts(caseDir: string): string[] {
  const files = new Set(readdirSync(caseDir).filter((f) => f.endsWith(".md")));
  return ARTEFACTS.filter((a) => files.has(a));
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
            const artefacts = getArtefacts(dir);
            const summary = artefacts.length ? artefacts.join(", ") : "(empty)";
            cases.push(`  ${entry.padEnd(30)} ${summary}`);
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
        const artefacts = getArtefacts(caseDir);
        const summary = artefacts.length ? artefacts.join(", ") : "(empty)";

        pi.sendUserMessage(
          `Resume case "${slug}". Artefacts present: ${summary}. Re-enter /clawsewitz and continue from wherever the engagement left off.`,
        );
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
