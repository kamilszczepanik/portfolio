import { CaseStudy } from "@/types";

export const SAFETY_ASSISTANT: CaseStudy = {
  slug: "safety-assistant",
  title: "Safety Assistant",
  hook: "A RAG assistant for residents' everyday safety questions, built on expert-curated material, where a 316-case red team mapped to the OWASP LLM Top 10 took passing runs from 87% to 96% and the emergency number from \"usually there\" to guaranteed by code.",
  status: "In testing, city pilot in preparation",
  period: "2026",
  role: "Solo builder; a safety expert co-founder writes and reviews the knowledge base",
  stack: [
    "TypeScript",
    "Next.js",
    "NestJS",
    "Prisma",
    "PostgreSQL full-text search",
    "better-auth",
    "Claude Sonnet 5.5 and Haiku 5.5",
    "Google Chirp 3 transcription",
    "GCP Cloud Run and Cloud Tasks",
    "Vercel",
    "Terraform",
    "Vitest",
    "Playwright with axe",
  ],
  metrics: [{ label: "Passing red-team runs", before: "87%", after: "96%" }],
  sections: [
    {
      id: "problem",
      heading: "Problem and who it is for",
      paragraphs: [
        "After a suspicious text, a threat from a neighbour or a letter demanding payment, people search forums and often do the wrong thing first. Safety Assistant gives residents of a Polish city one place to ask what to do now, what evidence to keep and where to report. The city offers it to residents and sees what they worry about.",
      ],
    },
    {
      id: "what-i-built",
      heading: "What I built",
      paragraphs: [],
      bullets: [
        "Three systems: a resident app, a city hall panel and an admin panel, each a Next.js front end over its own NestJS API.",
        "Retrieval: four expert handbooks and 40 articles are cut into fragments and searched with PostgreSQL full-text search. Answers come as tiles (Now, Evidence, Letters, What not to do, Materials) with the sources shown under the answer.",
        "Check: paste a text message or a screenshot and get a scam verdict with follow-up questions.",
        "Letters: drafts of a police notification or complaint from the facts of the case.",
        "City panel: questions the knowledge base could not answer are grouped by a model into a queue for the city to answer.",
        "Models: Sonnet 5.5 for answers and letters, Haiku 5.5 for crisis mode, classification and grouping, and as a takeover after 30 seconds without output.",
        "Envelope encryption for personal data; every staff read of resident content is logged.",
      ],
    },
    {
      id: "evals",
      heading: "AI quality work",
      paragraphs: [
        "Red team: 316 cases across 17 categories (injection in four forms, off-scope, missing emergency number, scam false negatives, hallucination, personal data, prompt leak and more), on every surface. Main route: 522 runs. Fallback model route: 275 runs.",
        "Judge: an LLM judge scores each run against the case's criteria. I reviewed every baseline fail by hand: 44 of 115 were judge errors, mostly negated criteria read literally. I fixed the evaluator and re-scored the baseline before measuring any fix.",
        "What changed: a stronger danger rule, a fixed refusal written by code, a health refusal pointing to a doctor or pharmacist, and code that keeps skipped input out of the city panel. What got worse: a \"Legal basis\" tile without a quoted source in 7 runs against 1, cause not yet confirmed.",
      ],
      bullets: [
        "Main route: 455/522 (87%) → 502/522 (96%)",
        "Fallback route: 224/275 (81%) → 257/275 (93%)",
        "Emergency number guaranteed by code: 6/21 → 21/21",
        "Off-scope requests refused: 84/124 → 119/124",
        "Off-scope questions kept out of the city queue: 0/9 → 9/9",
        "In-scope questions wrongly refused: 0/65",
      ],
    },
    {
      id: "hard-decisions",
      heading: "Hard decisions",
      paragraphs: [],
      bullets: [
        "The emergency number comes from code, not the model. In the baseline the model said \"call 112\" in all 21 danger cases, but the rule that guarantees it recognised only 6. The rule now catches all 21, and 31 of 31 on its own test set with no false alarms.",
        "The model names off-scope, the code writes the refusal. The model often noticed a question was off-topic and helped anyway. A marker plus a fixed refusal costs a few tokens and no latency, where a model gate adds a call per question. A refusal costs 25 to 40% less than an answer.",
        "Rules, not a model, pick the effort. A model gate would add about a second to every question, urgent ones included. Instead: danger rule first, low effort for a first message, medium for a follow-up, a cheaper model past the daily spend limit.",
        "Data residency. Storage, files and keys can stay in the country; the model cannot yet, so it runs through an EU gateway with providers ordered by measured latency and availability.",
      ],
    },
    {
      id: "next",
      heading: "What I would do next",
      paragraphs: [],
      bullets: [
        "Run the planned model test across every task (answers, Check, letters, classification, grouping, crisis) for quality, time and cost.",
        "Find the cause of the unsourced \"Legal basis\" tile before the pilot.",
        "Move the rule against unsupported accusations in letters from the prompt into code.",
      ],
    },
  ],
};
