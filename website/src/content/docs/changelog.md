---
title: Changelog
description: Release history for clawsewitz.
---

## 0.3.0 — 2026-04-16

- Public release: GitHub repo, install script, docs site
- Renamed from claudewitz to clawsewitz

## 0.2.0

- **Clausewitzian structural lenses** — one concrete check per stage, drawn from *On War*:
  - Define: Strategy serves policy
  - Split: Schwerpunkt (center of gravity)
  - Analyse: Moral forces
  - Insight: Fog acknowledgement
  - Story: Boldness test
  - Decide: Ends-Ways-Means litmus
  - Act: Friction register + Reserves
- **New subagents**: `cw-red-team` (adversarial review), `cw-premortem` (failure narrative)
- **New reference**: `clausewitz-concepts.md` — 12-concept glossary from *On War*
- **Hook improvements**: act-stage Friction/Reserves heading check, culminating-point-of-analysis nudge
- **Deliverable template updates**: Trinity stakeholder map in intake, Schwerpunkt line in split, Fog section in insight, Ends-Ways-Means in decide, Friction + Reserves + Premortem in act

## 0.1.0

- Initial 7-step Strategy Loop: Define → Split → Analyse → Insight → Story → Decide → Act
- 10 skills (7 chain stages + 3 helpers)
- 4 subagents: research-pod, framework-critic, red-team, premortem
- 3 commands: `/clawsewitz`, `/cw-case`, `/cw-frameworks`
- 8 hooks: chain gate, auto-commit, MECE reminder, analysis-paralysis detection, session-start banner, critic amplifier, context saver, act-stage gate
- 70-framework Strategist Toolkit (SCQ, HTDQ, Minto Pyramid, Driver Tree, SPADE, Bezos, GTM Stack, Zero-to-One, and 60+ more)
- MECE enforcement via `cw-mece-check` skill + PostToolUse hook
- Partner voice with Clausewitz references
