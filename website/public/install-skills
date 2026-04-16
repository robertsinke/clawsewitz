#!/usr/bin/env bash
set -euo pipefail

PRUSSIAN='\033[38;2;30;58;95m'
PRUSSIAN_DARK='\033[38;2;19;40;70m'
DIM='\033[2m'
BOLD='\033[1m'
GREEN='\033[32m'
YELLOW='\033[33m'
RED='\033[31m'
RESET='\033[0m'

VERSION="0.4.0"
REPO="https://github.com/robertsinke/clawsewitz"
PLUGIN_DIR="${HOME}/.claude/plugins/local/clawsewitz-skills"

splash() {
  printf '\n'
  printf "${PRUSSIAN}"
  printf '         ██                                                      ██   ██\n'
  printf '         ██                                                      ██  ████\n'
  printf ' ████    ██    ████   ██     ██   █████   ████   ██     ██  ██   ██   █████\n'
  printf '██       ██   ██  ██  ██     ██  ██      ██  ██  ██     ██  ██   ██     ██\n'
  printf '██       ██   ██████  ██  █  ██   ████   ██████  ██  █  ██  ██   ██    ██\n'
  printf '██       ██   ██  ██   ██ █ ██       ██  ██       ██ █ ██   ██   ██   ██\n'
  printf ' ████    ██   ██  ██    ██ ██   █████     ████     ██ ██    ██    ██ █████\n'
  printf "${RESET}\n"
  printf "${DIM}  Skills-only bundle — 70 frameworks & strategy stage skills${RESET}\n"
  printf "${DIM}  v%s · MIT · github.com/robertsinke/clawsewitz${RESET}\n\n" "$VERSION"
}

check() {
  local name="$1" cmd="$2"
  if command -v "$cmd" >/dev/null 2>&1; then
    printf "  ${GREEN}✓${RESET} %s\n" "$name"
    return 0
  else
    printf "  ${RED}✗${RESET} %s ${DIM}(not found)${RESET}\n" "$name"
    return 1
  fi
}

splash

printf "${BOLD}Checking prerequisites...${RESET}\n"
ok=true
check "git" "git" || ok=false
check "claude CLI" "claude" || ok=false

if [ "$ok" = false ]; then
  printf "\n${RED}Missing prerequisites. Install them and re-run.${RESET}\n"
  exit 1
fi

printf "\n${BOLD}Installing clawsewitz skills-only bundle...${RESET}\n"

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

printf "  Cloning repository...\n"
git clone --depth 1 "$REPO" "$TMPDIR/clawsewitz" 2>/dev/null

if [ -d "$PLUGIN_DIR" ]; then
  printf "  ${YELLOW}Existing installation found. Backing up...${RESET}\n"
  mv "$PLUGIN_DIR" "${PLUGIN_DIR}.bak.$(date +%s)"
fi

mkdir -p "$PLUGIN_DIR/.claude-plugin"

cp -r "$TMPDIR/clawsewitz/skills" "$PLUGIN_DIR/skills"
printf "  ${GREEN}✓${RESET} Skills copied\n"

cp -r "$TMPDIR/clawsewitz/references" "$PLUGIN_DIR/references"
printf "  ${GREEN}✓${RESET} References copied\n"

cat > "$PLUGIN_DIR/.claude-plugin/plugin.json" <<PLUGINJSON
{
  "name": "clawsewitz-skills",
  "description": "Clawsewitz skills-only bundle — 70 frameworks and strategy stage skills without agents, commands, or hooks.",
  "version": "${VERSION}",
  "author": {
    "name": "Robert Sinke"
  },
  "license": "MIT",
  "keywords": [
    "strategy",
    "consulting",
    "frameworks",
    "skills"
  ]
}
PLUGINJSON

cat > "$PLUGIN_DIR/.claude-plugin/marketplace.json" <<MARKETJSON
{
  "name": "clawsewitz-skills-local",
  "metadata": {
    "description": "Local marketplace hosting the clawsewitz-skills plugin"
  },
  "owner": {
    "name": "Robert Sinke"
  },
  "plugins": [
    {
      "name": "clawsewitz-skills",
      "description": "Clawsewitz skills-only bundle — 70 frameworks and strategy stage skills without agents, commands, or hooks.",
      "version": "${VERSION}",
      "source": "./",
      "author": {
        "name": "Robert Sinke"
      }
    }
  ]
}
MARKETJSON
printf "  ${GREEN}✓${RESET} Plugin metadata created\n"

printf "\n${BOLD}Registering with Claude Code...${RESET}\n"

if claude plugin marketplace add "$PLUGIN_DIR" >/dev/null 2>&1; then
  printf "  ${GREEN}✓${RESET} Marketplace registered\n"
else
  printf "  ${DIM}Marketplace already registered${RESET}\n"
fi

if claude plugin install clawsewitz-skills@clawsewitz-skills-local >/dev/null 2>&1; then
  printf "  ${GREEN}✓${RESET} Plugin installed\n"
else
  printf "  ${DIM}Plugin already installed${RESET}\n"
fi

printf "\n${GREEN}${BOLD}✓ clawsewitz-skills v%s installed.${RESET}\n\n" "$VERSION"
printf "  Browse frameworks:\n"
printf "    ${PRUSSIAN}claude${RESET}\n"
printf "    ${PRUSSIAN}/cw-frameworks browse${RESET}\n\n"
printf "  Want the full agent? Run:\n"
printf "    ${PRUSSIAN}curl -fsSL https://clawsewitz.com/install | bash${RESET}\n\n"
