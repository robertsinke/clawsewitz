# Agents

`AGENTS.md` is the repo-level contract for agents working in this repository.

Pi subagent behavior does **not** live here. The source of truth for bundled Pi subagents is `.clawsewitz/agents/*.md`, which the runtime syncs into the Pi agent directory. If you need to change how `researcher`, `analyst`, `writer`, or `challenger` behave, edit the corresponding file in `.clawsewitz/agents/` instead of duplicating those prompts here.

## Pi subagents

Clawsewitz ships four bundled strategy subagents:

- `researcher` — parallel fact-gathering (competitive landscape, market sizing, industry benchmarks)
- `analyst` — framework review and MECE validation
- `writer` — polished deliverable production (Minto, SCQA, StoryBrand)
- `challenger` — red team and premortem stress-testing

They are defined in `.clawsewitz/agents/` and invoked via the Pi `subagent` tool.

## What belongs here

Keep this file focused on cross-agent repo conventions:

- case workspace locations and file naming
- stage ordering and handoff rules
- deliverable quality standards
- delegation rules between the lead agent and subagents

Do **not** restate per-agent prompt text here unless there is a repo-wide constraint that applies to all agents.

## Case workspaces

Each strategy engagement creates a case workspace with numbered stage files:

- `00-intake.md` through `07-act.md`
- Stage files are written in order. The chain gate enforces this — you cannot write stage N before stage N-1 exists.

Case workspace locations:
- **Project-local** (preferred when in a git repo): `docs/clawsewitz/cases/<slug>/`
- **User-global** (fallback): `~/.clawsewitz/cases/<slug>/`

Every case has a `CASE.md` manifest that tracks stage progress and session snapshots.

## File naming

Case slugs are derived from the engagement brief (lowercase, hyphens, no filler words, 3-5 words — e.g. `acme-subscriber-decline`). All stage files within a case use the numbered prefix:

- `00-intake.md` — triage and clarifying questions
- `01-define.md` — core question framing
- `02-split.md` — MECE issue tree
- `03-analyse.md` — framework application and evidence
- `04-insight.md` — synthesized findings with implications
- `05-story.md` — structured narrative (Situation → Complication → Resolution)
- `06-decide.md` — weighted options with recommendation
- `07-act.md` — implementation roadmap with risks and contingencies

## MECE enforcement

- Every decomposition (stage 02) must pass structural and semantic MECE checks before proceeding.
- The `mece_structural_check` tool handles structural validation (dimensions, duplicates, depth).
- The `analyst` agent handles semantic validation (is this truly ME? truly CE?).
- Both checks must pass. A structural pass does not imply semantic quality.

## Delegation rules

- The lead agent plans, delegates, synthesizes, and delivers.
- Use subagents when the work is meaningfully decomposable; do not spawn them for trivial work.
- Prefer file-based handoffs over dumping large intermediate results back into parent context.
- The `challenger` agent should always run last — it stress-tests the deliverable, not the intermediate work.
- For critical recommendations, require at least one adversarial pass (challenger) after the writer produces the deliverable.
