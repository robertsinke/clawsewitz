---
name: cw-mece-check
description: Independent MECE validator for a decomposition tree or Minto argument structure. Use after cw-split produces a tree, after cw-story produces a Minto pyramid, or any time the user asks to check a decomposition for Mutually-Exclusive / Collectively-Exhaustive quality.
---

# cw-mece-check

Rigid process skill. Run this as an independent second pass — do **not** let the author of the tree also play critic.

## What this skill does

Given a tree (driver / bucket / hypothesis / Minto), return a MECE verdict: pass / pass-with-notes / fail, with specific overlap pairs named and specific gaps named.

## Process (follow exactly)

1. **Read** the artefact being checked:
   - For splits: `<case>/02-split.md`
   - For stories: `<case>/05-story.md`
2. **Read** the rubric at `../../references/mece.md` within this plugin.
3. **Extract** the leaf elements of the tree. For a Minto pyramid, the "tree" is the top-level arguments.
4. **ME test** — walk each pair (i, j). Ask: can a real item belong to both? Name each overlap pair explicitly: *"Branch A and Branch B overlap on X."*
5. **CE test** — name the universe being decomposed (e.g. "all revenue", "all reasons subscribers churn", "all options for the recommendation"). Ask: is there a real item that belongs in the universe but is not captured? Name each gap explicitly: *"Missing: Y."*
6. **Dimension check** — does the split use one consistent dimension, or does it mix (e.g. size + geography)? Flag mixed dimensions.
7. **Verdict**:
   - **Pass** — no overlaps, no gaps, consistent dimension.
   - **Pass-with-notes** — minor overlaps or gaps explicitly acknowledged and scoped.
   - **Fail** — material overlap / gap / dimension-mix that changes the recommendation.
8. **Write** the verdict block to append to the source file under a heading `## cw-mece-check verdict — <date>`. Include the verdict, the specific overlap/gap list, and a one-sentence recommendation if **Fail**.

## Output template

```
## cw-mece-check verdict — <ISO date>

**Verdict:** <Pass | Pass-with-notes | Fail>

**Mutually Exclusive:**
- Pair (A, B): <observation>
- ...

**Collectively Exhaustive:**
- Universe: <what the tree decomposes>
- Gaps: <list or "none">

**Dimension:** <single / mixed>

**Recommended action:** <if Fail, what to redraw>
```

## Do not

- Do not rewrite the tree. This is a **check**, not a fix. If Fail, return control with a clear recommendation.
- Do not soften the verdict to be polite. A non-MECE tree leads to a wrong recommendation; the partner would call that out plainly.

## Handoff

Return the verdict. The invoking stage skill decides whether to proceed or redraw.
