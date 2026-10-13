/**
 * JSON-LD builders.
 *
 * Rules enforced here:
 *  - Only VERIFIED information is emitted (phone, hours, social are omitted
 *    until the owner supplies them).
 *  - One business entity (@id = <baseUrl>#business) is reused everywhere so no
 *    conflicting LocalBusiness entities are created across pages.
 *  - Nothing is invented: no aggregateRating, review, priceRange or awards.
 *
 * Valid JSON-LD does NOT guarantee rich results; validate at
 * https://search.google.com/test/rich-results and https://validator.schema.org/
 */
import { site, absoluteUrl } from "./site";

const BUSINESS_ID = `${site.baseUrl.replace(/\/$/, "")}/#business`;
const WEBSITE_ID = `${site.baseUrl.replace(/\/$/, "")}/#website`;

export function businessNode() {
  const node: Record<string, unknown> = {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: site.name,
    description: site.descriptor,
    url: absoluteUrl("/"),
    image: absoluteUrl("/images/og-default.svg"),
    logo: absoluteUrl("/logo.svg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: site.address.locality },
      { "@type": "State", name: site.address.region },
      { "@type": "Country", name: site.address.country },
    ],
    knowsAbout: [
      "Architectural scale model making",
      "Physical architectural models",
      "Building presentation models",
      "Residential building models",
      "Commercial building models",
      "Industrial scale models",
      "Landscape and township models",
      "Infrastructure project models",
    ],
    hasMap: site.mapsShareUrl,
  };

  if (site.contact.phone.verified && site.contact.phone.value) {
    node.telephone = site.contact.phone.value;
  }
  if (site.contact.email.verified && site.contact.email.value) {
    node.email = site.contact.email.value;
  }
  if (site.hours.verified && site.hours.value.length > 0) {
    node.openingHoursSpecification = site.hours.value.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  if (site.social.length > 0) {
    node.sameAs = site.social.map((s) => s.url);
  }
  return node;
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.name,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-IN",
  };
}

export function webPageNode(opts: { path: string; name: string; description: string }) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
  };
}

export function breadcrumbNode(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceNode(opts: { name: string; description: string; path: string }) {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    url: absoluteUrl(opts.path),
    provider: { "@id": BUSINESS_ID },
    areaServed: [
      { "@type": "City", name: site.address.locality },
      { "@type": "State", name: site.address.region },
    ],
  };
}

export function articleNode(opts: {
  path: string;
  headline: string;
  description: string;
  dateModified: string;
  /** Image path (absolute or site-relative). */
  image: string;
}) {
  const img = opts.image.startsWith("http") ? opts.image : absoluteUrl(opts.image);
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    image: img,
    inLanguage: "en-IN",
    dateModified: opts.dateModified,
    mainEntityOfPage: { "@id": `${absoluteUrl(opts.path)}#webpage` },
    author: { "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
  };
}

export function faqNode(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
