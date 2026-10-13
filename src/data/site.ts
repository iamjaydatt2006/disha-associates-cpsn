/**
 * ============================================================================
 * DISHA ASSOCIATES — CENTRAL SITE DATA (SINGLE SOURCE OF TRUTH)
 * ============================================================================
 *
 * Editing rules:
 *  - Business facts that the owner has NOT yet supplied are stored as
 *    `verified: false` with an obvious, editable placeholder. Components only
 *    render clickable contact actions, JSON-LD phone/hours and the sticky
 *    mobile CTA when the matching value is `verified: true`.
 *  - Never invent phone numbers, emails, hours, reviews, awards, prices,
 *    project counts or years of experience.
 *
 * Search the codebase for the token  OWNER-TODO  to find every placeholder.
 * ============================================================================
 */

export interface ContactChannel {
  /** The real value once confirmed, e.g. "+91 98XXXXXXXX". Empty until supplied. */
  value: string;
  /** Set to true ONLY after the owner confirms this value. */
  verified: boolean;
  /** Human-readable placeholder shown in the UI + docs while unverified. */
  placeholder: string;
  /** Editable label explaining what the owner must provide. */
  todo: string;
}

export const site = {
  /** Real, verified business name — keep consistent with Google Business Profile. */
  name: "Disha Associates",
  /** Do not append service keywords to the GBP name. Kept plain on purpose. */
  shortName: "Disha Associates",
  tagline: "Architectural Scale Model Making",
  /** Short, factual descriptor of what the business does. */
  descriptor:
    "Architectural model making agency producing physical scale models for building presentations, construction projects and real estate developments.",

  /**
   * PRODUCTION DOMAIN  (OWNER-TODO — confirm the final domain)
   * Canonical URLs, sitemap and Open Graph tags all derive from this value.
   * Default is the existing Cloudflare Pages host. If a custom domain is
   * confirmed, change ONLY this line.
   */
  baseUrl: "https://dishaassociatescpsn.pages.dev",

  /** Verified postal address (matches the supplied business information). */
  address: {
    street: "Kamgar Chowk, Mayanagar Colony, N 2, CIDCO",
    locality: "Chhatrapati Sambhajinagar",
    region: "Maharashtra",
    postalCode: "431006",
    country: "India",
    countryCode: "IN",
  },

  /** Verified coordinates. */
  geo: {
    latitude: 19.873315124375427,
    longitude: 75.36855753381838,
    /** Google Maps Plus Code for the location. */
    plusCode: "V9F9+5C Chhatrapati Sambhajinagar, Maharashtra",
  },

  /** Shared Google Maps reference supplied by the owner. */
  mapsShareUrl: "https://share.google/qj6Z5a3oZgq43YCuR",

  /**
   * Canonical, embeddable Google Maps URL built from the VERIFIED coordinates.
   * Used for the "Get directions" link and the map embed (no API key needed).
   */
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=19.873315124375427,75.36855753381838",
  /** Keyless embed URL (maps?q=...&output=embed) — no API key, lazy-loaded. */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=19.873315124375427,75.36855753381838&hl=en&z=17&output=embed",

  /**
   * Contact channels.
   *  - phone + email: confirmed by the owner — safe to render, link and emit in
   *    JSON-LD.
   *  - whatsapp: NOT yet confirmed to be the same number, so it stays
   *    unverified and is not rendered or advertised as a WhatsApp channel.
   */
  contact: {
    phone: {
      value: "+91 80070 09922",
      verified: true,
      placeholder: "+91 XXXXX XXXXX",
      todo: "",
    } satisfies ContactChannel,
    whatsapp: {
      value: "",
      verified: false,
      placeholder: "+91 XXXXX XXXXX",
      todo: "Confirm whether the published phone number is also the WhatsApp business number (OWNER-TODO).",
    } satisfies ContactChannel,
    email: {
      value: "dishaassociatescpsn@gmail.com",
      verified: true,
      placeholder: "hello@your-domain.example",
      todo: "",
    } satisfies ContactChannel,
  },

  /**
   * Opening hours — UNVERIFIED. Not shown and not added to JSON-LD until set.
   * OWNER-TODO: provide genuine opening hours if the studio has public hours.
   */
  hours: {
    value: [] as Array<{ days: string; opens: string; closes: string }>,
    verified: false,
    todo: "Provide genuine opening hours, e.g. Mon–Sat 09:30–18:30 (OWNER-TODO).",
  },

  /** Optional social profiles — NONE supplied, so nothing is rendered. */
  social: [] as Array<{ label: string; url: string; icon: string }>,

  /** Regions the business serves. Broad but not invented city pages. */
  serviceArea: {
    primary: "Chhatrapati Sambhajinagar, Maharashtra",
    secondary:
      "Projects across Maharashtra, with enquiries welcome from elsewhere in India.",
  },
} as const;

/** True when at least one real contact channel is confirmed. */
export const hasVerifiedContact =
  site.contact.phone.verified ||
  site.contact.email.verified ||
  site.contact.whatsapp.verified;

/** Canonical absolute URL for a given path (page routes get a trailing slash). */
export function absoluteUrl(path: string): string {
  const base = site.baseUrl.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  // Asset paths (i.e. ending in a file extension) keep NO trailing slash.
  if (/\.[a-z0-9]{2,5}$/i.test(clean)) {
    return `${base}${clean}`;
  }
  return `${base}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

/** Single-line NAP string for visible UI + docs. */
export const napLines: string[] = [
  site.name,
  `${site.address.street},`,
  `${site.address.locality}, ${site.address.region} ${site.address.postalCode}, ${site.address.country}`,
  site.contact.phone.verified
    ? site.contact.phone.value
    : `Phone: ${site.contact.phone.placeholder} (OWNER-TODO)`,
];
