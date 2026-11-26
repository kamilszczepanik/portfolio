import {
  CalendarDays,
  CreditCard,
  Package,
  Rocket,
  TrendingDown,
  Zap,
} from "lucide-react";
import { WorkProject } from "@/types";
import { PROJECT_BRANDS } from "./brands";
import plateroFrameImg from "/public/images/projects/kadry/platero-ai.webp";
import inraFrameImg from "/public/images/projects/kadry/inra.webp";
import reflexFrameImg from "/public/images/projects/kadry/reflex.webp";
import dgCarsHomeImg from "/public/images/projects/dg-cars-strona.webp";

export const WORK_PROJECTS: WorkProject[] = [
  {
    name: "Platero AI",
    summary: "Answers restaurant Google reviews in the owner's voice.",
    brand: PROJECT_BRANDS.plateroAi,
    badges: [
      {
        kind: "metric",
        value: "<2%",
        label: "hallucinations in replies, down from 19%",
        shortLabel: "hallucinations, down from 19%",
        icon: TrendingDown,
      },
      { kind: "status", label: "Own product", phase: "live" },
    ],
    image: plateroFrameImg,
    imageAlt:
      "Platero AI review held for the owner, with a reply draft in the owner's voice",
    href: "/work/platero-ai",
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
    href: "/work/dg-cars",
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
    imageAlt: "INRA product page with its rating and review buttons",
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
