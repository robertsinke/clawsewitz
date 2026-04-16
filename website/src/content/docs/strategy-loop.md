---
title: Strategy Loop
description: The 7-step strategy chain that powers every clawsewitz engagement.
---

Every engagement follows the same 7-step chain. Each stage has a **rigid** process, a dedicated framework selector, a deliverable template, and one **Clausewitzian lens** — a structural check drawn from *On War* that makes the output sharper.

## 1. Define (`cw-define`)

**Frame the problem before solving it.**

Pick the right lens: SCQ (Situation-Complication-Question), HTDQ (How to Double the Question), or Outcome framing. Push back on the brief if the stated question doesn't serve the decider's real goal.

| | |
|---|---|
| **Produces** | `01-define.md` — problem frame with SCQ/HTDQ/Outcome |
| **Clausewitz lens** | *Strategy serves policy* — does this question serve the real goal? |
| **Hard gate** | Cannot proceed without `00-intake.md` |

## 2. Split (`cw-split`)

**Decompose the problem into MECE branches.**

Choose: Driver Tree, Bucketing, or Hypothesis Tree. After the tree is drawn, `cw-mece-check` runs automatically to validate Mutually Exclusive / Collectively Exhaustive rigor.

| | |
|---|---|
| **Produces** | `02-split.md` — MECE decomposition tree |
| **Clausewitz lens** | *Schwerpunkt* — name the one branch that, if moved, cascades the rest |
| **Hard gate** | Cannot proceed without `01-define.md` |

## 3. Analyse (`cw-analyse`)

**Run analyses on each leg of the tree.**

70+ frameworks available: financial models, market sizing, competitive analysis, 5 Whys, value chain, and more. The framework selector picks the right tool for each leg's data shape.

| | |
|---|---|
| **Produces** | `03-analyse.md` — quantitative + qualitative analysis |
| **Clausewitz lens** | *Moral forces* — for any leg about people/culture/will, add a qualitative analysis alongside the quant |
| **Hard gate** | Cannot proceed without `02-split.md` |

## 4. Insight (`cw-insight`)

**Mount so-whats on page archetypes.**

Each finding gets placed on the right visual: One-Pager, Canvas, 2x2 Matrix, Journey Map, Capability Map, Positioning Map, or others. Optional HTML output for presentation-ready pages.

| | |
|---|---|
| **Produces** | `04-insight.md` + optional HTML pages |
| **Clausewitz lens** | *Fog acknowledgement* — every insight page names the 1-2 unknowns that could flip the takeaway |
| **Hard gate** | Cannot proceed without `03-analyse.md` |

## 5. Story (`cw-story`)

**Stitch insights into a partner-grade narrative.**

Choose: Minto Pyramid, SCQA, Story Spine, 5 Act, or StoryBrand. The governing thought must pass the **boldness test** — if nobody could disagree with it, it's not a recommendation.

| | |
|---|---|
| **Produces** | `05-story.md` + optional deck.pptx |
| **Clausewitz lens** | *Boldness / Kuhnheit* — rewrite until a thoughtful reader could say "no, I'd do X instead" |
| **Hard gate** | Cannot proceed without `04-insight.md` |

## 6. Decide (`cw-decide`)

**Turn the narrative into a recommendation.**

Choose: Eisenhower, ABCD, Bezos, Pros & Cons, Evaluation Tree, SPADE, or Bull/Bear. Every recommendation must state three lines: End (outcome), Way (approach), Means (resources).

| | |
|---|---|
| **Produces** | `06-decide.md` — recommendation with red-team review |
| **Clausewitz lens** | *Ends-Ways-Means* — if any of the three is vague, the recommendation isn't ready |
| **Hard gate** | Cannot proceed without `05-story.md` |
| **Subagent** | `cw-red-team` adversarial review before handoff |

## 7. Act (`cw-act`)

**Build the implementation plan.**

Choose: Zero-to-One, Comms Deployment, Decision Grid, GTM Stack, Execution Plan, or Capability Drop. Name workstreams, leads, milestones, and the first-action owner.

| | |
|---|---|
| **Produces** | `07-act.md` — implementation plan with premortem |
| **Clausewitz lens** | *Friction register + Reserves* — name top 3 frictions and what capacity is held back |
| **Hard gate** | Cannot proceed without `06-decide.md` |
| **Subagent** | `cw-premortem` failure narrative before case close |

## Chain enforcement

Hooks enforce the chain automatically:
- **PreToolUse gate**: blocks writing stage N if stage N-1 doesn't exist
- **PostToolUse**: auto-commits case files to git, reminds to run MECE check after Split and Story
- **Stop hook**: detects analysis-paralysis (many Analyse writes without an Insight step)
- **Act gate**: checks that `07-act.md` has Friction Register and Reserves headings
