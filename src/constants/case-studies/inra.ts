import { CaseStudy } from "@/types";

export const INRA: CaseStudy = {
  slug: "inra",
  title: "INRA: Independent Ranking",
  hook: "A community site to discover, compare and rank products by real owners' reviews, built from 0 to 1 as a solo project, alongside 20 freelance projects and advisory work for 30+ clients.",
  status: "Built 2024 to 2025",
  period: "June 2024 to May 2025",
  role: "Solo builder: product, design, code and deployment, 197 commits",
  stack: [
    "TypeScript",
    "React",
    "Remix",
    "Prisma",
    "SQLite with LiteFS",
    "Fly.io",
    "Tailwind CSS",
    "Radix UI",
    "Zod",
    "Vitest",
    "Playwright",
  ],
  metrics: [
    { label: "Freelance projects since 2024", after: "20" },
    { label: "Clients advised", after: "30+" },
  ],
  sections: [
    {
      id: "problem",
      heading: "Problem and who it is for",
      paragraphs: [
        "Many product rankings online are editorial or affiliate lists, not the experience of people who own the product. INRA was meant for buyers who want to see what owners say, and for owners who want to share it. Anyone could add a product, review it, and see it ranked by those reviews.",
      ],
    },
    {
      id: "what-i-built",
      heading: "What I built",
      paragraphs: [
        "Architecture in plain words: one Remix server renders every page and handles every form. Data lives in SQLite through Prisma, replicated with LiteFS on Fly.io, so reads are local to the app and there is no separate database server to run. A two-level cache (in memory and in SQLite) sits in front of slower reads.",
      ],
      bullets: [
        "Catalog: products in categories, with images, added by users and editable by them.",
        "Reviews: star ratings with optional text, comments under reviews, likes and dislikes on both.",
        "Rankings: a page that orders products by average rating or by number of reviews.",
        "Owner signals: users mark products as owned or wishlisted, and product views are counted.",
        "Engagement: a points balance per user, a feedback form with a satisfaction level, personal notes with images, a newsletter.",
        "Accounts: sign-up with email verification, one-time codes, roles and permissions, and third-party login connections.",
        "Operations: an admin view of the cache, and SEO routes for search engines.",
      ],
    },
    {
      id: "evals",
      heading: "AI and quality work",
      paragraphs: [
        "The product has no AI features. That is the honest line for this project, and the reason it sits below Platero and Safety Assistant in this portfolio.",
        "The quality work was conventional: unit tests with Vitest and end-to-end tests with Playwright, with a test database and fixtures. I do not have pass rates or coverage numbers from that time to show.",
      ],
    },
    {
      id: "hard-decisions",
      heading: "Hard decisions",
      paragraphs: [],
      bullets: [
        "SQLite with LiteFS instead of a managed Postgres. It kept hosting cheap and reads fast for a single-region app, and removed a moving part. The trade-off is one primary for writes and a harder path to multi-region writes.",
        "Start from a production template instead of writing auth. The app is built on the Epic Stack conventions (sessions, permissions, one-time codes, caching). That gave secure accounts on day one and let the time go into the catalog and reviews. The trade-off is a lot of template code to understand and maintain.",
        "A simple, explainable ranking. Products sort by plain average rating or by review count. Anyone can check why a product is where it is. The known weakness: a product with two five-star reviews can outrank one with two hundred mostly good ones.",
        "User-generated catalog. Letting anyone add a product grows the catalog without a content team, at the cost of duplicates and moderation work.",
      ],
    },
    {
      id: "status",
      heading: "Status",
      paragraphs: [
        "Not live. The code is in a private repository and I can walk through it on a call.",
      ],
    },
    {
      id: "next",
      heading: "What I would do next",
      paragraphs: [
        "If I picked it up again today, AI would go where it helps the reader, with an eval before each feature ships:",
      ],
      bullets: [
        "A weighted ranking (for example a Bayesian average) so products with few reviews do not jump the list.",
        "Review summaries per product, checked against the source reviews for invented claims, the same way I test Platero replies.",
        "Duplicate product detection when a user adds an item.",
        "A suspicious-review check, held for human review rather than deleted automatically.",
      ],
    },
  ],
};
