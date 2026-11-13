import { CaseStudy } from "@/types";
import { PLATERO_AI } from "./platero-ai";
import { SAFETY_ASSISTANT } from "./safety-assistant";
import { INRA } from "./inra";
import { REFLEX } from "./reflex";

export const CASE_STUDIES: CaseStudy[] = [
  PLATERO_AI,
  SAFETY_ASSISTANT,
  INRA,
  REFLEX,
];

export const findCaseStudy = (slug: string) =>
  CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
