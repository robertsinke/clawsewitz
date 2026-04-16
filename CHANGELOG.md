# Changelog

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
