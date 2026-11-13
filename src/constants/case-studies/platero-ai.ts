import { CaseStudy } from "@/types";

export const PLATERO_AI: CaseStudy = {
  slug: "platero-ai",
  title: "Platero AI",
  hook: "AI replies to restaurant Google reviews, tested with a 277-case red team that took the pass rate from 83.0% to 95.4% and cut harmful auto-published replies from 28 runs to 4, then to 0 after a prompt rebuild.",
  status: "Private beta, production paused",
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
    "Fastify",
    "Claude Sonnet 5.5, Haiku 5.5 and Opus 5.5",
    "Jest",
    "Playwright",
    "GCP Cloud Run",
    "Terraform",
  ],
  metrics: [
    { label: "Red-team pass rate", before: "83%", after: "95%" },
    { label: "Replies needing an owner's edit", before: "56%", after: "39%" },
  ],
  sections: [
    {
      id: "problem",
      heading: "Problem and who it is for",
      paragraphs: [
        "Independent restaurants and small groups get more Google reviews than the owner can answer, and a bad reply is public: a refund promise, a guest's phone number, an argument. The hard part is letting an AI publish on the owner's behalf when strangers write the input, and some of them try to steer the AI.",
      ],
    },
    {
      id: "what-i-built",
      heading: "What I built",
      paragraphs: [],
      bullets: [
        "Sync: scheduled jobs pull new reviews from the Google Business Profile API.",
        "Analysis: a small structured call (Haiku 5.5) reads sentiment, topics, and whether the review is trying to instruct the AI.",
        "Draft: the reply call (Sonnet 5.5, low effort) writes in the owner's learned voice from a fact card and the owner's instructions.",
        "Checks: deterministic rules catch phone numbers in any script, links, echoed personal details and echoed instructions; an LLM safety judge looks for invented facts, admitted fault and money promises.",
        "Gate: the owner sets auto-publish by star rating. Anything flagged is held with a plain reason (\"Held: the review talks to the AI\"). If a check fails to run, the draft is held.",
        "Publish: a queue paced to Google's quota.",
        "Local Google API: I also wrote a fake Google server with the same wire contract, so the full stack and every error path run locally.",
      ],
    },
    {
      id: "evals",
      heading: "AI quality work",
      paragraphs: [
        "Red team: 277 cases in 13 categories (injection, invented facts, legal traps, personal data, Arabic input, benign controls and more), 3 runs each, 831 runs per measurement. Sonnet 5.5 judges every run; Opus 5.5 re-judges every fail and every split case, and Opus wins.",
        "What moved it, one slice at a time on the same cases: a fencing helper for untrusted text, deterministic output checks, a safety judge that sees the owner's facts, reply prompt rules, and an injection pre-screen in the analysis call. The pre-screen alone took its categories from 81.7% to 89.7% and harmful published runs from 7 to 0.",
      ],
      bullets: [
        "Pass rate: 83.0% → 95.4%",
        "P0 cases: 31 → 8",
        "Harmful and auto-published runs: 28 → 4",
        "Benign reviews held by a new check: 0 of 51 → 1 of 51",
      ],
    },
    {
      id: "reply-quality",
      heading: "Reply quality",
      paragraphs: [
        "50 cases, 4 runs each, Opus 5.5 judge, scoring whether an owner would need to edit the draft. Rebuilding the prompt (one static system prompt, facts in a card in the user turn) took \"edit needed\" from 56.4% to 39.4% and invented specifics from 19.1% to 1.6%. The red team on the rebuild: 0 harmful auto-published runs out of 561.",
      ],
    },
    {
      id: "hard-decisions",
      heading: "Hard decisions",
      paragraphs: [],
      bullets: [
        "Measure noise first. The same prompt run twice on the old 88-reply eval moved \"edit needed\" from 47 to 58. That showed 18 per-incident prompt fixes had not moved the aggregate, and led to a larger eval and the rebuild.",
        "Ship under a rule written before the run. The rebuild had to beat the previous version by 10 points or win 60% of pairwise comparisons, with zero harmful published. It met the first prong only; the pairwise judge preferred it 48.4% and the interval crosses zero. I shipped it and recorded both weak points.",
        "Hold when unsure. Empty drafts, failed judge calls and reversed-text attacks end as held. The price is some false holds (4 of 51 benign controls by any check).",
        "Pay for safety in tokens. The shared rules added about 435 input tokens a reply: +7.6% cost against a +5% target. Accepted; a reply costs about a quarter of a cent.",
      ],
    },
    {
      id: "status",
      heading: "Status",
      paragraphs: [
        "The demo is recorded on a local stack with a simulated Google API.",
      ],
    },
    {
      id: "next",
      heading: "What I would do next",
      paragraphs: [],
      bullets: [
        "Calibrate both judges against my own labels before trusting small differences.",
        "Stop auto-publishing replies to empty or emoji-only reviews, where invented details still got through in 3 runs.",
        "Trim the rule text to bring reply cost under target.",
      ],
    },
  ],
};
