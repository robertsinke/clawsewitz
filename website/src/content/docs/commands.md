---
title: Commands
description: Slash commands and skills available in clawsewitz.
---

## Slash commands

### `/clawsewitz <brief>`

Start or continue a strategic engagement. The brief is a one-line problem statement.

```
/clawsewitz Acme Design — subscriber decline, 5%/mo for 3 months, need turnaround
```

Creates a case workspace, sets partner posture, and begins the 7-step Strategy Loop at `cw-intake`.

### `/cw-case [list | resume <slug> | archive <slug>]`

Manage case workspaces.

```
/cw-case list              # Show all cases
/cw-case resume acme       # Resume a specific case
/cw-case archive acme      # Archive a completed case
```

### `/cw-frameworks [browse | <name> | <stage>]`

Browse or look up frameworks from the 70-framework catalog.

```
/cw-frameworks browse      # Browse all frameworks
/cw-frameworks SCQ         # Look up a specific framework
/cw-frameworks define      # Show frameworks for the Define stage
```

## Skills

### Chain stages (rigid sequence)

| Skill | Stage | What it does |
|-------|-------|-------------|
| `cw-intake` | 0 | Set up case workspace, collect context |
| `cw-define` | 1 | Frame problem using SCQ/HTDQ/Outcome |
| `cw-split` | 2 | MECE decomposition tree |
| `cw-analyse` | 3 | Run analyses on tree legs |
| `cw-insight` | 4 | Mount so-whats on page archetypes |
| `cw-story` | 5 | Partner-grade narrative |
| `cw-decide` | 6 | Recommendation with red-team review |
| `cw-act` | 7 | Implementation plan with premortem |

### Helper skills

| Skill | What it does |
|-------|-------------|
| `cw-mece-check` | Validate MECE rigor on any decomposition or pyramid |
| `cw-framework-library` | Look up any of the 70 frameworks by name |

## Subagents

| Agent | Invoked from | What it does |
|-------|-------------|-------------|
| `cw-research-pod` | Any stage | Parallel fact-gathering (competitive landscape, market sizing, benchmarks) |
| `cw-framework-critic` | Split, Story, Decide | Independent framework-choice reviewer — stress-tests MECE integrity |
| `cw-red-team` | Decide | Adversarial review — role-plays competitor or hostile stakeholder |
| `cw-premortem` | Act | Writes "it is six months from now, this plan failed" narrative |

## Hooks

| Hook | Event | What it does |
|------|-------|-------------|
| Session start | `SessionStart` | Surfaces active case on Claude Code launch |
| Chain gate | `PreToolUse` | Blocks writing stage N if stage N-1 is missing |
| Auto-commit | `PostToolUse` | Commits case files to git after each write |
| MECE reminder | `PostToolUse` | Reminds to run `cw-mece-check` after Split and Story |
| Act gate | `PostToolUse` | Checks Friction Register and Reserves headings in `07-act.md` |
| Analysis paralysis | `Stop` | Nudges toward Insight after repeated Analyse writes |
| Critic amplifier | `SubagentStop` | Highlights framework-critic verdicts that flag problems |
| Context saver | `PreCompact` | Preserves case state before context compaction |
