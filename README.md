# Disha Associates — Website

Static marketing website for **Disha Associates**, an architectural scale
model-making studio in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra.

Built with **Astro** (`output: "static"`) and plain CSS. No client framework, no
runtime database, no build-time secrets. Designed to be deployed to
**Cloudflare Pages** (also works on any static host).

---

## 1. Quick start

```bash
npm install          # install dependencies
npm run dev          # start dev server → http://localhost:4321
npm run build        # build static site → ./dist
npm run preview      # preview the built site locally
npm run check        # type-check .astro/.ts files
```

Requires Node 18+ (developed on Node 22). The `EBADENGINE` warnings during
install are harmless.

---

## 2. Project structure

```
public/                 # static assets copied as-is (favicon, robots, _headers, images)
scripts/
  generate-placeholders.mjs   # regenerates the placeholder SVGs in public/
src/
  components/           # UI components (.astro)
  data/                 # ALL editable content + config lives here
  layouts/
    BaseLayout.astro    # page shell (head, header, footer, sticky CTA)
    ServiceLayout.astro # shared layout for the 6 service pages
  pages/                # one file per route
  styles/global.css     # complete design system
astro.config.mjs
tsconfig.json
```

### Pages

| Route | File |
| --- | --- |
| `/` | `pages/index.astro` |
| `/architectural-model-making/` | `pages/architectural-model-making.astro` |
| `/residential-building-models/` | `pages/residential-building-models.astro` |
| `/commercial-building-models/` | `pages/commercial-building-models.astro` |
| `/industrial-models/` | `pages/industrial-models.astro` |
| `/landscape-township-models/` | `pages/landscape-township-models.astro` |
| `/infrastructure-models/` | `pages/infrastructure-models.astro` |
| `/projects/` | `pages/projects.astro` |
| `/about/` | `pages/about.astro` |
| `/contact/` | `pages/contact.astro` |
| `/privacy-policy/` | `pages/privacy-policy.astro` |
| `404` | `pages/404.astro` (`/404.html`, `noindex`) |
| `/sitemap.xml` | `pages/sitemap.xml.ts` |

---

## 3. Configuration — edit these two files first

### `src/data/site.ts` — the single source of truth

Everything factual flows from here: business name, address, geo coordinates,
`baseUrl`, contact channels, hours, service area. Canonical URLs, the sitemap and
Open Graph tags all derive from `baseUrl`.

- **Domain:** to move to a custom domain, change **only** `baseUrl` (line ~45)
  and the Sitemap line in `public/robots.txt`.
- **Contact channels** (phone / WhatsApp / email) and **hours** ship as
  `verified: false`. Clickable actions, `tel:`/`mailto:` links, JSON-LD contact
  fields and the sticky mobile CTA bar only render when `verified: true`.
- This is deliberate: **nothing fabricated is ever shown or indexed.**

### `src/data/form.ts` — enquiry form delivery

A static site can't process submissions itself. Three modes, auto-selected:

| Mode | When it activates | What to set |
| --- | --- | --- |
| `endpoint` | `endpoint` is non-empty | Your form-service URL (Formspree, Web3Forms, Basin, a Cloudflare Worker…) + optional public `accessKey` |
| `mailto` | `endpoint` empty **and** a verified enquiry email exists | Verify `email` in `site.ts` |
| `disabled` | otherwise (default) | Nothing — the form shows a clear "not connected" notice |

> **Security:** `form.ts` is shipped to the browser. Never put secret API keys
> or SMTP credentials here. Public access keys designed for client-side use are
> fine.

---

## 4. Content editing

| What | Where |
| --- | --- |
| Business info, contacts, domain | `src/data/site.ts` |
| The 6 services (titles, nav labels, summaries, images) | `src/data/services.ts` |
| FAQ items (8) | `src/data/faqs.ts` |
| Process steps (5) | `src/data/workflow.ts` |
| "Why choose us" + capability list | `src/data/benefits.ts` |
| Portfolio items (6, placeholder) | `src/data/projects.ts` |
| JSON-LD builders | `src/data/schema.ts` |
| Colours, spacing, typography | `src/styles/global.css` |

**Adding an indexable page?** Add it to the `pages` array in
`src/pages/sitemap.xml.ts` (and to nav where relevant). Do **not** list the 404
page or any `noindex` page.

---

## 5. Replacing placeholder assets

This project shipped **without any real brand assets** (no logo, photos or
banner were available). On-brand labelled **SVG placeholders** are used
throughout. Replace them before launch:

| Asset | Location | Notes |
| --- | --- | --- |
| Logo | `public/logo.svg`, `public/images/logo.svg` | Used in header/footer |
| Favicon | `public/favicon.svg` | |
| Default OG image | `public/images/og-default.svg` | 1200×630 recommended; PNG/JPG preferred by some crawlers |
| Hero | `public/images/hero.svg` | Homepage hero background |
| Service images | `public/images/service-*.svg` | One per service |
| Portfolio tiles | `public/images/project-placeholder.svg` | Replace with real, **rights-cleared** project photos |

Regenerate the generated placeholders at any time with:

```bash
node scripts/generate-placeholders.mjs
```

For the portfolio, replace the `placeholder: true` entries in
`src/data/projects.ts` with real projects (set `image`, `title`, `category`) and
remove the placeholder flag; the owner-notice on `/projects/` disappears
automatically once no placeholders remain.

---

## 6. Deploying to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push this repo to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** set the `NODE_VERSION` env var to `22` if needed.
3. Deploy. `public/_headers` (security + cache headers) is applied automatically.

### Option B — Direct upload (Wrangler)

```bash
npm run build
npx wrangler pages deploy dist --project-name disha-associates
```

### Custom domain

1. Add the domain in Cloudflare Pages → **Custom domains**.
2. Update `baseUrl` in `src/data/site.ts` and the Sitemap URL in
   `public/robots.txt`, then rebuild and redeploy.

`public/_headers` already sets `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy` and long-lived caching for
`/_astro/*` (hashed assets) and `/images/*`.

---

## 7. SEO features included

- Unique, descriptive `<title>` + meta description per page.
- Per-page **canonical** URLs (never all pointing at the homepage).
- Open Graph + Twitter card tags (`summary_large_image`).
- JSON-LD `@graph`: one `ProfessionalService` (`#business`) + `WebSite`
  (`#website`) + per-page `WebPage`, plus `Service`, `BreadcrumbList` and
  `FAQPage` where relevant.
- `sitemap.xml` (hand-rolled, no extra dependency) and `robots.txt`.
- `trailingSlash: "always"` for clean, consistent URLs.
- Semantic headings, descriptive alt text, `<html lang="en-IN">`.
- Accessible gold: `--gold-ink` is used for gold text on light backgrounds
  because raw gold on white fails WCAG contrast.

---

## 7a. Pre-launch SEO & accessibility checklist

- [ ] Set the real production domain in `site.ts` (`baseUrl`) and `robots.txt`.
- [ ] Verify at least one contact channel in `site.ts` (`verified: true`) so
      `tel:`/`mailto:` links and the sticky CTA appear.
- [ ] Connect the enquiry form (`form.ts`) and send a live test submission.
- [ ] Replace all placeholder images with real, rights-cleared photos.
- [ ] Add a real OG image (1200×630) at `public/images/og-default.png`.
- [ ] Run `npm run build` and `npm run check` — both must be clean.
- [ ] Confirm the sitemap lists exactly the 11 indexable pages (not 404).
- [ ] Validate JSON-LD with Google's Rich Results Test.
- [ ] Check Lighthouse (mobile) for Performance / SEO / Best Practices /
      Accessibility.
- [ ] Keyboard-test the header menu, FAQ accordions and form.
- [ ] Add the site to Google Search Console and submit `sitemap.xml`.
- [ ] Create/verify the **Google Business Profile** at the exact NAP address.

---

## 8. Owner confirmation list (OWNER-TODO)

Search the codebase for the token **`OWNER-TODO`** to find every placeholder.
The owner must confirm or supply:

1. **Phone number** — `site.ts → contact.phone` (set `value` + `verified: true`).
2. **WhatsApp number** — `site.ts → contact.whatsapp`.
3. **Enquiry email** — `site.ts → contact.email`.
4. **Opening hours** — `site.ts → hours` (only if the studio has public hours).
5. **Final domain** — `site.ts → baseUrl` + `public/robots.txt`.
6. **Form delivery** — choose a method in `form.ts`.
7. **Real logo & brand assets** — replace the placeholder SVGs.
8. **Portfolio photographs** — real, rights-cleared project images.
9. **Social profiles** — `site.ts → social` (currently none).
10. **Postcode check** — supplied `431006`; an automated geocode returned
    `431002`. Confirm the correct PIN code for the CIDCO N-2 address.

---

## 9. Known constraints (why some things are placeholders)

- No brand assets were available (the expected Pages host did not resolve), so
  labelled SVG placeholders are used.
- All contact channels and hours are **unverified** and stay hidden/disabled
  until confirmed — the site never invents phone numbers, emails, hours,
  reviews, awards, prices or project counts.
- The portfolio contains no real project photographs yet; it shows labelled
  placeholder tiles and an on-page owner notice.
- The homepage SEO title/description were composed to fit the visible H1 and
  business details; if the original brief text is recovered, reconcile it in
  `src/pages/index.astro`.

---

## 10. License / ownership

Content and brand assets © Disha Associates. Replace all placeholder media with
material the owner is licensed to use before public launch.
