/**
 * ============================================================================
 * GUIDES / HELP ARTICLES
 * ============================================================================
 *
 * Supporting, informational content that answers the questions architects,
 * builders, developers and students ask before commissioning a physical scale
 * model. This drives long-tail and informational search traffic and feeds
 * internal links to the service pages.
 *
 * Content rules (same as the rest of the site):
 *  - No invented prices, turnaround times, project counts, awards or clients.
 *  - Only general, factual industry knowledge and honest descriptions of how
 *    Disha Associates works.
 *  - Every guide must be genuinely useful on its own; no thin doorway pages.
 *
 * To add a guide: append an entry here, then add its path to
 * src/pages/sitemap.xml.ts. The /guides/ hub and internal links update
 * automatically.
 * ============================================================================
 */

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Render `bullets` as an ordered (<ol>) list. */
  ordered?: boolean;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface Guide {
  /** URL slug (final route is /guides/<slug>/). */
  slug: string;
  /** Visible H1. */
  title: string;
  /** Unique <title> tag. */
  seoTitle: string;
  /** Unique meta description. */
  description: string;
  /** Short eyebrow / category label. */
  eyebrow: string;
  /** Hub-card one-liner. */
  summary: string;
  /** ISO date of last meaningful edit. */
  updated: string;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  /** Opening paragraphs (above the first heading). */
  intro: string[];
  sections: GuideSection[];
  /** Key takeaways shown in a highlighted box. */
  takeaways?: string[];
  /** Service-page hrefs this guide links to. */
  relatedServices: string[];
  /** Optional short FAQ emitted as FAQPage structured data. */
  faqs?: GuideFaq[];
}

export const guides: Guide[] = [
  {
    slug: "what-is-an-architectural-scale-model",
    title: "What Is an Architectural Scale Model?",
    seoTitle: "What Is an Architectural Scale Model? A Plain-English Guide | Disha Associates",
    description:
      "An architectural scale model is a physical, to-scale 3D representation of a building or site. Learn what scale models are, how they are used and how they differ from renders.",
    eyebrow: "Guide",
    summary:
      "A plain-English explanation of physical architectural scale models: what they are, what they show and why they still matter.",
    updated: "2026-10-13",
    readingMinutes: 6,
    intro: [
      "An architectural scale model is a physical, three-dimensional representation of a building, site or development, built to a fixed ratio so that every part is smaller than the real thing by the same amount. A model at 1:100, for example, makes one metre on the real building equal one centimetre on the model.",
      "Because the whole object is reduced by the same ratio, proportion, massing and spatial relationships stay true. You can look at a model from any angle, walk around it and understand a project in a way that a flat drawing rarely allows.",
    ],
    sections: [
      {
        heading: "What a scale model actually shows",
        paragraphs: [
          "A well-made model is not a miniature replica of everything. It is a selective, edited representation built to communicate specific things clearly:",
        ],
        bullets: [
          "Massing and form — how volumes sit together and read from different directions.",
          "Proportion and scale — how the building relates to the site and to a human figure.",
          "Context — surrounding buildings, roads, landscape and boundaries.",
          "Design intent — the moves the architect wants an audience to notice.",
        ],
      },
      {
        heading: "How a scale model is used",
        paragraphs: [
          "Physical models are used wherever a project has to be understood and agreed by people who are not reading technical drawings all day. Common uses include:",
        ],
        bullets: [
          "Client approvals, where a committee or client needs to grasp a scheme quickly.",
          "Sales and marketing, where a model helps buyers picture a development.",
          "Design development, where a physical model exposes problems that a screen hides.",
          "Competitions, tenders and public consultation, where clarity wins support.",
          "Exhibitions and institutional display, where a model becomes a centrepiece.",
        ],
      },
      {
        heading: "How a model is made",
        paragraphs: [
          "Every studio works a little differently, but the general path from drawings to finished model is consistent. First, the design is understood from the plans, elevations and sections (plus any 3D files or renders that exist). The scale and level of detail are then agreed with the client, alongside the display base.",
          "The model is built up in layers — base and site, structure and massing, then facade detail and landscape — and finished with the materials, colour and any lighting chosen for the presentation. The final piece is checked against the drawings and delivered ready to display.",
        ],
      },
      {
        heading: "A physical model vs a 3D render",
        paragraphs: [
          "Renders and physical models are complementary tools, not rivals. A render is fast, easy to revise and can show lighting, materials and views that do not exist yet. A physical model is slower to produce but is tactile, truthful about scale and impossible to fake: it shows exactly what the volumes do in three dimensions.",
          "In practice, many projects use both. Renders sell an atmosphere; a physical model answers the harder questions about form, proportion and context. For a decision-making meeting, a model gives everyone the same reference point to gather around.",
        ],
      },
      {
        heading: "What kinds of project can be modelled",
        paragraphs: [
          "Any project that can be described with drawings can usually be modelled, from a single residence to a large master plan.",
        ],
        bullets: [
          "Residential homes, apartment buildings, housing societies and schemes.",
          "Commercial offices, retail, hotels and mixed-use complexes.",
          "Industrial plants, warehouses and factory buildings.",
          "Landscape, township and master-plan developments.",
          "Bridges, roads, transport nodes and wider infrastructure projects.",
        ],
      },
    ],
    takeaways: [
      "A scale model is a physical, to-scale 3D representation built from drawings.",
      "It communicates massing, proportion, context and design intent — fast.",
      "Models and renders are complementary, not alternatives.",
      "Almost any project described in drawings can be modelled.",
    ],
    relatedServices: [
      "/architectural-model-making/",
      "/residential-building-models/",
      "/commercial-building-models/",
    ],
    faqs: [
      {
        question: "Is a scale model the same as a 3D render?",
        answer:
          "No. A render is a digital image; a scale model is a physical object you can walk around and present in person. They are complementary — renders sell atmosphere, while a physical model communicates true form and proportion.",
      },
      {
        question: "Do I need a 3D model already to get a physical model made?",
        answer:
          "Not necessarily. Physical models can be built from plans, elevations and sections alone. Existing 3D files or renders help, but they are not essential to start.",
      },
    ],
  },
  {
    slug: "how-to-choose-model-scale",
    title: "How to Choose the Right Scale for an Architectural Model",
    seoTitle: "How to Choose the Right Scale for an Architectural Model | Disha Associates",
    description:
      "A practical guide to architectural model scales — 1:50, 1:100, 1:200, 1:500 and more — and how to match the scale to detail, display space and audience.",
    eyebrow: "Guide",
    summary:
      "How to pick a model scale that shows the right detail and still fits the space you have to display it.",
    updated: "2026-10-13",
    readingMinutes: 7,
    intro: [
      "Choosing a scale is one of the first decisions in any model-making project, and it is usually simpler than it looks. Two questions decide almost everything: how much detail the model must show, and how much space you have to display it.",
      "Get those two things right and the scale usually chooses itself. Get them wrong and you either build a model too small to read or too large to fit the room.",
    ],
    sections: [
      {
        heading: "The two questions that decide everything",
        paragraphs: [
          "First: how much detail must the model show? A model that only needs to convey massing and site context can be smaller than one that has to show window bays, balconies and facade materials. Second: where will the model be displayed, and how much floor or table space is available?",
          "The scale is the compromise between these two answers. Larger scale means more detail and a bigger model. Smaller scale means less detail but a model that fits into a smaller footprint and covers more ground.",
        ],
      },
      {
        heading: "Common modelling scales and what they suit",
        paragraphs: [
          "These ratios are conventions used across the industry, not hard rules. Use them as a starting point and adjust to the project.",
        ],
        bullets: [
          "1:50 — a large, detailed model of part or all of a small building; good for showpiece facade detail.",
          "1:100 — the everyday presentation scale for a single building; good balance of detail and size.",
          "1:200 — a whole building or a few blocks; massing reads clearly with moderate detail.",
          "1:500 — larger sites, campuses and neighbourhoods; context matters more than facade detail.",
          "1:1000 and smaller — township master plans and very large sites; buildings become simplified blocks.",
        ],
      },
      {
        heading: "Scale, model size and display space",
        paragraphs: [
          "It helps to work in reverse. Measure the space you have to display the model, then ask what real-world area the model can cover at a given scale. A 1:100 model covers one tenth the footprint of the same site at 1:50, so halving the scale quarters the floor area the model occupies.",
          "If a whole site has to be shown but the display table is small, a smaller scale solves it — at the cost of fine detail. If detail is the priority, either accept a larger model or model only the part of the site that needs it.",
        ],
      },
      {
        heading: "When to go larger or smaller",
        paragraphs: [
          "Choose a larger scale (like 1:50 or 1:100) when the audience needs to understand materials, facade articulation, internal layouts or a specific architectural move. Choose a smaller scale (1:500 or below) when the story is about the site, the master plan, roads, landscape and how buildings relate to one another.",
          "Mixed approaches work well too: a detailed model of the key building presented on a simplified site base, so the centrepiece reads clearly without modelling the whole context at the same level.",
        ],
      },
      {
        heading: "Match the scale to the audience",
        paragraphs: [
          "Different audiences need different things from the same project. A planning committee usually wants context and massing, which suits a smaller scale. A sales team showcasing a flagship building may want the detail and presence of a larger model. An exhibition may need something durable and visually striking that draws people across a room.",
          "Telling your model maker who will see the model — and what you want them to take away — is often more useful than specifying a scale yourself. The scale can then be chosen around that outcome.",
        ],
      },
    ],
    takeaways: [
      "Detail required and display space are the two deciding factors.",
      "1:100 is the common all-round presentation scale for one building.",
      "Halve the scale and the model's floor area drops to a quarter.",
      "Model only what matters most; mixed levels of detail often work best.",
    ],
    relatedServices: [
      "/architectural-model-making/",
      "/landscape-township-models/",
      "/residential-building-models/",
    ],
    faqs: [
      {
        question: "What is the most common scale for an architectural model?",
        answer:
          "1:100 is the most common all-round presentation scale for a single building because it balances usable detail with a manageable model size. The right scale still depends on the project and where it will be displayed.",
      },
      {
        question: "Can part of a building be modelled at a larger scale?",
        answer:
          "Yes. Modelling part of a building at a larger scale, or placing a detailed building on a simplified site base, is a common way to show key detail while keeping the overall model a sensible size.",
      },
    ],
  },
  {
    slug: "what-affects-the-cost-of-a-scale-model",
    title: "What Affects the Cost of an Architectural Scale Model?",
    seoTitle: "What Affects the Cost of an Architectural Scale Model? | Disha Associates",
    description:
      "Scale models are priced per project, not from a fixed list. Understand the factors that drive cost — area, detail, materials, lighting, site complexity and base.",
    eyebrow: "Guide",
    summary:
      "The genuine factors that move the cost of a physical model, and how to control them without losing impact.",
    updated: "2026-10-13",
    readingMinutes: 5,
    intro: [
      "Architectural models are priced per project rather than from a fixed price list, because two models of the same building can differ enormously in the work they require. Understanding what drives cost helps you brief a model maker accurately and spend where it matters.",
      "This guide explains the factors that move the price. It deliberately does not quote figures — the only reliable number is a quotation prepared against your own drawings.",
    ],
    sections: [
      {
        heading: "Cost follows scope, not a price list",
        paragraphs: [
          "A physical model is a bespoke object. There is no standard unit you can multiply by a quantity, because the effort depends on the design itself: how complex the geometry is, how much of it is visible, how much detail is wanted and how it will be finished. That is why a responsible model maker asks to see your drawings before quoting.",
        ],
      },
      {
        heading: "The factors that move the cost",
        bullets: [
          "Surface area modelled — more floors, facades and site area mean more work.",
          "Level of detail — simplified blocks cost far less than articulated facades and interiors.",
          "Materials and finishes — standard presentation finishes differ in effort from exhibition-grade work.",
          "Lighting and moving parts — integrated lighting, removable sections and cutaways add complexity.",
          "Site complexity — irregular terrain, dense context and intricate landscaping take longer.",
          "Display base or case — a plain base, a landscaped base or a protective case are different jobs.",
          "Drawing quality and revisions — clear drawings and a settled design reduce wasted effort.",
          "Deadline and logistics — compressed timelines and long-distance delivery add cost.",
        ],
      },
      {
        heading: "How to control cost without losing impact",
        paragraphs: [
          "The single biggest saving is focus. Decide what the model must communicate to its audience and invest detail there, keeping everything else simple. A beautifully detailed building on a clean, simple site base often reads better — and costs less — than an evenly detailed model of everything.",
        ],
        bullets: [
          "Fix the design before modelling starts to avoid reworking finished parts.",
          "Choose a scale that shows just enough detail, not more than the audience needs.",
          "Reserve premium finishes and lighting for the areas people will actually study.",
          "Provide clean, up-to-date drawings and any 3D files you already have.",
        ],
      },
      {
        heading: "What to send for an accurate quotation",
        paragraphs: [
          "A quotation is only as accurate as the information behind it. To price a model properly, a studio needs to understand the building and how the model will be used.",
        ],
        bullets: [
          "Site plan, floor plans, elevations and sections.",
          "Any existing 3D files, models or renders (for example DWG, SKP, RVT, PDF or images).",
          "The intended use — approval, sales, exhibition or design development.",
          "The display location and approximate space available.",
          "Any hard deadline and the delivery location.",
        ],
      },
    ],
    takeaways: [
      "Models are quoted per project, not from a fixed price list.",
      "Surface area, detail, materials, lighting and site complexity drive cost.",
      "Focusing detail where the audience looks is the biggest saving.",
      "Send drawings, intended use and display space for an accurate quote.",
    ],
    relatedServices: [
      "/architectural-model-making/",
      "/commercial-building-models/",
      "/infrastructure-models/",
    ],
    faqs: [
      {
        question: "Why can't you quote a fixed price for a scale model?",
        answer:
          "Because a model is a bespoke object and the effort depends on the specific design — its complexity, level of detail, materials and finish. Two models of the same building can require very different amounts of work, so an accurate price can only follow a review of your drawings.",
      },
      {
        question: "Does a larger model always cost more?",
        answer:
          "Not automatically. A larger model at a simplified level of detail can cost less than a small model with highly detailed facades and interiors. Effort is driven by detail and complexity as much as by size.",
      },
    ],
  },
];

/** Look up a guide by slug. */
export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** Resolve related-service hrefs to a display label + href for link lists. */
export const serviceLabels: Record<string, string> = {
  "/architectural-model-making/": "Custom Architectural Presentation Models",
  "/residential-building-models/": "Residential Building Scale Models",
  "/commercial-building-models/": "Commercial Building Models",
  "/industrial-models/": "Industrial Scale Models",
  "/landscape-township-models/": "Landscape & Township Models",
  "/infrastructure-models/": "Infrastructure Project Models",
};
