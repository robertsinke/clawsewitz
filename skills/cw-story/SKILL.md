---
name: cw-story
description: Sixth step of the clawsewitz chain. Use after cw-insight has produced 04-insight.md to stitch the insights into a structured narrative. Defaults to Minto Pyramid (answer-first). Alternatives: SCQA, Story Spine, 5 Act, StoryBrand. Writes 05-story.md and optional deck.pptx via the pptx skill if available.
---

# cw-story

**Rigid** process skill. Stage 5 of the Strategy Loop. The heart of partner output.

## Announce

> "Using cw-story to construct the narrative."

## HARD-GATE

Do not proceed until `<case>/04-insight.md` exists with insight pages.

## Framework-selection decision tree

| Signal | Framework |
|---|---|
| Exec audience, written recommendation, answer-first | **Minto Pyramid** (default) |
| Full problem-solving arc | **SCQA** |
| Retrospective / case study | **Story Spine** (Pixar) |
| Pitch / marketing | **5 Act** |
| Brand / customer-facing | **StoryBrand** |

**Default to Minto.** Only override for specific audience signals (pitch = 5 Act; case study = Story Spine).

## Process

1. **Read** `<case>/04-insight.md`.
2. **Write the governing thought** — a single sentence that **is** the recommendation. If you cannot write it in one sentence, the story is not ready.
3. **Clausewitzian Lens — Boldness test.** Before locking the governing thought, ask: *could a thoughtful reader say "no, I would do X instead"?* If no one could disagree, it is consensus dressed as a conclusion — not a recommendation. Rewrite until a specific counter-move would be a reasonable alternative. Reference `../../references/clausewitz-concepts.md#boldness-k-hnheit`. Record the would-be alternative in CASE.md as a sanity marker.
4. **Build the 3-argument structure.** Each argument supports the governing thought. Each has 2 pieces of evidence.
5. **State horizontal logic** — "parts of a whole" (each argument is a distinct reason) or "in sequence" (each argument builds on the prior).
6. **State vertical logic** — each layer answers the question the layer above raises. *"Why is that?"* → next-level evidence answers it.
7. **Run MECE self-check on the arguments.** Triggers `cw-mece-check` via the post-tool-use hook — but do not wait for the hook to catch you. Run it in your head first.
8. **Write** `<case>/05-story.md` using the template at `../../references/deliverables/05-story.md.tpl`.
9. **If the `pptx` skill is available**, invoke it to produce `<case>/deck.pptx` with:
   - Title slide (governing thought)
   - Three argument slides
   - Supporting insight pages (embed HTML-rendered layouts where applicable)
   If unavailable, print: *"Install the `pptx` skill to generate a partner-ready deck."*

## Discipline self-check

- Simpler: can the story be told in 3 slides? 5? Cut ruthlessly.
- Surgical: do not rewrite analyses from Story.
- Goal: a reader of only the governing thought + 3 argument headlines understands the recommendation. If not, rewrite.

## Loop-back rule

If building the story reveals a logic gap, go back to `cw-analyse` or `cw-insight`. Do **not** paper over a gap with rhetoric. Partners notice.

## HARD-GATE for the next skill

cw-decide cannot run until `05-story.md` exists with a governing thought and supporting arguments.

## Handoff

> "Story complete. Governing thought: <one sentence>. Invoking `cw-decide` next."

Then invoke `cw-decide`.
