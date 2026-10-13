# Internal Linking Plan — Disha Associates

**Goal:** make the site's structure obvious to both users and crawlers, distribute page authority toward the commercial service pages, and guarantee no indexable page is orphaned.

**Last updated:** 2026-10-13

---

## 1. Structure at a glance

```
                         ┌─────────────┐
                         │   HOME  /   │
                         └──────┬──────┘
        ┌───────────────┬───────┼────────┬───────────────┐
        ▼               ▼       ▼        ▼               ▼
  ┌──────────┐   ┌───────────┐  │  ┌──────────┐   ┌──────────┐
  │ 6 SERVICE│   │  PROJECTS │  │  │ GUIDES/  │   │  ABOUT   │
  │  PAGES   │   │           │  │  │  (hub)   │   │          │
  └────┬─────┘   └───────────┘  │  └────┬─────┘   └──────────┘
       │                         │       │
       │  related guides ◄───────┼───────┘  guide → related services
       ▼                         ▼
  ┌──────────┐             ┌──────────┐
  │ CONTACT  │ ◄───────────│  GUIDES  │
  │ (goal)   │   CTA bands │ (3 pages)│
  └──────────┘             └──────────┘
```

Global chrome (header nav + footer) links to Home, the 6 services, Projects, Guides, About, Contact — so **every page is reachable from every page**.

---

## 2. Global navigation inventory

| Location | Links to |
| --- | --- |
| **Header (desktop + mobile)** | Home, Residential, Commercial, Industrial, Landscape & Township, Infrastructure, Custom Models (architectural-model-making), Projects, Guides, About, Contact |
| **Footer** | Services list (all 6), Company list (About, Projects, Guides, Contact), NAP block (when verified), Privacy Policy |
| **Breadcrumbs** | Every deeper page shows Home › Section › Page |
| **CTA band** | Every service/guide page ends with a Contact CTA |

---

## 3. Contextual internal linking rules

1. **Every guide links to ≥3 service pages** (via "Where to go next" + the `relatedServices` field).
2. **Every service page links to ≥3 guides** (via the `RelatedGuides` component on `ServiceLayout`).
3. **Homepage links out to:** all services (service grid), Projects (project grid), Guides (related-guides block), FAQ (supporting content), Contact (CTA).
4. **Anchor text must be descriptive** — e.g. "residential building scale models", not "click here".
5. **Never link two pages with identical anchor text to different targets** on the same page.
6. **Projects page** links to each service type it illustrates.
7. **About page** links to services and contact (credibility → action).
8. **Guides hub** links to all 3 guides; each guide cross-links to the other 2 ("Keep reading").

---

## 4. Link map (target → sources)

| Target page | Inbound internal links from |
| --- | --- |
| `/` | Header logo, footer logo, breadcrumbs on every page, 404 |
| `/architectural-model-making/` | Header nav, footer services, home service grid, **all 3 guides**, related-guides on other service pages, about |
| `/residential-building-models/` | Header nav, footer, home grid, guides 1 & 2, related-guides block, projects |
| `/commercial-building-models/` | Header nav, footer, home grid, guides 1 & 3, related-guides block, projects |
| `/industrial-models/` | Header nav, footer, home grid, related-guides block, projects |
| `/landscape-township-models/` | Header nav, footer, home grid, guide 2, related-guides block, projects |
| `/infrastructure-models/` | Header nav, footer, home grid, guide 3, related-guides block, projects |
| `/projects/` | Header nav, footer, home project grid, about |
| `/guides/` | Header nav, footer, home related-guides intro, cross-links from each guide |
| each `/guides/<slug>/` | Guides hub, home related-guides block, **every service page** (RelatedGuides), other guides ("Keep reading") |
| `/about/` | Header nav, footer, home |
| `/contact/` | Header nav, footer, every CTA band, sticky mobile bar (when contact verified), service pages |
| `/privacy-policy/` | Footer only (intentional) |

**No orphan risk:** the RelatedGuides block on service pages + the guides hub + global footer together guarantee every guide has multiple inbound internal links.

---

## 5. Authority flow (which pages we push)

- **Money pages** = the 6 service pages and Contact.
- Most contextual links point **toward** services from high-trust informational content (guides) and from the homepage.
- Guides receive authority from the homepage and service pages, then pass it on to services — a closed loop.
- Contact is the terminal action; it receives CTA links from almost every page.

---

## 6. Implementation notes (where links live in code)

| Link type | Component / file |
| --- | --- |
| Global nav | `src/components/Header.astro` |
| Global footer | `src/components/Footer.astro` |
| Breadcrumbs | passed as `crumbs` to `PageHero` from each page |
| Home service grid | `src/components/ServiceGrid.astro` (data from `src/data/services.ts`) |
| Home project grid | `src/components/ProjectGrid.astro` |
| Service → guides | `src/components/RelatedGuides.astro`, rendered by `src/layouts/ServiceLayout.astro` |
| Guides hub → guides | `src/pages/guides/index.astro` |
| Guide → services + other guides | `src/pages/guides/[slug].astro` (uses `relatedServices` + "Keep reading") |
| CTA band → contact | `src/components/CtaBand.astro` |

---

## 7. Maintenance & checks

- When adding a service: add it to `src/data/services.ts` (updates nav, footer, home grid) and add it to the relevant guides' `relatedServices`.
- When adding a guide: it auto-appears on the hub, in the home related-guides block and on every service page's RelatedGuides — no extra wiring.
- Periodically crawl with a tool to confirm zero orphan pages and zero broken internal links; fix any 404s.
- Keep anchor text natural and descriptive; avoid repeating the exact same phrase in every link to the same page.
