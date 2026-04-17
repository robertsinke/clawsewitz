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

VERSION="1.0.0"

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
  printf "${DIM}  The open source AI strategy agent${RESET}\n"
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

semver_gte() {
  # Returns 0 (true) if version $1 >= $2, where both are "major.minor.patch"
  local IFS='.'
  local v1=($1) v2=($2)
  local maj1="${v1[0]:-0}" min1="${v1[1]:-0}" pat1="${v1[2]:-0}"
  local maj2="${v2[0]:-0}" min2="${v2[1]:-0}" pat2="${v2[2]:-0}"
  if [ "$maj1" -gt "$maj2" ]; then return 0; fi
  if [ "$maj1" -lt "$maj2" ]; then return 1; fi
  if [ "$min1" -gt "$min2" ]; then return 0; fi
  if [ "$min1" -lt "$min2" ]; then return 1; fi
  if [ "$pat1" -ge "$pat2" ]; then return 0; fi
  return 1
}

splash

printf "${BOLD}Checking prerequisites...${RESET}\n"
ok=true
check "node (>=20.19.0)" "node" || ok=false
check "npm" "npm" || ok=false

if [ "$ok" = false ]; then
  printf "\n${RED}Missing prerequisites. Install them and re-run.${RESET}\n"
  exit 1
fi

node_ver=$(node -v | sed 's/^v//')
if ! semver_gte "$node_ver" "20.19.0"; then
  printf "\n${RED}Node.js >=20.19.0 required (found v%s).${RESET}\n" "$node_ver"
  exit 1
fi
printf "  ${GREEN}✓${RESET} node v%s\n" "$node_ver"

printf "\n${BOLD}Installing clawsewitz...${RESET}\n"

npm install -g clawsewitz

printf "  ${GREEN}✓${RESET} clawsewitz installed\n"

printf "\n${BOLD}Verifying installation...${RESET}\n"
clawsewitz doctor

printf "\n${GREEN}${BOLD}✓ clawsewitz v%s installed.${RESET}\n\n" "$VERSION"
printf "  Start a strategy session:\n"
printf "    ${PRUSSIAN}clawsewitz${RESET}\n"
printf "    ${PRUSSIAN}clawsewitz \"Acme — subscriber decline\"${RESET}\n\n"
printf "  Run a standalone workflow:\n"
printf "    ${PRUSSIAN}clawsewitz decompose \"Why are customers churning?\"${RESET}\n\n"
