import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

import { registerAutoCommit } from "./strategy-tools/auto-commit.js";
import { registerFrameworkLookup } from "./strategy-tools/framework-lookup.js";
import { registerCaseSearch } from "./strategy-tools/case-search.js";
import { registerCaseCommand } from "./strategy-tools/case-manager.js";
import { registerAnalystAmplification } from "./strategy-tools/analyst-amplification.js";
import { registerSessionResume } from "./strategy-tools/session-resume.js";
import { registerMeceStructuralCheck } from "./strategy-tools/mece-structural-check.js";
import { installClawsewitzHeader } from "./strategy-tools/header.js";

export default function strategyTools(pi: ExtensionAPI): void {
  registerAutoCommit(pi);
  registerFrameworkLookup(pi);
  registerCaseSearch(pi);
  registerCaseCommand(pi);
  registerAnalystAmplification(pi);
  registerSessionResume(pi);
  registerMeceStructuralCheck(pi);

  const cache: { agentCountPromise?: Promise<number> } = {};

  pi.on("session_start", async (_event, ctx) => {
    await installClawsewitzHeader(pi, ctx, cache);
  });

  pi.on("session_switch", async (_event, ctx) => {
    await installClawsewitzHeader(pi, ctx, cache);
  });
}
