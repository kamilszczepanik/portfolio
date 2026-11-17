import { CheckCheck, Layers, Users, Zap } from "lucide-react";
import { ExperienceEntry } from "@/types";
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
    company: "CAMB.AI",
    period: "May to Sep 2025",
    role: "Senior Software Engineer",
    image: cambAiLogo,
    icon: Zap,
    metric: {
      value: 50,
      suffix: "%",
      caption: "lower latency in live voice translation",
    },
    highlights: [
      "Website Translator in 120 languages, live on european-athletics.com",
      "Chatterbox: faster live voice translation and a new AI model integrated",
    ],
    clients: CAMB_AI_CLIENTS,
  },
  {
    company: "SKY ENGINE AI",
    period: "2022 to 2024",
    role: "Lead Frontend Engineer",
    image: skyEngineAiLogo,
    icon: Layers,
    metric: { value: 7, caption: "web projects led" },
    highlights: [
      "Redesigned the platform front to back, which helped sign the first 5 clients",
      "Ran the team's releases, environments, 1-on-1s and planning",
      "Led 15+ user testing sessions that brought 50+ UI/UX improvements",
    ],
    clients: SKY_ENGINE_AI_CLIENTS,
  },
  {
    company: "Unity-t",
    period: "2021",
    role: "QA and Software Engineer",
    image: unityTLogo,
    icon: CheckCheck,
    metric: {
      value: 4500,
      suffix: "+",
      isGrouped: true,
      caption: "automated tests a day",
    },
    highlights: [
      "Designed the API, backend and database of a testing system for 5 teams",
      "Wrote 70+ automated test cases and made test runs 5x more efficient",
    ],
    clients: UNITY_T_CLIENTS,
  },
];
