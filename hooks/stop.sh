#!/usr/bin/env bash
# Stop hook — end-of-turn housekeeping for an active case:
#   - append a session snapshot to CASE.md
#   - detect analysis-paralysis (many cw-analyse writes without cw-insight)
# Operates silently when no case is active.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/lib.sh"

active=$(mc_find_active_case || true)
[ -z "$active" ] && exit 0
case_dir=$(dirname "$active")

# Gather the files touched in the last ~1 hour inside this case.
# (macOS `find -mmin` is supported.)
touched=$(find "$case_dir" -maxdepth 2 -type f -name '*.md' -mmin -60 2>/dev/null \
  | xargs -I{} basename {} 2>/dev/null \
  | sort -u \
  | paste -sd ',' -)

[ -z "$touched" ] && exit 0

# Append a one-line snapshot to CASE.md.
ts=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
{
  printf '\n- %s — touched: %s\n' "$ts" "$touched"
} >> "$active"

# Analysis-paralysis detection: more than 3 writes under 03-analyse/ in the
# last 60 min without any write to 04-insight.md.
analyse_hits=$(find "$case_dir" -maxdepth 2 -type f \( -name '03-analyse*.md' -o -path '*/03-analyse/*' \) -mmin -60 2>/dev/null | wc -l | tr -d ' ')
insight_hit=$(find "$case_dir" -maxdepth 2 -type f -name '04-insight*.md' -mmin -60 2>/dev/null | wc -l | tr -d ' ')

if [ "${analyse_hits:-0}" -gt 3 ] && [ "${insight_hit:-0}" -eq 0 ]; then
  banner="🧭 clawsewitz: you are past the *culminating point of analysis* (Clausewitz). ${analyse_hits} analyse-stage writes this session without an insight step — the next analysis will not change the recommendation. Invoke \`cw-insight\` to synthesise."
  mc_emit_context "Stop" "$banner"
fi

exit 0
