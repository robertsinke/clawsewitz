import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Type } from "@sinclair/typebox";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

function findToolkitPath(): string | null {
  // Try app-bundled path first, then agent dir
  const candidates = [
    resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "references", "toolkit-source.md"),
    resolve(process.env["CLAWSEWITZ_HOME"] ?? `${process.env["HOME"]}/.clawsewitz`, "agent", "references", "toolkit-source.md"),
  ];
  for (const path of candidates) {
    if (existsSync(path)) return path;
  }
  return null;
}

export function registerFrameworkLookup(pi: ExtensionAPI): void {
  pi.registerTool({
    name: "framework_lookup",
    label: "Framework Lookup",
    description: "Look up any of 70 strategy frameworks by name. Returns the framework definition, when to use it, and an example application.",
    parameters: Type.Object({
      name: Type.String({ description: "Framework name or partial match" }),
    }),
    async execute(_id, params) {
      const toolkitPath = findToolkitPath();
      if (!toolkitPath) {
        return {
          content: [{ type: "text", text: "Framework library not found." }],
          details: undefined,
        };
      }

      const content = readFileSync(toolkitPath, "utf8");
      const searchTerm = params.name.toLowerCase();

      // Split by framework headers (## Framework Name)
      const sections = content.split(/^## /m).filter(Boolean);
      const matches = sections.filter((s) =>
        s.toLowerCase().includes(searchTerm),
      );

      if (matches.length === 0) {
        return {
          content: [{ type: "text", text: `No framework matching "${params.name}" found. Try a broader search term.` }],
          details: undefined,
        };
      }

      const result = matches
        .slice(0, 3)
        .map((m) => `## ${m.trim()}`)
        .join("\n\n---\n\n");

      return {
        content: [{ type: "text", text: result }],
        details: undefined,
      };
    },
  });
}
