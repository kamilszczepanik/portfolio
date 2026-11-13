import { CaseStudy } from "@/types";

export const REFLEX: CaseStudy = {
  slug: "reflex",
  title: "Reflex",
  hook: "A real-time multiplayer card game for iOS, based on the card game Speed, built solo from game engine to App Store release: React Native on the phone, a NestJS WebSocket server in the cloud.",
  status: "Released on iOS in 2025",
  period: "2025 to 2026",
  role: "Solo builder: game design, mobile app, backend, infrastructure, App Store release and marketing",
  stack: [
    "TypeScript",
    "React Native (Expo)",
    "React",
    "NativeWind",
    "Zustand",
    "NestJS",
    "WebSockets",
    "Supabase",
    "PostHog",
    "Docker",
    "GCP Cloud Run",
    "Terraform",
    "GitHub Actions",
    "Jest",
  ],
  metrics: [
    {
      label: "Multiplayer",
      after: "Real-time, React Native + NestJS WebSockets",
    },
  ],
  sections: [
    {
      id: "problem",
      heading: "Problem and who it is for",
      paragraphs: [
        "Speed is a fast two-player card game with no turns: both players play at once, and you can put a card on a middle pile if it is one rank above or below the top card (King and Ace wrap). Reflex is for casual mobile players who want a short, competitive match against another person. It is free, with cosmetics only and no pay-to-win.",
      ],
    },
    {
      id: "what-i-built",
      heading: "What I built",
      paragraphs: [],
      bullets: [
        "Shared engine: a pure TypeScript package holds the rules: dealing, valid moves, applying a move, refresh when both players are stuck, and the end of the game. The server and the app import the same code, so they cannot disagree on a rule.",
        "Server: a NestJS WebSocket server keeps every live game in memory. It is the only authority: a move is checked against the valid moves and checked again when it is applied, so two players acting in the same instant cannot corrupt the state.",
        "App: Expo and React Native, with Zustand for state and PostHog for analytics.",
        "Matchmaking: a public queue plus private rooms to invite a friend. If no human is found in 5 to 10 seconds, a bot opponent joins. The bot is rule-based, with three levels that differ in reaction delay (0.5 to 2.5 seconds) and mistake rate (0%, 10%, 20%).",
        "Rating: an ELO system with a higher K-factor for new players, a bonus for the margin of victory (up to 1.45x), decay for repeated games against the same opponent to stop farming, and no rating loss in the first 10 games.",
        "Accounts without sign-up: the first game creates a persistent identity from the device and a signed token; email linking moves it to another device.",
      ],
    },
    {
      id: "evals",
      heading: "Where AI was used",
      paragraphs: [
        "There is no AI in the game itself; the bot is rules and randomness. AI was part of how I built and marketed it:",
      ],
      bullets: [
        "The repository carries agent instructions, and I built it with Claude Code as a pair programmer.",
        "A content pipeline reads the game's recent commits, classifies which changes are worth a post, and drafts social posts for review.",
      ],
    },
    {
      id: "quality",
      heading: "Testing",
      paragraphs: [
        "28 test files across the engine and the server (unit and integration), fixed game scenarios for edge cases (stalemate, a one-card win, a needed refresh), and a WebSocket load test script.",
      ],
    },
    {
      id: "hard-decisions",
      heading: "Hard decisions",
      paragraphs: [],
      bullets: [
        "One engine for client and server. The app can never show a move the server rejects. The cost is a build step and care with versions.",
        "In-memory game state. Live games in server memory keep latency low and the database off the hot path. The trade-off: a server restart ends the games in progress, and scaling past one instance needs sticky routing.",
        "Old app versions must keep working. Players update at different speeds, so every server change stays compatible with the previous app version, and a force-update message exists for breaking changes.",
        "Bots fill the queue. With a small player base, a match within ten seconds matters more than a guaranteed human. The trade-off is that ratings mix human and bot games.",
      ],
    },
    {
      id: "results",
      heading: "Results",
      paragraphs: [
        "One growth lesson: social engagement ads brought no installs, so I moved the budget to App Store search ads.",
      ],
    },
    {
      id: "status",
      heading: "Status",
      paragraphs: ["Android in development. The landing page is up."],
    },
    {
      id: "next",
      heading: "What I would do next",
      paragraphs: [],
      bullets: [
        "Measure retention, which PostHog was set up for but not yet tracked.",
        "Ship Android from the same code base.",
        "Show bot and human games separately in a player's rating history.",
      ],
    },
  ],
};
