#!/usr/bin/env bash
# PreToolUse hook — chain-order enforcement on case workspace writes.
# Blocks a Write/Edit to stage N when stage N-1 artefact is missing.
# Reads the tool invocation payload from stdin as JSON.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/lib.sh"

# Capture event JSON from stdin without failing if empty.
payload=$(cat 2>/dev/null || true)
[ -z "$payload" ] && exit 0

# Extract the file_path from the tool input. Claude Code passes
# { "tool_input": { "file_path": "..." } } for Write and Edit.
# Parse without jq for zero dependencies.
path=$(printf '%s' "$payload" \
  | python3 -c 'import json,sys
try:
  d=json.load(sys.stdin)
  ti=d.get("tool_input") or d.get("toolInput") or {}
  print(ti.get("file_path","") or ti.get("filePath",""))
except Exception:
  pass' 2>/dev/null || true)

mc_is_case_path "$path" || exit 0

stage=$(mc_stage_of "$path")
[ -z "$stage" ] && exit 0

case_dir=$(mc_case_dir_of "$path")
[ -z "$case_dir" ] && exit 0

# Determine required predecessor stage and its expected filename pattern.
prev=$(printf '%02d' "$((10#$stage - 1))")
# Stage 00 has no predecessor.
[ "$stage" = "00" ] && exit 0

if ! ls "${case_dir}/${prev}-"*.md >/dev/null 2>&1; then
  reason="Chain gate: cannot write stage ${stage} before stage ${prev} artefact exists in ${case_dir}. Invoke the appropriate mc- skill for stage ${prev} first, or remove the prefix to write a non-stage file."
  # Block via permissionDecision for Claude Code.
  esc=$(mc_json_escape "$reason")
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"%s"}}\n' "$esc"
  exit 0
fi

exit 0
