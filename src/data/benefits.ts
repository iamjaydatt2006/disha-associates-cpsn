/**
 * Shared credibility / benefit content used on the homepage and service pages.
 * These are capability statements about how the studio works — not invented
 * statistics, awards or numbers. Adjust to reflect real practice (OWNER-TODO).
 */
import type { ComponentProps } from "astro/types";
import type Icon from "../components/Icon.astro";

type IconName = ComponentProps<typeof Icon>["name"];

export interface Benefit {
  icon: IconName;
  title: string;
  description: string;
}

export const whyChoose: Benefit[] = [
  {
    icon: "scale",
    title: "Scale and detail chosen with purpose",
    description:
      "Scale and level of detail are agreed around your presentation and the space available, so the model reads clearly rather than simply being large.",
  },
  {
    icon: "drafting",
    title: "Built from your own drawings",
    description:
      "Models are developed from your plans, elevations, sections and 3D files, keeping the physical model faithful to the design you are presenting.",
  },
  {
    icon: "palette",
    title: "Finishes matched to the context",
    description:
      "Materials and finishes are selected to suit the project, its scale and how the model will be used — from clean presentation pieces to detailed exhibition work.",
  },
  {
    icon: "message",
    title: "Clear, structured communication",
    description:
      "From enquiry through to delivery, you deal directly with the people making your model, with the scope and quotation confirmed in writing before production.",
  },
  {
    icon: "layers",
    title: "Detail where it matters",
    description:
      "Effort is concentrated where the model needs to persuade — facades, entrances, landscaping, context and the aspects your audience will focus on.",
  },
  {
    icon: "presentation",
    title: "Purpose-built for presentations",
    description:
      "Models are built for a specific use — client approvals, sales galleries, investor meetings or exhibitions — and finished to travel and display well.",
  },
];

/** Compact "what we make" statements reused across service pages. */
export const capabilities: string[] = [
  "Residential buildings, housing societies and schemes",
  "Commercial, retail, hotel and mixed-use developments",
  "Industrial plants, factories and warehousing",
  "Townships, master plans and landscape models",
  "Bridges, roads and public infrastructure",
  "Custom presentation and competition models",
];
