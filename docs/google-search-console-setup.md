# Google Search Console & Analytics Setup — Disha Associates

**Goal:** get the site verified, monitored and measurable. GSC drives indexing insights; GA4 drives behaviour. Both are required before the keyword estimates in `keyword-research-and-page-mapping.md` can be replaced with real data.

**Last updated:** 2026-10-13

---

## Part A — Google Search Console (GSC)

### 1. Add the property

1. Go to <https://search.google.com/search-console> and sign in with the business Google account.
2. **Add property.** Prefer a **Domain property** (`dishaassociatescpsn.pages.dev`, or the final custom domain) — it covers `www`, non-`www`, HTTP and HTTPS in one.
   - If the final domain is owned and DNS is at Cloudflare, choose **Domain**.
   - If DNS access is unavailable, use a **URL-prefix** property instead (see 2b).

### 2a. Verify a Domain property (recommended)

1. GSC gives a **TXT record** value.
2. In Cloudflare → **DNS → Add record**: Type `TXT`, Name `@`, Content = the value from GSC, TTL auto.
2. Wait a few minutes, click **Verify** in GSC.

### 2b. Verify a URL-prefix property (alternative)

Use the **HTML tag** method: paste the provided `<meta name="google-site-verification" …>` into `src/components/BaseHead.astro` (inside `<head>`), rebuild, deploy, then click **Verify**.

> Keep the verification tag in the code after verifying — removing it can revoke access. Consider adding a `GOOGLE_SITE_VERIFICATION` env/const so it isn't hard-coded awkwardly.

### 3. Submit the sitemap

1. In GSC → **Sitemaps**.
2. Enter `sitemap.xml` (relative) and submit.
3. Confirm it reads "Success" and discovers all pages (16+ and growing as guides are added).

The sitemap is generated at build time by `src/pages/sitemap.xml.ts`. Whenever you add a page, add its path there and re-submit is automatic on the next crawl.

### 2b. Request indexing (first publish)

For the homepage, the 6 service pages and each guide: paste the URL into the top search box → **Request indexing**. This speeds up first discovery (it is not a ranking boost).

### 3. Verify robots

`https://<domain>/robots.txt` must allow crawling and point to the sitemap:

```
User-agent: *
Allow: /

Sitemap: https://<domain>/sitemap.xml
```

Confirm the sitemap URL uses the **final** domain.

### 4. Ongoing GSC monitoring (monthly)

| Report | What to watch |
| --- | --- |
| **Performance → Queries** | Real queries and impressions; feed these back into the keyword doc. |
| **Performance → Pages** | Which pages earn clicks; find under-performers. |
| **Coverage / Pages index report** | Crawled-but-not-indexed, duplicate canonicals, errors. |
| **Sitemaps** | Confirm sitemap read successfully, no errors. |
| **Enhancements → FAQ / Breadcrumbs** | Validate structured data is parsed. |
| **Mobile usability** | Any tap-target / viewport issues (regression-check after design changes). |
| **Core Web Vitals** | LCP, INP, CLS on real users. |

**Connect GA4 to GSC** (GA4 → Admin → Product links → Search Console) to see query data alongside behaviour.

---

## Part B — Google Analytics 4 (GA4)

1. Create a GA4 property at <https://analytics.google.com> for Disha Associates.
2. Get the **Measurement ID** (`G-XXXXXXX`).
3. Add the GA4 tag site-wide. Two options:
   - **Simplest:** paste the gtag snippet into `src/components/BaseHead.astro` (before `</head>`).
   - **Cleaner/performant:** use a lightweight partytown or a deferred loader so GA does not hurt Core Web Vitals.
4. Mark **`/contact/`** and any successful form submission as **key events (conversions)**.
5. Link GA4 ↔ GSC (above).
6. Respect the privacy policy: the current `/privacy-policy/` mentions enquiry data and Google Maps; add a line about analytics if a cookie banner is not used, or add a consent mechanism if required for the audience.

> Do not add GA4 until the privacy policy reflects it. Keep the policy and the tracking in sync.

---

## Part C — Bing Webmaster Tools (optional but free)

1. <https://www.bing.com/webmasters> → add site.
2. **Import from Google Search Console** (fastest) or verify with a meta tag / DNS.
3. Submit the sitemap. Bing powers DuckDuckGo results, so this is worthwhile for a small site.

---

## Part D — Google Business Profile (local SEO — critical)

Ranking for "model maker near me" and "{service} in Chhatrapati Sambhajinagar" depends far more on the **Google Business Profile** than the website.

1. Claim/verify the GBP at <https://business.google.com>.
2. Set the **primary category** to the closest match (e.g. "Modeling agency" / "Architectural designer" — pick the most accurate available) and add relevant secondary categories.
3. **NAP must match the website exactly** (name, address, phone). This is currently blocked — see `missing-business-information.md`.
4. Add the website link, service list, opening hours, service area and photos.
5. Post updates occasionally and collect genuine reviews.

**Website support already in place:** the contact page and footer NAP block, and the `ProfessionalService` structured data. These switch on fully once verified contact details are supplied (`verified: true` in `src/data/site.ts`).

---

## Checklist

- [ ] GSC property added and verified
- [ ] `robots.txt` correct and pointing at the live sitemap
- [ ] `sitemap.xml` submitted without errors
- [ ] Key URLs requested for indexing
- [ ] GA4 installed and `/contact/` marked as a conversion (after privacy policy updated)
- [ ] GA4 ↔ GSC linked
- [ ] Bing Webmaster Tools set up
- [ ] Google Business Profile claimed and NAP-consistent
- [ ] Baseline recorded (date, impressions, clicks) for future comparison
