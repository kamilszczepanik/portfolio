import { BRAND_FONTS } from "@/lib/brand-fonts";
import { ProjectBrand } from "@/types";
import dgCarsLogo from "/public/images/brands/dg-cars.webp";
import reflexLogo from "/public/images/brands/reflex.webp";

export const PROJECT_BRANDS = {
  plateroAi: {
    logo: "/images/brands/platero-ai.svg",
    fontClassName: BRAND_FONTS.platero,
    accent: "#a33f4b",
    secondary: "#b8976a",
    tint: "#e9cfa8",
  },
  safetySupport: {
    logo: "/images/brands/safety-support.svg",
    fontClassName: BRAND_FONTS.safety,
    accent: "#2f5d9e",
    secondary: "#c9a227",
    tint: "#e6c65a",
  },
  inra: {
    logo: "/images/brands/inra.svg",
    fontClassName: BRAND_FONTS.inra,
    accent: "#3e6390",
    secondary: "#c27a2c",
    tint: "#eaa864",
  },
  reflex: {
    logo: reflexLogo,
    fontClassName: BRAND_FONTS.reflex,
    accent: "#f9b82c",
    secondary: "#18c69b",
    tint: "#fed971",
  },
  dgCars: {
    logo: dgCarsLogo,
    fontClassName: BRAND_FONTS.dgCars,
    accent: "#492583",
    secondary: "#fbc94b",
    tint: "#6f38c7",
  },
  claudePrReviewer: {
    logo: "/images/brands/claude-pr-reviewer.svg",
    fontClassName: BRAND_FONTS.devTool,
    accent: "#d97757",
    secondary: "#3fb950",
    tint: "#f0a283",
  },
  qaAnnotator: {
    logo: "/images/brands/qa-annotator.svg",
    fontClassName: BRAND_FONTS.devTool,
    accent: "#ff2d55",
    secondary: "#7dd3fc",
    tint: "#7dd3fc",
  },
} satisfies Record<string, ProjectBrand>;
