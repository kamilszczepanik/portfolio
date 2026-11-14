import {
  Luckiest_Guy,
  Montserrat,
  Playfair_Display,
  Source_Serif_4,
} from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const BRAND_FONTS = {
  platero: `${playfairDisplay.className} font-semibold`,
  safety: `${sourceSerif.className} font-semibold`,
  raffleKing: `${montserrat.className} font-black tracking-tight`,
  inra: `${montserrat.className} font-light uppercase tracking-[0.18em]`,
  reflex: `${luckiestGuy.className} font-normal tracking-wide`,
  devTool: "font-(family-name:--font-geist-mono) font-semibold tracking-tight",
} as const;
