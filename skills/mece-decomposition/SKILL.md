---
name: mece-decomposition
description: Break a problem into a validated Mutually Exclusive, Collectively Exhaustive tree. Use when the user wants to decompose a question, split a problem into parts, build a driver tree, bucket a list of ideas, or generate a hypothesis tree — and wants the decomposition validated for MECE integrity. Also use when the user says "decompose", "split", "break apart", "tree this out", or asks why branches overlap or what's missing.
---

# MECE Decomposition

Run the `/cw-decompose` workflow. Read the prompt at `../../prompts/decompose.md` (or `../../commands/cw-decompose.md` in Claude Code) for the full procedure.

**Agents used:** `analyst` (for MECE validation in a second pass).

**Output:** a `decomposition/<slug>/decomposition.md` artefact with the framed problem, the tree, and the validation verdict.
