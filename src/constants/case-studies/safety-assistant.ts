import { CaseStudy } from "@/types";
import { PROJECT_BRANDS } from "../brands";
import stepsImg from "/public/images/projects/asystent-odpowiedz-krokami.webp";
import sourcesImg from "/public/images/projects/asystent-zrodla-odpowiedzi.webp";
import emergencyImg from "/public/images/projects/asystent-numer-112.webp";
import phoneImg from "/public/images/projects/asystent-telefon.webp";

export const SAFETY_ASSISTANT: CaseStudy = {
  slug: "safety-assistant",
  title: "Safety Assistant",
  hook: "Tells residents what to do after a scam or a threat. Answers come from expert guides, and the emergency number is guaranteed in code.",
  status: "In testing, city pilot in preparation",
  phase: "testing",
  brand: PROJECT_BRANDS.safetyAssistant,
  period: "2026",
  role: "Solo builder; a safety expert co-founder writes the knowledge base",
  stack: [
    "TypeScript",
    "Next.js",
    "NestJS",
    "Prisma",
    "PostgreSQL full-text search",
    "Claude Sonnet and Haiku",
    "Google Chirp 3 transcription",
    "GCP Cloud Run",
    "Vercel",
    "Terraform",
    "Playwright with axe",
  ],
  screenshots: [
    {
      image: stepsImg,
      alt: "Answer about a refused police report, with the steps to take right away",
    },
    {
      image: sourcesImg,
      alt: "The same answer with what not to do, the source materials and follow-up questions",
    },
    {
      image: emergencyImg,
      alt: "Emergency numbers shown over an answer about a neighbour's threats",
    },
    { image: phoneImg, alt: "An answer on a phone" },
  ],
  sections: [
    {
      id: "what-i-built",
      heading: "What I built",
      paragraphs: [],
      bullets: [
        "Answers in steps: what to do now, what evidence to keep, where to report and what not to do, with the expert sources under every answer.",
        "RAG on expert guides: handbooks and articles written by a safety expert, cut into fragments and searched with PostgreSQL full-text search.",
        "Scam check: paste a text message or a screenshot and get a verdict with follow-up questions.",
        "Letter drafts: a police notification or a complaint written from the facts of the case.",
        "City panel: questions the guides could not answer are grouped into a queue for the city.",
      ],
    },
    {
      id: "hard-parts",
      heading: "Hard parts",
      paragraphs: [],
      bullets: [
        "The emergency number comes from code. The model usually adds it in a danger case, and usually is not enough, so code adds it whatever the model writes.",
        "Tested against the OWASP LLM Top 10 on every surface: answers, the scam check and letters.",
        "Data residency. Storage, files and keys stay in the country; the model cannot yet, so it runs through an EU gateway.",
      ],
    },
  ],
};
