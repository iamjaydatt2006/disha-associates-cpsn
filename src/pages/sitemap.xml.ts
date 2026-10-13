import type { APIRoute } from "astro";
import { absoluteUrl } from "../data/site";
import { guides } from "../data/guides";

/**
 * Hand-rolled sitemap so no extra integration dependency is required.
 * Add a path here whenever a new indexable page is created.
 * The 404 page and any noindex page must NOT be listed.
 */
const pages: { path: string; priority: number; changefreq: string }[] = [
  { path: "/", priority: 1.0, changefreq: "monthly" },
  { path: "/architectural-model-making/", priority: 0.9, changefreq: "monthly" },
  { path: "/residential-building-models/", priority: 0.8, changefreq: "monthly" },
  { path: "/commercial-building-models/", priority: 0.8, changefreq: "monthly" },
  { path: "/industrial-models/", priority: 0.8, changefreq: "monthly" },
  { path: "/landscape-township-models/", priority: 0.8, changefreq: "monthly" },
  { path: "/infrastructure-models/", priority: 0.8, changefreq: "monthly" },
  { path: "/projects/", priority: 0.8, changefreq: "monthly" },
  { path: "/guides/", priority: 0.7, changefreq: "monthly" },
  ...guides.map((g) => ({
    path: `/guides/${g.slug}/`,
    priority: 0.6,
    changefreq: "yearly",
  })),
  { path: "/contact/", priority: 0.7, changefreq: "monthly" },
  { path: "/about/", priority: 0.6, changefreq: "yearly" },
  { path: "/privacy-policy/", priority: 0.3, changefreq: "yearly" },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const body = pages
    .map(
      ({ path, priority, changefreq }) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`,
    )
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
