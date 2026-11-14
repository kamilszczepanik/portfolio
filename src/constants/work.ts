import { BookOpenText, CalendarDays, Rocket, ShieldCheck, Trophy, Zap } from "lucide-react";
import { WorkProject } from "@/types";
import { PROJECT_BRANDS } from "./brands";
import { COMPANY_URLS } from "./contact";
import plateroDraftsImg from "/public/images/projects/platero-ai-recenzje-szkice.webp";
import safetyStepsImg from "/public/images/projects/asystent-odpowiedz-krokami.webp";
import raffleKingHomeImg from "/public/images/projects/raffleking-strona-glowna.webp";
import rankingsImg from "/public/images/projects/rankings.jpg";
import reflexSiteImg from "/public/images/projects/reflex-strona.webp";
import akroStarsImg from "/public/images/projects/akro-stars-strona.webp";
import dgCarsHomeImg from "/public/images/projects/dg-cars-strona.webp";

export const WORK_PROJECTS: WorkProject[] = [
  {
    name: "Platero AI",
    summary: "Answers restaurant Google reviews in the owner's voice.",
    brand: PROJECT_BRANDS.plateroAi,
    badges: [
      {
        kind: "metric",
        value: "0",
        label: "harmful replies in 561 attack runs",
        icon: ShieldCheck,
      },
      { kind: "status", label: "Private beta", phase: "beta" },
    ],
    image: plateroDraftsImg,
    imageAlt: "Platero AI review inbox with reply drafts in the owner's voice",
    href: "/work/platero-ai",
    isExternal: false,
  },
  {
    name: "Safety Assistant",
    summary: "Tells residents what to do after a scam or a threat.",
    brand: PROJECT_BRANDS.safetyAssistant,
    badges: [
      { kind: "status", label: "In testing", phase: "testing" },
      { kind: "fact", label: "RAG on expert guides", icon: BookOpenText },
      { kind: "fact", label: "Tested on OWASP LLM Top 10", icon: ShieldCheck },
    ],
    image: safetyStepsImg,
    imageAlt: "Safety Assistant answer with the steps to take right away",
    href: "/work/safety-assistant",
    isExternal: false,
  },
  {
    name: "RaffleKing",
    summary: "Raffles and free fantasy football, built at Plug Marketing.",
    brand: PROJECT_BRANDS.raffleKing,
    badges: [
      {
        kind: "metric",
        value: "884",
        label: "raffles, $30,000+ in prizes",
        icon: Trophy,
      },
      { kind: "status", label: "Live", phase: "live" },
    ],
    image: raffleKingHomeImg,
    imageAlt:
      "RaffleKing home page with the fantasy football banner and raffles",
    href: COMPANY_URLS.raffleKing,
    isExternal: true,
  },
  {
    name: "INRA",
    summary: "Ranks products by what their owners say.",
    brand: PROJECT_BRANDS.inra,
    badges: [
      { kind: "fact", label: "Solo, from 0 to 1", icon: Rocket },
      { kind: "fact", label: "2024 to 2025", icon: CalendarDays },
    ],
    image: rankingsImg,
    imageAlt: "INRA product ranking page",
    href: "/work/inra",
    isExternal: false,
  },
  {
    name: "Reflex",
    summary: "A real-time multiplayer card game, built solo.",
    brand: PROJECT_BRANDS.reflex,
    badges: [
      { kind: "status", label: "Live on iOS", phase: "live" },
      { kind: "fact", label: "React Native and WebSockets", icon: Zap },
    ],
    image: reflexSiteImg,
    imageAlt: "Reflex website with the game on a phone",
    href: "/work/reflex",
    isExternal: false,
  },
];

export const FREELANCE_SUMMARY =
  "20 freelance projects for 30+ clients since 2024";

export const FREELANCE_THUMBNAILS = [
  { image: akroStarsImg, alt: "Akro Stars website" },
  { image: dgCarsHomeImg, alt: "DG Cars online store" },
];
