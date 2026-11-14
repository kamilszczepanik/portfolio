import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { OPEN_SOURCE_PROJECTS } from "@/constants";
import { BrandLogo } from "@/components/ui/brand-logo";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { brandStyle } from "@/lib/brand-style";
import { cn } from "@/lib/utils";
import { OpenSourceProject } from "@/types";
import { GridGlowBackdrop } from "./grid-glow-backdrop";
import { ProjectBadges } from "./project-badges";
import { SECTION_CONTAINER, SECTION_HEADING } from "./section-styles";

const OPEN_SOURCE_HEADING_ID = "open-source-heading";

const OpenSourceCard = ({ project }: { project: OpenSourceProject }) => (
  <article
    style={brandStyle(project.brand)}
    className="group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#070707] p-5 transition duration-500 hover:-translate-y-1 hover:border-(color:--brand)/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
  >
    <span
      aria-hidden
      className="absolute -top-24 left-1/2 -z-10 size-72 -translate-x-1/2 rounded-full bg-(color:--brand)/20 blur-3xl"
    />
    <span className="relative block h-[210px] shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-[240px]">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(min-width: 768px) 560px, 100vw"
        placeholder="blur"
        className="animate-pan object-cover object-top motion-reduce:animate-none"
      />
    </span>
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 z-10 rounded-[28px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-500"
    >
      <span className="sr-only">{`${project.name} on GitHub`}</span>
      <NewTabHint />
    </a>
    <div className="pointer-events-none relative z-20 mt-5 flex flex-1 flex-col">
      <h3 className="flex items-center gap-3">
        <BrandLogo brand={project.brand} className="size-9 rounded-lg" />
        <span
          className={cn(
            "text-xl text-white sm:text-2xl",
            project.brand.fontClassName,
          )}
        >
          {project.name}
        </span>
      </h3>
      <p className="mt-2 text-neutral-300">{project.summary}</p>
      <ProjectBadges badges={project.badges} brand={project.brand} />
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm">
        <Link
          href={`/work/${project.caseStudySlug}`}
          className="pointer-events-auto inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          Case study
          <ArrowRight aria-hidden className="size-4" />
        </Link>
        <span
          aria-hidden
          className="inline-flex items-center gap-1.5 text-neutral-300 transition-colors group-hover:text-white"
        >
          <Github className="size-4" />
          GitHub
        </span>
      </div>
    </div>
  </article>
);

export const OpenSourceSection = () => (
  <section
    id="open-source"
    aria-labelledby={OPEN_SOURCE_HEADING_ID}
    className="relative isolate overflow-hidden py-16 sm:py-24"
  >
    <GridGlowBackdrop side="right" />
    <div className={SECTION_CONTAINER}>
      <h2 id={OPEN_SOURCE_HEADING_ID} className={SECTION_HEADING}>
        Open source
      </h2>
      <ul className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
        {OPEN_SOURCE_PROJECTS.map((project) => (
          <li key={project.name} className="h-full">
            <OpenSourceCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
