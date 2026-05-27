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

## Architecture

Three layers, composed as the situation demands — no master orchestrator that walks a fixed sequence.

- **Agents** (above) — dispatchable workers.
- **Workflows** (`prompts/` for Pi, `commands/` for Claude Code) — top-level CLI commands / slash commands, each a full procedure runnable standalone. The source of truth for each capability's procedure.
- **Skills** (`skills/`) — discoverable capabilities the agent reaches for when user intent matches. Thin wrappers over the workflow prompts, with descriptions tuned for natural-language triggers.

## What belongs here

Keep this file focused on cross-agent repo conventions:

- workspace conventions
- deliverable quality standards
- delegation rules between the lead agent and subagents

Do **not** restate per-agent prompt text here unless there is a repo-wide constraint that applies to all agents.

## Workspaces

Most workflows are standalone — they return output to the user. Two exceptions:

- `cw-decompose` writes a lightweight artefact to `decomposition/<slug>/decomposition.md` (project-local if in a git repo, else `~/.clawsewitz/decompositions/`).
- `cw-case` manages longer-lived case workspaces at `docs/clawsewitz/cases/<slug>/` (project-local) or `~/.clawsewitz/cases/<slug>/` (user-global), for engagements where the agent persists state across multiple skill invocations.

Slugs are derived from the topic (lowercase, hyphens, no filler words, 3-5 words — e.g. `acme-subscriber-decline`).

## MECE enforcement

- Every decomposition produced by `cw-decompose` or any skill should pass structural and semantic MECE checks.
- The `mece_structural_check` tool handles structural validation (dimensions, duplicates, depth).
- The `analyst` agent in MECE validation mode handles semantic validation.
- A structural pass does not imply semantic quality.

## Delegation rules

- Use subagents when the work is meaningfully decomposable; do not spawn them for trivial work.
- Prefer file-based handoffs over dumping large intermediate results back into parent context.
- The `challenger` agent should run after the deliverable, not during — it stress-tests, it does not produce.
- For critical recommendations, require at least one adversarial pass (Red Team or Premortem) before shipping.
