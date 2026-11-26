import { Bot, CheckCheck, Layers, Users, Zap } from "lucide-react";
import { ExperienceEntry } from "@/types";
import { PROJECT_BRANDS } from "./brands";
import {
  CAMB_AI_CLIENTS,
  SKY_ENGINE_AI_CLIENTS,
  UNITY_T_CLIENTS,
} from "./experience-clients";
import cambAiLogo from "/public/images/companies/camb-ai.webp";
import skyEngineAiLogo from "/public/images/companies/sky-engine-ai.webp";
import unityTLogo from "/public/images/companies/unity-t.webp";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "RaffleKing",
    period: "Nov 2025 to now",
    role: "Senior Full-Stack Engineer",
    image: "/images/companies/raffleking.svg",
    icon: Users,
    metric: {
      value: 5773,
      isGrouped: true,
      caption: "users on a platform I built most of",
    },
    highlights: [
      "Built most of the platform: 884 raffles and $30,000+ in prizes to 402 winners",
      "Launched free-to-play fantasy football with about 1,000 players",
      "Built the whole admin panel: permissions, notifications, audit and security",
    ],
  },
  {
    company: "Platero AI",
    period: "Jun 2024 to now",
    role: "Founder & AI Engineer",
    brand: PROJECT_BRANDS.plateroAi,
    icon: Bot,
    metric: {
      value: 35,
      suffix: "+",
      caption: "projects delivered since 2024",
    },
    highlights: [
      "Advised 30+ clients, including C-level stakeholders",
      "Cut hallucinations in Platero AI's replies from 19% to under 2%, measured with an LLM-as-a-judge eval",
      "Built Platero AI solo: Google review replies in the owner's voice, with human approval of risky ones",
    ],
  },
  {
    company: "CAMB.AI",
    period: "May to Sep 2025",
    role: "AI Engineer",
    image: cambAiLogo,
    icon: Zap,
    metric: {
      value: 50,
      suffix: "%",
      caption: "lower latency in live voice translation",
    },
    highlights: [
      "Website Translator in 120 languages, live on european-athletics.com",
      "Integrated a new AI model into Chatterbox, a real-time speech translation app",
    ],
    clients: CAMB_AI_CLIENTS,
  },
  {
    company: "SKY ENGINE AI",
    period: "2022 to 2024",
    role: "Full Stack, then Lead Frontend Engineer",
    image: skyEngineAiLogo,
    icon: Layers,
    metric: { value: 7, caption: "web projects led" },
    highlights: [
      "Redesigned the synthetic data platform front to back, which helped sign the first 5 business clients",
      "Mentored developers in 1-on-1s and code reviews, and shipped daily releases",
      "Ran 15+ user testing sessions that led to 50+ UI/UX improvements",
    ],
    clients: SKY_ENGINE_AI_CLIENTS,
  },
  {
    company: "Unity-t",
    period: "2021",
    role: "QA, Automation and Junior Software Engineer",
    image: unityTLogo,
    icon: CheckCheck,
    metric: {
      value: 4500,
      suffix: "+",
      isGrouped: true,
      caption: "tests a day",
    },
    highlights: [
      "Designed the API, backend and database of a testing system for 5 teams",
      "Automated 70+ test cases and cut test run time by over 25%",
    ],
    clients: UNITY_T_CLIENTS,
  },
];
