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

function findMostRecentCase(roots: string[]): { slug: string; stage: string; dir: string } | null {
  let newest: { slug: string; stage: string; dir: string; mtime: number } | null = null;

  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const entry of readdirSync(root)) {
      const dir = resolve(root, entry);
      if (!statSync(dir).isDirectory()) continue;

      const files = readdirSync(dir).filter((f) => /^\d{2}-/.test(f) && f.endsWith(".md"));
      if (files.length === 0) continue;

      const latestFile = files.sort().pop()!;
      const stage = latestFile.slice(0, 2);
      const mtime = statSync(resolve(dir, latestFile)).mtimeMs;

      if (!newest || mtime > newest.mtime) {
        newest = { slug: entry, stage, dir, mtime };
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

    const stageNames = ["intake", "define", "split", "analyse", "insight", "story", "decide", "act"];
    const nextIdx = Math.min(Number(active.stage) + 1, 7);
    const next = `cw-${stageNames[nextIdx]}`;

    ctx.ui.notify(
      `Open case: "${active.slug}" — stage ${active.stage}. Next: ${next}. Resume with /case resume ${active.slug}`,
      "info",
    );
  });
}
