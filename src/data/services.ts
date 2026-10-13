/**
 * Service catalogue. This drives the homepage cards, the primary navigation
 * "Services" menu and the footer. Only services the business provides are
 * listed. If a service is not confirmed, keep `confirmed: false` so it is
 * flagged for owner review (OWNER-TODO).
 */

export interface ServiceCard {
  /** Route path (trailing slash handled by the site config). */
  href: string;
  /** Card + navigation title. */
  title: string;
  /** Short navigation label. */
  navLabel: string;
  /** One-sentence summary for cards and meta descriptions. */
  summary: string;
  /** Descriptive alt text for the card image. */
  imageAlt: string;
  /** Card / page image (placeholder asset until real photography is supplied). */
  image: string;
  /** Tiny inline emblem key used by the card. */
  emblem: "residential" | "commercial" | "industrial" | "landscape" | "infrastructure" | "custom";
  /**
   * true  = service content is ready to publish
   * false = content flagged for owner review before publication (OWNER-TODO)
   */
  confirmed: boolean;
}

export const services: ServiceCard[] = [
  {
    href: "/residential-building-models/",
    title: "Residential Building Scale Models",
    navLabel: "Residential Models",
    summary:
      "Physical scale models of individual homes, apartment buildings, housing societies and residential schemes, built for design presentation and sales showcases.",
    imageAlt:
      "Placeholder illustration of a physical architectural scale model of a residential apartment building",
    image: "/images/service-residential.svg",
    emblem: "residential",
    confirmed: true,
  },
  {
    href: "/commercial-building-models/",
    title: "Commercial Building Models",
    navLabel: "Commercial Models",
    summary:
      "Presentation models of office buildings, retail and mixed-use developments, hotels and commercial complexes for client approvals and marketing.",
    imageAlt:
      "Placeholder illustration of a physical architectural scale model of a commercial office and retail complex",
    image: "/images/service-commercial.svg",
    emblem: "commercial",
    confirmed: true,
  },
  {
    href: "/industrial-models/",
    title: "Industrial Scale Models",
    navLabel: "Industrial Models",
    summary:
      "Scale models of factories, warehouses, plants and industrial facilities used for planning, stakeholder communication and technical presentation.",
    imageAlt:
      "Placeholder illustration of a physical scale model of an industrial factory and warehouse complex",
    image: "/images/service-industrial.svg",
    emblem: "industrial",
    confirmed: true,
  },
  {
    href: "/landscape-township-models/",
    title: "Landscape and Township Models",
    navLabel: "Landscape & Township",
    summary:
      "Large-format township, master-plan and landscape models that show roads, green areas, water bodies and site context at a readable scale.",
    imageAlt:
      "Placeholder illustration of a physical landscape and township scale model showing roads, greenery and water features",
    image: "/images/service-landscape.svg",
    emblem: "landscape",
    confirmed: true,
  },
  {
    href: "/infrastructure-models/",
    title: "Infrastructure Project Models",
    navLabel: "Infrastructure",
    summary:
      "Models of bridges, roads, transport nodes and public infrastructure that communicate engineering intent and project scope clearly.",
    imageAlt:
      "Placeholder illustration of a physical scale model of a bridge and road infrastructure project",
    image: "/images/service-infrastructure.svg",
    emblem: "infrastructure",
    confirmed: true,
  },
  {
    href: "/architectural-model-making/",
    title: "Custom Architectural Presentation Models",
    navLabel: "Custom Presentation Models",
    summary:
      "Purpose-built architectural models tailored to a specific presentation, competition, exhibition or stakeholder meeting — scale, detail and finish agreed with you.",
    imageAlt:
      "Placeholder illustration of a bespoke architectural presentation scale model on a studio display table",
    image: "/images/service-custom.svg",
    emblem: "custom",
    confirmed: true,
  },
];
