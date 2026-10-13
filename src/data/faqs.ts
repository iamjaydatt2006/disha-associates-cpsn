/**
 * Frequently asked questions.
 *
 * Answers are written to be genuinely useful WITHOUT inventing fixed prices,
 * materials, turnaround times or service coverage. Where a project-specific
 * figure is unavoidable, the answer explains that it is agreed per project and
 * defers to a quotation.
 *
 * `review: true` flags an answer that must be confirmed by the owner before
 * publication (see README → "Content that needs owner confirmation").
 */
export interface Faq {
  question: string;
  answer: string;
  review?: boolean;
}

export const faqs: Faq[] = [
  {
    question: "What is an architectural scale model?",
    answer:
      "An architectural scale model is a physical, to-scale three-dimensional representation of a building, site or development. It is built from drawings and digital models to show massing, form, spatial relationships and context. Unlike a 3D render on a screen, a physical model can be viewed from any angle, walked around and presented directly in a meeting, sales office or exhibition.",
  },
  {
    question: "Which project types can be represented as a scale model?",
    answer:
      "We work across residential, commercial, industrial, landscape and township schemes as well as infrastructure projects. If your project can be described with plans, elevations and sections, it can usually be modelled — from a single residence to a large master plan. Share your drawings and we will advise on the most effective way to present it.",
  },
  {
    question: "What drawings or files do you need for a quotation?",
    answer:
      "For an accurate quotation we typically need site plans, floor plans, elevations and sections, plus any 3D files or renders you already have (for example DWG, SKP, RVT, PDF or images). A site plan and key elevations are usually enough to start the conversation. Files can be shared through a link on the enquiry form.",
  },
  {
    question: "How is the model scale selected?",
    answer:
      "Scale and model size are chosen together. The two questions that matter most are how much detail the model must show and how much space is available to display it. A small 1:200 or 1:100 model suits a whole building, while a master plan may read better at 1:500 or smaller. We suggest a scale once we understand your presentation and the space you have.",
  },
  {
    question: "Which materials and lighting options are available?",
    answer:
      "Materials and finishes are selected to suit the scale, purpose and budget of each model, and options range from standard presentation finishes through to detailed, exhibition-grade work with integrated lighting. Because availability and suitability vary by project, we confirm the exact materials and any lighting approach with you during the scope discussion rather than publishing a fixed list.",
    review: true,
  },
  {
    question: "What determines the cost of a scale model?",
    answer:
      "Cost is driven mainly by the surface area to be modelled, the level of detail required, the materials and finishes chosen, whether internal lighting is included, the complexity of the site and the display base or case. We prepare a project-specific quotation after reviewing your drawings — we do not publish fixed prices because two models of the same building can differ greatly in scope.",
  },
  {
    question: "Can a model be customised for a particular presentation?",
    answer:
      "Yes. Models are often purpose-built for a specific use — a client approval meeting, an investor presentation, a sales gallery or an exhibition. We can tailor the scale, the level of detail, removable sections, the display base and any lighting to match how you intend to present. Tell us the presentation context and we will shape the model around it.",
  },
  {
    question: "Where does Disha Associates operate?",
    answer:
      "Disha Associates is based in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, and works with architects, builders, developers, construction companies and project consultants. We regularly take on projects across Maharashtra and welcome enquiries from elsewhere in India — contact us with your project location and requirements.",
  },
];
