/**
 * PROJECT PORTFOLIO DATA
 * =======================
 *
 * OWNER-TODO — replace every entry below with a REAL completed project.
 *
 * While `placeholder: true`, each card is visibly labelled as a layout sample
 * and the Projects page shows a notice. Nothing here should be presented as a
 * real Disha Associates project. When you add a genuine project:
 *   1. set `placeholder: false`
 *   2. use the real project name, type and a short factual description
 *   3. reference real photographs you own the rights to (see README → Images)
 *   4. only include `scale` / `materials` if the client permits and they are true
 *
 * Do NOT upload stock or AI imagery as if it were a completed project.
 */
export interface Project {
  slug: string;
  /** Real project name, or an anonymised client-safe label. */
  name: string;
  /** Project category — one of the service types. */
  type: string;
  /** Short, factual description (1–2 sentences). */
  description: string;
  /** Optional, only when true and permitted by the client. */
  scale?: string;
  materials?: string;
  /** Image paths. First image is used as the card thumbnail. */
  images: string[];
  /** Descriptive alt text — never reuse the same string across projects. */
  imageAlt: string;
  /** true = layout sample only, not a real project. */
  placeholder: boolean;
}

export const projects: Project[] = [
  {
    slug: "sample-residential",
    name: "Replace with your residential project",
    type: "Residential",
    description:
      "Add a short, factual description of the model — the project type, what it showed and how it was used. Keep it to one or two sentences.",
    scale: "",
    materials: "",
    images: ["/images/project-placeholder.svg"],
    imageAlt:
      "Placeholder tile for a residential building scale model project — replace with a real photograph",
    placeholder: true,
  },
  {
    slug: "sample-commercial",
    name: "Replace with your commercial project",
    type: "Commercial",
    description:
      "Describe the commercial model here: the building type, the level of detail and the presentation it supported.",
    scale: "",
    materials: "",
    images: ["/images/project-placeholder.svg"],
    imageAlt:
      "Placeholder tile for a commercial building scale model project — replace with a real photograph",
    placeholder: true,
  },
  {
    slug: "sample-industrial",
    name: "Replace with your industrial project",
    type: "Industrial",
    description:
      "Describe the industrial model here: the facility type, what the model communicated and any notable detailing.",
    scale: "",
    materials: "",
    images: ["/images/project-placeholder.svg"],
    imageAlt:
      "Placeholder tile for an industrial scale model project — replace with a real photograph",
    placeholder: true,
  },
  {
    slug: "sample-township",
    name: "Replace with your township project",
    type: "Landscape & Township",
    description:
      "Describe the township or master-plan model here, including the area covered and the context shown.",
    scale: "",
    materials: "",
    images: ["/images/project-placeholder.svg"],
    imageAlt:
      "Placeholder tile for a landscape and township scale model project — replace with a real photograph",
    placeholder: true,
  },
  {
    slug: "sample-infrastructure",
    name: "Replace with your infrastructure project",
    type: "Infrastructure",
    description:
      "Describe the infrastructure model here: the asset type, its extent and how the model supported the presentation.",
    scale: "",
    materials: "",
    images: ["/images/project-placeholder.svg"],
    imageAlt:
      "Placeholder tile for an infrastructure scale model project — replace with a real photograph",
    placeholder: true,
  },
  {
    slug: "sample-custom",
    name: "Replace with your custom presentation model",
    type: "Custom Presentation",
    description:
      "Describe the bespoke presentation model here and the specific presentation or exhibition it was built for.",
    scale: "",
    materials: "",
    images: ["/images/project-placeholder.svg"],
    imageAlt:
      "Placeholder tile for a custom architectural presentation scale model project — replace with a real photograph",
    placeholder: true,
  },
];

/** True while any entry is still a layout sample. */
export const hasPlaceholderProjects = projects.some((p) => p.placeholder);
