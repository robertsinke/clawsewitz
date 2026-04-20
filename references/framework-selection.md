# Framework Selection — The Master Decision Tree

This is the "McKinsey instinct" distilled. The orchestrator consults the sub-section that applies to each engagement move. **State the framework choice and the one-line reason before executing it.**

Rule of thumb for every move: **pick the simplest framework that would not embarrass a senior partner.** If SCQ will do, do not use Outcome. If Pros & Cons will do, do not build a weighted Evaluation matrix. Simplicity scales.

---

## Frame

| Signal | Framework | Why |
|---|---|---|
| Known context, exec comms, baseline rigor | **SCQ** (Situation–Complication–Question) | Shortest path; reader gets to the question in 30 seconds |
| Narrative / pitch / change-management framing | **HTDQ** (Hero–Treasure–Dragon–Quest) | Storytelling form; helps align diverse stakeholders |
| High-stakes, senior sponsor, ambiguous brief | **Outcome** (Conn & McLean Problem Definition Worksheet) | Full checklist: decider, criteria, forces, timeframe, constraints, accuracy |

Tiebreak: if the audience is a board or a CEO expecting written recommendations, default to SCQ. If the engagement is >4 weeks or involves >3 sponsor parties, default to Outcome.

---

## Decompose

| Signal | Framework |
|---|---|
| Drivers known, math-like decomposition (Revenue = Volume × Price, Cost = Unit × Rate) | **Driver Tree** |
| Drivers unclear, many ideas to organise | **Bucketing** (bottom-up) |
| Investigative, ambiguous root cause, need to test | **Hypothesis Tree** |

Always run a MECE self-check (see `mece.md`). If the split fails MECE, fix it before advancing.

---

## Analyse

Three sub-routers: **Data (Quant)**, **Financial (Quant)**, **Question (Qual)**. Pick the minimum set of analyses that will make the insight inescapable.

### Data (Quant)

| Question | Chart |
|---|---|
| Change over time | Line (Trend) — or Stacked bar if mix also matters |
| Compare two or a few values | Vertical bar |
| Rank many items | Horizontal bar |
| Share/mix change between two periods | Stacked bar (Mix) |
| Distribution / spread | Distribution bar or Football-field |
| Relationship between two variables | Scatter; Bubble if three variables |
| Concentration (Pareto) | Cumulative 80/20 |
| High/low spread across methodologies | Candlestick |
| Rank movement over time | Rank chart |
| Actuals vs. target over time | Actual v Target |

### Financial (Quant)

| Question | Framework |
|---|---|
| Is this customer profitable? | **Unit Economics** (LTV, CAC, payback) — *xlsx* |
| Why did a total change? | **Waterfall** |
| When do we stop investing? | **Marginal Return** (diminishing returns) |
| Is this project worth it? | **Cashflow / NPV** — *xlsx* |
| Is the business efficient with capital? | **ROIC tree** — *xlsx* |
| Are we hitting the plan? | **Actual v Target** |
| How healthy is the margin? | **Profit Margin** decomposition |

### Question (Qual)

| Question | Framework |
|---|---|
| Root cause of a specific failure | **5 Whys** |
| Full root-cause investigation | **5W + H** |
| Diagnostic decision flow | **Yes/No** |

**Exit criterion for Analyse:** the analyses in combination make the insight inescapable. If they do not, add analyses; if they do, stop and move on.

---

## Insights (takeaway page archetypes)

| Signal | Layout |
|---|---|
| Mixed set of takeaways, grouped | **Tabular** |
| One-page strategy summary | **One-Pager** |
| Operating-model snapshot | **Canvas (Business Model Canvas)** |
| Summary with three parallel points | **Tri-Column** |
| Phased approach | **Chevron** |
| Long-horizon (3 step) | **Horizon** |
| Roadmap with time + streams | **Gantt** |
| Levers → drivers → comment | **Driver Tree** insight |
| Plot across two dimensions | **Matrix 2×2** |
| Segment prioritisation | **3×3 (GE-McKinsey)** |
| Current vs. target spectrum | **Continuum** |
| Current → future diagram | **From:To** |
| High-med-low rating grid | **Heat Map** (traffic light / Harvey Balls) |
| Chart + takeaway | **Graph** insight page |
| Logical relationship of 2–4 groups | **Venn** |
| Brand/product positioning | **Positioning Map** |
| Brand/product stack | **Pyramid** |
| Cyclic process | **Circular** |
| Customer experience across stages | **Journey Map** |
| Channels × stages | **Touchpoint** |
| Historical events | **Timeline** |
| Capabilities × maturity | **Capability Map** |
| Visual 3-component takeaway | **Image Column** |
| Market / customer segments | **Segmentation** |
| One big idea + orbit of parts | **Hub & Spoke** |

---

## Narrative

| Signal | Framework |
|---|---|
| Exec audience, written recommendation, answer-first | **Minto Pyramid** (default) |
| Full problem-solving arc for a memo | **SCQA** (Situation–Complication–Question–Answer) |
| Retrospective / case study / past events | **Story Spine** (Pixar) |
| Pitch / marketing / selling-in | **5 Act** (Freytag-adapted) |
| Brand / customer-facing | **StoryBrand** (Donald Miller) |

Always run a MECE check on the Minto arguments before writing prose. Governing-thought → 3 arguments → evidence per argument. Horizontal logic (parts-of-whole vs. sequence) must be explicit.

---

## Recommend

| Signal | Framework |
|---|---|
| Prioritise a list of work by urgency × importance | **Eisenhower** |
| Classify the decision itself (type matters) | **ABCD** (big-bet / cross-cutting / ad hoc / delegated) |
| Reversible vs. irreversible | **Bezos** (1-way / 2-way doors) |
| Two options, simple trade-off | **Pros & Cons** |
| Multiple options vs. many criteria | **Evaluation** (weighted; consider *xlsx*) |
| Probabilistic / multi-branch options | **Decision Tree** |
| High-stakes, political, many stakeholders | **SPADE** (Setting–People–Alternatives–Decide–Explain) |
| Scenario bands for a sponsor | **Bull / Base / Bear** |

Default posture: name which decision **type** the call is (ABCD / Bezos) before picking the method to make it. That alignment prevents over-investing in a 2-way door decision.

---

## Plan

| Signal | Framework |
|---|---|
| Launch from zero | **Zero-to-One** (Design → Mobilise → Build → Launch → Scale) |
| Change-mgmt / rollout of comms | **Comms Deployment** |
| Steering-committee running cadence | **Decision Grid** |
| Product launch | **GTM Stack** (product/pricing/promotion + channels + backend) |
| Full roadmap across multiple streams | **Execution Plan** (Gantt-style, with target metric) |
| Platform / capability build | **Capability Drop** |

The act artefact must name the workstream, the lead, the sequence, the milestones, and the target metric per pillar. If any of those is missing, it is not an implementation plan — it is a wish list.
