// @ts-check
import { defineConfig } from "astro/config";

// ---------------------------------------------------------------------------
// PRODUCTION DOMAIN
// ---------------------------------------------------------------------------
// The canonical production domain is configured in ONE place: src/data/site.ts
// (`site` + `baseUrl`). This file reads the same value so canonical URLs,
// the sitemap and Open Graph URLs always stay in sync.
//
// Default is the existing Cloudflare Pages host. Replace it with the confirmed
// custom domain when one exists (see README "Before launch").
// ---------------------------------------------------------------------------

import { site as siteData } from "./src/data/site.ts";

export default defineConfig({
  site: siteData.baseUrl,
  // Clean URLs with consistent trailing slashes across every route.
  trailingSlash: "always",
  // Static output — no server runtime required (works on Cloudflare Pages).
  output: "static",
  build: {
    // Ship small, well-scoped CSS rather than one monolithic bundle.
    inlineStylesheets: "auto",
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
  },
});
