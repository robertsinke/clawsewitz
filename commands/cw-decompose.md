---
description: Break any problem into a validated MECE tree. Frames the problem, decomposes it, and runs automated validation.
argument-hint: "<problem statement>"
---

# /cw-decompose

Standalone problem decomposition — framing through validated MECE tree.

## Before anything else

1. **Load the partner voice.** Read `${CLAUDE_PLUGIN_ROOT}/references/partner-voice.md`. Adopt it.
2. **Load the MECE rubric.** Read `${CLAUDE_PLUGIN_ROOT}/references/mece.md`. Every split is tested against it.

## Argument

**$ARGUMENTS**

If non-empty, treat as the problem statement. If empty, ask: *"What problem do you want to decompose?"*

## Workspace

Lightweight — not a full case. Write to a `decomposition/<slug>/` directory:
- In the current working directory if it is a git repo
- Otherwise `~/.claude/clawsewitz/decompositions/<slug>/`

Slug = hyphenated summary + today's date.

## Process

1. **Frame the problem in one sentence.** Pick the lens by signals — SCQ (known context, exec comms), HTDQ (narrative/pitch), or Outcome (ambiguous, senior sponsor). Default SCQ. State the choice and reason. If you judge the brief is answering the wrong question, re-frame and say so.

2. **Pick the decomposition framework:**

   | Signal | Framework |
   |---|---|
   | Drivers known, math-like identity (Revenue = Volume × Price) | **Driver Tree** |
   | Drivers unclear, many ideas to organise | **Bucketing** |
   | Investigative, ambiguous root cause | **Hypothesis Tree** |

   Bias: prefer Driver Tree when an identity exists — MECE by construction.

3. **Build the tree** (2–4 levels). Every leaf gets a one-line definition. No fuzzy branches. If you need a 5th level, you're building the analysis — stop and defer.

4. **Name the Schwerpunkt** — the single branch that, if moved, cascades the rest. Test: remove it; is this still the same problem? If yes, pick again.

5. **Write `decomposition/<slug>/decomposition.md`** with the frame, the tree, and the Schwerpunkt.

6. **Dispatch the `analyst` agent in MECE validation mode** with the decomposition file. The analyst walks each pair for overlap, names the universe for gaps, checks dimension consistency, and returns a verdict (Pass / Pass-with-notes / Fail) with specific named issues. Append the verdict to `decomposition.md`.

7. **On Fail**, redraw surgically and re-dispatch. Max 2 iterations. If still failing, surface the root disagreement to the user (usually a definitional question about the universe).

## Output

Return:
- The problem frame (one line, with framework)
- The tree (indented outline)
- The Schwerpunkt (one line + why it cascades)
- The MECE verdict (pass / pass-with-notes / fail, with named issues)
- Path to the written artefact

## Scope boundary

This command stops at a validated decomposition. It does **not** continue to analysis or recommendation. To run the full engagement, use `/clawsewitz`.

## Anti-patterns to refuse

- **Decomposing before framing** — the problem statement must be framed before splitting.
- **More than 4 levels deep on first pass** — likely boiling the ocean. Flag and scope down.
- **Branches without definitions** — fuzzy branches are not MECE-testable.
- **Dimension mixing** — size + geography in the same level fails ME. Split twice instead.
