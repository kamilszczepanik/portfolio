import { Person } from "@/types";
import { AboutActions, AboutBand } from "@/components/about-panel";
import {
  ABOUT_TILE_CLASS,
  ABOUT_TILE_TITLE,
  AboutExternalLink,
  AboutProduct,
  CompanyHeading,
} from "@/components/about-tiles";
import { PROJECT_BRANDS } from "./brands";
import { COMPANY_URLS, CONTACT_INFO, OPEN_SOURCE_URLS } from "./contact";
import { COMPANY_PREVIEWS } from "./companies";
import cambAiLogo from "/public/images/companies/camb-ai.webp";
import kamilProfileImg from "/public/resume/ProfilePictureKamilSzczepanik.jpg";

const TOOLKIT = [
  "LLMs",
  "AI agents",
  "Tool calling",
  "MCP",
  "Context engineering",
  "Structured outputs",
  "RAG",
  "Embeddings",
  "Evals",
  "Guardrails",
  "Vercel AI SDK",
  "Claude Agent SDK",
];

export const ABOUT_ME: Person = {
  id: 0,
  name: "Kamil Szczepanik",
  designation: "AI Product Engineer",
  description: (
    <div className="w-full space-y-3 text-foreground leading-relaxed">
      <p className="text-base">
        AI Product Engineer with 6+ years of full-stack TypeScript experience,
        mostly at startups. I build LLM features end to end and ship them into
        products people use. Based in Dubai.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <section className={ABOUT_TILE_CLASS}>
          <CompanyHeading
            name="RaffleKing"
            url={COMPANY_URLS.raffleKing}
            preview={COMPANY_PREVIEWS.raffleKing}
            logo="/images/companies/raffleking.svg"
          />
          <p className="mt-2">
            I built most of the platform:{" "}
            <strong className="font-bold text-white">5,773 users</strong>,{" "}
            <strong className="font-bold text-white">884 raffles</strong> and{" "}
            <strong className="font-bold text-white">
              $30,000+ in prizes to 402 winners
            </strong>
            , plus fantasy football with ~1,000 players.
          </p>
        </section>
        <section className={ABOUT_TILE_CLASS}>
          <CompanyHeading
            name="CAMB.AI"
            url={COMPANY_URLS.cambAi}
            preview={COMPANY_PREVIEWS.cambAi}
            logo={cambAiLogo}
          />
          <p className="mt-2">
            I cut latency by{" "}
            <strong className="font-bold text-white">50%</strong> in a real-time
            voice translation app. I also built the Website Translator, live in
            120 languages on european-athletics.com, and worked on AI dubbing
            and live streaming.
          </p>
        </section>
      </div>

      <section className={ABOUT_TILE_CLASS}>
        <h3 className={ABOUT_TILE_TITLE}>Own products</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          <AboutProduct
            name="Platero AI"
            href="/work/platero-ai"
            brand={PROJECT_BRANDS.plateroAi}
          >
            answers restaurant Google reviews in the owner&apos;s voice.
          </AboutProduct>
          <AboutProduct
            name="Safety Support"
            href="/work/safety-support"
            brand={PROJECT_BRANDS.safetySupport}
          >
            tells residents what to do after a scam or a threat.
          </AboutProduct>
        </ul>
      </section>

      <section className={ABOUT_TILE_CLASS}>
        <h3 className={ABOUT_TILE_TITLE}>Open source</h3>
        <p className="mt-2">
          <AboutExternalLink href={OPEN_SOURCE_URLS.claudePrReviewer}>
            claude-pr-reviewer
          </AboutExternalLink>
          , a GitHub PR reviewer on Claude Agent SDK, and{" "}
          <AboutExternalLink href={OPEN_SOURCE_URLS.qaAnnotator}>
            qa-annotator
          </AboutExternalLink>
          , a Chrome extension that turns clicks into bug reports for coding
          agents.
        </p>
      </section>

      <div className="space-y-2 pt-1">
        <h3 className="text-sm font-semibold text-white/70">Toolkit</h3>
        <ul className="flex flex-wrap gap-1.5">
          {TOOLKIT.map((tech) => (
            <li
              key={tech}
              className="inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary-light"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-white/10 pt-3 text-sm text-foreground-muted">
        Languages: Polish (native), English (fluent). Off-hours: padel,
        travelling and books.
      </p>
    </div>
  ),
  image: kamilProfileImg,
  link: CONTACT_INFO.linkedin,
  banner: <AboutBand />,
  actions: <AboutActions />,
};
