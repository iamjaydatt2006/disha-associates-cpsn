# Deploying to Cloudflare Pages — Disha Associates

**Target:** a fast, free static deployment on Cloudflare Pages, with security headers, caching, custom domain and HTTPS.

**Last updated:** 2026-10-13

---

## 0. Prerequisites

- Node.js 18+ and npm installed locally.
- A **Cloudflare account** (free tier is sufficient).
- The site in a **Git repository** (GitHub or GitLab recommended) — Pages builds on push.
- Confirmed build settings (below). The production URL currently configured in code is
  `https://dishaassociatescpsn.pages.dev` (see `src/data/site.ts`).

> **Before the first production deploy, set the real domain.** If the final domain is not
> `dishaassociatescpsn.pages.dev`, update `baseUrl` in `src/data/site.ts` **first**, rebuild,
> and only then deploy — otherwise canonical tags and the sitemap will point to the wrong host.

---

## 1. Build settings (Astro → Cloudflare Pages)

| Setting | Value |
| --- | --- |
| Framework preset | **Astro** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `18` or `20` (set `NODE_VERSION=20` if the build fails on the default) |
| Root directory | `/` (repo root) |

`astro.config.mjs` already sets `output: "static"` and `trailingSlash: "always"`, so the build
emits folder-style URLs (`/contact/index.html`) which Cloudflare Pages serves cleanly.

---

## 2. Deploy via the Cloudflare dashboard (recommended)

1. Push the project to GitHub/GitLab.
2. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorise Cloudflare for the repo and select it.
3. Enter the project name (e.g. `disha-associates`).
4. Confirm the build settings from §1 and click **Save and Deploy**.
4. Wait for the first build. The site becomes available at
   `https://<project-name>.pages.dev`.

Every push to the production branch (usually `main`) triggers a new production deploy.
Every other branch / PR creates a **preview deployment** at a unique URL — use these for review.

---

## 2b. Deploy from the CLI (alternative / one-off)

```bash
npm install -g wrangler
npm run build
npx wrangler pages project create disha-associates
npx wrangler pages deploy dist --project-name=disha-associates
```

Use this for a quick manual deploy, but **Git integration is preferred** for repeatable,
automatic deployments.

---

## 2. Continuous deployment from Git (recommended for handover)

1. Push the repo to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorise and pick the repository.
4. Set the build settings from §1, then **Save and deploy**.
- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
5. Every push to the production branch triggers a new build; pull requests get **Preview deployments** at unique URLs.

---

## 3. Custom domain & HTTPS

1. In the Pages project → **Custom domains** → **Set up a custom domain**.
2. If the domain's DNS is on Cloudflare, the CNAME is added automatically. Otherwise add the record the dashboard shows (usually `CNAME` → `<project>.pages.dev`).
- Apex/root domain supported.
2. HTTPS is issued automatically (Cloudflare-managed certificate). Force HTTPS with **Always Use HTTPS** in SSL/TLS settings.
3. Add `www` → apex redirect if desired (Rules → Redirect Rules, 301).

After the domain resolves, **update `baseUrl` in `src/data/site.ts` to the final domain, redeploy, and re-submit the sitemap** (see `google-search-console-setup.md`).

---

## 2. Caching & security headers

These are already provided by `public/_headers` and are applied automatically by Pages:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- Long-lived immutable caching for `/_astro/*` (hashed assets), 7-day caching for `/images/*`, 1 hour for `/robots.txt`.

To change them, edit `public/_headers` and redeploy. Optionally add `_redirects` in `public/` for old-URL redirects (e.g. if the site previously lived at another address).

---

## 3. Preview deployments

Every push to a non-production branch (and every PR) produces a unique preview URL. Use these to:

- Review content/metadata changes before they hit production.
- Set `noindex` on previews is **not** automatic — do not promote a preview to production without checking, and avoid submitting preview URLs to GSC.

---

## 4. Rollbacks

Cloudflare Pages keeps every deployment. To roll back: **Deployments → pick a previous deployment → ⋯ → Rollback to this deployment**. This restores that version of the static site immediately.

---

## 5. Post-deploy verification

1. Visit the live URL; confirm HTTPS, no mixed content, and that the homepage loads.
2. Check `https://<domain>/robots.txt` and `https://<domain>/sitemap.xml` load correctly and reference the live domain.
3. Confirm `trailing-slash` URLs resolve (e.g. `/projects/` not `/projects`).
4. Load a guide page and view source: confirm unique `<title>`, canonical, and JSON-LD.
5. Run Lighthouse (mobile) and confirm LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200 ms targets.
6. Submit the sitemap in Google Search Console.

---

## 6. Continuous deployment flow (recommended)

```
edit → git commit → push to main
   └─> Cloudflare Pages builds (npm run build → dist)
        └─ live in ~1–2 min
```

If builds run through a CI provider other than Pages, add `npm run check` before the build to catch type/Astro errors early. The same command is what a developer runs locally.
