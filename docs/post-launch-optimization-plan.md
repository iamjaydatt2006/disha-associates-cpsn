# Post-Launch Optimization Plan (30 / 60 / 90 days) — Disha Associates

**Assumption:** this plan starts **the day the final domain is live, indexed and GSC/GA4 are connected**. If those prerequisites are not met, the clock starts when they are.

**Last updated:** 2026-10-13

---

## Guiding principles

- **Measure before optimising.** Early data is noisy — resist rewriting pages in week two.
- **Local pack beats blue links for "near me" queries.** The Google Business Profile is a first-class asset, not an afterthought.
- **One change at a time.** Change, wait for re-crawl/measurement, then decide.
- **No fabricated numbers, ever.** If data is missing, say so and get it (GSC, GBP, form logs).

---

## KPIs to track (baseline → target)

| KPI | Source | Baseline | 90-day target |
| --- | --- | --- | --- |
| GSC impressions (total) | GSC Performance | record at launch | upward trend |
| GSC clicks | GSC Performance | record at launch | upward trend |
| Pages indexed | GSC Pages report | 0 → N | all indexable pages indexed |
| Queries ranking | GSC Queries | — | branded + local + service queries appear |
| GBP views / calls / direction requests | GBP Insights | record | upward trend |
| Enquiries (form + calls + WhatsApp) | GA4 key event / call log | 0 | measurable, non-zero |
| Core Web Vitals (mobile) | GSC / Lighthouse | record | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 |
| Local pack presence | manual SERP check | — | appear for key local queries |

---

## Days 0–30 — confirm indexing & collect the baseline

**Technical**
- [ ] Confirm all pages are indexed in GSC (Pages report). Investigate "Crawled – currently not indexed" and "Duplicate" issues.
- [ ] Validate rich results (Service, FAQ, Breadcrumb, Article) in GSC Enhancements.
- [ ] Check the sitemap is read with no errors.
- [ ] Fix any 404s / soft-404s / redirect chains surfaced by GSC.
- [ ] Baseline mobile Lighthouse and record CWV.

**Local**
- [ ] Claim/verify GBP if not already done; complete 100% of the profile (categories, services, description, hours, attributes).
- [ ] Add **10+ real photos** to GBP.
- [ ] Ensure NAP on the site matches GBP **exactly**.
- [ ] Get the first few genuine reviews request going (ask real, recent clients — never fake).

**Measurement**
- [ ] Confirm GA4 records sessions; mark `/contact/` and form success as key events.
- [ ] Set up a simple weekly snapshot (impressions, clicks, enquiries) in a sheet.
- [ ] Connect GSC ↔ GA4.

**Content**
- [ ] Publish the 4th guide ("How models are made") **only if** the client has supplied the process details.
- [ ] Proofread everything live; fix any typo found.

**Do NOT:** rewrite titles/service copy yet. Collect data first.

---

## Days 31–60 — improve what the data shows

**Search performance**
- [ ] Pull GSC **Queries** report. Identify:
  - queries with **impressions but low CTR** → improve title/description or snippet content.
  - queries we rank **11–20** for → strengthen the target page with a subsection/FAQ answering that query.
  - new queries we didn't plan for → note for content calendar.
- [ ] Update `keyword-research-and-page-mapping.md` with **real** queries/positions (replace estimates).

**On-page**
- [ ] For the 2–3 weakest service pages, add a project-type-specific FAQ and 1–2 contextual internal links.
- [ ] Ensure each guide actually receives impressions; if a guide is dead, either expand it or merge it.

**Local (highest ROI)**
- [ ] Add GBP **posts** (service highlights, photos) — keep them factual.
- [ ] Respond to every review.
- [ ] Add a few local citations if the client wants (justdial, sulekha, etc.) with **identical** NAP.

**Conversion (CRO)**
- [ ] Once the form endpoint is live, test the full enquiry flow from a real device; confirm delivery.
- [ ] Check GA4 for drop-off on `/contact/`; simplify the form if abandonment is high.
- [ ] Confirm the sticky mobile CTA / click-to-call works (requires verified phone).

---

## Days 61–90 — scale what works, cut what doesn't

**Content**
- [ ] Publish the next planned guide (see `content-calendar.md`).
- [ ] Refresh any published guide whose `updated` date is stale or that's missing real photos.
- [ ] Build one internal-link pass: find pages with few inbound internal links and link to them from relevant content.

**Technical**
- [ ] Re-run Lighthouse; address any CWV regressions (often caused by newly added analytics/images).
- [ ] Compress/replace any remaining placeholder imagery with real optimised assets.
- [ ] Re-validate structured data after content changes.

**Local**
- [ ] Review GBP Insights: which queries drove views/calls; reflect the top ones in site copy where honest.
- [ ] Pursue 3–5 more genuine reviews.

**Reporting**
- [ ] Produce a short **30/60/90 report**: impressions, clicks, indexed pages, queries ranking, GBP actions, enquiries. State clearly what is measured vs estimated.
- [ ] Set targets for the next quarter based on actuals.

---

## Decision rules (what to do with underperformers)

| Symptom | Likely cause | Action |
| --- | --- | --- |
| Page indexed, 0 impressions after 8 weeks | wrong/too-competitive keyword, or not linked | improve relevance + add internal links; consider retargeting a long-tail variant |
| Impressions but ~0% CTR | weak title/description | rewrite title/description to match intent |
| Ranks 11–20 | thin coverage of that intent | add a section/FAQ on the target page for that query |
| High traffic, no enquiries | wrong intent or weak CTA | review audience fit; strengthen CTA and contact page |
| Guide not earning links/impressions | low demand or too generic | update, consolidate, or deprioritise |

---

## Cadence summary

| Frequency | Task |
| --- | --- |
| Weekly (first month) | GSC indexing check, form/notification test, baseline log |
| Monthly | GSC queries/pages review, GBP post + review responses, snapshot report |
| Quarterly | New guide(s), internal-link pass, CWV audit, 30/60/90 report and re-targeting |

---

## Ownership & dependencies

- **Client must supply** (see `missing-business-information.md`): phone, email, form endpoint, final domain, hours, GBP categories, real photos + permissions, process details. Several items above are blocked until then.
- **Web/SEO owner** runs the technical, content and reporting tasks.
