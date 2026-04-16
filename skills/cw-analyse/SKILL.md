---
name: cw-analyse
description: Fourth step of the clawsewitz chain. Use after cw-split has produced 02-split.md to run analyses against each leaf of the tree. Routes to data-chart / financial-model / question-analysis frameworks and loops until the insights are inescapable. Writes 03-analyse.md and invokes xlsx skill (if available) for financial models.
---

# cw-analyse

**Rigid** process skill. Stage 3 of the Strategy Loop. Iterative — you will often loop between Analyse and Insight.

## Announce

> "Using cw-analyse to test each leg of the split."

## HARD-GATE

Do not proceed until `<case>/02-split.md` exists and its `cw-mece-check` verdict is Pass or Pass-with-notes.

## Framework-selection router (three sub-routers)

Consult `../../references/framework-selection.md` section "Stage 3 — Analyse" for the full table. Route each leg of the split to one of three:

- **Data (Quant)** — Trend, Comparison, Mix, Distribution, Scatter, Cumulative 80/20, Candlestick, Rank, Actual v Target
- **Financial (Quant)** — Unit Economics, Waterfall, Marginal Return, Cashflow/NPV, ROIC tree, Profit Margin
- **Question (Qual)** — 5 Whys, 5W + H, Yes/No

**Before running anything**, list every analysis you plan to run in one table in `03-analyse.md` (the template's "Plan of analyses" section). Redundancy becomes visible; unnecessary analyses can be cut before they are built.

## Process

1. **Read** `<case>/02-split.md`.
2. **Draft the plan of analyses** — one row per branch or hypothesis, with analysis / chart / predicted "so what".
3. **Kill redundancy** before you execute. If two analyses give the same insight, keep one.
4. **Execute each analysis** in its own section. Each section has:
   - Framework name
   - Data / inputs
   - Result (table, or a clear description if the result is directional)
   - **So what** (one sentence — required)
5. **For financial analyses**, detect whether the `xlsx` skill is available:
   - If yes → invoke `xlsx` to produce `<case>/03-analyse/<name>.xlsx` from the appropriate toolkit template (Unit Economics, Cashflow/NPV, ROIC, or Evaluation).
   - If no → produce a well-formatted markdown table and print the one-line prompt: *"Install the `xlsx` skill to generate a live Excel model."*
6. **Exit test** — after all analyses are run, check:
   - [ ] In combination, the analyses make the Stage-4 insight inescapable.
   - [ ] Each analysis has a "so what".
   - [ ] No analysis remains whose result will not change a decision.
   If any fail, either add analyses or trim.
7. **Write** `<case>/03-analyse.md` using the template at `../../references/deliverables/03-analyse.md.tpl`.

## Anti-analysis-paralysis rule

If you find yourself about to run a 4th analysis on the same leg, stop. Ask: *"Will this analysis change the recommendation?"* If not, kill it and move to Insight. A partner ships.

## Parallel research

If the analysis requires external market / competitor data, invoke the `cw-research-pod` subagent with a focused brief. Do not inline-search from the main chain — it bloats context.

## Clausewitzian Lens — Moral forces

The 70 frameworks are data-biased. Clausewitz: *"Physical quantity is only the wooden handle; the moral is the real weapon."* For any branch of the split whose outcome depends on people (retention, adoption, change appetite, leadership, cultural capacity), add a qualitative **moral-forces analysis** alongside the quantitative one — morale, will, leadership, trust, change fatigue. Treat it with the same rigour: inputs, observation, "so what". Reference `../../references/clausewitz-concepts.md#moral-forces`.

A finance-valid, moral-force-blind recommendation is a common failure mode. Do not produce one.

## Discipline self-check

- Simpler: any analysis that could be replaced by a single-sentence fact?
- Surgical: do not revise `02-split.md` while in Analyse.
- Goal: each analysis has a measurable success criterion (the "so what" will be true or not).

## HARD-GATE for the next skill

cw-insight cannot run until `03-analyse.md` exists with a "so what" per analysis.

## Handoff

> "Analysis complete. <N> analyses, each with a so-what. Invoking `cw-insight` next to structure takeaways."

Then invoke `cw-insight`.
