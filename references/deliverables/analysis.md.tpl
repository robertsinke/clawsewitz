# Analysis — {{case_slug}}

*Analysis artefact.*

## Plan of analyses

For each leg of the split, name the analysis that will test it. Before running anything, list them all in one place so redundancy is visible.

| # | Branch / hypothesis | Analysis | Chart / model | So-what if true |
|---|---|---|---|---|
| 1 | {{branch_1}} | {{analysis_1}} | {{chart_1}} | {{sowhat_1}} |
| 2 | {{branch_2}} | {{analysis_2}} | {{chart_2}} | {{sowhat_2}} |
| 3 | {{branch_3}} | {{analysis_3}} | {{chart_3}} | {{sowhat_3}} |

---

## Analyses (one section each)

### A1 — {{analysis_1_title}}

**Framework:** {{analysis_1_framework}}

**Data / inputs:**
{{analysis_1_inputs}}

**Result:**
{{analysis_1_result}}

**So what:**
{{analysis_1_sowhat}}

*(Repeat section per analysis. Financial analyses that warrant xlsx go in subdirectory `analysis/` — e.g. `analysis/unit-economics.xlsx` — produced via the `xlsx` skill if available.)*

---

## Exit test

- [ ] In combination, the analyses make the insight inescapable.
- [ ] Each analysis has a "so what".
- [ ] No analysis remains whose result will not change a decision.
