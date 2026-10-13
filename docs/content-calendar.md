# Content Calendar — Disha Associates

**Goal:** a realistic, sustainable publishing plan that builds topical authority, captures long-tail search and feeds internal links to the service pages.

**Last updated:** 2026-10-13

---

## 1. Principles

- **Quality over volume.** One genuinely useful guide per month beats four thin posts. The brief explicitly forbids doorway/thin pages.
- **One primary intent per piece.** No two pieces target the same query.
- **Honest content only.** No invented prices, project counts, awards or clients. Where first-hand knowledge is required (e.g. "our process"), the client supplies it.
- **Every guide links to ≥3 service pages** and receives links back (see `internal-linking-plan.md`).
- **Photos depend on the client.** Image-led content cannot be finalised until real project photography is supplied (see `missing-business-information.md`).

**Who writes it:** the piece can be drafted by the web/content owner, but any claim about Disha Associates' process, materials or capability must be **reviewed and approved by the client** before publishing. Mark drafts with the `OWNER-TODO` convention already used across the site.

**Cadence:** **1 guide per month** is the target; 1 per 6–8 weeks is acceptable if first-hand review is slow. Adding a page you cannot maintain is worse than not adding it.

---

## 2. Publishing status legend

`Idea` → `Drafting` → `Needs owner review` → `Published` → `Update due`

---

## 3. Calendar (months 1–12)

| # | Target month | Working title | Type | Primary intent / query | Internal links to | Assets needed | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| — | **Done (v1)** | What Is an Architectural Scale Model? | Guide | what is an architectural scale model | arch-making, residential, commercial | none (text) | **Published** |
| #2 | Done (v1) | How to Choose the Right Scale for an Architectural Model | Guide | how to choose model scale / 1:100 | architectural-model-making, landscape-township, residential | diagrams (scale comparison) — optional | Published |
| #3 | Done (v1) | What Affects the Cost of an Architectural Scale Model? | Guide | architectural model cost factors | architectural-model-making, commercial, infrastructure | none | Published |
| 4 | Month 1 | Architectural model materials explained (acrylic, MDF, resin, acrylic sheet, etc.) | Guide | what materials are architectural models made from | architectural-model-making, commercial | close-up photos | Idea |
| #4 | Month 2 | Presentation model vs working model vs exhibition model | Comparative guide | types of architectural models | all services | photos of each type | Idea |
| #5 | Month 3 | How architectural models are made: from drawings to finished model | Process guide | how are architectural scale models made | architectural-model-making | client process notes + photos | Needs owner input |
| #6 | Month 4 | What to send a model maker for a quotation | Practical guide | what to send for a model quote | contact, all services | sample drawing checklist | Idea |
| #7 | Month 5 | Residential vs commercial models: what changes | Comparison | residential vs commercial building models | residential, commercial | photos | Idea |
| #8 | Target month | Master plan and township models explained | Informational | what is a master plan model | `/landscape-township-models/` | photos | Planned |
| #9 | Target month | Do you still need a physical model? (model vs render, part 2) | Opinion/explainer | physical model vs render | architectural-model-making, commercial | — | Idea |
| #10 | Target month | Lighting in architectural models: what it adds | Informational | model lighting | architectural-model-making, commercial | photos of lit models | Needs owner review |
| #11 | Target month | How long does a scale model take to make? | Informational (no invented times) | how long to make a model | all services | client to confirm process stages, **no fixed numbers** | Needs owner review |
| #12 | Target month | A model maker's glossary (scale, massing, plinth, cutaway…) | Reference | architectural model glossary | all services | none | Idea |

**Evergreen update cycle:** revisit each published guide every **6–12 months** to refresh date, add any new photos/FAQ and fix dead links. Updating `updated:` in `src/data/guides.ts` refreshes the sitemap signal.

---

## 4. Detailed brief — next 3 pieces

### Piece 1 (next): "How architectural models are made — our process"

- **Angle:** walk a reader through the stages from drawings → agreed scale → base → structure → facade → landscape → finish → QA. Purely process, no fabricated timelines.
- **Why:** captures "how are models made", strong E-E-A-T signal (first-hand process), natural place to show photos.
- **Needs from client:** confirmation of the actual stages Disha Associates follows, tools/materials used, and 3–5 process photos. **Cannot publish without this.**
- **Links to:** `/architectural-model-making/`, `/residential-building-models/`, `/commercial-building-models/`.
- **FAQ:** "How long does it take?" — answer in stages, not a fixed number.

### Piece 2: "How to brief a model maker (and what to send)"

- **Angle:** a checklist for architects/builders — drawings, 3D files, intended use, display space, deadline, delivery location.
- **Why:** high commercial intent, primes the quotation process, links directly to Contact.
- **Needs:** nothing beyond existing knowledge; client review of the quotation FAQ.
- **Links to:** `/contact/`, all 6 service pages.

### Piece 3: "Architectural model glossary"

- **Angle:** define scale, massing, plinth, cutaway, section model, site base, context model, etc.
- **Why:** informational hub, lots of long-tail, easy internal links.
- **Needs:** none.
- **Links to:** all 6 service pages + the two existing concept guides.

---

## 5. What we will NOT publish

- Location doorway pages ("model maker in {city}").
- Unsupported superlatives ("best in India").
- Fake case studies or client names without written permission.
- Price tables or turnaround promises the client has not confirmed.
- AI-spun filler with no first-hand value.

---

## 6. Governance

- **Owner:** content lead drafts → **client approves** any factual/process claim → publish.
- **Review gate:** nothing with `Needs owner review` status goes live.
- **After publish:** add the path to `src/pages/sitemap.xml.ts`, run `npm run check && npm run build`, then request indexing in GSC (see `google-search-console-setup.md`).
- **Measure after 60–90 days:** impressions/clicks in GSC; update or consolidate under-performers rather than piling on more.
