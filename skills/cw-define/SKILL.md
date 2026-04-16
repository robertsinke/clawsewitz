---
name: cw-define
description: Second step of the clawsewitz chain. Use after cw-intake has produced 00-intake.md, to frame the problem statement using the right lens (SCQ, HTDQ, or Outcome). Picks the framework by engagement signals and writes 01-define.md.
---

# cw-define

**Rigid** process skill. Stage 1 of the Strategy Loop.

## Announce

> "Using cw-define to frame the problem."

## GUARDRAILS

Read `../../references/partner-voice.md` and `../../references/analyst-discipline.md` on first invocation.

## HARD-GATE

Do not proceed until `<case>/00-intake.md` exists and contains the completed intake sections. If it is missing, stop and invoke `cw-intake`.

## Framework-selection decision tree (consult before executing)

Consult `../../references/framework-selection.md` section "Stage 1 — Define". Decide by these signals:

| Signal | Framework |
|---|---|
| Known context, exec comms, baseline rigor | **SCQ** |
| Narrative / pitch / change-mgmt | **HTDQ** |
| High-stakes, senior sponsor, ambiguous | **Outcome** (Bulletproof) |

**State the choice and the reason out loud before executing.** Example: *"I'm choosing SCQ: the decider is the CEO, the context is well-known, and the recommendation will be exec-read."*

If uncertain between two, show the user a one-line comparison and let them pick.

## Process

1. **Read** `<case>/00-intake.md`.
2. **Clausewitzian Lens — Strategy serves policy.** Before picking a framing, ask: *does the stated question serve the decider's real policy goal?* Compare the brief's question to the Government-force entry in the Trinity and the success criteria. If the question answers a symptom while the policy goal is elsewhere, re-frame the question first and record the re-framing in `01-define.md`. Reference `../../references/clausewitz-concepts.md#strategy-serves-policy`.
3. **Pick** the framework (signals above). Record the choice in `<case>/CASE.md` under "Framework choices log".
4. **Invoke `cw-framework-library`** with the chosen framework name to load the full spec + worked example.
5. **Fill** the template at `../../references/deliverables/01-define.md.tpl`. Use only the variant for your chosen framework — leave the other variants' sections removed.
6. **Run the problem-statement self-test** (the 6-item checklist in the template). Every item must pass.
7. **Surface assumptions** — at least two, each one-line.
8. **Write** to `<case>/01-define.md`.

## Discipline self-check (before writing)

- Simpler: would SCQ cover this if you picked Outcome? If yes, downgrade.
- Surgical: any piece of `00-intake.md` you would like to "fix" — don't.
- Goal: will the decider recognise the problem statement as worth solving?

## HARD-GATE for the next skill

cw-split cannot run until `01-define.md` exists with a completed problem statement and chosen framework recorded.

## Handoff

> "Problem framed using <framework>. Invoking `cw-split` next to decompose."

Then invoke `cw-split`.

## Edge cases

- **User insists on a framework you disagree with.** Note your reservation in one sentence, then honour the user's choice. Record both in CASE.md.
- **Problem already well-defined in intake.** Still run this stage; the artefact is the written contract for the rest of the chain.
- **Brief is actually two problems.** Name it. Either pick the one to solve now or ask the user which to prioritise. Do not silently collapse them.
