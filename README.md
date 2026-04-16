# clawsewitz

Senior partner-grade strategy agent for Claude Code, grounded in Clausewitz.

```
         ██                                                      ██   ██
         ██                                                      ██  ████
 ████    ██    ████   ██     ██   █████   ████   ██     ██  ██   ██   █████
██       ██   ██  ██  ██     ██  ██      ██  ██  ██     ██  ██   ██     ██
██       ██   ██████  ██  █  ██   ████   ██████  ██  █  ██  ██   ██    ██
██       ██   ██  ██   ██ █ ██       ██  ██       ██ █ ██   ██   ██   ██
 ████    ██   ██  ██    ██ ██   █████     ████     ██ ██    ██    ██ █████
```

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/robertsinke/clawsewitz/main/scripts/install.sh | bash
```

Requires: `git`, `node` (>=20), `claude` CLI.

## What it does

A self-contained 7-step **Strategy Loop** with MECE rigor, 70 frameworks, and one Clausewitzian lens per stage.

| Stage | Command | Clausewitz Lens | Produces |
|-------|---------|-----------------|----------|
| 1. Define | `cw-define` | Strategy serves policy | 01-define.md — SCQ / HTDQ / Outcome frame |
| 2. Split | `cw-split` | Schwerpunkt | 02-split.md — MECE decomposition tree |
| 3. Analyse | `cw-analyse` | Moral forces | 03-analyse.md — data + qualitative analysis |
| 4. Insight | `cw-insight` | Fog acknowledgement | 04-insight.md — so-whats on page archetypes |
| 5. Story | `cw-story` | Boldness test | 05-story.md — partner-grade narrative |
| 6. Decide | `cw-decide` | Ends-Ways-Means | 06-decide.md — recommendation |
| 7. Act | `cw-act` | Friction + Reserves | 07-act.md — implementation plan |

## Quick start

```
claude
/clawsewitz Acme Design — subscriber decline, 5%/mo for 3 months, need turnaround
```

The agent creates a case workspace, runs the 7-step chain in partner voice, produces deliverables at each stage, and enforces MECE rigor via automated checks.

## Commands

| Command | What it does |
|---------|-------------|
| `/clawsewitz <brief>` | Start or continue a strategic engagement |
| `/cw-case list` | List, resume, or archive case workspaces |
| `/cw-frameworks browse` | Browse the 70-framework catalog |

## What's under the hood

- **10 skills** — 7 rigid chain stages + cw-mece-check, cw-framework-library, cw-framework-critic
- **4 subagents** — research-pod (fact-gathering), framework-critic (MECE review), red-team (adversarial), premortem (failure narrative)
- **8 hooks** — chain-order gate, auto-commit, MECE reminders, analysis-paralysis detection, Friction/Reserves check
- **70 frameworks** — from the Strategist Toolkit: SCQ, HTDQ, Minto Pyramid, Driver Tree, SPADE, Bezos, GTM Stack, Zero-to-One, and 60+ more
- **Clausewitzian structural lenses** — not just quotes; each stage applies a concrete check from *On War*

## License

MIT
