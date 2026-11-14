import { CaseStudy } from "@/types";
import { PLATERO_AI } from "./platero-ai";
import { SAFETY_ASSISTANT } from "./safety-assistant";
import { INRA } from "./inra";
import { REFLEX } from "./reflex";
import { CLAUDE_PR_REVIEWER } from "./claude-pr-reviewer";
import { QA_ANNOTATOR } from "./qa-annotator";

export const CASE_STUDIES: CaseStudy[] = [
  PLATERO_AI,
  SAFETY_ASSISTANT,
  INRA,
  REFLEX,
  CLAUDE_PR_REVIEWER,
  QA_ANNOTATOR,
];

export const findCaseStudy = (slug: string) =>
  CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
