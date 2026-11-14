import { CaseStudy } from "@/types";
import { PROJECT_BRANDS } from "../brands";
import gameplayImg from "/public/images/projects/reflex-rozgrywka.webp";
import phoneImg from "/public/images/projects/reflex-rozgrywka-telefon.webp";
import siteImg from "/public/images/projects/reflex-strona.webp";

export const REFLEX: CaseStudy = {
  slug: "reflex",
  title: "Reflex",
  hook: "A real-time multiplayer card game for iOS, built solo from the game engine to the App Store: React Native on the phone, NestJS WebSockets in the cloud.",
  status: "Released on iOS in 2025",
  phase: "live",
  brand: PROJECT_BRANDS.reflex,
  period: "2025 to 2026",
  role: "Solo builder: game design, mobile app, backend, release and marketing",
  stack: [
    "TypeScript",
    "React Native (Expo)",
    "Zustand",
    "NestJS",
    "WebSockets",
    "Supabase",
    "PostHog",
    "GCP Cloud Run",
    "Terraform",
    "Jest",
  ],
  screenshots: [
    {
      image: gameplayImg,
      alt: "Three game screens: the start, the middle and a win",
    },
    { image: phoneImg, alt: "A game in progress on an iPhone" },
    {
      image: siteImg,
      alt: "The Reflex website with the game on a phone and the download count",
    },
  ],
  sections: [
    {
      id: "what-i-built",
      heading: "What I built",
      paragraphs: [],
      bullets: [
        "Shared engine: one TypeScript package holds the rules, and both the app and the server import it, so they cannot disagree on a move.",
        "Authoritative server: a NestJS WebSocket server keeps live games in memory and checks every move, so two players acting in the same instant cannot corrupt the state.",
        "Matchmaking: a public queue, private rooms for friends, and a bot opponent with three levels when no human joins within 10 seconds.",
        "Rating: ELO with a margin of victory bonus and protection against farming the same opponent.",
        "Accounts without sign-up: the first game creates an identity from the device, and an email moves it to a new phone.",
      ],
    },
    {
      id: "hard-parts",
      heading: "Hard parts",
      paragraphs: [],
      bullets: [
        "Old app versions must keep working. Players update at different speeds, so every server change stays compatible with the previous app.",
        "Live games in memory keep moves fast and the database off the hot path; the price is sticky routing to scale past one instance.",
        "Bots fill the queue. With a small player base, a match within ten seconds matters more than a guaranteed human.",
      ],
    },
    {
      id: "status",
      heading: "Status",
      paragraphs: ["Live on iOS. Android is in development."],
    },
  ],
};
