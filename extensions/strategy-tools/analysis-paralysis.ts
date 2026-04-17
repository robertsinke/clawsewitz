import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

let analyseCount = 0;
let insightCount = 0;

export function registerAnalysisParalysis(pi: ExtensionAPI): void {
  // Track writes to analyse and insight stages
  pi.on("tool_result", (event) => {
    if (event.toolName !== "write" && event.toolName !== "edit") return;
    if (event.isError) return;

    const path = (event.input as Record<string, unknown>)?.path as string | undefined ?? "";
    if (path.includes("03-analyse") || path.includes("/03-analyse/")) {
      analyseCount++;
    }
    if (path.includes("04-insight")) {
      insightCount++;
    }
  });

  // Check at turn end
  pi.on("turn_end", (_event, ctx) => {
    if (analyseCount > 3 && insightCount === 0) {
      ctx.ui.notify(
        `${analyseCount} analyse-stage writes without an insight step. The next analysis won't change the recommendation. Invoke cw-insight to synthesise.`,
        "warning",
      );
    }
  });

  // Reset on new session
  pi.on("session_start", () => {
    analyseCount = 0;
    insightCount = 0;
  });
}
