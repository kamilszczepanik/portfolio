import { CaseStudy } from "@/types";
import { PROJECT_BRANDS } from "../brands";
import rankingsImg from "/public/images/projects/rankings.jpg";
import productImg from "/public/images/projects/inra-produkt.webp";
import addProductImg from "/public/images/projects/inra-dodaj-produkt.webp";

export const INRA: CaseStudy = {
  slug: "inra",
  title: "INRA: Independent Ranking",
  hook: "A community site that ranks products by what their owners say, built solo from 0 to 1.",
  status: "Built 2024 to 2025",
  phase: "done",
  brand: PROJECT_BRANDS.inra,
  period: "June 2024 to May 2025",
  role: "Solo builder: product, design, code and deployment",
  stack: [
    "TypeScript",
    "React",
    "Remix",
    "Prisma",
    "SQLite with LiteFS",
    "Fly.io",
    "Tailwind CSS",
    "Vitest",
    "Playwright",
  ],
  screenshots: [
    {
      image: rankingsImg,
      alt: "INRA ranking page with products ordered by owners' ratings",
    },
    {
      image: productImg,
      alt: "Product page with the rating, wishlist and owned buttons and a review",
    },
    { image: addProductImg, alt: "Form to add a product with images" },
  ],
  sections: [
    {
      id: "what-i-built",
      heading: "What I built",
      paragraphs: [],
      bullets: [
        "Catalog: users add products in categories, with images.",
        "Reviews: star ratings, comments and likes, plus owned and wishlist marks.",
        "Rankings by average rating or by number of reviews.",
        "Accounts with email verification, one-time codes, roles and permissions.",
        "One Remix server on Fly.io with SQLite replicated by LiteFS, so reads stay local and there is no database server to run.",
      ],
    },
    {
      id: "hard-parts",
      heading: "Hard parts",
      paragraphs: [],
      bullets: [
        "SQLite with LiteFS instead of a managed Postgres: cheap and fast for one region, with one primary for writes.",
        "A ranking anyone can check. Plain averages are easy to explain; the known weakness is that two five-star reviews can beat two hundred good ones.",
        "A catalog that users grow themselves, at the cost of duplicates and moderation.",
      ],
    },
    {
      id: "status",
      heading: "Status",
      paragraphs: [
        "Not live. The code is private, and I can walk through it on a call.",
      ],
    },
  ],
};
