import { Github } from "lucide-react";
import { CaseStudy } from "@/types";
import { PROJECT_BRANDS } from "../brands";
import { OPEN_SOURCE_URLS } from "../contact";
import overlayImg from "/public/images/projects/qa-annotator-nakladka.webp";
import areasImg from "/public/images/projects/qa-annotator-zaznaczone-obszary.webp";
import reportImg from "/public/images/projects/qa-annotator-raport.webp";

export const QA_ANNOTATOR: CaseStudy = {
  slug: "qa-annotator",
  title: "qa-annotator",
  hook: "A Chrome extension that turns clicks on a web page into a bug report with screenshots for coding agents.",
  status: "Open source, Chrome extension",
  phase: "live",
  brand: PROJECT_BRANDS.qaAnnotator,
  period: "2026",
  role: "Author",
  stack: ["JavaScript", "Chrome Manifest V3", "Node test runner"],
  screenshots: [
    {
      image: overlayImg,
      alt: "The overlay on a demo page with a comment box for the second area",
    },
    {
      image: areasImg,
      alt: "A screenshot made by the extension with two numbered areas",
    },
    {
      image: reportImg,
      alt: "The marked screenshot next to the generated report",
    },
  ],
  sections: [
    {
      id: "problem",
      heading: "Problem",
      paragraphs: [
        'Telling a coding agent about a UI bug in words is slow: "the small button in the right column, under the promo field". A click is faster and leaves no doubt.',
      ],
    },
    {
      id: "how-it-works",
      heading: "How it works",
      paragraphs: [],
      isOrdered: true,
      bullets: [
        "Press the shortcut on any page to turn QA mode on.",
        "Click the element that is wrong, or drag a box around it, and type what is wrong. Repeat for every issue.",
        "Finish, and a folder with report.md and a marked screenshot per issue lands in Downloads, with a prompt for the agent on the clipboard.",
      ],
    },
  ],
  links: [
    {
      label: "View on GitHub",
      icon: Github,
      href: OPEN_SOURCE_URLS.qaAnnotator,
    },
  ],
};
