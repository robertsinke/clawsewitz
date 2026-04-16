#!/usr/bin/env bash
# PreCompact hook — before context compaction, dump the active case's CASE.md
# so stage/framework/decision state survives the compaction.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
source "${SCRIPT_DIR}/lib.sh"

active=$(mc_find_active_case || true)
[ -z "$active" ] && exit 0

content=$(cat "$active" 2>/dev/null || true)
[ -z "$content" ] && exit 0

# Trim very long CASE.md content to keep the compaction payload bounded.
# Keep up to the first 4000 characters.
content="${content:0:4000}"

preamble="🧠 clawsewitz · case-state preserved across compaction. Active CASE.md contents follow:\n\n"
mc_emit_context "PreCompact" "${preamble}${content}"
exit 0
