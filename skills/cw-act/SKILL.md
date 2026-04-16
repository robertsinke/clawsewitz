---
name: cw-act
description: Eighth and final step of the clawsewitz chain. Use after cw-decide has produced 06-decide.md to build the implementation plan for the recommended option using the right act framework (Zero-to-One, Comms Deploy, Decision Grid, GTM Stack, Execution Plan, Capability Drop). Writes 07-act.md and optional capability-roadmap.xlsx.
---

# cw-act

**Rigid** process skill. Stage 7 — terminal stage — of the Strategy Loop.

## Announce

> "Using cw-act to build the implementation plan."

## HARD-GATE

Do not proceed until `<case>/06-decide.md` exists with a named recommended option.

## Framework-selection decision tree

| Signal | Framework |
|---|---|
| Launch from zero (greenfield) | **Zero-to-One** (Design → Mobilise → Build → Launch → Scale) |
| Change-mgmt / rollout of comms | **Comms Deployment** |
| Steering-committee running cadence | **Decision Grid** |
| Product launch | **GTM Stack** (product/pricing/promotion + channels + backend) |
| Full roadmap across streams | **Execution Plan** (Gantt-style w/ target metric) |
| Platform / capability build | **Capability Drop** |

**Default to Execution Plan** unless the engagement type clearly calls for another. Many recommendations will combine two (e.g. Execution Plan + Comms Deployment for a strategic rollout).

## Process

1. **Read** `<case>/06-decide.md`.
2. **Pick the framework(s).** Most plans use 1, some use 2 in combination. Record in `<case>/CASE.md`.
3. **Name workstreams.** 2 to 5 typically. Each workstream needs a lead and a target metric.
4. **Sequence by quarter (or phase).** Each quarter has a theme. Each workstream has activities per quarter.
5. **Name milestones.** 3 to 7 major milestones across the roadmap. Each dated (at least to the month).
6. **Name the first-action owner.** The single person responsible for starting the first milestone. Named, not "the team".
7. **Clausewitzian Lens — Friction register.** Name the top 3 frictions that will slow or derail execution — political, data-quality, capability, or org-structural. Each with likely impact and cheapest mitigation. A plan that does not name its frictions will encounter them uncatalogued. Reference `../../references/clausewitz-concepts.md#friction`.
8. **Clausewitzian Lens — Reserves.** Name what is held back for the unknowns: budget not committed, team capacity not yet assigned, decisions not yet made (optionality), timeline slack. A plan committing 100% of capacity breaks on first friction. Reference `../../references/clausewitz-concepts.md#reserves`.
9. **Write** `<case>/07-act.md` using the template at `../../references/deliverables/07-act.md.tpl`. Populate the Friction register and Reserves sections — these are required.
10. **Invoke `cw-premortem` subagent** with the act artefact + decide + intake. Append the "six months from now, this failed" narrative and risk extractions to `07-act.md`. Update the plan with any additions the pre-mortem motivates (e.g. a week-8 checkpoint to test a named assumption).
11. **If `xlsx` is available** and the recommendation warrants a capability-timed model, produce `<case>/capability-roadmap.xlsx`. Otherwise emit the markdown Gantt table.
12. **Update `<case>/CASE.md`** with final status: *"Complete — final deliverables: 05-story.md, 06-decide.md, 07-act.md (+ deck.pptx / xlsx if generated)."*

## Plan self-check (required)

The artefact is not an implementation plan if any of these are missing:
- [ ] Workstreams named
- [ ] Lead per workstream
- [ ] Target metric per workstream
- [ ] Sequence (quarters or phases) explicit
- [ ] Milestones dated
- [ ] First-action owner named
- [ ] **Friction register populated (top 3)**
- [ ] **Reserves named (budget, team, optionality, timeline)**
- [ ] **Premortem narrative appended**

Any missing item must be filled before the case is closed.

## Discipline self-check

- Simpler: any workstream that duplicates another? Merge.
- Surgical: do not revisit the decision from Act.
- Goal: on day 1, the first-action owner knows exactly what to do.

## Handoff

This is the terminal stage. After writing `07-act.md` and updating `CASE.md`:

> "Engagement complete. Final deliverables in `<case>/`:
> - 05-story.md — partner-grade narrative
> - 06-decide.md — recommendation
> - 07-act.md — implementation plan
> - deck.pptx / xlsx files (if available)
> First-action owner: <name>. Next decision required: <from 06-decide>."

## Loop-back rule

If the plan exposes that the recommendation is infeasible, return to `cw-decide` with the specific infeasibility named. Do not quietly trim the plan to fit.
