---
description: Manage clawsewitz case workspaces. Lists, resumes, or archives engagements. Usage - /cw-case (list) · /cw-case resume <slug> · /cw-case archive <slug>
argument-hint: "[list | resume <slug> | archive <slug>]"
---

# /cw-case

Manage case workspaces created by `/clawsewitz`.

## Argument

**$ARGUMENTS**

Parse:
- **empty or `list`** → list
- **`resume <slug>`** → resume
- **`archive <slug>`** → archive

## List (default)

1. Check both locations:
   - `docs/clawsewitz/cases/` in the cwd (if it is a git repo)
   - `~/.claude/clawsewitz/cases/`
2. For each case directory, read its `CASE.md` and surface:
   - Slug
   - Artefacts present (intake, decomposition, analysis, brief, recommendation, plan, …)
   - Date of the latest file
   - One-line status from CASE.md
3. Sort by latest-modified descending. Print as a table.
4. If no cases exist, say so and suggest `/clawsewitz "<brief>"`.

## Resume

1. Locate the case workspace matching the slug (in either location).
2. Read `CASE.md` and surface:
   - Artefacts present
   - Framework choices made so far
   - Any MECE validation verdicts on file
3. Ask: *"Resume from `<next-move>`, or revisit a prior artefact?"*
4. Re-enter `/clawsewitz` with the workspace loaded as context. The orchestrator picks up wherever the artefacts left off.

## Archive

1. Locate the case workspace matching the slug.
2. Move it to a sibling `archived/` directory (create if absent) to preserve history.
3. Confirm completion.

## Edge cases

- **Ambiguous slug.** If multiple cases match, list them and ask the user to disambiguate.
- **Cross-location case.** If the same slug exists in both project-local and user-global, ask which to use.
- **Missing CASE.md.** If the directory exists but lacks CASE.md, regenerate a minimal one by scanning the artefacts present and inferring the engagement state.
