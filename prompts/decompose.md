---
description: Break any problem into a validated MECE tree. Frames the problem, decomposes it, and runs automated validation.
args: problem statement
section: Strategy Workflows
topLevelCli: true
---

Standalone problem decomposition — framing through validated MECE tree — without the full Strategy Loop.

## Before anything else

1. **Load the partner voice.** Read `references/partner-voice.md`. Adopt it for this engagement.
2. **Load the MECE rubric.** Read `references/mece.md`. Every split will be tested against it.

## Argument

**$@**

If the argument is non-empty, treat it as the problem statement. If empty, ask the user one question: *"What problem do you want to decompose?"*

## Workspace

This is a lightweight decomposition — not a full case. Write outputs to a `decomposition/` directory:
- In the current working directory if it is a git repo
- Otherwise in `~/.claude/clawsewitz/decompositions/`

Name the directory with a slug derived from the problem statement and today's date.

## Process

1. **Invoke `cw-define`** with the problem statement as context. cw-define will frame the problem using the appropriate lens (SCQ, HTDQ, or Outcome). Write the output to `decomposition/<slug>/01-define.md`.

2. **Invoke `cw-split`** to decompose the framed problem into a MECE tree (Driver Tree for top-down math, Bucketing for bottom-up ideas, Hypothesis Tree for investigative questions). Write the output to `decomposition/<slug>/02-split.md`.

3. **Invoke the `analyst` agent** with the split artefact and the MECE rubric. Goal: validate that every branch pair is mutually exclusive, the tree is collectively exhaustive, and no branch is too fuzzy to act on. Append the validation verdict to `02-split.md`.

4. **Return the validated tree.** Surface:
   - The problem frame (one line)
   - The tree structure (indented outline)
   - The MECE verdict (pass / pass with caveats / fail with named issues)
   - If fail: name the exact branches that overlap or the gap that breaks CE

## Scope boundary

This command does **not** continue to Analyse, Insight, Story, Decide, or Act. It stops at a validated decomposition. If the user wants to continue, point them to `/clawsewitz` with the decomposition as input.

## Anti-patterns to refuse

- **Decomposing before framing** — the problem statement must be framed (SCQ/HTDQ/Outcome) before splitting. Do not skip cw-define.
- **More than 4 levels deep on first pass** — a tree deeper than 4 levels is likely boiling the ocean. Flag it and suggest scoping down.
- **Branches without definitions** — every branch must have a one-line definition. Fuzzy branches are not MECE-testable.
