import { ExperienceClients } from "@/types";

const LOGO_DIR = "/images/clients";

const PRODUCTS_LEAD = "Products I worked on are used by these";

export const CAMB_AI_CLIENTS: ExperienceClients = {
  lead: PRODUCTS_LEAD,
  trail: "clients",
  items: [
    {
      name: "European Athletics",
      logo: { src: `${LOGO_DIR}/european-athletics.svg`, width: 55 },
      product: "Website Translator on european-athletics.com",
      date: "Live since Dec 2025",
    },
    {
      name: "Vodafone",
      logo: { src: `${LOGO_DIR}/vodafone.svg`, width: 70 },
      product:
        "Chatterbox live speech translation, piloted in VOIS contact centres",
      date: "Announced Jun 2026",
    },
    {
      name: "DXC Technology",
      logo: { src: `${LOGO_DIR}/dxc-technology.svg`, width: 86 },
      product: "In-car live translation prototype",
      date: "Jun 2025",
    },
    {
      name: "NASCAR",
      logo: { src: `${LOGO_DIR}/nascar.svg`, width: 80 },
      product: "Live Spanish translation of the Mexico City race radio",
      date: "Jun 2025",
    },
    {
      name: "World League Live!",
      logo: { src: `${LOGO_DIR}/world-league-live.svg`, width: 16 },
      product: "Live AI news translation",
      date: "Aug 2025",
    },
    {
      name: "India Today",
      logo: { src: `${LOGO_DIR}/india-today-group.svg`, width: 18 },
      product: "Live AI news translation into Hindi and regional languages",
      date: "Sep 2025",
    },
    {
      name: "FanCode",
      logo: { src: `${LOGO_DIR}/fancode.svg`, width: 74 },
      product: "AI Hindi commentary for the Caribbean Premier League",
      date: "Aug to Sep 2025",
    },
  ],
};

const SKY_ENGINE_PLATFORM = "Synthetic data platform for vision AI";
const SKY_ENGINE_NAMED = "Named Jan 2024";

export const SKY_ENGINE_AI_CLIENTS: ExperienceClients = {
  lead: PRODUCTS_LEAD,
  trail: "clients",
  items: [
    {
      name: "Renault Group",
      logo: { src: `${LOGO_DIR}/renault-group.svg`, width: 40 },
      product: "Synthetic Data Cloud for driver monitoring",
      date: "Dec 2023",
    },
    {
      name: "Scania",
      logo: { src: `${LOGO_DIR}/scania.svg`, width: 73 },
      product: SKY_ENGINE_PLATFORM,
      date: SKY_ENGINE_NAMED,
    },
    {
      name: "Ericsson",
      logo: { src: `${LOGO_DIR}/ericsson.svg`, width: 76 },
      product: SKY_ENGINE_PLATFORM,
      date: SKY_ENGINE_NAMED,
    },
    {
      name: "Samsung",
      logo: { src: `${LOGO_DIR}/samsung.svg`, width: 85 },
      product: SKY_ENGINE_PLATFORM,
      date: SKY_ENGINE_NAMED,
    },
    {
      name: "Syngenta",
      logo: { src: `${LOGO_DIR}/syngenta.svg`, width: 62 },
      product: SKY_ENGINE_PLATFORM,
      date: SKY_ENGINE_NAMED,
    },
  ],
};

export const UNITY_T_CLIENTS: ExperienceClients = {
  lead: "Used by a",
  trail: "client",
  items: [
    {
      name: "TUZ Ubezpieczenia",
      logo: { src: `${LOGO_DIR}/tuz-ubezpieczenia.svg`, width: 36 },
      product: "Insurance apps for agents, covered by the test system I built",
      date: "2021",
    },
  ],
};
