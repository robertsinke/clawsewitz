# Agents

`AGENTS.md` is the repo-level contract for agents working in this repository.

Pi subagent behavior does **not** live here. The source of truth for bundled Pi subagents is `.clawsewitz/agents/*.md`, which the runtime syncs into the Pi agent directory. If you need to change how `researcher`, `analyst`, `writer`, or `challenger` behave, edit the corresponding file in `.clawsewitz/agents/` instead of duplicating those prompts here.

## Pi subagents

Clawsewitz ships four bundled strategy subagents:

- `researcher` — parallel fact-gathering (competitive landscape, market sizing, industry benchmarks)
- `analyst` — framework review and MECE validation (structural + semantic)
- `writer` — polished deliverable production (Minto, SCQA, StoryBrand, slide outlines, implementation plans)
- `challenger` — Red Team (adversarial) and Premortem (six-months-failed) stress-testing

They are defined in `.clawsewitz/agents/` and invoked via the Pi `subagent` tool.

## What belongs here

Keep this file focused on cross-agent repo conventions:

- case workspace locations and file naming
- deliverable quality standards
- delegation rules between the lead agent and subagents

Do **not** restate per-agent prompt text here unless there is a repo-wide constraint that applies to all agents.

## Case workspaces

Each strategic engagement creates a case workspace. Artefacts are named for the job they do — not for a phase number. There is no rigid chain: the orchestrator writes whichever artefacts the engagement's flow produces, in order of creation.

Typical artefacts:

- `intake.md` — triage and clarifying questions, partner-read, Trinity force-map
- `frame.md` — problem framing (SCQ / HTDQ / Outcome)
- `decomposition.md` — MECE issue tree + analyst MECE verdict + Schwerpunkt
- `research-brief.md` — researcher output (if external evidence was needed)
- `analysis.md` — per-branch analyses with "so whats"
- `insights.md` — governing statements on page archetypes with fog acknowledgements
- `brief.md` — structured narrative (Minto Pyramid by default)
- `recommendation.md` — named option + reason + Ends-Ways-Means + next decision
- `plan.md` — implementation plan with friction register, reserves, premortem

Case workspace locations:
- **Project-local** (preferred when in a git repo): `docs/clawsewitz/cases/<slug>/`
- **User-global** (fallback): `~/.clawsewitz/cases/<slug>/`

Every case has a `CASE.md` manifest with the verbatim brief, a framework-choices log, and final status on close.

## File naming

Case slugs are derived from the engagement brief (lowercase, hyphens, no filler words, 3-5 words — e.g. `acme-subscriber-decline`). Artefact filenames are the job names above.

## MECE enforcement

- Every decomposition must pass structural and semantic MECE checks before advancing.
- The `mece_structural_check` tool handles structural validation (dimensions, duplicates, depth).
- The `analyst` agent in MECE validation mode handles semantic validation (is this truly ME? truly CE?).
- Both must pass. A structural pass does not imply semantic quality.

## Delegation rules

- The lead agent (`/clawsewitz` orchestrator) plans, delegates, synthesizes, and delivers.
- Use subagents when the work is meaningfully decomposable; do not spawn them for trivial work.
- Prefer file-based handoffs over dumping large intermediate results back into parent context.
- The `challenger` agent should always run last — it stress-tests the deliverable, not the intermediate work.
- For critical recommendations, require at least one adversarial pass (Red Team or Premortem) after the writer produces the deliverable.
