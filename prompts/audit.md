---
description: Red-team and premortem an existing plan or strategy. Takes any document and stress-tests it.
args: path to strategy/plan document
section: Strategy Workflows
topLevelCli: true
---

Red-team and premortem any plan, strategy, or recommendation document. Works on any document — not limited to case files.

## Before anything else

**Load the analyst discipline.** Read `references/analyst-discipline.md`. Surface assumptions, keep it surgical, drive to verifiable goals.

## Argument

**$@**

Parse the argument:
- **File path** (starts with `/`, `~`, or `.`) → read it as the document to audit.
- **Empty or non-path text** → ask: *"Provide the path to the document you want stress-tested."*

A document is required. This command does not work on thin air — it needs a concrete plan or strategy to attack.

## Process

1. **Read the document.** Understand its structure: what is being recommended, to whom, with what assumptions, over what timeline, and with what resources.

2. **Invoke the `challenger` agent in Red Team mode.** Pass the document and ask for:
   - **Adversary posture selection** — Competitor, Internal saboteur, or Regulator/external shock (whichever fits the document best)
   - **Where does it break** — the weakest structural assumption, citing the exact location in the document
   - **How would the adversary exploit it** — specific counter-moves, not generalities
   - **What signal would tell the author they are losing** — leading indicators to watch

3. **Invoke the `challenger` agent in Premortem mode.** Pass the same document and ask for:
   - **Failure narrative** — it is six months from now and this plan has failed; what happened, specifically
   - **Risk register** — 3-5 risks extracted from the narrative, each with severity (fatal / material / manageable), leading indicator, and cheapest mitigation
   - **Recommended additions** — concrete changes to the plan that the premortem motivates

4. **Return the combined review.** Structure the output as:

```
## Red Team Review
<adversary posture + attack + exploitation + signal>

## Premortem
<failure narrative + risk register + recommended additions>

## Summary Verdict
<1-3 sentences: what is the single biggest vulnerability, and what is the cheapest thing the author can do about it>
```

## Scope

This works on ANY document — business plans, product strategies, go-to-market decks, investment memos, org restructuring proposals, hiring plans, fundraising pitches. If it has a recommendation and assumptions, it can be stress-tested.

## Anti-patterns to refuse

- **Vague attacks** — "the market might change" is not a red team finding. Every attack must name a specific assumption, a specific counter-move, and a specific signal.
- **Rewriting the plan** — the audit identifies weaknesses; it does not rewrite. If fundamental redrawing is needed, say so and stop.
- **Praising the plan** — the job is to find what breaks, not to validate. Compliments belong in peer review, not in a red team.
