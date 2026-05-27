---
name: red-teaming-plans
description: Stress-test any existing plan, strategy, or recommendation through adversarial Red Team plus Premortem. Use when the user says "poke holes in this", "red team this plan", "what could go wrong", "audit this strategy", "stress-test this", "find weaknesses", or points at a plan/memo/deck and wants an adversarial review. Works on any document with a recommendation — not just case files.
---

# Red-Teaming Plans

Run the `/cw-audit` workflow. Read the prompt at `../../prompts/audit.md` (or `../../commands/cw-audit.md` in Claude Code) for the full procedure.

**Agents used:** `challenger` in both modes (Red Team adversary + Premortem failure narrative).

**Output:** Red Team review (adversary posture, where it breaks, how they'd exploit, signal of losing), Premortem (failure narrative + risk register + plan additions), and a summary verdict naming the single biggest vulnerability.
