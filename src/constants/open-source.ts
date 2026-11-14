import { Chrome, Github } from "lucide-react";
import { OpenSourceProject } from "@/types";
import { PROJECT_BRANDS } from "./brands";
import { CONTACT_INFO } from "./contact";
import prReviewerImg from "/public/images/projects/claude-pr-reviewer-przeglad-pr.webp";
import qaAnnotatorAreasImg from "/public/images/projects/qa-annotator-zaznaczone-obszary.webp";

export const OPEN_SOURCE_PROJECTS: OpenSourceProject[] = [
  {
    name: "claude-pr-reviewer",
    caseStudySlug: "claude-pr-reviewer",
    summary:
      "Reviews every pull request with Claude, for $0.10 to $0.50 a review.",
    brand: PROJECT_BRANDS.claudePrReviewer,
    platform: "GitHub Action",
    platformIcon: Github,
    href: `${CONTACT_INFO.github}/claude-pr-reviewer`,
    image: prReviewerImg,
    imageAlt:
      "A pull request with the Claude review summary and an inline comment",
  },
  {
    name: "qa-annotator",
    caseStudySlug: "qa-annotator",
    summary: "Click on a page, get a bug report a coding agent can fix.",
    brand: PROJECT_BRANDS.qaAnnotator,
    platform: "Chrome extension",
    platformIcon: Chrome,
    href: `${CONTACT_INFO.github}/qa-annotator`,
    image: qaAnnotatorAreasImg,
    imageAlt: "A demo page with two numbered areas marked by the extension",
  },
];
