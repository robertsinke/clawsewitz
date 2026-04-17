import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { homedir } from "node:os";
import { Type } from "@sinclair/typebox";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

function getCaseRoots(cwd: string): string[] {
  const roots: string[] = [];
  const local = resolve(cwd, "docs", "clawsewitz", "cases");
  if (existsSync(local)) roots.push(local);
  const global = resolve(homedir(), ".clawsewitz", "cases");
  if (existsSync(global)) roots.push(global);
  return roots;
}

function searchCases(roots: string[], query: string): string[] {
  const results: string[] = [];
  const lowerQuery = query.toLowerCase();

  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const slug of readdirSync(root)) {
      const caseDir = resolve(root, slug);
      if (!statSync(caseDir).isDirectory()) continue;

      for (const file of readdirSync(caseDir).filter((f) => f.endsWith(".md"))) {
        try {
          const content = readFileSync(join(caseDir, file), "utf8");
          if (content.toLowerCase().includes(lowerQuery)) {
            const lines = content.split("\n");
            const matchLine = lines.find((l) => l.toLowerCase().includes(lowerQuery));
            results.push(`${slug}/${file}: ${matchLine?.trim() ?? "(match)"}`);
          }
        } catch {
          continue;
        }
      }
    }
  }
  return results;
}

export function registerCaseSearch(pi: ExtensionAPI): void {
  pi.registerTool({
    name: "case_search",
    label: "Case Search",
    description: "Search across past strategy engagements for specific topics, frameworks, or insights.",
    parameters: Type.Object({
      query: Type.String({ description: "Search term to find across case files" }),
    }),
    async execute(_id, params, _signal, _onUpdate, ctx) {
      const roots = getCaseRoots(ctx.cwd);
      if (roots.length === 0) {
        return {
          content: [{ type: "text", text: "No case workspaces found." }],
          details: undefined,
        };
      }

      const results = searchCases(roots, params.query);
      if (results.length === 0) {
        return {
          content: [{ type: "text", text: `No results for "${params.query}" across ${roots.length} case workspace(s).` }],
          details: undefined,
        };
      }

      const text = `Found ${results.length} match(es):\n\n${results.slice(0, 20).join("\n")}${results.length > 20 ? `\n\n...and ${results.length - 20} more` : ""}`;
      return {
        content: [{ type: "text", text }],
        details: undefined,
      };
    },
  });
}
