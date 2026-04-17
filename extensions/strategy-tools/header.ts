import { readdir } from "node:fs/promises";
import { cpus, homedir, totalmem } from "node:os";
import { resolve as resolvePath } from "node:path";

import type { ExtensionAPI, ExtensionContext } from "@mariozechner/pi-coding-agent";
import { truncateToWidth, visibleWidth } from "@mariozechner/pi-tui";

function formatHeaderPath(path: string): string {
  const home = homedir();
  return path.startsWith(home) ? `~${path.slice(home.length)}` : path;
}

function truncateVisible(text: string, maxVisible: number): string {
  if (visibleWidth(text) <= maxVisible) return text;
  return truncateToWidth(text, maxVisible, maxVisible <= 3 ? "" : "...");
}

function padRight(text: string, width: number): string {
  const truncated = visibleWidth(text) > width ? truncateToWidth(text, width, "") : text;
  const gap = Math.max(0, width - visibleWidth(truncated));
  return `${truncated}${" ".repeat(gap)}`;
}

function getCurrentModelLabel(ctx: ExtensionContext): string {
  if (ctx.model) return `${ctx.model.provider}/${ctx.model.id}`;
  return "not set";
}

type WorkflowInfo = { name: string; description: string };

function getStrategyWorkflows(pi: ExtensionAPI): WorkflowInfo[] {
  return pi.getCommands()
    .filter((cmd) => cmd.source === "prompt")
    .map((cmd) => ({ name: `/${cmd.name}`, description: cmd.description ?? "" }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function countAgents(): Promise<number> {
  const clawsewitzHome = process.env.CLAWSEWITZ_HOME ?? `${homedir()}/.clawsewitz`;
  const agentsDir = resolvePath(clawsewitzHome, "agent", "agents");
  try {
    const entries = await readdir(agentsDir);
    return entries.filter((e) => e.endsWith(".md")).length;
  } catch {
    return 0;
  }
}

const CLAWSEWITZ_VERSION = process.env.CLAWSEWITZ_VERSION ?? "1.0.0";

export function installClawsewitzHeader(
  pi: ExtensionAPI,
  ctx: ExtensionContext,
  cache: { agentCountPromise?: Promise<number> },
): void | Promise<void> {
  if (!ctx.hasUI) return;

  cache.agentCountPromise ??= countAgents();

  return cache.agentCountPromise.then((agentCount) => {
    const workflows = getStrategyWorkflows(pi);
    const toolCount = pi.getAllTools().length;

    ctx.ui.setHeader((_tui, theme) => ({
      render(width: number): string[] {
        const maxW = Math.max(width - 2, 1);
        const cardW = Math.min(maxW, 120);
        const innerW = cardW - 2;
        const contentW = innerW - 2;
        const outerPad = " ".repeat(Math.max(0, Math.floor((width - cardW) / 2)));
        const lines: string[] = [];

        const push = (line: string) => { lines.push(`${outerPad}${line}`); };
        const border = (ch: string) => theme.fg("borderMuted", ch);

        const row = (content: string): string =>
          `${border("│")} ${padRight(content, contentW)} ${border("│")}`;
        const emptyRow = (): string =>
          `${border("│")}${" ".repeat(innerW)}${border("│")}`;

        const useWideLayout = contentW >= 70;
        const leftW = useWideLayout ? Math.min(38, Math.floor(contentW * 0.35)) : 0;
        const divColW = useWideLayout ? 3 : 0;
        const rightW = useWideLayout ? contentW - leftW - divColW : contentW;

        const twoCol = (left: string, right: string): string => {
          if (!useWideLayout) return row(left || right);
          return row(
            `${padRight(left, leftW)}${border(" │ ")}${padRight(right, rightW)}`,
          );
        };

        const modelLabel = getCurrentModelLabel(ctx);
        const sessionId = ctx.sessionManager.getSessionName()?.trim() || ctx.sessionManager.getSessionId();
        const dirLabel = formatHeaderPath(ctx.cwd);
        const cores = cpus().length;
        const ramTotal = `${Math.round(totalmem() / (1024 ** 3))}GB`;

        // Title
        push("");
        push(padRight(theme.fg("accent", theme.bold("  clawsewitz")), cardW));
        push("");

        // Version bar
        const versionTag = ` v${CLAWSEWITZ_VERSION} `;
        const versionTagLen = versionTag.length;
        const gap = Math.max(0, innerW - versionTagLen);
        const gapL = Math.floor(gap / 2);
        push(
          border(`╭${"─".repeat(gapL)}`) +
          theme.fg("dim", versionTag) +
          border(`${"─".repeat(gap - gapL)}╮`),
        );

        if (useWideLayout) {
          const cmdNameW = 16;
          const leftValueW = Math.max(1, leftW - 11);
          const descW = Math.max(1, rightW - cmdNameW - 1);

          // Left column: system info
          const leftLines: string[] = [
            "",
            `${theme.fg("dim", "model".padEnd(10))} ${truncateVisible(theme.fg("text", modelLabel), leftValueW)}`,
            `${theme.fg("dim", "directory".padEnd(10))} ${truncateVisible(theme.fg("text", dirLabel), leftValueW)}`,
            `${theme.fg("dim", "session".padEnd(10))} ${truncateVisible(theme.fg("dim", sessionId), leftValueW)}`,
            "",
            truncateVisible(theme.fg("dim", `${cores} cores · ${ramTotal}`), leftW),
            "",
            truncateVisible(theme.fg("dim", `${toolCount} tools · ${agentCount} agents`), leftW),
          ];

          // Right column: workflows
          const rightLines: string[] = [
            "",
            truncateVisible(theme.fg("accent", theme.bold("Strategy Workflows")), rightW),
          ];

          for (const wf of workflows) {
            const desc = truncateVisible(theme.fg("dim", wf.description), descW);
            rightLines.push(
              `${theme.fg("accent", wf.name.padEnd(cmdNameW))}${desc}`,
            );
          }

          const maxRows = Math.max(leftLines.length, rightLines.length);
          for (let i = 0; i < maxRows; i++) {
            push(twoCol(leftLines[i] ?? "", rightLines[i] ?? ""));
          }
        } else {
          // Narrow layout
          const narrowValW = Math.max(1, contentW - 11);
          push(emptyRow());
          push(row(`${theme.fg("dim", "model".padEnd(10))} ${truncateVisible(theme.fg("text", modelLabel), narrowValW)}`));
          push(row(`${theme.fg("dim", "directory".padEnd(10))} ${truncateVisible(theme.fg("text", dirLabel), narrowValW)}`));
          push(row(`${theme.fg("dim", "session".padEnd(10))} ${truncateVisible(theme.fg("dim", sessionId), narrowValW)}`));
          push(row(truncateVisible(theme.fg("dim", `${cores} cores · ${ramTotal}`), contentW)));
          push(row(truncateVisible(theme.fg("dim", `${toolCount} tools · ${agentCount} agents`), contentW)));
          push(emptyRow());

          // Workflows
          const narrowDescW = Math.max(1, contentW - 17);
          push(row(theme.fg("accent", theme.bold("Strategy Workflows"))));
          for (const wf of workflows) {
            const desc = truncateVisible(theme.fg("dim", wf.description), narrowDescW);
            push(row(`${theme.fg("accent", wf.name.padEnd(16))} ${desc}`));
          }
        }

        push(border(`╰${"─".repeat(innerW)}╯`));
        push("");
        return lines;
      },
      invalidate() {},
    }));
  });
}
