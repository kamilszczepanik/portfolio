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
    clients: CAMB_AI_CLIENTS,
  },
  {
    company: "SKY ENGINE AI",
    period: "2022 to 2024",
    role: "Lead Frontend Engineer",
    image: skyEngineAiLogo,
    icon: Layers,
    metric: { value: 7, caption: "web projects led" },
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
    clients: UNITY_T_CLIENTS,
  },
];
