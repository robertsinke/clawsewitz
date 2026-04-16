---
name: cw-split
description: Third step of the clawsewitz chain. Use after cw-define has produced 01-define.md, to decompose the problem into a MECE tree — Driver Tree (top-down math), Bucketing (bottom-up ideas), or Hypothesis Tree (investigative). Writes 02-split.md and triggers cw-mece-check.
---

# cw-split

**Rigid** process skill. Stage 2 of the Strategy Loop. The most important stage in the chain: if the split is wrong, every subsequent stage solves the wrong problem.

## Announce

> "Using cw-split to decompose the problem."

## HARD-GATE

Do not proceed until `<case>/01-define.md` exists with a completed problem statement. If missing, stop and invoke `cw-define`.

## Framework-selection decision tree

| Signal | Framework |
|---|---|
| Drivers known, math-like decomposition (Revenue = Volume × Price) | **Driver Tree** |
| Drivers unclear, many ideas to organise | **Bucketing** (bottom-up) |
| Investigative, ambiguous root cause | **Hypothesis Tree** |

**State the choice and the reason out loud before executing.**

Default bias: prefer Driver Tree when an identity exists (revenue, cost, margin, ROIC). It is MECE by construction.

## Process

1. **Read** `<case>/01-define.md` and the problem statement.
2. **Pick** the framework. Record in `<case>/CASE.md`.
3. **Load** the framework spec via `cw-framework-library`.
4. **Build the tree.** 2 to 4 levels deep, typically. If you go deeper than 4, you are building the analysis, not the split — stop and defer detail to cw-analyse.
5. **Run the MECE self-check in the template** — name overlaps explicitly, name gaps explicitly.
6. **Write** `<case>/02-split.md` using the template at `../../references/deliverables/02-split.md.tpl`.
7. **Trigger `cw-mece-check`** on the file. Append its verdict under the designated heading.

## MECE self-check (required, in the artefact)

- Walk each pair of branches: is there overlap? Name it.
- Is there a real item of the universe outside the tree? Name it.
- Is the dimension consistent? Mixed dimensions usually fail ME.

If the self-check flags a material issue, **redraw the tree before calling cw-mece-check**. Do not outsource judgement you could apply yourself.

## Discipline self-check

- Simpler: is there an identity you missed that would make this MECE-by-construction?
- Surgical: don't re-litigate the problem statement here — the split accepts the definition.
- Goal: will each leaf be analysable by a single analysis in Stage 3? If not, split further.

## On cw-mece-check failure

If `cw-mece-check` returns **Fail**:
1. Read its specific overlap / gap notes.
2. Redraw the tree.
3. Rewrite `02-split.md` (surgical — change only what the failure requires).
4. Re-invoke `cw-mece-check`.

Do this up to 2 iterations. If still failing, stop and surface the root disagreement to the user (usually a definitional question about the universe being decomposed).

## Clausewitzian Lens — Schwerpunkt (Center of Gravity)

After `cw-mece-check` returns Pass or Pass-with-notes, name the **Schwerpunkt**: the single branch of the tree that, if moved, cascades the rest. Not necessarily the biggest number — the one with the largest downstream effect. Fill the "Schwerpunkt" section of `02-split.md` with the branch name and a one-line reason it cascades. `cw-analyse` will read this and analyse the Schwerpunkt deepest. Reference `../../references/clausewitz-concepts.md#schwerpunkt-center-of-gravity`.

**Test:** if you removed this branch from the tree, would the problem still be the same problem? If yes, it is not the Schwerpunkt — pick again.

## HARD-GATE for the next skill

cw-analyse cannot run until `02-split.md` exists, `cw-mece-check` verdict is Pass or Pass-with-notes, **and** the Schwerpunkt is named.

## Handoff

> "Split complete using <framework>, MECE verdict: <pass>, Schwerpunkt: <branch>. Invoking `cw-analyse` next."

Then invoke `cw-analyse`.
