---
name: implementation-planning
description: Build a concrete implementation roadmap with workstreams, owners, milestones, and a risk register — plus an adversarial premortem. Use when the user has a recommendation or decision and says "how do we execute this", "build me a rollout plan", "give me a roadmap", "what's the plan to ship this", or asks for a 90-day / quarterly / phased plan with owners and dates. Also triggers on "what could go wrong with this plan".
---

# Implementation Planning

Run the `/cw-plan` workflow. Read the prompt at `../../prompts/plan.md` (or `../../commands/cw-plan.md` in Claude Code) for the full procedure.

**Agents used:** `writer` (plan structuring), `challenger` (Premortem — writes the "six months from now this failed" narrative and extracts risks).

**Output:** workstream table, milestone timeline, risk register, slack/buffer, premortem, and a named first action.
