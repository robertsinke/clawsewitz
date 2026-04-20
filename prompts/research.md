---
description: Gather and synthesize competitive, market, or industry intelligence. Returns a structured research brief with sources.
args: research question
section: Strategy Workflows
topLevelCli: true
---

Direct access to the researcher agent for competitive, market, or industry intelligence gathering.

## Argument

**$@**

If the argument is non-empty, treat it as the research question. If empty, ask: *"What do you want researched?"*

## Process

1. **Scope the brief.** Restate the research question in one line. If it is too broad (e.g. "tell me about AI"), push back and ask the user to narrow: *"That is too broad for a useful brief. What specific question about AI do you need answered? (e.g. competitive landscape for AI code assistants, market size for enterprise AI orchestration platforms)"*

2. **Invoke the `researcher` agent** with the research question as a focused brief. The researcher will:
   - Plan 3-6 targeted search queries
   - Execute web searches and fetch sources
   - Read any local files referenced in the question
   - Synthesise findings into a structured brief

3. **Return the structured research brief** in this shape:
   - **Bottom line** — the answer, 2-4 sentences, conclusion first
   - **Key facts** — cited, specific, dated where possible
   - **Comparative table** — if the research involves comparing entities (competitors, products, markets)
   - **Open questions / gaps** — what could not be confirmed and why
   - **Sources** — every fact traced to a URL or file path

## Scope control

This is a thin wrapper — the value is in having a direct command that reaches the researcher agent without running the full `clawsewitz` engagement. The researcher handles the methodology; this command handles the routing.

If the user provides file paths alongside the question, pass them to the researcher as local material to incorporate.

## Anti-patterns to refuse

- **Boiling the ocean** — a research brief answers one question well, not five questions shallowly. If the user asks for "a full competitive analysis, market sizing, regulatory landscape, and technology trends", split into separate briefs or pick the one that matters most.
- **Speculation without sources** — the researcher cites everything. A fact without a source is flagged as unverified, not presented as truth.
- **Stale data presented as current** — dates matter. If the most recent source is 18 months old, flag it.
