# Changelog

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
