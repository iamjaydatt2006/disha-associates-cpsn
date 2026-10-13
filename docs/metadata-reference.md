# Metadata Reference — Disha Associates

**Purpose:** a single source of truth for every indexable page's `<title>`, meta description, canonical URL, H1 and structured data. Use this when editing existing pages or adding new ones so metadata stays unique and consistent.

**Last updated:** 2026-10-13

---

## Rules

1. **Every page has a unique title and a unique meta description.** No duplicates, ever.
2. **Title format:** `Primary keyword | Disha Associates, Chhatrapati Sambhajinagar` (service pages), or a natural sentence for the home/about/projects pages. Keep under **~60 characters** where possible; up to 65 is acceptable.
3. **Meta description:** one human sentence, ~**140–160 characters**, written to earn the click (what you do + who it's for + where), not to stuff keywords.
4. **No claims** of best/leading/#1, no invented counts, prices or credentials.
5. **Canonical** = `baseUrl` + page path (trailing slash). Never a shared/duplicate canonical.
6. **H1** is set by each page (or by `ServiceLayout`), and is distinct from the `<title>` where natural.
7. `description` / `seoDescription` / `seoTitle` live **in the page or its service data file**, not in the layout.

---

## Page-by-page

| Page | URL | `<title>` | Meta description | Canonical | Schema |
| --- | --- | --- | --- | --- | --- |
| Home | `/` | Architectural Model Makers in Chhatrapati Sambhajinagar \| Disha Associates | Disha Associates is an architectural model-making studio in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. We build physical scale models of residential, commercial, industrial, landscape, township and infrastructure projects for presentations and client approvals. | `/` | Business + WebSite + WebPage |
| Architectural model making | `/architectural-model-making/` | Custom Architectural Presentation Models \| Disha Associates, Chhatrapati Sambhajinagar | Bespoke architectural presentation scale models built for a specific competition, exhibition, approval or investor meeting, by Disha Associates in Chhatrapati Sambhajinagar, Maharashtra. | `/architectural-model-making/` | Service + Breadcrumb + FAQ |
| Residential models | `/residential-building-models/` | Residential Building Scale Models \| Disha Associates, Chhatrapati Sambhajinagar | Physical scale models of homes, apartments, housing societies and residential developments, built by Disha Associates in Chhatrapati Sambhajinagar, Maharashtra. | `/residential-building-models/` | Service + Breadcrumb + FAQ |
| Commercial models | `/commercial-building-models/` | Commercial Building Scale Models \| Disha Associates, Chhatrapati Sambhajinagar | Presentation scale models of office, retail, hotel and mixed-use commercial developments by Disha Associates, an architectural model-making studio in Chhatrapati Sambhajinagar, Maharashtra. | `/commercial-building-models/` | Service + Breadcrumb + FAQ |
| Industrial models | `/industrial-models/` | Industrial Scale Models \| Disha Associates, Chhatrapati Sambhajinagar | Scale models of factories, warehouses and industrial facilities for planning, stakeholder communication and technical presentation, by Disha Associates in Chhatrapati Sambhajinagar, Maharashtra. | `/industrial-models/` | Service + Breadcrumb + FAQ |
| Landscape & township models | `/landscape-township-models/` | Landscape & Township Scale Models \| Disha Associates, Chhatrapati Sambhajinagar | Large-format township, master-plan and landscape scale models showing roads, green areas, water bodies and site context, by Disha Associates in Chhatrapati Sambhajinagar, Maharashtra. | `/landscape-township-models/` | Service + Breadcrumb + FAQ |
| Infrastructure models | `/infrastructure-models/` | Infrastructure Project Scale Models \| Disha Associates, Chhatrapati Sambhajinagar | Scale models of bridges, roads, transport nodes and public infrastructure that communicate engineering intent and project scope, by Disha Associates in Chhatrapati Sambhajinagar, Maharashtra. | `/infrastructure-models/` | Service + Breadcrumb + FAQ |
| Projects | `/projects/` | Projects \| Disha Associates Architectural Scale Models | A selection of architectural scale model projects by Disha Associates in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra — residential, commercial, industrial, landscape, township and infrastructure models. | `/projects/` | Breadcrumb (+ image/placeholders note) |
| Guides hub | `/guides/` | Architectural model-making guides \| Disha Associates | Plain-English guides to physical architectural scale models: what they are, how to choose a scale, and the factors that affect cost. Written by Disha Associates. | `/guides/` | WebPage + Article list + Breadcrumb |
| Guide: What is a scale model | `/guides/what-is-an-architectural-scale-model/` | What Is an Architectural Scale Model? A Plain-English Guide \| Disha Associates | An architectural scale model is a physical, to-scale 3D representation of a building or site. Learn what scale models are, how they are used and how they differ from renders. | `/guides/what-is-an-architectural-scale-model/` | Article + Breadcrumb + FAQ |
| Guide: Choosing a scale | `/guides/how-to-choose-model-scale/` | How to Choose the Right Scale for an Architectural Model \| Disha Associates | A practical guide to architectural model scales — 1:50, 1:100, 1:200, 1:500 and more — and how to match the scale to detail, display space and audience. | `/guides/how-to-choose-model-scale/` | Article + Breadcrumb + FAQ |
| Guide: Model cost | `/guides/what-affects-the-cost-of-a-scale-model/` | What Affects the Cost of an Architectural Scale Model? \| Disha Associates | Scale models are priced per project, not from a fixed list. Understand the factors that drive cost — area, detail, materials, lighting, site complexity and base. | `/guides/what-affects-the-cost-of-a-scale-model/` | Article + Breadcrumb + FAQ |
| About | `/about/` | About Disha Associates \| Architectural Model Makers in Chhatrapati Sambhajinagar | Disha Associates is an architectural model-making studio based in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, producing physical scale models for architects, builders, developers and consultants. | `/about/` | Breadcrumb + (Business) |
| Contact | `/contact/` | Contact Disha Associates \| Architectural Model Makers, Chhatrapati Sambhajinagar | Contact Disha Associates to discuss an architectural scale model. Based in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. Send your drawings and requirements for a project-specific quotation. | `/contact/` | Breadcrumb + (LocalBusiness contact when verified) |
| Privacy policy | `/privacy-policy/` | Privacy Policy \| Disha Associates | How Disha Associates handles information submitted through the website, including enquiry form data and the use of Google Maps embeds. | `/privacy-policy/` | Breadcrumb |
| 404 | (not indexed) | Page not found \| Disha Associates | The page you were looking for could not be found. Explore Disha Associates' architectural scale model services instead. | — | `noindex` |

---

## Social / Open Graph defaults

- `og:image` default: `/images/og-default.svg` (used until real banner photography exists).
- `og:type`: `website` for all pages except guides, which use `article`.
- Twitter card: `summary_large_image`.
- These are emitted from `src/components/BaseHead.astro` from the same `title` / `description` / `path` props — no separate maintenance needed.

---

## Adding a new page — checklist

1. Give it a **unique** title and description from the tables above pattern; keep within length guidance.
2. Pass `title`, `description`, `path` to `BaseLayout` (or `seoTitle` / `seoDescription` / `path` to `ServiceLayout`).
3. Add the JSON-LD nodes it needs (WebPage/breadcrumb, plus Service or Article/FAQ where relevant) via the `jsonLd` prop.
4. Add its path to `src/pages/sitemap.xml.ts`.
5. Mark `noindex` on any page that should not rank (thank-you, 404, staging).
6. Update this document.

---

## Verification

After edits run:

```bash
npm run check
npm run build
# then spot-check rendered <title>/<description>/canonical:
rg -o "<title>[^<]*</title>" dist/**/*.html
```

Confirm no two pages share a title or description, and every canonical is unique and absolute.
