import { CaseStudy } from "@/types";
import { PROJECT_BRANDS } from "../brands";
import draftsImg from "/public/images/projects/platero-ai-recenzje-szkice.webp";
import voiceImg from "/public/images/projects/platero-ai-glos-wlasciciela.webp";
import overviewImg from "/public/images/projects/platero-ai-przeglad.webp";
import topicsImg from "/public/images/projects/platero-ai-tematy-i-oceny.webp";
import phoneImg from "/public/images/projects/platero-ai-recenzje-telefon.webp";

export const PLATERO_AI: CaseStudy = {
  slug: "platero-ai",
  title: "Platero AI",
  hook: "Answers a restaurant's Google reviews in the owner's voice, for owners with more reviews than time. 0 harmful replies auto-published in 561 adversarial runs.",
  status: "Private beta, production paused",
  phase: "beta",
  brand: PROJECT_BRANDS.plateroAi,
  period: "2026",
  role: "Solo builder: product, code, evals, infrastructure",
  stack: [
    "TypeScript",
    "NestJS",
    "Next.js",
    "Prisma",
    "PostgreSQL",
    "Redis and BullMQ",
    "Trigger.dev",
    "Claude Sonnet and Haiku",
    "Playwright",
    "GCP Cloud Run",
    "Terraform",
  ],
  screenshots: [
    {
      image: draftsImg,
      alt: "Review inbox with one draft held because the review talks to the AI and one draft in the owner's voice",
    },
    {
      image: voiceImg,
      alt: "Venue settings with the learned reply voice and three example replies",
    },
    {
      image: overviewImg,
      alt: "Overview with review counters and the Grow your reviews panel",
    },
    {
      image: topicsImg,
      alt: "Analytics with praise and complaint topics, the rating spread and reply status",
    },
    { image: phoneImg, alt: "Review inbox on a phone" },
  ],
  sections: [
    {
      id: "what-i-built",
      heading: "What I built",
      paragraphs: [],
      bullets: [
        "Google Business Profile sync: new reviews arrive on a schedule, and replies go out through a queue paced to Google's quota.",
        "Voice learning: drafts follow the way the owner already answers, learned from the owner's own replies.",
        "Checks that hold risky replies: code catches phone numbers, links and echoed personal details, and a model judge looks for invented facts, admitted fault and money promises. A held draft says why in plain words.",
        "Owner control: auto-publish by star rating, and everything else waits in the inbox for one click.",
        "A fake Google server with the same wire contract, so the whole stack and every error path run locally.",
      ],
    },
    {
      id: "hard-parts",
      heading: "Hard parts",
      paragraphs: [],
      bullets: [
        "Strangers write the input. Some reviews try to talk to the AI, so the analysis step flags them and the draft is held instead of published.",
        "Hold when unsure. An empty draft, a failed check or a judge that did not answer ends as held, never as published.",
        "Measure before fixing. The same prompt run twice showed how noisy a small eval is, which led to a larger red team and a rebuilt prompt instead of more one-off fixes.",
      ],
    },
    {
      id: "status",
      heading: "Status",
      paragraphs: [
        "Production is paused. The demo runs on a local stack with the simulated Google API.",
      ],
    },
  ],
};
