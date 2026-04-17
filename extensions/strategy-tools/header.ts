import { readdir } from "node:fs/promises";
import { cpus, homedir, totalmem } from "node:os";
import { resolve as resolvePath } from "node:path";

import type { ExtensionAPI, ExtensionContext } from "@mariozechner/pi-coding-agent";
import { visibleWidth } from "@mariozechner/pi-tui";

function formatHeaderPath(path: string): string {
  const home = homedir();
  return path.startsWith(home) ? `~${path.slice(home.length)}` : path;
}

function padRight(text: string, width: number): string {
  const gap = Math.max(0, width - visibleWidth(text));
  return `${text}${" ".repeat(gap)}`;
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
        push(theme.fg("accent", theme.bold("  clawsewitz")));
        push("");

        // Version bar
        const versionTag = ` v${CLAWSEWITZ_VERSION} `;
        const gap = Math.max(0, innerW - versionTag.length);
        const gapL = Math.floor(gap / 2);
        push(
          border(`╭${"─".repeat(gapL)}`) +
          theme.fg("dim", versionTag) +
          border(`${"─".repeat(gap - gapL)}╮`),
        );

        if (useWideLayout) {
          const cmdNameW = 16;

          // Left column: system info
          const leftLines: string[] = [
            "",
            `${theme.fg("dim", "model".padEnd(10))} ${theme.fg("text", modelLabel)}`,
            `${theme.fg("dim", "directory".padEnd(10))} ${theme.fg("text", dirLabel)}`,
            `${theme.fg("dim", "session".padEnd(10))} ${theme.fg("dim", sessionId)}`,
            "",
            theme.fg("dim", `${cores} cores · ${ramTotal}`),
            "",
            theme.fg("dim", `${toolCount} tools · ${agentCount} agents`),
          ];

          // Right column: workflows
          const rightLines: string[] = [
            "",
            theme.fg("accent", theme.bold("Strategy Workflows")),
          ];

          for (const wf of workflows) {
            rightLines.push(
              `${theme.fg("accent", wf.name.padEnd(cmdNameW))}${theme.fg("dim", wf.description.slice(0, rightW - cmdNameW))}`,
            );
          }

          const maxRows = Math.max(leftLines.length, rightLines.length);
          for (let i = 0; i < maxRows; i++) {
            push(twoCol(leftLines[i] ?? "", rightLines[i] ?? ""));
          }
        } else {
          // Narrow layout
          push(emptyRow());
          push(row(`${theme.fg("dim", "model".padEnd(10))} ${theme.fg("text", modelLabel)}`));
          push(row(`${theme.fg("dim", "directory".padEnd(10))} ${theme.fg("text", dirLabel)}`));
          push(row(`${theme.fg("dim", "session".padEnd(10))} ${theme.fg("dim", sessionId)}`));
          push(row(theme.fg("dim", `${cores} cores · ${ramTotal}`)));
          push(row(theme.fg("dim", `${toolCount} tools · ${agentCount} agents`)));
          push(emptyRow());

          // Workflows
          push(row(theme.fg("accent", theme.bold("Strategy Workflows"))));
          for (const wf of workflows) {
            push(row(`${theme.fg("accent", wf.name.padEnd(16))} ${theme.fg("dim", wf.description.slice(0, contentW - 17))}`));
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
