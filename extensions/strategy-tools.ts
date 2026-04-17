import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

import { registerChainGate } from "./strategy-tools/chain-gate.js";
import { registerMeceReminder } from "./strategy-tools/mece-reminder.js";
import { registerAutoCommit } from "./strategy-tools/auto-commit.js";
import { registerFrameworkLookup } from "./strategy-tools/framework-lookup.js";
import { registerCaseSearch } from "./strategy-tools/case-search.js";
import { registerCaseCommand } from "./strategy-tools/case-manager.js";
import { registerAnalysisParalysis } from "./strategy-tools/analysis-paralysis.js";
import { registerAnalystAmplification } from "./strategy-tools/analyst-amplification.js";
import { registerSessionResume } from "./strategy-tools/session-resume.js";

export default function strategyTools(pi: ExtensionAPI): void {
  registerChainGate(pi);
  registerMeceReminder(pi);
  registerAutoCommit(pi);
  registerFrameworkLookup(pi);
  registerCaseSearch(pi);
  registerCaseCommand(pi);
  registerAnalysisParalysis(pi);
  registerAnalystAmplification(pi);
  registerSessionResume(pi);
}
