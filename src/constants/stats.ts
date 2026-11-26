import { Stat, StatBreakdown } from "@/types";

const REACH_BREAKDOWN: StatBreakdown = {
  title: "250,000+ people reached",
  intro: "About 300,000 people, counted product by product:",
  rows: [
    {
      value: "100,000+",
      label:
        "readers of european-athletics.com, translated by the Website Translator I built",
    },
    {
      value: "100,000+",
      label:
        "FanCode viewers of the Caribbean Premier League in AI Hindi commentary (estimate)",
    },
    {
      value: "55,000+",
      label:
        "viewers of AI dubbed NASCAR, India Today and World League Live! streams (1% of each audience)",
    },
    {
      value: "22,000+",
      label: "DG Cars shoppers and 5,773 RaffleKing players",
    },
    {
      value: "10,000",
      label: "Vodafone contact centre agents piloting Chatterbox",
    },
    {
      value: "2,500+",
      label:
        "TUZ insurance agents and their clients, 200+ SKY ENGINE AI users",
    },
  ],
  note: "Counted product by product; live events count 1% of the audience. Shown as 250,000+, rounded down.",
};

export const STATS: Stat[] = [
  {
    label: "Years",
    value: 5,
    suffix: "+",
  },
  {
    label: "Projects",
    value: 35,
    suffix: "+",
  },
  {
    label: "Clients",
    value: 30,
    suffix: "+",
  },
  {
    label: "People reached",
    value: 250000,
    suffix: "+",
    isGrouped: true,
    breakdown: REACH_BREAKDOWN,
  },
];
