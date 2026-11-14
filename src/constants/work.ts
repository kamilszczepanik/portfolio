import { WorkProject } from "@/types";
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
    badges: ["0 harmful replies in 561 attack runs", "Private beta"],
    image: plateroDraftsImg,
    imageAlt: "Platero AI review inbox with reply drafts in the owner's voice",
    href: "/work/platero-ai",
    isExternal: false,
  },
  {
    name: "Safety Assistant",
    summary: "Tells residents what to do after a scam or a threat.",
    badges: ["RAG on expert guides", "Tested on OWASP LLM Top 10"],
    image: safetyStepsImg,
    imageAlt: "Safety Assistant answer with the steps to take right away",
    href: "/work/safety-assistant",
    isExternal: false,
  },
  {
    name: "RaffleKing",
    summary: "Raffles and free fantasy football, built at Plug Marketing.",
    badges: ["884 raffles, $30,000+ in prizes", "Employer project"],
    image: raffleKingHomeImg,
    imageAlt:
      "RaffleKing home page with the fantasy football banner and raffles",
    href: "https://www.raffleking.io",
    isExternal: true,
  },
  {
    name: "INRA",
    summary: "Ranks products by what their owners say.",
    badges: ["Solo, from 0 to 1", "2024 to 2025"],
    image: rankingsImg,
    imageAlt: "INRA product ranking page",
    href: "/work/inra",
    isExternal: false,
  },
  {
    name: "Reflex",
    summary: "A real-time multiplayer card game, built solo.",
    badges: ["Live on iOS", "React Native and WebSockets"],
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
