import { BookOpenText, CalendarDays, Rocket, ShieldCheck, Zap } from "lucide-react";
import { ShippedProject, WorkProject } from "@/types";
import { PROJECT_BRANDS } from "./brands";
import { COMPANY_URLS } from "./contact";
import plateroFrameImg from "/public/images/projects/kadry/platero-ai.webp";
import safetyFrameImg from "/public/images/projects/kadry/safety-support.webp";
import inraFrameImg from "/public/images/projects/kadry/inra.webp";
import reflexFrameImg from "/public/images/projects/kadry/reflex.webp";
import akroStarsImg from "/public/images/projects/akro-stars-strona.webp";
import dgCarsHomeImg from "/public/images/projects/dg-cars-strona.webp";
import cambAiLogo from "/public/images/companies/camb-ai.webp";
import skyEngineAiLogo from "/public/images/companies/sky-engine-ai.webp";

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

export const SHIPPED_AT_WORK: ShippedProject[] = [
  {
    name: "RaffleKing",
    summary:
      "A crypto raffle platform with free weekly fantasy football, where I built most of the product for more than 5,000 registered users.",
    href: COMPANY_URLS.raffleKing,
    logo: "/images/companies/raffleking.svg",
  },
  {
    name: "CAMB.AI",
    summary:
      "Chatterbox, a Windows app that translates your voice live in Zoom, Teams or Google Meet.",
    href: "https://docs.camb.ai/other-products/chatterbox/overview",
    logo: cambAiLogo,
  },
  {
    name: "SKY ENGINE AI",
    summary:
      "A cloud platform that generates labeled synthetic images to train computer vision models, where I led the frontend.",
    href: COMPANY_URLS.skyEngineAi,
    logo: skyEngineAiLogo,
  },
  {
    name: "DG Cars",
    summary:
      "An online shop for American car parts with over 75,000 parts in stock and card, BLIK and Apple Pay checkout.",
    href: "https://dg-cars.com",
  },
];

export const FREELANCE_SUMMARY =
  "20 freelance projects for 30+ clients since 2024";

export const FREELANCE_THUMBNAILS = [
  { image: akroStarsImg, alt: "Akro Stars website" },
  { image: dgCarsHomeImg, alt: "DG Cars online store" },
];
