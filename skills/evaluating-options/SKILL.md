---
name: evaluating-options
description: Score options against weighted criteria and recommend one, with adversarial review. Use when the user is choosing between alternatives, says "help me decide", "which should we pick", "build vs buy", "evaluate these options", "weigh these choices", or wants a structured decision — whether Pros & Cons, a weighted evaluation matrix, or SPADE.
---

# Evaluating Options

Run the `/cw-evaluate` workflow. Read the prompt at `../../prompts/evaluate.md` (or `../../commands/cw-evaluate.md` in Claude Code) for the full procedure.

**Agents used:** `challenger` (Red Team on the recommendation).

**Output:** the scored matrix, the recommendation with tradeoffs and next action, and the challenger review.
