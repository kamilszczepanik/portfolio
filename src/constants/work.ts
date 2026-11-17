import {
  BookOpenText,
  CalendarDays,
  CreditCard,
  Package,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { WorkProject } from "@/types";
import { PROJECT_BRANDS } from "./brands";
import plateroFrameImg from "/public/images/projects/kadry/platero-ai.webp";
import safetyFrameImg from "/public/images/projects/kadry/safety-support.webp";
import inraFrameImg from "/public/images/projects/kadry/inra.webp";
import reflexFrameImg from "/public/images/projects/kadry/reflex.webp";
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
        label: "harmful replies auto-published in 561 adversarial runs",
        shortLabel: "harmful replies in 561 attack runs",
        icon: ShieldCheck,
      },
      { kind: "status", label: "Private beta", phase: "beta" },
    ],
    image: plateroFrameImg,
    imageAlt: "Platero AI review held for the owner, with a reply draft in the owner's voice",
    href: "/work/platero-ai",
    isExternal: false,
  },
  {
    name: "Safety Support",
    summary: "Tells residents what to do after a scam or a threat.",
    brand: PROJECT_BRANDS.safetySupport,
    badges: [
      { kind: "status", label: "In testing", phase: "testing" },
      { kind: "fact", label: "RAG on expert guides", icon: BookOpenText },
      { kind: "fact", label: "Tested on OWASP LLM Top 10", icon: ShieldCheck },
    ],
    image: safetyFrameImg,
    imageAlt: "Safety Support answer with the numbered steps to take right away",
    href: "/work/safety-support",
    isExternal: false,
  },
  {
    name: "DG Cars",
    summary: "An online shop for American car parts.",
    brand: PROJECT_BRANDS.dgCars,
    badges: [
      { kind: "fact", label: "75,000+ parts in stock", icon: Package },
      {
        kind: "fact",
        label: "Card, BLIK and Apple Pay checkout",
        icon: CreditCard,
      },
    ],
    image: dgCarsHomeImg,
    imageAlt: "DG Cars online store home page with the parts search",
    href: "https://dg-cars.com",
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
    image: inraFrameImg,
    imageAlt: "INRA ranking with the top rated products",
    href: "/work/inra",
    isExternal: false,
  },
  {
    name: "Reflex",
    summary: "A real-time multiplayer card game, built solo.",
    brand: PROJECT_BRANDS.reflex,
    badges: [
      { kind: "status", label: "Released on iOS", phase: "done" },
      { kind: "fact", label: "React Native and WebSockets", icon: Zap },
    ],
    image: reflexFrameImg,
    imageAlt: "Reflex match in progress and the win screen",
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
