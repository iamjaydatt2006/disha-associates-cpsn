import type { APIRoute } from "astro";
import { absoluteUrl } from "../data/site";
import { guides } from "../data/guides";

/**
 * Simple sitemap containing only URLs with full XML support.
 * The 404 page and any noindex page must NOT be listed.
 */
const pages: string[] = [
  "/",
  "/architectural-model-making/",
  "/residential-building-models/",
  "/commercial-building-models/",
  "/industrial-models/",
  "/landscape-township-models/",
  "/infrastructure-models/",
  "/projects/",
  "/guides/",
  ...guides.map((g) => `/guides/${g.slug}/`),
  "/contact/",
  "/about/",
  "/privacy-policy/",
];

export const GET: APIRoute = () => {
  const body = pages
    .map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
