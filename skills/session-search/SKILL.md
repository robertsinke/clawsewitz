---
name: session-search
description: Search across past clawsewitz engagements. Find prior analyses, framework choices, decisions, and deliverables from previous case workspaces.
allowed-tools:
  - Read
  - Grep
  - Glob
---

# session-search

Search across clawsewitz case workspaces for prior work.

## When to use

- Looking for how a similar problem was decomposed before
- Finding which frameworks were applied to a comparable situation
- Retrieving prior analyses, insights, or recommendations
- Building on previous engagement work

## How it works

1. Search both case workspace locations:
   - Project-local: `docs/clawsewitz/cases/` (in the current git repo)
   - User-global: `~/.claude/clawsewitz/cases/`

2. Search modes:
   - **By keyword:** Grep across all case files for matching content
   - **By stage:** Find all files matching a stage number (e.g., all `02-split.md` files)
   - **By framework:** Search for framework names across case files
   - **By case slug:** Browse all files in a specific case

3. Return results with:
   - Case slug and date
   - File path and stage
   - Matching content with surrounding context
   - One-line summary of the case (from CASE.md)

## Usage

The calling context provides a search query. Parse it:
- If it looks like a framework name -> search for that framework across all cases
- If it looks like a stage name -> find all instances of that stage
- If it's a keyword or phrase -> grep across all case content
- If it's a case slug -> list that case's files and status
