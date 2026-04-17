---
description: Score options against weighted criteria and recommend one. Structured decision-making with adversarial review.
args: decision question
section: Strategy Workflows
topLevelCli: true
---

Standalone structured decision-making — define options, weight criteria, score, recommend, and stress-test.

## Before anything else

**Load the partner voice.** Read `references/partner-voice.md`. Adopt it. Decisions require precision, not hedging.

## Argument

**$@**

If the argument is non-empty, treat it as the decision question. If empty, ask: *"What decision are you trying to make?"*

## Step 1: Define the decision space

Work with the user to define:

1. **Options** (2-5). Each must be feasible, differentiated, and honestly scoped. No strawmen — every option should be one a reasonable person could defend.
2. **Criteria** (3-7). What matters in this decision? Cost, speed, risk, strategic fit, reversibility, team capability, etc. Each criterion gets a one-line definition.
3. **Weights** (must sum to 100%). The user assigns weights. If they struggle, ask: *"If you could only have one of these criteria met perfectly, which would it be?"* and use the ranking to derive weights.

## Step 2: Classify the decision type

Before picking the evaluation method:

- **Bezos classification:** Is this a one-way door (irreversible, high stakes) or a two-way door (reversible, lower stakes)?
- **Complexity:** How many options x criteria? Simple (2 options, 2-3 criteria) vs. complex (3+ options, 4+ criteria)?
- **Stakeholders:** Is this a solo decision or does it need organisational buy-in?

## Step 3: Pick the framework

| Signal | Framework |
|---|---|
| Two options, simple trade-off | **Pros & Cons** |
| Multiple options, many criteria | **Evaluation Matrix** (weighted scoring) |
| High-stakes, political, many stakeholders | **SPADE** (Setting, People, Alternatives, Decide, Explain) |

State the choice and reason. If the user has a preference, use it — but flag if you think it is the wrong tool.

## Step 4: Score and recommend

1. **Score each option** against each criterion (1-5 scale). Multiply by weight. Show the math.
2. **Produce the ranked result.** Name the winner and the margin.
3. **Ends-Ways-Means litmus.** Before finalising the recommendation, verify:
   - **End** — the outcome, measurable
   - **Way** — the approach
   - **Means** — the resources it will consume
   If any of the three is vague, the recommendation is not ready. Rewrite.
4. **Name the recommendation** — one option, one reason, the risks it carries, and the next decision required.

## Step 5: Stress-test

**Invoke the `challenger` agent in Red Team mode** on the recommendation. Pass:
- The scored matrix
- The recommended option
- The decision question

The challenger attacks the recommendation — not the framework. Append the review.

## Output

Return:
1. **Decision classification** (Bezos + complexity)
2. **Scored matrix** (table with options x criteria x weights x scores)
3. **Recommendation** (option + reason + Ends-Ways-Means + risks + next action)
4. **Challenger review** (adversarial attack on the recommendation)

## No case workspace

This command is standalone. Output goes directly to the user unless they specify a file path.

## Anti-patterns to refuse

- **False precision** — scoring to two decimal places when inputs are gut-feel. State the assumption range.
- **Consensus as camouflage** — if two options score within noise of each other, name the tie-breaker criterion and pick. Do not present a tie as a result.
- **Criteria that do not differentiate** — if every option scores the same on a criterion, drop it. It adds weight without information.
- **Strawman options** — an option included only to lose makes the evaluation dishonest. Every option must be defensible.
