---
name: cw-framework-library
description: Lookup the 70-framework Strategist Toolkit catalog. Use when a stage skill (or the user) needs the full definition, worked example, or instructions for a named framework (SCQ, HTDQ, Minto Pyramid, Driver Tree, 5 Whys, SPADE, etc.). Returns the slide excerpt from the canonical toolkit source.
---

# cw-framework-library

Reference lookup skill. Other stage skills call this when they need the full spec, worked example, or step-by-step for a framework they are about to apply.

## What this skill does

Given a framework name (e.g. `SCQ`, `HTDQ`, `Outcome`, `Driver Tree`, `Bucketing`, `Hypothesis`, `Trend`, `Comparison`, `Mix`, `Distribution`, `Scatter`, `Cumulative`, `Candlestick`, `Rank`, `Unit Economics`, `Waterfall`, `Marginal Return`, `Cashflow`, `ROIC`, `Actual v Target`, `Profit Margin`, `5 Whys`, `5W + H`, `Yes/No`, `Tabular`, `One Pager`, `Canvas`, `Tri-Column`, `Chevron`, `Horizon`, `Gantt`, `Driver Tree`, `Continuum`, `Heat Map`, `Graph`, `Matrix`, `From:To`, `Venn`, `Positioning`, `Pyramid`, `Circular`, `Journey`, `Touchpoint`, `Timeline`, `Capability Map`, `Image Column`, `Segmentation`, `Hub n Spoke`, `3x3`, `Minto Pyramid`, `HV Logic`, `MECE`, `SCQA`, `Story Spine`, `5 Act`, `StoryBrand`, `Eisenhower`, `ABCD`, `Decision Tree`, `Pros & Cons`, `Evaluation`, `Bezos`, `SPADE`, `Bull & Bear`, `Zero To One`, `Comms Deploy`, `Decision Grid`, `GTM Stack`, `Execution Plan`, `Capability Drop`), return the framework's definition + worked example.

## How to use

1. Read the canonical source at `../../references/toolkit-source.md` (within this plugin).
2. Locate the slide block for the requested framework (they are headed `## Slide NN: <Name> — Framework` and `## Slide NN: <Name> — Instructions`).
3. Return both the framework spec and the instructions / worked example.

If the name does not match, suggest the closest 3 matches and ask the user to pick. Do not fabricate a framework.

## When other skills call this

- `cw-define` — to load SCQ / HTDQ / Outcome templates
- `cw-split` — to load Driver Tree / Bucketing / Hypothesis templates
- `cw-analyse` — to load the chart spec for the chosen analysis
- `cw-insight` — to load the layout spec for the chosen page archetype
- `cw-story` — to load Minto / Story Spine / 5 Act / StoryBrand
- `cw-decide` — to load Eisenhower / ABCD / Decision Tree / SPADE / Bezos / Pros & Cons / Evaluation / Bull & Bear
- `cw-act` — to load Zero-to-One / Comms / Decision Grid / GTM Stack / Execution Plan / Capability Drop

## Flexibility

This is a **flexible** reference skill — you consult it for content, you do not follow it as a process. It has no gate and no handoff.
