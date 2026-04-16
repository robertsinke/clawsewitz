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
PLUGIN_DIR="${HOME}/.claude/plugins/local/clawsewitz"

splash() {
  printf '\n'
  printf "${PRUSSIAN}"
  printf '         ███                                                           ███   ███\n'
  printf '         ███                                                                 ███\n'
  printf '  █████  ███   ███████   ███      ███  ███████    █████  ███      ███  ███  █████  ███████\n'
  printf '███      ███  ███   ███  ███      ███  ███      ███      ███      ███  ███   ███      ███\n'
  printf '███      ███  █████████  ███ ████ ███   █████   ███████  ███ ████ ███  ███   ███     ███\n'
  printf '███      ███  ███   ███   ███ ██ ███       ███  ███       ███ ██ ███   ███   ███    ███\n'
  printf '  █████  ███  ███   ███    ███  ███    ███████    █████    ███  ███    ███    ███  ███████\n'
  printf "${RESET}\n"
  printf "${DIM}  The open source AI strategy agent for Claude Code${RESET}\n"
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
check "node (>=20)" "node" || ok=false
check "claude CLI" "claude" || ok=false

if [ "$ok" = false ]; then
  printf "\n${RED}Missing prerequisites. Install them and re-run.${RESET}\n"
  exit 1
fi

node_version=$(node -v | sed 's/^v//' | cut -d. -f1)
if [ "$node_version" -lt 20 ]; then
  printf "\n${RED}Node.js >=20 required (found v%s).${RESET}\n" "$(node -v)"
  exit 1
fi

printf "\n${BOLD}Installing clawsewitz...${RESET}\n"

if [ -d "$PLUGIN_DIR/.git" ]; then
  printf "  Updating existing installation...\n"
  git -C "$PLUGIN_DIR" pull --ff-only 2>/dev/null || {
    printf "  ${YELLOW}Pull failed — re-cloning...${RESET}\n"
    rm -rf "$PLUGIN_DIR"
    git clone --depth 1 "$REPO" "$PLUGIN_DIR"
  }
else
  if [ -d "$PLUGIN_DIR" ]; then
    printf "  ${YELLOW}Existing directory found (not a git repo). Backing up...${RESET}\n"
    mv "$PLUGIN_DIR" "${PLUGIN_DIR}.bak.$(date +%s)"
  fi
  mkdir -p "$(dirname "$PLUGIN_DIR")"
  git clone --depth 1 "$REPO" "$PLUGIN_DIR"
fi

printf "  ${GREEN}✓${RESET} Plugin sources installed\n"

printf "\n${BOLD}Registering with Claude Code...${RESET}\n"

if claude plugin marketplace add "$PLUGIN_DIR" >/dev/null 2>&1; then
  printf "  ${GREEN}✓${RESET} Marketplace registered\n"
else
  printf "  ${DIM}Marketplace already registered${RESET}\n"
fi

if claude plugin install clawsewitz@clawsewitz-local >/dev/null 2>&1; then
  printf "  ${GREEN}✓${RESET} Plugin installed\n"
else
  printf "  ${DIM}Plugin already installed${RESET}\n"
fi

printf "\n${GREEN}${BOLD}✓ clawsewitz v%s installed.${RESET}\n\n" "$VERSION"
printf "  Start an engagement:\n"
printf "    ${PRUSSIAN}claude${RESET}\n"
printf "    ${PRUSSIAN}/clawsewitz${RESET} Acme — subscriber decline, 5%%/mo, need turnaround\n\n"
printf "  Browse frameworks:\n"
printf "    ${PRUSSIAN}/cw-frameworks browse${RESET}\n\n"
