# Split — {{case_slug}}

*Stage 2 · Split · produced by cw-split*

## Framework chosen: {{framework}} — reason

{{framework_reason}}

---

## The Tree

Problem statement: *{{problem_statement}}*

{{tree}}

*(For Driver Tree, state the identity at the top — e.g. Revenue = Volume × Price — so the CE property is visible by construction.)*

## MECE Self-Check

- **Mutually Exclusive:** {{me_check}}
- **Collectively Exhaustive:** {{ce_check}}
- **Known gaps / accepted imperfections:** {{gaps}}

## Testable Hypotheses (if Hypothesis Tree)

| # | Hypothesis | How we would prove or disprove |
|---|---|---|
| 1 | {{hyp_1}} | {{test_1}} |
| 2 | {{hyp_2}} | {{test_2}} |
| 3 | {{hyp_3}} | {{test_3}} |

## cw-mece-check verdict

*(Appended automatically by the post-tool-use hook after cw-mece-check runs.)*

{{mece_verdict}}

## Schwerpunkt — Center of Gravity

*The single branch of this tree that, if moved, cascades the rest. Not necessarily the biggest — the one with the largest downstream effect. `cw-analyse` will go deepest here.*

**Schwerpunkt:** {{schwerpunkt}}

**Reason it cascades:** {{schwerpunkt_reason}}

## Handoff

→ **Invoke `cw-analyse` next.** Name the minimum set of analyses that would make the insight inescapable. Analyse the Schwerpunkt first and deepest.
