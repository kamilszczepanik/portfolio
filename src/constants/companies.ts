import { Company } from "@/types";
import cambAiPreviewImg from "/public/images/companies/camb-ai-preview.jpg";
import skyEngineAiPreviewImg from "/public/images/companies/sky-engine-ai-preview.jpg";
import unityTPreviewImg from "/public/images/companies/unity-t-preview.jpg";
import cambAiLogo from "/public/images/companies/camb-ai.jpeg";
import skyEngineAiLogo from "/public/images/companies/sky-engine-ai.png";
import unityTLogo from "/public/images/companies/unity-t.jpeg";

export const COMPANIES: Company[] = [
  {
    name: "Plug Marketing (RaffleKing)",
    initials: "RK",
  },
  {
    name: "CAMB.AI",
    image: cambAiLogo,
    link: "https://www.camb.ai/",
    previewImage: cambAiPreviewImg,
  },
  {
    name: "SKY ENGINE AI",
    image: skyEngineAiLogo,
    link: "https://www.skyengine.ai/",
    previewImage: skyEngineAiPreviewImg,
  },
  {
    name: "Unity-t",
    image: unityTLogo,
    link: "https://www.unity-t.pl/",
    previewImage: unityTPreviewImg,
  },
];
