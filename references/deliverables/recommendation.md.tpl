# Recommendation — {{case_slug}}

*Recommendation artefact.*

## Decision type

Before picking a method, name the **type** of decision this is. (ABCD: big-bet / cross-cutting / ad hoc / delegated · Bezos: 1-way / 2-way door.)

- **ABCD classification:** {{abcd}}
- **Bezos classification:** {{bezos}}
- **Implication for rigor:** {{rigor_implication}}

## Framework chosen: {{framework}} — reason

{{framework_reason}}

---

## Options considered

| # | Option | Description | Pros | Cons / risks | Trade-off |
|---|---|---|---|---|---|
| 1 | {{opt_1}} | {{opt_1_desc}} | {{opt_1_pros}} | {{opt_1_cons}} | {{opt_1_tradeoff}} |
| 2 | {{opt_2}} | {{opt_2_desc}} | {{opt_2_pros}} | {{opt_2_cons}} | {{opt_2_tradeoff}} |
| 3 | {{opt_3}} | {{opt_3_desc}} | {{opt_3_pros}} | {{opt_3_cons}} | {{opt_3_tradeoff}} |

## Evaluation (if weighted Evaluation chosen)

| Criterion | Weight | Opt 1 | Opt 2 | Opt 3 |
|---|---|---|---|---|
| {{crit_1}} | {{w_1}} | {{s11}} | {{s12}} | {{s13}} |
| {{crit_2}} | {{w_2}} | {{s21}} | {{s22}} | {{s23}} |
| {{crit_3}} | {{w_3}} | {{s31}} | {{s32}} | {{s33}} |
| **Weighted total** | | {{tot_1}} | {{tot_2}} | {{tot_3}} |

## Ends · Ways · Means — litmus

*Clausewitz. Every recommendation fits on three lines. If any is vague, the recommendation is not yet ready.*

- **End** (outcome we are after): {{end}}
- **Way** (approach we will pursue): {{way}}
- **Means** (resources it will consume): {{means}}

## Recommendation

**Recommend option {{recommend_n}} — {{recommend_name}}.**

{{recommend_reason}}

## Challenger review (Red Team)

*(Appended by the `challenger` agent in Red Team mode.)*

{{red_team_review}}

## Key risks and mitigants

| Risk | Likelihood | Impact | Mitigant |
|---|---|---|---|
| {{risk_1}} | {{l_1}} | {{i_1}} | {{m_1}} |
| {{risk_2}} | {{l_2}} | {{i_2}} | {{m_2}} |

## Next decision required

{{next_decision}}
