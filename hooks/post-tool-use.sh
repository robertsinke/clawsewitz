#!/usr/bin/env bash
# PostToolUse hook — on Write/Edit in a case workspace:
#   - auto-commit to git if inside a repo
#   - inject a reminder to run cw-mece-check for stages 02 and 05
# Reads the tool invocation payload from stdin.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/lib.sh"

payload=$(cat 2>/dev/null || true)
[ -z "$payload" ] && exit 0

path=$(printf '%s' "$payload" \
  | python3 -c 'import json,sys
try:
  d=json.load(sys.stdin)
  ti=d.get("tool_input") or d.get("toolInput") or {}
  print(ti.get("file_path","") or ti.get("filePath",""))
except Exception:
  pass' 2>/dev/null || true)

mc_is_case_path "$path" || exit 0
[ ! -f "$path" ] && exit 0

# 1. Auto-commit if inside a git repo.
case_dir=$(mc_case_dir_of "$path")
if [ -n "$case_dir" ]; then
  repo_top=$(git -C "$case_dir" rev-parse --show-toplevel 2>/dev/null || true)
  if [ -n "$repo_top" ]; then
    stage=$(mc_stage_of "$path")
    slug=$(basename "$case_dir")
    label="stage-${stage:-x}"
    msg="mc(${slug}): ${label} $(basename "$path")"
    (
      cd "$repo_top"
      git add "$path" >/dev/null 2>&1 || true
      # Commit only if there is something to commit for this path.
      if ! git diff --cached --quiet -- "$path" 2>/dev/null; then
        git commit -m "$msg" -- "$path" >/dev/null 2>&1 || true
      fi
    )
  fi
fi

# 2. Reminder to run cw-mece-check for stage 02 (split) and stage 05 (story).
stage=$(mc_stage_of "$path")
if [ "$stage" = "02" ] || [ "$stage" = "05" ]; then
  what="split"; [ "$stage" = "05" ] && what="story"
  reminder="📎 clawsewitz: ${path} was just written. Run the \`cw-mece-check\` skill on this ${what} artefact and append its verdict before handing off to the next stage."
  mc_emit_context "PostToolUse" "$reminder"
fi

# 3. Act-stage Clausewitzian check: Friction register + Reserves must be present.
base=$(basename "$path")
if [ "$base" = "07-act.md" ]; then
  missing=""
  grep -qiE '^#+[[:space:]]*Friction register' "$path" 2>/dev/null || missing="Friction register"
  if ! grep -qiE '^#+[[:space:]]*Reserves' "$path" 2>/dev/null; then
    [ -z "$missing" ] && missing="Reserves" || missing="${missing}, Reserves"
  fi
  if [ -n "$missing" ]; then
    banner="⚠️  clawsewitz: 07-act.md is missing heading(s): ${missing}. Clausewitz says a plan without these is shipped against its author. Populate the section(s) before closing the case."
    mc_emit_context "PostToolUse" "$banner"
  fi
fi

exit 0
