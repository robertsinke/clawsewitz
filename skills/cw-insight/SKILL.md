---
name: cw-insight
description: Fifth step of the clawsewitz chain. Use after cw-analyse has produced 03-analyse.md to mount each so-what on the right page archetype (Tabular, One-Pager, Canvas, Matrix 2×2, 3×3, Positioning Map, Journey Map, Capability Map, Chevron, Gantt, etc.). Writes 04-insight.md and optional HTML artefacts.
---

# cw-insight

**Rigid** process skill. Stage 4 of the Strategy Loop. Converts "so whats" into structured, partner-ready pages.

## Announce

> "Using cw-insight to structure the takeaways."

## HARD-GATE

Do not proceed until `<case>/03-analyse.md` exists with a "so what" per analysis.

## Framework-selection router (page archetype)

Consult `../../references/framework-selection.md` section "Stage 4 — Insight". A shortened guide:

| Signal | Layout |
|---|---|
| Mixed set of grouped takeaways | **Tabular** |
| One-page strategy summary | **One-Pager** |
| Operating-model snapshot | **Canvas (BMC)** |
| Three parallel points | **Tri-Column** |
| Phased approach | **Chevron** |
| Long-horizon | **Horizon** |
| Levers → drivers → comment | **Driver Tree (insight form)** |
| 2-D option plotting | **Matrix 2×2** |
| Segment prioritisation | **3×3** |
| Current vs. target | **Continuum** / **From:To** |
| Market / competitive position | **Positioning Map** |
| Experience design | **Journey Map** / **Touchpoint** |
| Capability readiness | **Capability Map** |
| Chart + takeaway | **Graph** |

Bias: **fewer, sharper pages beat more, softer pages.** Aim for 3–5 insight pages for a full engagement, not 15.

## Process

1. **Read** `<case>/03-analyse.md`.
2. **Group the "so whats"** into a minimum set of governing statements. Each governing statement becomes a page.
3. **Pick the page archetype** per governing statement. Record in `<case>/CASE.md`.
4. **Write the page body in markdown** inside `04-insight.md` using the template at `../../references/deliverables/04-insight.md.tpl`.
5. **Generate HTML artefact (optional but recommended for visual layouts).** For Canvas, One-Pager, Matrix 2×2, 3×3, Positioning Map, Journey Map, Capability Map:
   - Copy the template from `../../references/html-templates/<layout>.html` to `<case>/insight/<slug>.html`.
   - Replace each `{{TOKEN}}` placeholder using the `Edit` tool. Do not invent tokens — only replace the ones present.
   - If the user prefers a different layout, ask before proceeding.
6. **If the `pptx` skill is available**, offer to generate a slide per insight page for inclusion in the final deck at cw-story. If not, print a one-line install prompt.

## Clausewitzian Lens — Fog acknowledgement

For every insight page, write a one-line **"Fog — what we do not know that could change this"** entry. Not a caveat dump, not a CYA disclaimer — a disciplined naming of the 1–2 unknowns that would flip the takeaway if they resolved the other way. Reference `../../references/clausewitz-concepts.md#fog-of-war`.

A page without a fog line is either overconfident or under-examined. Both are partner-grade failures.

## Loop-back rule

If, while building insights, you realise you are missing an analysis to support a governing statement, **go back to `cw-analyse`**, add the analysis, then return. This is expected; do not force a weak insight.

## Discipline self-check

- Simpler: could one insight page replace two?
- Surgical: do not rewrite `03-analyse.md` from Insight.
- Goal: each page has a headline that a busy exec could read in 10 seconds and get the message.

## HARD-GATE for the next skill

cw-story cannot run until `04-insight.md` exists with page archetypes chosen and populated.

## Handoff

> "Insight pages complete (<N> pages). Invoking `cw-story` next to construct the narrative."

Then invoke `cw-story`.
