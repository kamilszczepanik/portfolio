import { Company } from "@/types";
import raffleKingPreviewImg from "/public/images/companies/raffleking-preview.webp";
import cambAiPreviewImg from "/public/images/companies/camb-ai-preview.jpg";
import skyEngineAiPreviewImg from "/public/images/companies/sky-engine-ai-preview.jpg";
import unityTPreviewImg from "/public/images/companies/unity-t-preview.jpg";
import cambAiLogo from "/public/images/companies/camb-ai.jpeg";
import skyEngineAiLogo from "/public/images/companies/sky-engine-ai.png";
import unityTLogo from "/public/images/companies/unity-t.jpeg";

export const COMPANIES: Company[] = [
  {
    name: "RaffleKing",
    image: "/images/companies/raffleking.svg",
    isDarkOnLight: false,
    link: "https://www.raffleking.io",
    previewImage: raffleKingPreviewImg,
  },
  {
    name: "CAMB.AI",
    image: cambAiLogo,
    isDarkOnLight: true,
    link: "https://www.camb.ai/",
    previewImage: cambAiPreviewImg,
  },
  {
    name: "SKY ENGINE AI",
    image: skyEngineAiLogo,
    isDarkOnLight: true,
    link: "https://www.skyengine.ai/",
    previewImage: skyEngineAiPreviewImg,
  },
  {
    name: "Unity-t",
    image: unityTLogo,
    isDarkOnLight: true,
    link: "https://www.unity-t.pl/",
    previewImage: unityTPreviewImg,
  },
];
