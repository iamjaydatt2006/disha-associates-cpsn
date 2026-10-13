# Pre-Launch Technical SEO Checklist — Disha Associates

Run through this **before** pointing the final domain at the site and requesting indexing.

**Last updated:** 2026-10-13

Legend: ✅ done · ⚠️ depends on client input · ⬜ to do

---

## 1. Crawling & indexing

- ⬜ `robots.txt` allows crawling and references the **final** domain sitemap.
- ⬜ `robots.txt` present and 200 OK at `/robots.txt`.
- ⬜ Every indexable page appears in `sitemap.xml`; no `noindex` page is listed.
- ✅ `sitemap.xml` is generated, valid XML, absolute URLs, trailing slashes.
- ✅ 404 page exists (`/404.html`) and is **not** in the sitemap.
- ⬜ No `noindex` on production pages (only 404 / staging).
- ⬜ Confirm CF Pages preview deployments are not indexed (don't submit preview URLs).

## 2. Canonicals & URLs

- ✅ `<link rel="canonical">` on every page.
- ✅ Canonical uses the single `baseUrl` from `src/data/site.ts` + page path — **not** all pointing to the homepage.
- ✅ `trailingSlash: "always"` — confirm served URLs match canonicals (no mixed `/projects` vs `/projects/`).
- ⬜ Ensure only one URL variant per page (no `?index`, no trailing mix) resolves as 200; others 301.

## 3. Titles & descriptions

- ✅ Unique `<title>` on all 16 pages.
- ✅ Unique meta description on all pages.
- ⬜ Re-check title lengths (~≤60 chars) and description lengths (~140–160 chars) after final copy edits.
- ✅ Homepage title matches brief: *Architectural Model Makers in Chhatrapati Sambhajinagar | Disha Associates*.
- ✅ One `<h1>` per page, distinct from `<title>`, descriptive.

## 4. Headings & content

- ✅ Single H1 per page; logical H2/H3 order.
- ✅ Content is original, genuinely useful, no doorway/thin pages.
- ✅ No fabricated prices, counts, awards or clients.
- ⬜ Final proofread; confirm all `OWNER-TODO` placeholders resolved or intentionally left.

## 5. Structured data (JSON-LD)

- ✅ `ProfessionalService` (Business), `WebSite`, `WebPage` emitted from `BaseHead`.
- ✅ `Service`, `BreadcrumbList`, `FAQPage` on service pages and guides.
- ✅ `Article` on guides.
- ⬜ Validate with [Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org validator](https://validator.schema.org/).
- ⚠️ Business node omits phone/address/hours until client verifies them — **add once verified**.
- ⬜ No markup for data that doesn't exist on the page.

## 6. Performance / Core Web Vitals

- ⬜ Mobile Lighthouse: **LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1**.
- ✅ Images use explicit `width`/`height` and `loading="lazy"` where below the fold.
- ✅ Hero/above-fold media not lazy-loaded (check).
- ⬜ Compress/replace `og-default.svg` and any placeholder images with optimised real assets.
- ✅ Hashed assets cached immutably (`_headers`).
- ⬜ Confirm no render-blocking additions (GA4 loaded deferred).

## 7. Images

- ✅ Descriptive `alt` text on images; decorative images handled.
- ⬜ All placeholder images replaced with real photography (⚠️ blocked — no photos supplied).
- ⬜ OG image is a real 1200×630 raster (currently SVG default).

## 8. Mobile usability

- ✅ Responsive layout across breakpoints.
- ✅ Tap targets ≥ 44px (footer/nav/breadcrumb links).
- ⬜ Test on real devices; no horizontal scroll.

## 9. Security & hosting

- ✅ HTTPS enforced (Cloudflare).
- ✅ Security headers in `public/_headers`.
- ⬜ `www` → apex (or apex → `www`) 301 decided and configured.
- ⬜ Custom domain live and matching `baseUrl`.

## 10. Local SEO

- ⚠️ NAP (name, address, phone) consistent across site, GBP, and any listings — **blocked pending client info**.
- ⚠️ Google Business Profile claimed and optimised.
- ✅ Location signals in titles/H1/body and `ProfessionalService` schema.
- ⬜ Add LocalBusiness contact fields to schema once verified.

## 10. Analytics & verification

- ⬜ GA4 installed and firing (after privacy policy update).
- ⬜ GSC property verified; sitemap submitted.
- ⬜ GA4 ↔ GSC linked.
- ✅ Privacy policy covers enquiry data and Maps embeds; add analytics when GA4 added.

## 11. Final go-live sequence

1. Set final domain in `src/data/site.ts` → `npm run check && npm run build`.
2. Deploy to Cloudflare Pages; add/verify custom domain + HTTPS.
- 3. Re-run Rich Results Test and Lighthouse on the live URL.
- 4. Submit sitemap + request indexing in GSC.
- 5. Confirm `robots.txt` and `sitemap.xml` on the live domain.
- 6. Snapshot baseline metrics (see `post-launch-optimization-plan.md`).

---

## Known blockers (must be resolved for a complete launch)

1. **No verified NAP** (phone/email/address/hours) → contact links, GBP and Business schema incomplete.
2. **No real photography** → portfolio and OG images are placeholders.
3. **No form endpoint / verified email** → enquiry form is disabled.
4. **Final domain not confirmed** (currently `dishaassociatescpsn.pages.dev`) → set `baseUrl`.

See `missing-business-information.md` for the full list and how to unblock each.
