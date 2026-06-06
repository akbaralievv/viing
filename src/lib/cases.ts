/**
 * Case studies — the order MUST match the `cases.projects` array in the message
 * files (the page pairs each entry with its translated content by index).
 */
export const caseStudies = [
  { slug: "wet-wipes", image: "/portfolio/wipes.png" },
  { slug: "stretch-film", image: "/portfolio/gilam.png" },
  { slug: "food-cling-film", image: "/portfolio/dasturxon.png" },
] as const;

export type CaseStudy = (typeof caseStudies)[number];

export const getCaseIndex = (slug: string): number =>
  caseStudies.findIndex((c) => c.slug === slug);
