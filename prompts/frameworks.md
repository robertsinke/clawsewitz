---
description: Browse or look up a framework from the 70-framework Strategist Toolkit catalog (SCQ, HTDQ, Minto Pyramid, Driver Tree, SPADE, Bezos, GTM Stack, etc.). Usage - frameworks (browse) · frameworks <name> (lookup) · frameworks <stage> (filter)
args: framework name | stage name
section: Strategy Workflows
topLevelCli: true
---

Look up or browse the 70-framework Strategist Toolkit catalog shipped with this plugin.

## Argument

**$@**

- **empty** → print the Stage 1–7 index with every framework name grouped by stage, as a scannable table.
- **stage name** (`define`, `split`, `analyse`, `insight`, `story`, `decide`, `act`) → list all frameworks in that stage with one-line descriptions.
- **framework name** (case-insensitive, fuzzy match) → invoke the `cw-framework-library` skill to return the full spec + worked example.

## Where the catalog lives

`references/toolkit-source.md` (frozen canonical reference; do not edit).

The index / routing table lives in `references/framework-selection.md`.

## When to use this

- When you want to see the full toolkit before committing to a framework choice.
- When a stage skill is about to apply a framework and the user wants to see the spec first.
- As reference while designing a custom approach that blends frameworks.

## No side effects

This command does not modify any case files. It is pure lookup.
