---
name: engagement-intake
description: Triage a strategic brief before any analysis. Use whenever the user brings a fresh strategic question, a consulting-style brief, or a "here's our situation, help us figure this out" prompt — and context (decider, success criteria, constraints) hasn't been established yet. Also use when the user says "help me think through this", "we're trying to decide whether to X", "I need a strategy for Y", or gives you a one-liner that needs unpacking before decomposition or analysis is warranted. Do NOT use when the question is narrow and technical (a single decision, a concrete decomposition, a research brief) — reach for the more specific skill instead.
---

# Engagement Intake

Spend the first fifteen minutes on context, not answers. A polite answer to the wrong question wastes the client's money.

## Ask these seven questions — one at a time

Do not batch them. Skip any the user has already answered in the brief. Do not invent context.

1. **Decider.** Who is the real decider for this? (Not necessarily the person speaking with you.)
2. **Success criteria.** How does the decider know the engagement succeeded? What outcome or signal makes this a win?
3. **Timeframe.** What is the timeframe for a decision?
4. **Off-limits.** What is off-limits — topics, options, stakeholders?
5. **Accuracy needed.** What accuracy is needed — directional, approximate, or exact? (This drives how heavy the analysis should be.)
6. **Materials.** What materials has the client already prepared? (Decks, data, PDFs, prior analyses.)
7. **Background.** Anything else a seasoned partner should know about the politics, history, or prior attempts?

## Then: write the partner read

One paragraph. Your honest read on what this engagement really is, before the client tells you. Specific, not generic. If the brief seems misframed, say so — name the real question. This read is a prior to be tested, not a conclusion.

## Output

Return to the caller:

- **Brief (verbatim)** — the original ask, unmodified.
- **Context** — the seven answers, one line each.
- **Partner read** — one paragraph.
- **Suggested next move** — which skill/workflow the engagement should reach for next (e.g. `mece-decomposition` if the question needs splitting, `strategic-research` if external facts are missing, `evaluating-options` if options are already on the table).

## Rules

- **One question at a time.** Batching seven questions feels like a form. One at a time is a conversation.
- **Do not invent answers.** If the user hasn't said who the decider is, ask — don't assume.
- **Push back if the brief is mis-framed.** The partner read is the moment to do this. If you read the brief as answering the wrong question, say so and propose the real one before moving on.
- **Stop here.** Do not start decomposing, analysing, or recommending. The caller decides what comes next based on your output.

## When to write to a case workspace

If the engagement is clearly going to span multiple skill invocations (user says "let's work through this over the next few days", or the brief is large and multi-stream), write the intake to a case workspace under `docs/clawsewitz/cases/<slug>/intake.md` (project-local in a git repo) or `~/.clawsewitz/cases/<slug>/intake.md`. Otherwise, return the intake inline and let subsequent skills decide whether to persist.
