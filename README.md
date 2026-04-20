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

**4 specialist agents + 9 workflows.** Workflows compose agents directly — no phase chain, no stage skills. The full orchestrator (`/clawsewitz`) runs the engagement end-to-end by sequencing the agents inline; standalone workflows reach one or two agents for narrower jobs.

Case artefacts are named for the job they do — `intake.md`, `decomposition.md`, `analysis.md`, `insights.md`, `brief.md`, `recommendation.md`, `plan.md` — not for a phase number.

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

- **4 agents** — Researcher (fact-gathering), Analyst (framework review + MECE validation), Writer (narratives + plans), Challenger (Red Team + premortem)
- **9 workflows** — full engagement, decompose, brief, audit, evaluate, research, plan, case management, framework browsing
- **2 utility skills** — cw-framework-library (70-framework catalog lookup), session-search (cross-engagement recall)
- **Enforcement guardrails** — auto-commit, analyst amplification on Fail verdicts, session resume, MECE structural check tool
- **70 frameworks** — from the Strategist Toolkit: SCQ, HTDQ, Minto Pyramid, Driver Tree, SPADE, Bezos, GTM Stack, Zero-to-One, and 60+ more

## Dual Distribution

clawsewitz ships as two distributions:

- **Standalone Pi CLI** (primary) — install via npm or the standalone curl script. Runs `clawsewitz` as a top-level command in any terminal, powered by the Pi runtime.
- **Claude Code plugin** (secondary) — install via the plugin curl script. Adds `/clawsewitz` and `/cw-*` commands inside Claude Code sessions.

Both distributions share the same agents, workflows, and frameworks. The CLI is the recommended entry point for new users; the plugin is available for teams already working inside Claude Code.

## Version

v1.0.0

## License

MIT
