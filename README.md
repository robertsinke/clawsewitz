# clawsewitz

The open source AI strategy agent. Now available as a standalone CLI and a Claude Code plugin.

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

**npm** (primary):

```bash
npm install -g clawsewitz
```

**curl** (standalone):

```bash
curl -fsSL https://robertsinke.github.io/clawsewitz/install | bash
```

**Claude Code plugin**:

```bash
curl -fsSL https://robertsinke.github.io/clawsewitz/install-plugin | bash
```

**Skills only**:

```bash
curl -fsSL https://robertsinke.github.io/clawsewitz/install-skills | bash
```

Requires: `node` (>=20.19.0).

## Usage

```
clawsewitz                                    # Interactive strategy session
clawsewitz "Acme — subscriber decline"        # Start with a brief
clawsewitz decompose "Why are customers churning?" # Standalone workflow
clawsewitz audit strategy.md                  # Red-team a plan
clawsewitz research "competitor landscape"    # Competitive intel
clawsewitz doctor                             # Check installation
```

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

## Dual Distribution

clawsewitz ships as two distributions:

- **Standalone Pi CLI** (primary) — install via npm or the standalone curl script. Runs `clawsewitz` as a top-level command in any terminal, powered by the Pi runtime.
- **Claude Code plugin** (secondary) — install via the plugin curl script. Adds `/clawsewitz` and `/cw-*` commands inside Claude Code sessions.

Both distributions share the same skills, agents, frameworks, and hooks. The CLI is the recommended entry point for new users; the plugin is available for teams already working inside Claude Code.

## Version

v1.0.0

## License

MIT
