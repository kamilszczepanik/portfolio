import { Globe } from "lucide-react";
import { CaseStudy } from "@/types";
import { PROJECT_BRANDS } from "../brands";
import homeImg from "/public/images/projects/dg-cars-strona.webp";
import searchImg from "/public/images/projects/dg-cars-search.jpg";
import categoriesImg from "/public/images/projects/dg-cars-categories.jpg";

export const DG_CARS: CaseStudy = {
  slug: "dg-cars",
  title: "DG Cars",
  hook: "An online shop for American car parts in Poland, kept in sync with the shop's BaseLinker ERP: 75,000+ parts, paid by card, BLIK or Apple Pay.",
  status: "Live at dg-cars.com",
  phase: "live",
  brand: PROJECT_BRANDS.dgCars,
  period: "Since June 2025",
  role: "Sole developer on a monthly contract with the shop",
  stack: [
    "TypeScript",
    "Next.js",
    "Prisma",
    "PostgreSQL on Supabase",
    "NextAuth",
    "Stripe",
    "BaseLinker API",
    "Trigger.dev",
    "Sentry",
    "Tailwind CSS",
    "Jest",
    "Playwright",
    "Vercel",
  ],
  screenshots: [
    {
      image: homeImg,
      alt: "DG Cars home page with the car picker, the parts search and the call buttons",
    },
    {
      image: searchImg,
      alt: "All parts list with filters for stock, price and make",
    },
    {
      image: categoriesImg,
      alt: "Car makes carousel and the category grid with product counts",
    },
  ],
  sections: [
    {
      id: "what-i-built",
      heading: "What I built",
      paragraphs: [],
      bullets: [
        "BaseLinker sync: a full sync of descriptions and images every day and a price and stock sync every three hours, written as bulk SQL upserts that skip unchanged products by content hash.",
        "Checkout on Stripe: the payment webhook confirms the order, sends the confirmation email and pushes the order to BaseLinker.",
        "Parts by car: the fit data already in BaseLinker (make, model and years on 27,923 of 27,924 offers) is parsed instead of bought, so after picking a car the shop shows only the categories with parts for it.",
        "Product feeds for Google Merchant Center and Meta, so marketing can run product ads, and a sitemap index with 83,548 URLs accepted by Google with no errors.",
        "Owner panel: a statistics dashboard, order statuses and parcel deliveries read from BaseLinker, and staff accounts that set their own password.",
      ],
    },
    {
      id: "hard-parts",
      heading: "Hard parts",
      paragraphs: [],
      bullets: [
        "Admin edits must survive the sync. One file lists the protected columns, and a test parses the upsert SQL to enforce it.",
        "Payment rules, not code, set the methods. Przelewy24 does not take automotive sales through Stripe, while cards and BLIK are exempt, so checkout relies on them.",
        "A live shop cannot stop for a migration. Schema changes reach production only as migrations run by CI, and an index on a large table goes in its own concurrent migration so reads are not blocked.",
      ],
    },
    {
      id: "status",
      heading: "Status",
      paragraphs: [
        "Live and in active development, with traffic from paid ads.",
      ],
      link: {
        label: "Visit dg-cars.com",
        href: "https://dg-cars.com",
        icon: Globe,
      },
    },
  ],
};
