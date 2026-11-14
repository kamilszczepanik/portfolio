import { Company } from "@/types";
import { COMPANY_URLS } from "./contact";
import raffleKingPreviewImg from "/public/images/companies/raffleking-preview.webp";
import cambAiPreviewImg from "/public/images/companies/camb-ai-preview.jpg";
import skyEngineAiPreviewImg from "/public/images/companies/sky-engine-ai-preview.jpg";
import unityTPreviewImg from "/public/images/companies/unity-t-preview.jpg";
import cambAiLogo from "/public/images/companies/camb-ai.webp";
import skyEngineAiLogo from "/public/images/companies/sky-engine-ai.webp";
import unityTLogo from "/public/images/companies/unity-t.webp";

export const COMPANIES: Company[] = [
  {
    name: "RaffleKing",
    image: "/images/companies/raffleking.svg",
    link: COMPANY_URLS.raffleKing,
    previewImage: raffleKingPreviewImg,
  },
  {
    name: "CAMB.AI",
    image: cambAiLogo,
    link: COMPANY_URLS.cambAi,
    previewImage: cambAiPreviewImg,
  },
  {
    name: "SKY ENGINE AI",
    image: skyEngineAiLogo,
    link: COMPANY_URLS.skyEngineAi,
    previewImage: skyEngineAiPreviewImg,
  },
  {
    name: "Unity-t",
    image: unityTLogo,
    link: COMPANY_URLS.unityT,
    previewImage: unityTPreviewImg,
  },
];
