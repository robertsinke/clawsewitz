---
description: Build an implementation roadmap with workstreams, milestones, risk register, and premortem narrative.
argument-hint: "<recommendation or decision to implement>"
---

# /cw-plan

Standalone implementation planning — takes a recommendation or decision and builds a full execution roadmap with adversarial stress-testing.

## Before anything else

1. **Load the partner voice.** Read `${CLAUDE_PLUGIN_ROOT}/references/partner-voice.md`. Adopt it.
2. **Load the analyst discipline.** Read `${CLAUDE_PLUGIN_ROOT}/references/analyst-discipline.md`. Plans that ignore friction are plans that fail.

## Argument

**$ARGUMENTS**

Parse the argument:
- **File path** (starts with `/`, `~`, or `.`) → read it as the recommendation or decision to implement.
- **Text** → treat as the recommendation or context.
- **Empty** → ask: *"What recommendation or decision do you want to build an implementation plan for?"*

## Clarifying questions

Before building the plan, ask these (one at a time, skip any already answered in the input):

1. **Timeline.** *"What is the target timeline? (e.g. 90 days, 6 months, 1 year)"*
2. **Resources.** *"What resources are available? (team size, budget range, existing capabilities)"*
3. **Constraints.** *"What are the hard constraints? (deadlines, dependencies, political realities, things that cannot change)"*

## Framework selection

Pick the implementation framework based on context:

| Signal | Framework |
|---|---|
| Launch from zero (greenfield) | **Zero-to-One** (Design → Mobilise → Build → Launch → Scale) |
| Product launch / go-to-market | **GTM Stack** (product/pricing/promotion + channels + backend) |
| Full roadmap across workstreams | **Execution Plan** (Gantt-style with target metrics) |

Default to **Execution Plan** unless the context clearly calls for another. State the choice and reason.

## Build the plan

1. **Name workstreams** (2-5). Each workstream gets:
   - A lead or owner (role if name unknown)
   - A target metric (how you know it is working)
   - Key activities per phase/quarter

2. **Sequence by phase or quarter.** Each phase has a theme. Activities are ordered by dependency, not by preference.

3. **Name milestones** (3-7). Each dated (at least to the month). Each with a clear deliverable — not "progress on X" but "X is shipped / signed / live".

4. **Name the first-action owner.** The single person responsible for starting milestone 1. Named role, not "the team".

5. **Build the risk register.** Top 3 risks, each with:
   - **Severity** — fatal / material / manageable
   - **Leading indicator** — the signal that this risk is materialising
   - **Cheapest mitigation** — the smallest action that reduces it

6. **Name the reserves.** What is held back for unknowns: uncommitted budget, unassigned capacity, decisions deferred (optionality), timeline slack. A plan committing 100% of capacity breaks on first contact with reality.

## Stress-test

**Invoke the `challenger` agent in Premortem mode.** Pass the plan, the recommendation, and any constraints. The challenger will:
- Write a failure narrative set six months out
- Extract latent risks not already in the register
- Recommend concrete additions to the plan

Append the premortem to the plan output.

## Output

Return:
1. **Framework choice** (one line + reason)
2. **Workstream table** (workstream / lead / target metric / phase activities)
3. **Milestone timeline** (milestone / date / deliverable)
4. **Risk register** (risk / severity / leading indicator / mitigation)
5. **Reserves** (what is held back and why)
6. **Premortem** (failure narrative + extracted risks + recommended additions)
7. **First action** — what happens on day 1, and who does it

## No case workspace required

This command is standalone. Output goes directly to the user. If the user wants to save it, they can specify a file path.

## Anti-patterns to refuse

- **Plans without owners** — every workstream has a lead; every first action has a name. "The team will..." is not a plan.
- **Plans without friction** — if the plan does not name what will go wrong, it has not been thought through. The risk register is required, not optional.
- **100% commitment** — a plan with no reserves breaks on contact. Name the slack.
- **Milestones without deliverables** — "Phase 2 complete" is not a milestone. "V1 shipped to beta users" is.
- **Ignoring the premortem** — if the challenger surfaces a material risk, the plan must respond to it. Do not append and ignore.
