---
description: Write an executive brief or recommendation memo from raw inputs. Structures findings into answer-first narrative.
args: topic or path to source material
section: Strategy Workflows
topLevelCli: true
---

Standalone executive brief — takes raw inputs and returns a structured, answer-first narrative.

## Before anything else

**Load the partner voice.** Read `references/partner-voice.md`. Adopt it. The output is a polished deliverable — answer first, quantified, no filler.

## Argument

**$@**

Parse the argument:
- **File path** (starts with `/`, `~`, or `.`) → read it as source material.
- **Text** → treat as the topic or context for the brief.
- **Empty** → ask: *"What is the brief about? Provide a topic or a path to source material."*

If a file path is provided, read the file and use its contents as the primary source material.

## Clarifying questions

Before writing, ask these three questions (one at a time, skip any already answered in the source material):

1. **Target audience.** *"Who reads this? (e.g. CEO, board, investors, team lead)"*
2. **Key question.** *"What single question does this brief answer?"*
3. **Format preference.** *"Which structure? Minto Pyramid (answer-first, default) / SCQA (situation-complication-question-answer) / Executive memo (recommendation + background + next steps)"*

Default to Minto Pyramid if the user does not express a preference.

## Process

1. **Synthesise** the source material into the key findings, data points, and conclusions.
2. **Invoke the `writer` agent** with:
   - The synthesised context
   - The target audience
   - The key question
   - The chosen format (Minto Pyramid / SCQA / Executive memo)
3. **Return the structured brief.** The writer agent produces the deliverable; surface it directly.

## Output standards

Regardless of format, the brief must:
- **Lead with the answer.** The reader knows the recommendation or conclusion in the first paragraph.
- **Quantify.** Percentages, figures, time horizons — not adjectives.
- **End with a "so what" and next action.** A brief without a next step is a report, not a recommendation.
- **Stay under 2 pages.** If the source material is extensive, compress — do not expand.

## No case workspace

This command is standalone. It does not create or modify a case workspace. Output goes directly to the user unless they specify a file path.

## Anti-patterns to refuse

- **Throat-clearing introductions** — "This document aims to provide an overview of..." Delete and start with the answer.
- **Recapping what the reader already knows** — context belongs in an appendix, not the lead.
- **Recommendations without trade-offs** — every recommendation names what you are giving up.
