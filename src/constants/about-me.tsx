import { Person } from "@/types";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { COMPANY_URLS, CONTACT_INFO, OPEN_SOURCE_URLS } from "./contact";
import { COMPANY_PREVIEW_SIZE, COMPANY_PREVIEWS } from "./companies";
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

const LINK_CLASS =
  "text-primary hover:text-primary/80 font-semibold transition-colors";

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <span aria-hidden className="text-primary font-bold text-lg mt-0.5">
      →
    </span>
    <span className="text-sm leading-relaxed">{children}</span>
  </li>
);

export const ABOUT_ME: Person = {
  id: 0,
  name: "Kamil Szczepanik",
  designation: "AI Product Engineer",
  description: (
    <div className="space-y-4 text-foreground leading-relaxed">
      <p className="text-base">
        AI Product Engineer with 6+ years of full-stack TypeScript experience,
        mostly at startups. I build LLM features end to end and ship them into
        products people use. Based in Dubai.
      </p>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white border-b border-foreground-muted pb-2">
          Highlights
        </h3>
        <ul className="space-y-2">
          <Highlight>
            At{" "}
            <LinkPreview
              url={COMPANY_URLS.raffleKing}
              imageSrc={COMPANY_PREVIEWS.raffleKing}
              {...COMPANY_PREVIEW_SIZE}
              isStatic
              target="_blank"
            >
              <span className={LINK_CLASS}>RaffleKing</span>
              <NewTabHint />
            </LinkPreview>{" "}
            I built most of the platform:{" "}
            <strong className="font-bold">5,773 users</strong>,{" "}
            <strong className="font-bold">884 raffles</strong> and{" "}
            <strong className="font-bold">
              $30,000+ in prizes to 402 winners
            </strong>
            , plus fantasy football with ~1,000 players.
          </Highlight>
          <Highlight>
            At{" "}
            <LinkPreview
              url={COMPANY_URLS.cambAi}
              imageSrc={COMPANY_PREVIEWS.cambAi}
              {...COMPANY_PREVIEW_SIZE}
              isStatic
              target="_blank"
            >
              <span className={LINK_CLASS}>CAMB.AI</span>
              <NewTabHint />
            </LinkPreview>{" "}
            I cut latency by <strong className="font-bold">50%</strong> in a
            real-time voice translation app.
          </Highlight>
          <Highlight>
            On my own I built{" "}
            <Link href="/work/platero-ai" className={LINK_CLASS}>
              Platero AI
            </Link>
            , which answers restaurant Google reviews in the owner&apos;s voice.
          </Highlight>
          <Highlight>
            Open source:{" "}
            <a
              href={OPEN_SOURCE_URLS.claudePrReviewer}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              claude-pr-reviewer
              <NewTabHint />
            </a>
            , a GitHub PR reviewer on Claude Agent SDK, and{" "}
            <a
              href={OPEN_SOURCE_URLS.qaAnnotator}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              qa-annotator
              <NewTabHint />
            </a>
            , a Chrome extension that turns clicks into bug reports for coding
            agents.
          </Highlight>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white border-b border-foreground-muted pb-2">
          Toolkit
        </h3>
        <ul className="flex flex-wrap gap-1">
          {TOOLKIT.map((tech) => (
            <li
              key={tech}
              className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-medium px-2 py-1.5 rounded-full"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-foreground">
        Languages: Polish (native), English (fluent). Off-hours: padel,
        travelling and books.
      </p>
    </div>
  ),
  image: kamilProfileImg,
  link: CONTACT_INFO.linkedin,
};
