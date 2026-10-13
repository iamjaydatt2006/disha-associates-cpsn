/**
 * The model-making workflow shown on the homepage and service pages.
 * Adjust the wording to match the company's actual operations (OWNER-TODO).
 */
export interface WorkflowStep {
  title: string;
  description: string;
}

export const workflow: WorkflowStep[] = [
  {
    title: "Share your drawings and requirements",
    description:
      "Send site plans, floor plans, elevations, sections and any 3D files or renders. Tell us how the model will be used and the space available to display it.",
  },
  {
    title: "Discuss scale, materials and presentation goals",
    description:
      "We review the project with you and agree the model scale, model size, level of detail, materials and finishes, display base and any lighting.",
  },
  {
    title: "Confirm the quotation and production scope",
    description:
      "You receive a project-specific quotation covering the agreed scope. Production begins once the scope and commercial terms are confirmed.",
  },
  {
    title: "Model fabrication and detailing",
    description:
      "The model is built and progressively detailed. We share progress updates and can adjust agreed details as the model develops.",
  },
  {
    title: "Final inspection and agreed delivery",
    description:
      "The finished model is inspected against the agreed scope, packed securely and delivered or handed over as arranged.",
  },
];
