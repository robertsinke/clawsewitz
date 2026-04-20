---
description: Browse or look up a framework from the 70-framework Strategist Toolkit catalog (SCQ, HTDQ, Minto Pyramid, Driver Tree, SPADE, Bezos, GTM Stack, etc.). Usage - /cw-frameworks (browse) · /cw-frameworks <name> (lookup) · /cw-frameworks <move> (filter)
argument-hint: "[framework name | move name]"
---

# /cw-frameworks

Look up or browse the 70-framework Strategist Toolkit catalog shipped with this plugin.

## Argument

**$ARGUMENTS**

- **empty** → print the full index with every framework name grouped by engagement move, as a scannable table.
- **move name** (`frame`, `decompose`, `analyse`, `insights`, `narrative`, `recommend`, `plan`) → list all frameworks applicable to that move with one-line descriptions.
- **framework name** (case-insensitive, fuzzy match) → invoke the `cw-framework-library` skill to return the full spec + worked example.

## Where the catalog lives

`${CLAUDE_PLUGIN_ROOT}/references/toolkit-source.md` (frozen canonical reference; do not edit).

The index / routing table lives in `${CLAUDE_PLUGIN_ROOT}/references/framework-selection.md`.

## When to use this

- When you want to see the full toolkit before committing to a framework choice.
- When the orchestrator is about to apply a framework and the user wants to see the spec first.
- As reference while designing a custom approach that blends frameworks.

## No side effects

This command does not modify any case files. It is pure lookup.
