import { Company } from "@/types";
import { COMPANY_URLS } from "./contact";
import raffleKingHomeImg from "/public/images/projects/raffleking-strona-glowna.webp";
import cambAiPreviewImg from "/public/images/companies/camb-ai-preview.jpg";
import skyEngineAiPreviewImg from "/public/images/companies/sky-engine-ai-preview.jpg";
import unityTPreviewImg from "/public/images/companies/unity-t-preview.jpg";
import cambAiLogo from "/public/images/companies/camb-ai.webp";
import skyEngineAiLogo from "/public/images/companies/sky-engine-ai.webp";
import unityTLogo from "/public/images/companies/unity-t.webp";

export const COMPANY_PREVIEW_SIZE = { width: 200, height: 152 };

export const COMPANY_PREVIEWS = {
  raffleKing: raffleKingHomeImg,
  cambAi: cambAiPreviewImg,
  skyEngineAi: skyEngineAiPreviewImg,
  unityT: unityTPreviewImg,
};

export const COMPANIES: Company[] = [
  {
    name: "RaffleKing",
    image: "/images/companies/raffleking.svg",
    link: COMPANY_URLS.raffleKing,
    previewImage: COMPANY_PREVIEWS.raffleKing,
  },
  {
    name: "CAMB.AI",
    image: cambAiLogo,
    link: COMPANY_URLS.cambAi,
    previewImage: COMPANY_PREVIEWS.cambAi,
  },
  {
    name: "SKY ENGINE AI",
    image: skyEngineAiLogo,
    link: COMPANY_URLS.skyEngineAi,
    previewImage: COMPANY_PREVIEWS.skyEngineAi,
  },
  {
    name: "Unity-t",
    image: unityTLogo,
    link: COMPANY_URLS.unityT,
    previewImage: COMPANY_PREVIEWS.unityT,
  },
];
