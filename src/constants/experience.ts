import { ExperienceEntry } from "@/types";
import cambAiLogo from "/public/images/companies/camb-ai.jpeg";
import skyEngineAiLogo from "/public/images/companies/sky-engine-ai.png";
import unityTLogo from "/public/images/companies/unity-t.jpeg";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "RaffleKing",
    period: "Nov 2025 to now",
    role: "Senior Full-Stack Engineer",
    image: "/images/companies/raffleking.svg",
    isDarkOnLight: false,
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
    isDarkOnLight: true,
    metric: {
      value: 50,
      suffix: "%",
      caption: "lower latency in live voice translation",
    },
  },
  {
    company: "SKY ENGINE AI",
    period: "2022 to 2024",
    role: "Lead Frontend Engineer",
    image: skyEngineAiLogo,
    isDarkOnLight: true,
    metric: { value: 7, caption: "web projects led" },
  },
  {
    company: "Unity-t",
    period: "2021",
    role: "QA and Software Engineer",
    image: unityTLogo,
    isDarkOnLight: true,
    metric: {
      value: 4500,
      suffix: "+",
      isGrouped: true,
      caption: "automated tests a day",
    },
  },
];
