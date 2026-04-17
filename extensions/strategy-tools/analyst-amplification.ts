import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const FAILURE_KEYWORDS = [
  "would i ship this? no",
  "no — redraw",
  "no - redraw",
  "**verdict:** fail",
  "verdict: fail",
  "correct? no",
];

function extractText(messages: unknown[]): string {
  if (!Array.isArray(messages)) return "";
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i] as Record<string, unknown> | null | undefined;
    if (!msg) continue;
    const content = msg["content"];
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      for (const item of content as Array<Record<string, unknown>>) {
        if (item?.["type"] === "text" && typeof item["text"] === "string") return item["text"] as string;
      }
    }
  }
  return "";
}

export function registerAnalystAmplification(pi: ExtensionAPI): void {
  pi.on("agent_end", (event, ctx) => {
    const text = extractText(event.messages).toLowerCase();
    if (!text) return;

    const isFailure = FAILURE_KEYWORDS.some((kw) => text.includes(kw));
    if (isFailure) {
      ctx.ui.notify(
        "Analyst flagged this stage. Do NOT proceed until the flagged issue is addressed. Re-read the verdict, redraw, and re-invoke the analyst before handoff.",
        "warning",
      );
    }
  });
}
