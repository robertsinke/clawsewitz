#!/usr/bin/env bash
# SubagentStop hook — amplify cw-framework-critic verdicts that flag problems.
# Scans the subagent's final message for failure keywords and raises a banner.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/lib.sh"

payload=$(cat 2>/dev/null || true)
[ -z "$payload" ] && exit 0

# Parse subagent name and last message.
parsed=$(printf '%s' "$payload" \
  | python3 -c 'import json,sys
try:
  d=json.load(sys.stdin)
  name=d.get("agent") or d.get("subagent_type") or d.get("name") or ""
  # The harness includes the subagent result in various shapes; try common ones.
  msg=d.get("result","") or d.get("message","") or ""
  if isinstance(msg,dict):
    msg=msg.get("text","") or msg.get("content","")
  print(f"{name}\t{msg[:4000]}")
except Exception:
  pass' 2>/dev/null || true)

name="${parsed%%$'\t'*}"
msg="${parsed#*$'\t'}"

# Only care about the framework critic.
case "$name" in
  cw-framework-critic|*framework-critic*) : ;;
  *) exit 0 ;;
esac

# Case-insensitive check for failure keywords.
shopt -s nocasematch
hit=0
for needle in "would i ship this? no" "no — redraw" "no - redraw" "**verdict:** fail" "verdict: fail" "correct? no"; do
  if [[ "$msg" == *"$needle"* ]]; then hit=1; break; fi
done
shopt -u nocasematch

[ "$hit" -eq 0 ] && exit 0

banner="⚠️  cw-framework-critic flagged this stage. Do NOT proceed to the next stage until the flagged issue is addressed. Re-read the critic's 'Weakest link' and 'Would I ship this?' sections, redraw, and re-invoke the critic before handoff."
mc_emit_context "SubagentStop" "$banner"
exit 0
