import { Github } from "lucide-react";
import { CaseStudy } from "@/types";
import { PROJECT_BRANDS } from "../brands";
import { OPEN_SOURCE_URLS } from "../contact";
import reviewImg from "/public/images/projects/claude-pr-reviewer-przeglad-pr.webp";

export const CLAUDE_PR_REVIEWER: CaseStudy = {
  slug: "claude-pr-reviewer",
  title: "claude-pr-reviewer",
  hook: "A pull request reviewer on the Claude Agent SDK, running in 3 repos for $0.10 to $0.50 a review.",
  status: "Open source, GitHub Action",
  phase: "live",
  brand: PROJECT_BRANDS.claudePrReviewer,
  period: "2026",
  role: "Author",
  stack: [
    "TypeScript",
    "Claude Agent SDK",
    "GitHub Actions",
    "Structured outputs",
    "Vercel AI Gateway",
  ],
  screenshots: [
    {
      image: reviewImg,
      alt: "A pull request with the Claude review summary, an inline comment and the author's reply",
    },
  ],
  sections: [
    {
      id: "problem",
      heading: "Problem",
      paragraphs: [
        "I wanted a second reviewer next to Copilot, and a stand-in when Copilot is out of quota: one that runs in the repo's own CI, reads more than the diff and costs cents a review.",
      ],
    },
    {
      id: "how-it-works",
      heading: "How it works",
      paragraphs: [],
      isOrdered: true,
      bullets: [
        "A pull request opens or leaves draft, and the GitHub Action starts one review. A manual run repeats it.",
        "Claude reads the diff and the code around it, with read-only access to the repository and a hard budget cap per run.",
        "The action posts one review: a short summary and inline comments. It never approves or blocks a merge, and if the API credit runs out it retries once through Vercel AI Gateway.",
      ],
    },
  ],
  links: [
    {
      label: "View on GitHub",
      icon: Github,
      href: OPEN_SOURCE_URLS.claudePrReviewer,
    },
  ],
};
