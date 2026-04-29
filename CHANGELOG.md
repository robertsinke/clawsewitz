# Changelog

## Unreleased — Skill-first architecture (breaking change)

The plugin is now a Superpowers-style skill-first system. Three layers (agents, workflows, skills) compose as the situation demands. No orchestrator walking a fixed sequence.

### Breaking changes

- **Removed `/clawsewitz` orchestrator.** No single command runs a scripted end-to-end engagement. The agent composes skills based on user intent. To run a full strategic exercise, chain the relevant skills (e.g. `engagement-intake` → `mece-decomposition` → `strategic-research` → `evaluating-options` → `implementation-planning`).
- **Removed the 7-step Strategy Loop.** The stage chain and the `cw-intake`, `cw-define`, `cw-split`, `cw-analyse`, `cw-insight`, `cw-story`, `cw-decide`, `cw-act`, `cw-mece-check` skills are all deleted.
- **Dropped all Clausewitzian content.** The plugin brand name (a Clausewitz pun) stays; the theory does not. Removed: the Trinity stakeholder force-map, Schwerpunkt (center of gravity), moral forces analysis, fog acknowledgement lines, boldness test, Ends-Ways-Means litmus, friction register, named Reserves section. Where the underlying discipline was useful (risk register, slack/buffer for unknowns), it survives in neutral PM language. `references/clausewitz-concepts.md` is deleted.
- **Removed all deliverable templates** (`references/deliverables/*.tpl`). They were consumed only by the deleted stage skills; workflows now write their own content structure.
- **Removed extension hooks tied to the chain:** `chain-gate`, `mece-reminder`, `analysis-paralysis`. `auto-commit`, `session-resume`, and `case-manager` rewired off numbered-file logic.

### Added

- **9 skills** in `skills/`, triggered by natural-language user intent:
  - `engagement-intake` — triage a fresh brief (7 questions, partner read, suggested next move)
  - `mece-decomposition` — wrapper over `/cw-decompose`
  - `evaluating-options` — wrapper over `/cw-evaluate`
  - `writing-briefs` — wrapper over `/cw-brief`
  - `implementation-planning` — wrapper over `/cw-plan`
  - `red-teaming-plans` — wrapper over `/cw-audit`
  - `strategic-research` — wrapper over `/cw-research`
  - `framework-library`, `session-search` (already existed; retained)

### Rewritten

- `references/partner-voice.md` — stripped Clausewitz quotes and concept names; kept the partner-tone rules and anti-pattern list.
- `.clawsewitz/SYSTEM.md`, `AGENTS.md`, README, website — rewritten to describe the three-layer (agents + workflows + skills) architecture.

## 1.0.0 — 2026-04-17

### Added
- Standalone CLI on Pi — `clawsewitz` command launches an interactive strategy session in any terminal
- 8 top-level workflow commands: decompose, brief, audit, evaluate, research, plan, frameworks
- Custom Pi extension with 3 tools (framework_lookup, mece_structural_check, case_search) and 6 lifecycle hooks
- Prussian blue TUI theme
- Custom dashboard header showing model, session, workflows, and system info
- `clawsewitz doctor` command for installation verification
- Smoke test suite (10 tests)
- Dual distribution: standalone Pi CLI (primary) + Claude Code plugin (secondary)

### Changed
- Project restructured for Pi/npm distribution alongside Claude Code plugin
- Settings format updated to Pi standard (defaultProvider, defaultModel, npm: package prefixes)
- Hooks ported from shell scripts to TypeScript Pi extension events

## 0.4.0 — 2026-04-16
- Strategic repositioning: capability-focused messaging, implicit Clausewitz foundation
- Agent team redesign: Researcher → Analyst → Writer → Challenger pipeline
- 6 new standalone workflows: /cw-decompose, /cw-brief, /cw-audit, /cw-evaluate, /cw-research, /cw-plan
- Skills-only bundle installer
- Session search skill for cross-engagement recall
- Website redesign: workflows grid, output-focused Strategy Loop, new agents and tools sections

## 0.3.0 — 2026-04-16

- Public release: GitHub repo, install script, README
- Renamed from claudewitz to clawsewitz
- No functional changes from v0.2.0

## 0.2.0

- Clausewitzian structural lenses: one per stage (Trinity, Schwerpunkt, Moral Forces, Fog, Boldness, Ends-Ways-Means, Friction + Reserves)
- New subagents: cw-red-team (adversarial review), cw-premortem (failure narrative)
- Reference: clausewitz-concepts.md — 12-concept glossary from *On War*
- Hook: act-stage gate checks for Friction Register and Reserves headings
- Hook: culminating-point-of-analysis nudge after repeated cw-analyse without cw-insight

## 0.1.0

- 7-step Strategy Loop: Define → Split → Analyse → Insight → Story → Decide → Act
- 10 skills (7 chain stages + 3 helpers), 4 subagents, 3 commands, 8 hooks
- 70-framework Strategist Toolkit (SCQ, HTDQ, Minto, Driver Tree, SPADE, Bezos, GTM Stack, etc.)
- MECE enforcement via cw-mece-check + PostToolUse hook
- Chain-order gate via PreToolUse hook
- Partner voice with Clausewitz references
