---
title: Installation
description: How to install clawsewitz as a Claude Code plugin.
---

## Prerequisites

- **git** — to clone the plugin
- **Node.js** >= 20 — required by Claude Code
- **Claude Code** CLI — [install from Anthropic](https://claude.ai/claude-code)

## One-line install

```bash
curl -fsSL https://raw.githubusercontent.com/robertsinke/clawsewitz/main/scripts/install.sh | bash
```

This will:
1. Clone the repo to `~/.claude/plugins/local/clawsewitz/`
2. Register the local marketplace with Claude Code
3. Install and enable the plugin

## Manual install

If you prefer to install manually:

```bash
# Clone the plugin
git clone --depth 1 https://github.com/robertsinke/clawsewitz \
  ~/.claude/plugins/local/clawsewitz

# Register with Claude Code
claude plugin marketplace add ~/.claude/plugins/local/clawsewitz
claude plugin install clawsewitz@clawsewitz-local
```

## Verify

```bash
claude plugin list | grep clawsewitz
```

You should see:

```
clawsewitz@clawsewitz-local  Version: 0.3.0  Status: ✔ enabled
```

## Update

Re-run the install script or pull manually:

```bash
cd ~/.claude/plugins/local/clawsewitz && git pull
claude plugin update clawsewitz@clawsewitz-local
```

## Quick start

Once installed, open Claude Code and start an engagement:

```
/clawsewitz Acme Design — subscriber decline, 5%/mo for 3 months, need turnaround
```

The agent creates a case workspace, runs the 7-step chain in partner voice, and produces deliverables at each stage.
