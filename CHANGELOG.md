# Changelog

## 1.0.0 — 2026-05-27

First public release on npm.

### Architecture

Skill-first system with three composable layers — agents, workflows, skills — and no fixed orchestrator. The lead agent reaches for skills based on user intent.

### Added

- **Standalone CLI on Pi** — `clawsewitz` command launches an interactive strategy session in any terminal.
- **9 skills** in `skills/`, triggered by natural-language intent:
  - `engagement-intake` — triage a fresh brief (partner read + suggested next move)
  - `mece-decomposition`, `evaluating-options`, `writing-briefs`, `implementation-planning`, `red-teaming-plans`, `strategic-research` — wrappers over the corresponding `/cw-*` workflows
  - `framework-library`, `session-search` — discovery and recall
- **8 top-level workflow commands** invocable from the CLI: `decompose`, `brief`, `audit`, `evaluate`, `research`, `plan`, `frameworks`, plus the skill bundle.
- **4 bundled strategy subagents**: `researcher`, `analyst`, `writer`, `challenger`.
- **Custom Pi extension** with 3 tools (`framework_lookup`, `mece_structural_check`, `case_search`) and lifecycle hooks for auto-commit, session-resume, and case management.
- **Prussian blue TUI theme** and custom dashboard header (model, session, workflows, system info).
- **`clawsewitz doctor`** installation verification command.
- **`clawsewitz update`** in-place upgrade via npm.
- Smoke test suite.

### Distribution

- Standalone Pi CLI via npm (primary).
- Claude Code plugin (secondary).

## Pre-release history

The pre-release line followed a different architecture (the 7-step `cw-*` stage chain and Clausewitzian content). Both were removed in 1.0.0 in favor of the skill-first system documented above. Nothing from the pre-release line was published to npm.

### 0.4.0 — 2026-04-16
- Strategic repositioning: capability-focused messaging, implicit Clausewitz foundation
- Agent team redesign: Researcher → Analyst → Writer → Challenger pipeline
- 6 standalone workflows: `/cw-decompose`, `/cw-brief`, `/cw-audit`, `/cw-evaluate`, `/cw-research`, `/cw-plan`
- Skills-only bundle installer
- Session search skill for cross-engagement recall
- Website redesign

### 0.3.0 — 2026-04-16
- Public release: GitHub repo, install script, README
- Renamed from claudewitz to clawsewitz

### 0.2.0
- Clausewitzian structural lenses per stage (Trinity, Schwerpunkt, Moral Forces, Fog, Boldness, Ends-Ways-Means, Friction + Reserves)
- Subagents: `cw-red-team`, `cw-premortem`
- Reference: `clausewitz-concepts.md` — 12-concept glossary from *On War*
- Hooks: act-stage gate, culminating-point-of-analysis nudge

### 0.1.0
- 7-step Strategy Loop: Define → Split → Analyse → Insight → Story → Decide → Act
- 10 skills (7 chain stages + 3 helpers), 4 subagents, 3 commands, 8 hooks
- 70-framework Strategist Toolkit
- MECE enforcement, chain-order gate
- Partner voice with Clausewitz references
