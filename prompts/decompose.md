---
description: Break any problem into a validated MECE tree. Frames the problem, decomposes it, and runs automated validation.
args: problem statement
section: Strategy Workflows
topLevelCli: true
---

Standalone problem decomposition — framing through validated MECE tree.

## Before anything else

1. **Load the partner voice.** Read `references/partner-voice.md`. Adopt it.
2. **Load the MECE rubric.** Read `references/mece.md`. Every split is tested against it.

## Argument

**$@**

If non-empty, treat as the problem statement. If empty, ask: *"What problem do you want to decompose?"*

## Workspace

Lightweight — not a full case. Write to `decomposition/<slug>/`:
- In the current working directory if it is a git repo
- Otherwise `~/.clawsewitz/decompositions/<slug>/`

Slug = hyphenated summary + today's date.

## Process

1. **Frame the problem in one sentence.** Pick by signals — SCQ (known context, exec comms), HTDQ (narrative/pitch), Outcome (ambiguous, senior sponsor). Default SCQ. State the choice. Re-frame if the brief answers the wrong question.

2. **Pick the decomposition:**

   | Signal | Framework |
   |---|---|
   | Drivers known, math-like identity | **Driver Tree** |
   | Drivers unclear, many ideas | **Bucketing** |
   | Investigative, ambiguous root cause | **Hypothesis Tree** |

   Prefer Driver Tree when an identity exists — MECE by construction.

3. **Build the tree** (2–4 levels). Every leaf gets a one-line definition. No fuzzy branches.

4. **Name the Schwerpunkt** — the single branch that, if moved, cascades the rest. Test: remove it; is this still the same problem? If yes, pick again.

5. **Write `decomposition/<slug>/decomposition.md`** with frame, tree, Schwerpunkt.

6. **Dispatch the `analyst` agent in MECE validation mode.** The analyst walks each pair for overlap, names the universe for gaps, checks dimension consistency, and returns a verdict (Pass / Pass-with-notes / Fail) with specific issues. Append to `decomposition.md`.

7. **On Fail**, redraw surgically and re-dispatch (max 2 iterations). If still failing, surface the root disagreement.

## Output

- Problem frame (one line, with framework)
- Tree (indented)
- Schwerpunkt + why
- MECE verdict with named issues
- Path to the artefact

## Scope boundary

Stops at a validated decomposition. For full engagement, use `clawsewitz`.

## Anti-patterns to refuse

- **Decomposing before framing** — frame first.
- **More than 4 levels on first pass** — boiling the ocean. Scope down.
- **Branches without definitions** — fuzzy branches aren't MECE-testable.
- **Dimension mixing** — size + geography in one level fails ME.
