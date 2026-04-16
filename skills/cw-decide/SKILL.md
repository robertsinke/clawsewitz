---
name: cw-decide
description: Seventh step of the clawsewitz chain. Use after cw-story has produced 05-story.md to turn the narrative into a concrete recommendation using the right decision model (Eisenhower, ABCD, Bezos, Pros & Cons, Evaluation, Decision Tree, SPADE, Bull/Bear). Writes 06-decide.md.
---

# cw-decide

**Rigid** process skill. Stage 6 of the Strategy Loop.

## Announce

> "Using cw-decide to convert the story into a recommendation."

## HARD-GATE

Do not proceed until `<case>/05-story.md` exists with a governing thought.

## First: classify the decision type

Before picking a method, classify the decision itself:

- **ABCD** (McKinsey): big-bet / cross-cutting / ad hoc / delegated
- **Bezos**: 1-way door (irreversible) / 2-way door (reversible)

Classification governs how much rigor to apply. A 2-way-door, delegated decision does not need a weighted Evaluation matrix — Pros & Cons will do. A 1-way-door, big-bet decision warrants SPADE.

## Framework-selection decision tree

| Signal | Framework |
|---|---|
| Prioritise a list of work | **Eisenhower** |
| Reversible vs. irreversible | **Bezos** |
| Two options, simple trade-off | **Pros & Cons** |
| Multiple options vs. many criteria | **Evaluation** (weighted) |
| Probabilistic / multi-branch | **Decision Tree** |
| High-stakes, political, many stakeholders | **SPADE** |
| Present bands to a sponsor | **Bull / Base / Bear** |

## Process

1. **Read** `<case>/05-story.md`.
2. **Classify the decision type** (ABCD + Bezos). Record in `<case>/CASE.md`.
3. **Pick the method** using the table above. State the choice and reason.
4. **Generate options.** At least 2, typically 3. Each must be feasible, differentiated, and honestly scoped — no strawmen.
5. **Apply the chosen method** and fill the template at `../../references/deliverables/06-decide.md.tpl`.
6. **Clausewitzian Lens — Ends-Ways-Means litmus.** Before writing the recommendation, complete three lines in the template:
   - **End** — the outcome we are after, measurable
   - **Way** — the approach / posture we will pursue
   - **Means** — the resources (money, people, time, authority) this will consume
   If any of the three is vague, the recommendation is not yet ready. Rewrite, or return to `cw-story` if the governing thought itself is the problem. Reference `../../references/clausewitz-concepts.md#ends-ways-means`.
7. **Write the recommendation** — name the option, the reason, the risks and mitigants, and the **next decision required**. A recommendation without a next-action is a wish.
8. **Invoke `analyst` agent** with the decide artefact + chosen framework. Goal: stress-test the *framework choice* before handoff to Act.
9. **Invoke `challenger` agent in Red Team mode** with the decide artefact + the story. Goal: adversarial stress-test of the *content* of the recommendation (how a competitor or saboteur would exploit it, where it breaks, what signal would tell the client they are losing). Append the review to `06-decide.md` under the `## Challenger review (Red Team)` heading.

## Discipline self-check

- Simpler: would Pros & Cons do the job? Use it if yes.
- Surgical: do not revise the story from Decide. If the story is wrong, go back to cw-story.
- Goal: a reader could execute the recommendation without clarifying questions.

## Anti-pattern check (recommendation failure modes)

Before writing the recommendation, scan for:
- **Consensus as camouflage** — does the recommendation try to please all options? Pick one.
- **False precision** — weighted scores to two decimal places when inputs are directional. State the assumption range.
- **No next action** — if the recommendation ends with "we will need to decide X", flag and specify.

## HARD-GATE for the next skill

cw-act cannot run until `06-decide.md` exists with a named recommended option and a next decision.

## Handoff

> "Decision complete. Recommendation: <option>. Invoking `cw-act` next to build the implementation plan."

Then invoke `cw-act`.
