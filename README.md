# clawsewitz

The open source AI strategy agent for Claude Code.

```
         ███                                                           ███   ███
         ███                                                                 ███
  █████  ███   ███████   ███      ███  ███████    █████  ███      ███  ███  █████  ███████
███      ███  ███   ███  ███      ███  ███      ███      ███      ███  ███   ███      ███
███      ███  █████████  ███ ████ ███   █████   ███████  ███ ████ ███  ███   ███     ███
███      ███  ███   ███   ███ ██ ███       ███  ███       ███ ██ ███   ███   ███    ███
  █████  ███  ███   ███    ███  ███    ███████    █████    ███  ███    ███    ███  ███████
```

## Install

```bash
curl -fsSL https://robertsinke.github.io/clawsewitz/install | bash
```

Requires: `git`, `node` (>=20), `claude` CLI.

## What it does

A self-contained **Strategy Loop** with 9 workflows, 4 agents, 70 frameworks, and MECE enforcement at every stage.

| Stage | Command | Produces |
|-------|---------|----------|
| 1. Define | `cw-define` | 01-define.md — SCQ / HTDQ / Outcome frame |
| 2. Split | `cw-split` | 02-split.md — MECE decomposition tree |
| 3. Analyse | `cw-analyse` | 03-analyse.md — data + qualitative analysis |
| 4. Insight | `cw-insight` | 04-insight.md — so-whats on page archetypes |
| 5. Story | `cw-story` | 05-story.md — structured narrative |
| 6. Decide | `cw-decide` | 06-decide.md — recommendation |
| 7. Act | `cw-act` | 07-act.md — implementation plan |

## Quick start

```
claude
/clawsewitz Acme Design — subscriber decline, 5%/mo for 3 months, need turnaround
```

The agent creates a case workspace, runs the 7-step chain in partner voice, produces deliverables at each stage, and enforces MECE rigor via automated checks.

## Workflows

| Command | What it does |
|---------|-------------|
| `/clawsewitz <brief>` | Full strategic engagement — brief to implementation plan |
| `/cw-decompose <problem>` | Break a problem into a validated MECE tree |
| `/cw-brief <topic>` | Write an executive brief or recommendation memo |
| `/cw-audit <path>` | Red-team and premortem an existing plan |
| `/cw-evaluate <question>` | Score options against criteria and recommend one |
| `/cw-research <query>` | Gather competitive, market, or industry intelligence |
| `/cw-plan <recommendation>` | Build an implementation roadmap with risk register |
| `/cw-case list` | List, resume, or archive case workspaces |
| `/cw-frameworks browse` | Browse the 70-framework catalog |

## Agents

| Agent | Role |
|-------|------|
| Researcher | Hunts for evidence across the web, benchmarks, and competitive landscape |
| Analyst | Decomposes problems, applies frameworks, validates MECE integrity |
| Writer | Structures findings into briefs, memos, and slide narratives |
| Challenger | Stress-tests plans, plays adversary, writes the failure narrative |

## What's under the hood

- **11 skills** — 7 rigid chain stages + cw-mece-check, cw-framework-library, session-search
- **4 agents** — Researcher (fact-gathering), Analyst (MECE review), Writer (narratives), Challenger (adversarial + premortem)
- **9 workflows** — full engagement, decompose, brief, audit, evaluate, research, plan, case management, framework browsing
- **6 hooks** — chain-order gate, auto-commit, MECE reminders, analysis-paralysis detection, and more
- **70 frameworks** — from the Strategist Toolkit: SCQ, HTDQ, Minto Pyramid, Driver Tree, SPADE, Bezos, GTM Stack, Zero-to-One, and 60+ more

## Version

v0.4.0

## License

MIT
