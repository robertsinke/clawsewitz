# MECE — Mutually Exclusive, Collectively Exhaustive

MECE is the single highest-leverage rule in management consulting. Every decomposition, every story tree, every option set is tested against it.

## The Two Conditions

**Mutually Exclusive (ME):** no element overlaps another. If two branches contain the same thing, you will double-count, over-weight, and confuse the reader.

**Collectively Exhaustive (CE):** the elements together cover the whole. If your branches miss a category, your recommendation has a blind spot.

You need **both**. ME without CE is a clean list that misses things. CE without ME is complete but overlapping and useless for prioritisation.

## How to Test

For any tree or list:

1. **Name each branch's definition in one line.** If you cannot, the branch is fuzzy.
2. **Walk each pair** (branch i, branch j) and ask: *can a real-world item belong to both?* If yes — not ME. Either redraw the split or add a tiebreak rule.
3. **Ask what is missing.** The catch-all test: does "Other" need to appear? If a real case would land in "Other", CE is failing — redraw until "Other" is either a first-class branch or provably empty.
4. **Prefer splits by a single dimension.** Revenue by "product line" is MECE. Revenue by "product line OR region" is not (overlap).
5. **Watch out for time-axis splits.** "Short-term / medium-term / long-term" must have explicit cutoffs, or it is not ME.

## Common MECE Failures

| Failure | Example | Fix |
|---|---|---|
| Overlap | "Acquisition" and "Marketing" as sibling revenue drivers | Acquisition is a subset of Marketing — nest, don't sibling. |
| Dimension mixing | Customers split by "Enterprise / Mid-market / US / EU" | Pick one dimension (size OR geography), split twice if needed. |
| Missing catch-all | "Subscribers who churn: price, product, service" | What about life events / moved / died? Add "Other/involuntary". |
| Vague definitions | "Growth, Retention, Monetisation" without math definitions | Define each in a formula or sentence. |
| Cute over correct | 3×3 matrix with labels that sound good but overlap | Rewrite. MECE beats memorable. |

## Worked Example — Good Driver Tree

Revenue decline (50M → 45M):
- **Volume driver**: units sold
  - new customer acquisition (net new logos × ACV)
  - existing customer retention (retained ARR)
  - expansion within retained (expansion ARR)
- **Price driver**: average revenue per unit
  - list price change
  - discount-rate change
  - mix shift across products

ME check: a dollar of lost revenue lands in exactly one of {volume, price} and then exactly one sub-bucket. CE check: Volume × Price = Revenue identity — complete by construction.

## Worked Example — Bad Driver Tree

Revenue decline: "competition, pricing, customer experience, brand, sales team".

Fails ME (competition and pricing overlap; brand and customer experience overlap). Fails CE (missing product quality, missing macro, missing mix). Rewrite as an identity first (Revenue = Volume × Price), then decompose each term.

## When "not quite MECE" is acceptable

Perfection is expensive. The rule of thumb: a tree should be MECE within the **level of abstraction the decision requires**. For a 30-minute whiteboard with a CEO, 80/20 MECE is enough if you name the remaining overlap. For a 12-week engagement's core model, it must be exact.

When you accept imperfection, **say so explicitly** and name the overlap or gap. Hidden non-MECE is the failure mode; acknowledged non-MECE is just scoping.
