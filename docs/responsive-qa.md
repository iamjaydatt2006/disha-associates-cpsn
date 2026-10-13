# Responsive QA Checklist

Scope: every page from **320px to 1920px+**, mobile-first. Verified with a live
headless browser (Playwright) measuring real layout geometry, not just screenshots.

Run the dev server, then re-run the automated audit before each release:

```bash
npm run dev            # http://localhost:4321/
npm run check          # 0 errors / 0 warnings / 0 hints
npm run build          # 16 pages + sitemap
npm run preview        # serves dist/ (rebuild before re-testing)
```

---

## 1. Automated audit (current status: PASS)

Automated checks across **16 pages × 13 widths = 208 combinations**.

Pages:
`/`, `/about/`, `/projects/`, `/contact/`, `/guides/`, `/privacy-policy/`,
`/residential-building-models/`, `/commercial-building-models/`,
`/industrial-models/`, `/landscape-township-models/`,
`/infrastructure-models/`, `/architectural-model-making/`,
guide detail pages (×3), `/404/`.

Widths: `320, 360, 375, 390, 414, 430, 480, 600, 768, 820, 1024, 1280, 1920`.

| Check | Rule | Result |
| --- | --- | --- |
| Horizontal overflow | `documentElement.scrollWidth <= clientWidth` | **0 failures** |
| Touch targets | interactive elements ≥ 44px tall | **0 failures** |
| Image distortion | natural aspect ratio preserved (`object-fit: fill` never used) | **0 failures** |
| Broken images / 404s | every page loads with 0 network responses ≥ 400 | **0 failures** |
| Header fit @320px | brand and burger do not overlap, both ≥44px | **PASS** (brand right 210, burger x 247) |
| Contact `<select>` @320px | no longer forces ~415px min-content width | **PASS** (276px) |
| 3D hero stage | `[data-hero3d]` reaches `data-state="ready"`, aspect ratio 4:3 | **PASS, all widths** |
| Hero overflow | no overlap; primary CTA above the 900px fold from 1024px up | **PASS** |

### How to reproduce the audit

Open the dev server in the Playwright MCP and run an evaluate loop over the page
list and width list above, checking:

```js
document.documentElement.scrollWidth > document.documentElement.clientWidth
```

and, for every `a, button, input, select, textarea`:

```js
el.getBoundingClientRect().height < 44   // excluding .hp-field and .prose
```

---

## 2. Manual checks (do these on real devices / device emulation)

- [ ] **320px** — no horizontal scroll on any page; header logo + burger fit; text wraps.
- [ ] **375px / 390px** — iPhone-class widths; tap burger, open/close mobile nav; nav scrolls if it overflows.
- [ ] **414px / 430px** — large phones; contact form is single-column; `<select>` and inputs are full-width.
- [ ] **480px / 600px** — small tablets / landscape phones.
- [ ] **768px** — tablet portrait; `grid--2` and footer 3-column engage; breadcrumb links are 44px tall.
- [ ] **820px / 1024px** — tablet landscape / small laptop; contact grid switches to two columns at 900px.
- [ ] **1280px / 1920px** — desktop; max-width container centered; line length stays readable (≤ ~70ch in prose).
- [ ] **Landscape phones** (e.g. 667×375, 812×375) — no clipping, no overlap, sticky CTA (if visible) does not cover content.
- [ ] **Zoom 200%** at 1280px — content reflows to a single column without horizontal scroll.
- [ ] **Long strings** — long email/address in the NAP block wrap instead of overflowing.
- [ ] **Keyboard only** — tab order is logical; focus ring is visible on every interactive element.
- [ ] **Reduced motion** — `prefers-reduced-motion: reduce` disables non-essential animation.

---

## 3. Known limitations / exemptions (honest list)

These are intentional and **not** regressions:

1. **Inline prose links** inside `.prose` and body paragraphs may be shorter than
   44px. Target-size guidance treats inline text links within a sentence as
   exempt; they are not standalone controls.
2. **Honeypot field** (`.hp-field`) is visually hidden for spam protection — its
   ~35px height is irrelevant and excluded from the audit.
3. **Placeholder imagery.** No real brand assets or project photographs exist yet
   (`https://dishaassociatescpsn.pages.dev/` returns NXDOMAIN). On-brand labelled
   SVG placeholders are used throughout; re-run the image aspect check after
   swapping in real photos.
4. **Google Map** uses the keyless `output=embed` URL (no API key). The
   `maps.googleapis.com` console logs originate inside Google's iframe, not this site.
5. **Unverified contact channels.** Phone (`+91 80070 09922`) and email are now
   `verified: true` — `tel:`/`mailto:`, JSON-LD contact fields and the sticky
   mobile CTA render for them. WhatsApp remains `verified: false` (`OWNER-TODO`)
   and is still withheld. No invented data.
6. **Form is disabled** (no endpoint / verified email). It shows a notice rather
   than a fake success state. Re-test the form responsive layout after wiring an endpoint.
7. **`/404/`** correctly returns HTTP 404 (the single console error on that page is expected).

---

## 4. Fix strategy (for reference)

Root cause of the original mobile overflow was the contact form's `<select>`
whose long option labels set a large **min-content** width that propagated up
through `.form-row → .enquiry-form → .form-wrap → .contact-col`.

Fixes applied in `src/styles/global.css` (never a global `overflow-x: hidden`):

- Fluid spacing tokens: `--page-gutter`, `--section-space`, `--card-padding` via `clamp()`.
- `min-width: 0` on grid/flex children and `minmax(0, 1fr)` tracks everywhere.
- `max-width: 100%; min-width: 0` on form controls.
- `overflow-wrap` on long unbreakable strings.
- Touch targets raised to 44px: header burger, footer nav links, breadcrumb links,
  card links, NAP "Get directions" link.

---

## 5. Homepage rebuild — interactive 3D hero

The homepage was rebuilt around a compact two-column hero with an interactive
Three.js scale model on the right (desktop) and stacked on mobile/tablet.

**Assets & architecture**

- `src/components/Hero3D.astro` — the stage: `<canvas>` (role `img`, labelled),
  a static poster `fallback` (`public/images/hero.svg`), a loader, a reset-camera
  button, and the honest caption *"Interactive illustrative model — not a client
  commission."* The caption is a **sibling** of the `figure`, so it is never clipped.
- `src/scripts/model-scene.ts` — exports `mountModelScene()`; procedural site/towers/
  trees, `PCFSoft` shadows, DPR ≤ 2, OrbitControls (no pan, zoom-clamped, gentle
  auto-rotate that pauses on interaction), rAF gated by `IntersectionObserver` +
  `visibilitychange`, full `dispose()` on `pagehide`.
- Loading is progressive: WebGL guard → `fallback`; dynamic `import()` → `ready`.
  `prefers-reduced-motion: reduce` disables auto-rotate and tweening.

**Layout contract**

- `.hero__grid` becomes two columns at **960px**; `.hero3d` is capped at
  `max-width: 34rem` (544px) and centred, so the stage never dominates the fold.
- `.hero3d__caption` is `width: 100%; max-width: 34rem` and aligns with the figure.
- The trust strip (`.trust-strip`) is 3-up at **720px**.

**Measured results**

| Width | Hero height | 3D figure | Notes |
| --- | --- | --- | --- |
| 768 | 1237px | 544×408 | stage capped & centred |
| 820 | 1255px | 544×408 | stage centred |
| 1024 | 1024px | 427×320 | 2-col engages |
| 1280 | 921px | 508×381 | CTAs above 900px fold |
| 1440 | ~921px | 508×381 | container capped |

Figure aspect ratio is exactly **4:3 (1.333)** at every width; `overflowX = 0`
everywhere; `[data-hero3d]` reaches `data-state="ready"` at every width; homepage
console clean (0 errors).

**Palette & section rhythm (for reference)**

- Palette: charcoal `#15181e` / `#20242b`/`#2a2f38`, gold `#c7974a` (soft `#ddb877`,
  ink `#8a6428`, tint `rgba(199,151,74,0.12)`), warm-white `#f7f5f0`, light-gray
  `#efede8`, text `#23272f`, muted `#657080`.
- Utilities: `.split` (1-col → `1.05fr / 0.95fr` at 880px), `.section--tight`,
  `.section--gray`/`--alt`, `.section-head`, `.eyebrow`, `.lead`.
- Homepage sequence: Header → 3D hero → trust strip → intro `.split` → ServiceGrid →
  BenefitsList → Workflow → ProjectGrid (limit 3) → RelatedGuides → FaqSection → CtaBand.

> **Fallback note.** If WebGL is unavailable the poster SVGs stand in; the layout
> was re-audited with the 3D stage in `fallback` state and shows no overflow.
