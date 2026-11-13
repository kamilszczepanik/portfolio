import { Person } from "@/types";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";
import { CONTACT_INFO } from "./contact";
import kamilProfileImg from "/public/resume/ProfilePictureKamilSzczepanik.jpg";
import cambAiPreviewImg from "/public/images/companies/camb-ai-preview.jpg";
import skyEngineAiPreviewImg from "/public/images/companies/sky-engine-ai-preview.jpg";
import unityTPreviewImg from "/public/images/companies/unity-t-preview.jpg";

export const ABOUT_ME: Person = {
  id: 0,
  name: "Kamil Szczepanik",
  designation: "AI Product Engineer",
  description: (
    <div className="space-y-4 text-foreground leading-relaxed">
      <p className="text-xl font-semibold text-white border-b border-foreground-muted pb-2">
        Building AI Products, End to End
      </p>

      <div className="space-y-2">
        <p className="text-base">
          Hi, I&apos;m Kamil. I&apos;m an AI product engineer with 5+ years of
          full-stack experience in startups. I build LLM features end to end
          and test them before users do: evals, LLM judges and red-team
          suites.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white border-b border-foreground-muted pb-2">
          Recent Highlights
        </h3>

        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">→</span>
            <span className="text-sm leading-relaxed">
              At <strong className="font-bold">RaffleKing</strong> (Plug
              Marketing), I build skill-based prize competitions and fantasy
              football for <strong className="font-bold">5,000+ users</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">→</span>
            <span className="text-sm leading-relaxed">
              At{" "}
              <LinkPreview
                url="https://camb.ai"
                imageSrc={cambAiPreviewImg}
                isStatic
                target="_blank"
              >
                <span className="text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer">
                  CAMB.AI
                </span>
              </LinkPreview>
              , I cut real-time voice translation latency by{" "}
              <strong className="font-bold">50%</strong> and integrated a new
              AI model in production.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">→</span>
            <span className="text-sm leading-relaxed">
              On{" "}
              <Link
                href="/work/platero-ai"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Platero AI
              </Link>
              , my 277-case
              red team raised the pass rate of AI review replies from{" "}
              <strong className="font-bold">83% to 95%</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">→</span>
            <span className="text-sm leading-relaxed">
              Led 7 web projects at{" "}
              <LinkPreview
                url="https://skyengine.ai"
                imageSrc={skyEngineAiPreviewImg}
                isStatic
                target="_blank"
              >
                <span className="text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer">
                  Sky Engine AI
                </span>
              </LinkPreview>{" "}
              and redesigned the core platform, contributing to signing the{" "}
              <strong className="font-bold">first 5 B2B clients</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">→</span>
            <span className="text-sm leading-relaxed">
              At{" "}
              <LinkPreview
                url="https://www.unity-t.pl/"
                imageSrc={unityTPreviewImg}
                isStatic
                target="_blank"
              >
                <span className="text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer">
                  Unity-t
                </span>
              </LinkPreview>
              , I architected an automated testing system that cut a 32-hour
              manual process to 30 minutes, a{" "}
              <strong className="font-bold">98% reduction</strong>.
            </span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white border-b border-foreground-muted pb-2">
          My Core Toolkit
        </h3>
        <div className="flex flex-wrap gap-1">
          {[
            "TypeScript",
            "Next.js",
            "Node.js",
            "NestJS",
            "Python",
            "Claude API",
            "AI agents",
            "Evals",
            "RAG",
            "MCP",
            "PostgreSQL",
            "GCP",
          ].map((tech) => (
            <span
              key={tech}
              className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-medium px-2 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <p className="text-foreground text-sm">
        Off-hours, I&apos;m mastering padel and other sports.
      </p>
    </div>
  ),
  image: kamilProfileImg,
  link: CONTACT_INFO.linkedin,
};
