import { basename } from "node:path";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

function isCasePath(path: string): boolean {
  return path.includes("/clawsewitz/cases/") || path.includes("/.clawsewitz/cases/");
}

function stageOf(path: string): string | null {
  const base = basename(path);
  const match = base.match(/^(\d{2})-/);
  return match ? match[1] : null;
}

export function registerMeceReminder(pi: ExtensionAPI): void {
  pi.on("tool_result", (event, ctx) => {
    if (event.toolName !== "write" && event.toolName !== "edit") return;
    if (event.isError) return;

    const path = (event.input as Record<string, unknown>)?.path as string | undefined ?? "";
    if (!isCasePath(path)) return;

    const stage = stageOf(path);
    if (stage === "02" || stage === "05") {
      const what = stage === "02" ? "split" : "story";
      ctx.ui.notify(
        `Run MECE check on this ${what} artefact before proceeding to the next stage.`,
        "info",
      );
    }
  });
}
