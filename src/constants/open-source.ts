import { Chrome, GitPullRequest, Github, MousePointerClick } from "lucide-react";
import { OpenSourceProject } from "@/types";
import { PROJECT_BRANDS } from "./brands";
import { OPEN_SOURCE_URLS } from "./contact";
import prReviewerImg from "/public/images/projects/claude-pr-reviewer-przeglad-pr.webp";
import qaAnnotatorAreasImg from "/public/images/projects/qa-annotator-zaznaczone-obszary.webp";

export const OPEN_SOURCE_PROJECTS: OpenSourceProject[] = [
  {
    name: "claude-pr-reviewer",
    caseStudySlug: "claude-pr-reviewer",
    summary:
      "Reviews every pull request with Claude, for $0.10 to $0.50 a review.",
    brand: PROJECT_BRANDS.claudePrReviewer,
    badges: [
      { kind: "status", label: "Open source", phase: "live" },
      {
        kind: "metric",
        value: "3",
        label: "repos, $0.10 to $0.50 a review",
        icon: GitPullRequest,
      },
      { kind: "fact", label: "GitHub Action", icon: Github },
    ],
    href: OPEN_SOURCE_URLS.claudePrReviewer,
    image: prReviewerImg,
    imageAlt:
      "A pull request with the Claude review summary and an inline comment",
  },
  {
    name: "qa-annotator",
    caseStudySlug: "qa-annotator",
    summary: "Click on a page, get a bug report a coding agent can fix.",
    brand: PROJECT_BRANDS.qaAnnotator,
    badges: [
      { kind: "status", label: "Open source", phase: "live" },
      {
        kind: "metric",
        value: "1",
        label: "click per issue, screenshot included",
        icon: MousePointerClick,
      },
      { kind: "fact", label: "Chrome extension", icon: Chrome },
    ],
    href: OPEN_SOURCE_URLS.qaAnnotator,
    image: qaAnnotatorAreasImg,
    imageAlt: "A demo page with two numbered areas marked by the extension",
  },
];
