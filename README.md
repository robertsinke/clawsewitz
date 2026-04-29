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
clawsewitz                                         # Interactive strategy session
clawsewitz decompose "Why are customers churning?" # MECE tree with validation
clawsewitz evaluate "Build vs. buy vs. partner"    # Weighted scoring + red team
clawsewitz brief path/to/findings.md               # Answer-first executive brief
clawsewitz plan path/to/recommendation.md          # Roadmap + premortem
clawsewitz audit strategy.md                       # Red-team any plan
clawsewitz research "competitor landscape"         # Competitive intel
clawsewitz doctor                                  # Check installation
```

## What it does

**4 agents + 8 workflows + 9 skills.** Three layers, composed as the situation demands. No orchestrator walking a fixed sequence.

- **Agents** — dispatchable specialists (researcher, analyst, writer, challenger)
- **Workflows** — top-level commands, each a full procedure runnable standalone; the source of truth for how a job gets done
- **Skills** — discoverable capabilities with natural-language triggers; the agent reaches for the right one when your intent matches

In practice: say "help me stress-test this strategy" → agent triggers `red-teaming-plans` skill → runs `/audit` workflow → dispatches `challenger` agent. You can reach any layer directly.

## Workflows

| Command | What it does |
|---------|-------------|
| `/cw-decompose <problem>` | Break a problem into a validated MECE tree |
| `/cw-evaluate <question>` | Score options against criteria and recommend one |
| `/cw-brief <topic>` | Write an executive brief or recommendation memo |
| `/cw-plan <recommendation>` | Build an implementation roadmap with risk register |
| `/cw-audit <path>` | Red-team and premortem an existing plan |
| `/cw-research <query>` | Gather competitive, market, or industry intelligence |
| `/cw-case list` | List, resume, or archive case workspaces |
| `/cw-frameworks browse` | Browse the 70-framework catalog |

## Skills

| Skill | Triggered by |
|-------|--------------|
| `engagement-intake` | A fresh strategic brief that needs triaging before analysis |
| `mece-decomposition` | "Break this apart", "tree this out", "split the problem" |
| `evaluating-options` | "Help me decide", "which should we pick", "weigh these" |
| `writing-briefs` | "Draft a memo", "structure this for the board", "one-pager" |
| `implementation-planning` | "How do we execute", "90-day plan", "roadmap with owners" |
| `red-teaming-plans` | "Poke holes in this", "what could go wrong", "stress-test" |
| `strategic-research` | "Competitive landscape", "market sizing", "benchmarks" |
| `framework-library` | Look up any of 70 frameworks by name |
| `session-search` | Recall prior engagements across cases |

## Agents

| Agent | Role |
|-------|------|
| Researcher | Hunts for evidence across the web, benchmarks, and competitive landscape |
| Analyst | Decomposes problems, applies frameworks, validates MECE integrity |
| Writer | Structures findings into briefs, memos, and slide narratives |
| Challenger | Stress-tests plans, plays adversary, writes the failure narrative |

## What's under the hood

- **4 agents** — Researcher, Analyst, Writer, Challenger
- **8 workflows** — decompose, evaluate, brief, plan, audit, research, case management, framework browsing
- **9 skills** — 7 capability wrappers over the workflows + 2 utility skills (framework library, session search)
- **Enforcement guardrails** — auto-commit, analyst amplification on Fail verdicts, session resume, MECE structural check tool
- **70 frameworks** — from the Strategist Toolkit: SCQ, HTDQ, Minto Pyramid, Driver Tree, SPADE, Bezos, GTM Stack, Zero-to-One, and 60+ more

## Dual Distribution

clawsewitz ships as two distributions:

- **Standalone Pi CLI** (primary) — install via npm or the standalone curl script. Runs `clawsewitz` as a top-level command in any terminal, powered by the Pi runtime.
- **Claude Code plugin** (secondary) — install via the plugin curl script. Adds `/cw-*` commands and the skill library inside Claude Code sessions.

Both distributions share the same agents, workflows, and frameworks. The CLI is the recommended entry point for new users; the plugin is available for teams already working inside Claude Code.

## Version

v1.0.0

## License

MIT
