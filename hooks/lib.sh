#!/usr/bin/env bash
# Shared helpers for clawsewitz hooks.
# Sourced by the per-event scripts. All functions are no-ops when no case
# workspace is in scope so hooks stay inert for unrelated Claude Code work.

# Known case-workspace locations (newline-separated). Project-local first; user-global second.
mc_case_roots() {
  if [ -d "$(pwd)/docs/clawsewitz/cases" ]; then
    printf '%s\n' "$(pwd)/docs/clawsewitz/cases"
  fi
  if [ -d "${HOME}/.claude/clawsewitz/cases" ]; then
    printf '%s\n' "${HOME}/.claude/clawsewitz/cases"
  fi
}

# Return the most recently modified CASE.md across known roots (or empty).
# Bash 3.2 compatible — no mapfile, no associative arrays.
mc_find_active_case() {
  local roots r files=""
  roots=$(mc_case_roots)
  [ -z "$roots" ] && return 0
  while IFS= read -r r; do
    [ -z "$r" ] && continue
    local found
    found=$(find "$r" -maxdepth 2 -name CASE.md -type f 2>/dev/null)
    if [ -n "$found" ]; then
      files="${files}${files:+$'\n'}${found}"
    fi
  done <<EOF
$roots
EOF
  [ -z "$files" ] && return 0
  # Sort by mtime desc using stat (macOS).
  printf '%s\n' "$files" \
    | while IFS= read -r f; do
        [ -n "$f" ] && printf '%s %s\n' "$(stat -f '%m' "$f" 2>/dev/null)" "$f"
      done \
    | sort -rn \
    | head -n1 \
    | cut -d' ' -f2-
}

# Return 0 if a path is inside any known case workspace; 1 otherwise.
mc_is_case_path() {
  local path="$1"
  [ -z "$path" ] && return 1
  case "$path" in
    */docs/clawsewitz/cases/*) return 0 ;;
    *"${HOME}"/.claude/clawsewitz/cases/*) return 0 ;;
    */.claude/clawsewitz/cases/*) return 0 ;;
  esac
  return 1
}

# Extract stage number from filename like `02-split.md`. Echoes the number, or "".
mc_stage_of() {
  local path="$1"
  local base
  base=$(basename "$path")
  if [[ "$base" =~ ^([0-9]{2})- ]]; then
    printf '%s' "${BASH_REMATCH[1]}"
  fi
}

# Return case-workspace dir containing the given file (or empty).
mc_case_dir_of() {
  local path="$1"
  mc_is_case_path "$path" || return 0
  local dir
  dir="$(dirname "$path")"
  # Walk up until we find a CASE.md or hit the filesystem root.
  while [ "$dir" != "/" ] && [ -n "$dir" ]; do
    [ -f "$dir/CASE.md" ] && { printf '%s' "$dir"; return; }
    dir="$(dirname "$dir")"
  done
}

# Escape for JSON embedding.
mc_json_escape() {
  local s="$1"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  s="${s//$'\n'/\\n}"
  s="${s//$'\r'/\\r}"
  s="${s//$'\t'/\\t}"
  printf '%s' "$s"
}

# Emit a hookSpecificOutput JSON with additionalContext.
mc_emit_context() {
  local event="$1" text="$2"
  local esc
  esc=$(mc_json_escape "$text")
  printf '{"hookSpecificOutput":{"hookEventName":"%s","additionalContext":"%s"}}\n' \
    "$event" "$esc"
}
