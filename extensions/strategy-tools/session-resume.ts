import { existsSync, readdirSync, statSync } from "node:fs";
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

function findMostRecentCase(
  roots: string[],
): { slug: string; artefacts: string[]; dir: string } | null {
  let newest: { slug: string; artefacts: string[]; dir: string; mtime: number } | null = null;

  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const entry of readdirSync(root)) {
      const dir = resolve(root, entry);
      if (!statSync(dir).isDirectory()) continue;

      const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
      if (files.length === 0) continue;

      const artefacts = ARTEFACTS.filter((a) => files.includes(a));
      if (artefacts.length === 0) continue;

      const mtimes = artefacts.map((a) => statSync(resolve(dir, a)).mtimeMs);
      const mtime = Math.max(...mtimes);

      if (!newest || mtime > newest.mtime) {
        newest = { slug: entry, artefacts, dir, mtime };
      }
    }
  }

  return newest;
}

export function registerSessionResume(pi: ExtensionAPI): void {
  pi.on("session_start", (_event, ctx) => {
    const roots = getCaseRoots(ctx.cwd);
    const active = findMostRecentCase(roots);
    if (!active) return;

    ctx.ui.notify(
      `Open case: "${active.slug}" — ${active.artefacts.length} artefact(s): ${active.artefacts.join(", ")}. Resume with /cw-case resume ${active.slug}`,
      "info",
    );
  });
}
