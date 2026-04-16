#!/usr/bin/env bash
# SessionStart hook — surface any open case workspace so the user can resume.
# Silent when no case is open.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/lib.sh"

active=$(mc_find_active_case || true)
if [ -z "$active" ]; then
  exit 0
fi

case_dir=$(dirname "$active")
slug=$(basename "$case_dir")

# Identify current stage: the highest-numbered NN-*.md file written.
latest_stage=$(ls "$case_dir"/[0-9][0-9]-*.md 2>/dev/null \
  | sed -E 's|.*/([0-9]{2})-.*|\1|' \
  | sort -n \
  | tail -n1 \
  || true)
[ -z "$latest_stage" ] && latest_stage="--"

# Map stage number to next suggested skill.
case "$latest_stage" in
  00) next="cw-define" ;;
  01) next="cw-split" ;;
  02) next="cw-analyse" ;;
  03) next="cw-insight" ;;
  04) next="cw-story" ;;
  05) next="cw-decide" ;;
  06) next="cw-act" ;;
  07) next="cw-act (complete)" ;;
  *)  next="cw-intake" ;;
esac

banner="📋 Open clawsewitz case: \`${slug}\` — last stage ${latest_stage}. Next: ${next}. Resume with \`/cw-case resume ${slug}\`."
mc_emit_context "SessionStart" "$banner"
exit 0
