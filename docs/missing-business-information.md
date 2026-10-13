# Missing Business Information — Disha Associates

**Purpose:** a precise, prioritised list of the information the site **cannot fabricate** and therefore needs from the client before the site is fully launch-ready. Each item says what is missing, why it matters, where it is used, and exactly what to supply.

**Last updated:** 2026-10-13

---

## How placeholders work

Unverified facts live in `src/data/site.ts` as `verified: false` with an `OWNER-TODO` note. Components render contact actions, JSON-LD phone/hours and the sticky mobile CTA **only** when the matching value is `verified: true`. Search the codebase for `OWNER-TODO` to find every placeholder:

```bash
rg -n "OWNER-TODO" src/
```

Never set `verified: true` until the client confirms the real value. Never invent a value.

---

## Critical (blocks launch / indexability)

### 1. Business phone number
- **Missing:** the studio's real telephone number.
- **Why:** primary contact channel, required for `LocalBusiness`/`ProfessionalService` schema, the sticky mobile CTA, click-to-call and Google Business Profile.
- **Used in:** `src/data/site.ts` (`contact.phone`), footer NAP, contact page, Business JSON-LD.
- **Supply:** the number in E.164 form, e.g. `+91 98765 43210`. Then set `value` and `verified: true`.

### 2. Enquiries email address
- **Missing:** a real inbox for enquiries.
- **Why:** the enquiry form's destination and the mailto fallback; required for schema and for the form to be enabled.
- **Used in:** `src/data/site.ts` (`contact.email`), contact page, `src/data/form.ts` endpoint/destination.
- **Supply:** e.g. `enquiries@dishaassociates.in` (or confirm the domain first).

### 3. Enquiry form endpoint
- **Missing:** a service to receive submissions (the form is currently `disabled`).
- **Why:** without it, enquiries either fail silently or rely on email only. The form has a honeypot (`.hp-field`) but no backend.
- **Options:** Formspree / Basin / Getform (fastest), a Cloudflare Pages Function + email (e.g. MailChannels/Resend), or a Google Form. **No API keys or secrets in the repo** — store any token as a Cloudflare environment variable.
- **Supply:** the endpoint URL + confirmation that submissions arrive at the right inbox.

### 4. Final production domain
- **Missing:** confirmation of the real domain (currently `https://dishaassociatescpsn.pages.dev`).
- **Why:** all canonical tags, Open Graph URLs and the sitemap derive from `baseUrl`.
- **Used in:** `src/data/site.ts` (`baseUrl`) — the **single** place to change.
- **Supply:** the final domain, e.g. `https://dishaassociates.in`. Then update `baseUrl`, redeploy, resubmit the sitemap.

---

## Important (local SEO & credibility)

### 5. WhatsApp business number
- **Missing:** if the client wants WhatsApp enquiries.
- **Why:** a very common channel in the local market; enables a `wa.me` link.
- **Used in:** `src/data/site.ts` (`contact.whatsapp`).
- **Supply:** digits only with country code (e.g. `919876543210`) — no spaces or `+`.

### 6. Opening hours
- **Missing:** genuine studio hours (if publicly applicable).
- **Why:** shown in schema and the contact page; affects local pack trust.
- **Used in:** `src/data/site.ts` (`hours`).
- **Supply:** e.g. `Mon–Sat 09:30–18:30, Sun closed`. If there are no public hours, say so and we keep them hidden.

### 7. Google Business Profile categories
- **Missing:** the exact GBP category set the client will use.
- **Why:** must match the site's description for local ranking consistency.
- **Supply:** the primary category chosen in GBP plus any secondary categories (e.g. "Modeling agency", "Architectural designer").

### 8. Social profiles (optional)
- **Missing:** any Facebook / Instagram / LinkedIn / YouTube profiles that genuinely exist.
- **Why:** trust signals + `sameAs` in schema. **Only real profiles** — do not create empty ones to fill this in.
- **Used in:** `src/data/site.ts` (`social`). Currently empty, so nothing renders.

---

## Content & media

### 9. Real project photography
- **Missing:** photographs of completed models (replace the placeholder tiles).
- **Why:** the single biggest trust and conversion asset; also needed for a real OG image and image search.
- **Used in:** `/projects/`, service page imagery, `og-default` replacement.
- **Supply:** high-resolution images **plus written permission** to publish each project. Include project type and (if permitted) project name/location.

### 10. Real OG / social share image
- **Missing:** a 1200×630 raster banner.
- **Why:** controls how the site looks when shared on WhatsApp/LinkedIn/etc. (currently an SVG default).
- **Supply:** a branded image, or a good photo we can crop.

### 11. Client-approved process & capability details
- **Missing:** confirmation of Disha Associates' actual process, materials, typical scales and finishing options.
- **Why:** needed for the planned "How models are made" guide and honest service page detail. **No invented process or materials.**
- **Supply:** a short written description of the real workflow and materials used.

### 12. Business facts (only if accurate)
- **Missing:** founding year, years of experience, team size, notable clients/awards — **only if genuine**.
- **Why:** E-E-A-T and About page depth. **We will not invent these.** If the client does not want to publish them, we leave them out.
- **Supply:** only verifiable facts, with permission to publish client names.

### 13. Logo / brand assets
- **Missing:** confirmation of logo files. A placeholder `logo.svg` exists.
- **Why:** header/footer branding and favicon.
- **Supply:** final logo in SVG (preferred) + a square icon version for favicon/app icons.

---

## Policy & legal

### 13. Privacy policy review
- **Missing:** client confirmation/counsel sign-off on `/privacy-policy/`.
- **Supply:** sign-off, and a note on whether a cookie/consent banner is required for GA4.

### 14. Reviewed and approved copy
- **Missing:** client sign-off on all descriptive copy.
- **Why:** the site makes claims about what the studio does; the client must own those claims.
- **Supply:** reviewer name + approval.

---

## Summary table

| # | Item | Priority | Blocking? | Where |
| --- | --- | --- | --- | --- |
| 1 | Phone number | Critical | Yes | `site.ts` |
| 2 | Enquiries email | Critical | Yes | `site.ts`, form |
| 3 | Form endpoint | Critical | Yes (form) | `data/form.ts` |
| 4 | Final domain | Critical | Yes | `site.ts` (`baseUrl`) |
| 5 | WhatsApp number | Important | No | `site.ts` |
| 6. Opening hours | Important | No | `site.ts` |
| 7. GBP categories | Important | No | GBP |
| 8. Social profiles | Optional | No | `site.ts` |
| 9. Project photos + permission | Important | Partly | `/projects/`, images |
| 10. OG image | Medium | No | images |
| 11. Process/materials detail | Important | For future guide | guides |
| 12. Business facts (if accurate) | Optional | No | about |
| 11. Logo files | Medium | No | `public/` |
| 12. Privacy policy sign-off | Important | For analytics | `/privacy-policy/` |
| 13. Content approval | Important | Yes | all pages |

---

## What already IS verified

- **Business name:** Disha Associates
- **Address:** Kamgar Chowk, Mayanagar Colony, N 2, CIDCO, Chhatrapati Sambhajinagar, Maharashtra 431006, India
- **Coordinates:** 19.873315, 75.368557 (Google Maps Plus Code `V9F9+5C`)
- **Maps share link & directions URL**
- **Service area:** Chhatrapati Sambhajinagar, Maharashtra (projects across Maharashtra)

These are already wired into the site and schema.
