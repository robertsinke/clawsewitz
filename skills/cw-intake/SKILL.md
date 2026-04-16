---
name: cw-intake
description: First step of the clawsewitz chain. Use at the start of any consulting engagement — whenever /clawsewitz is invoked, when a new brief comes in, or when the user says "let's work through a consulting problem". Sets up the case workspace, collects stakeholder + constraint + success-criteria context, establishes the senior-partner posture.
---

# cw-intake

**Rigid** process skill. First link of the 7-stage Strategy Loop.

## Announce

> "Using cw-intake to triage the brief and open a case workspace."

## GUARDRAILS (load every time)

Read these before writing anything:

1. `../../references/partner-voice.md` — persona and tone
2. `../../references/analyst-discipline.md` — think before acting, simplicity, surgical, goal-driven
3. `../../references/mece.md` — decomposition rubric (you will use this from cw-split onward)

## Checklist

Create a TaskWrite todo per item and complete in order:

1. **Identify the workspace location.**
   - If cwd is a git repo → `docs/clawsewitz/cases/YYYY-MM-DD-<slug>/`
   - Else → `~/.claude/clawsewitz/cases/YYYY-MM-DD-<slug>/`
   - The slug is a hyphenated lowercase summary of the brief (e.g. `acme-subscriber-decline`).
   - Announce the chosen path.
2. **Create the workspace directory** and an empty `CASE.md` inside it containing the brief and an empty "Framework choices log" section.
3. **Ask clarifying questions — one at a time, in this order.** Skip any the user has already answered in the brief.
   1. Who is the real decider for this? (Not necessarily the person speaking with you.)
   2. How does the decider know the engagement succeeded? (Success criteria.)
   3. What is the timeframe for a decision?
   4. What is off-limits — topics, options, or stakeholders?
   5. What accuracy is needed — directional, approximate, or exact? (Drives how heavy Analyse should be.)
   6. What materials has the client already prepared? (Decks, data, PDFs.)
   7. Anything else a seasoned partner should know about the politics or history?
4. **Write `00-intake.md`** using the template at `../../references/deliverables/00-intake.md.tpl`. Fill in the verbatim brief and the user's answers.
5. **Write the "Partner Read" paragraph** — your honest read on what this really is, before the client tells you. One paragraph. Specific, not generic. Push back if the brief seems misframed. This is your *coup d'œil* — name the prior openly so the chain can test it.
6. **Clausewitzian Lens — Trinity stakeholder force-map.** Decompose the stakeholders into three force-types (write to the "Trinity" section of the template):
   - **People / passion** — who feels this change emotionally; what is their will or appetite
   - **Army / chance** — who actually executes; where operational friction and creativity both live
   - **Government / reason** — who approves and funds; whose policy goal this must serve
   If you cannot name a stakeholder for one of the three, that is itself a finding — ask the user. Reference `../../references/clausewitz-concepts.md#the-trinity` on first invocation.
7. **Run the Discipline self-check** on the intake:
   - Are any assumptions hidden? Surface them.
   - Is the question-set the minimum to set the engagement up? Simpler?
   - Is there a more direct intake that would do? Say so.

## HARD-GATE for the next skill

cw-define cannot run until `00-intake.md` exists with the required sections filled.

## Handoff

After writing `00-intake.md`:

> "Intake complete. Invoking `cw-define` next to frame the problem."

Then invoke the `cw-define` skill.

## Edge cases

- **Under-specified brief.** If the user supplied only a one-liner, do not invent context. Ask the 7 questions, one at a time.
- **Over-specified brief.** If the user supplied a 20-page PDF, ingest what you can, extract the 7 answers, and confirm each one with the user before writing the intake.
- **Wrong-question flag.** If you judge the brief is answering the wrong question, say so and propose the real question. Do this before writing the intake — it changes the whole engagement.
