import Image from "next/image";
import { ArrowRight, Github } from "lucide-react";
import { OPEN_SOURCE_PROJECTS } from "@/constants";
import { BrandLogo } from "@/components/ui/brand-logo";
import { CtaButton, ctaVariants } from "@/components/ui/cta-button";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { SwipeCards } from "@/components/ui/swipe-cards";
import { brandStyle } from "@/lib/brand-style";
import { cn } from "@/lib/utils";
import { OpenSourceProject } from "@/types";
import { ProjectBadges } from "./project-badges";
import {
  SECTION_CONTAINER,
  SECTION_HEADING,
  SECTION_SPACING,
} from "./section-styles";

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
        className="object-cover object-left"
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
      <ProjectBadges badges={project.badges} />
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
        <CtaButton
          href={`/work/${project.caseStudySlug}`}
          className="pointer-events-auto"
        >
          Case study
          <ArrowRight aria-hidden />
        </CtaButton>
        <span
          aria-hidden
          className={cn(
            ctaVariants({ variant: "secondary" }),
            "group-hover:bg-primary/15",
          )}
        >
          <Github />
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
    className={`relative isolate overflow-hidden ${SECTION_SPACING}`}
  >
    <div className={SECTION_CONTAINER}>
      <h2 id={OPEN_SOURCE_HEADING_ID} className={SECTION_HEADING}>
        Open source
      </h2>
      <SwipeCards
        items={OPEN_SOURCE_PROJECTS}
        getKey={(project) => project.name}
        label="Open source projects"
        className="mt-10 sm:mt-12"
        listClassName="md:grid md:grid-cols-2 md:gap-5"
        renderItem={({ item: project }) => <OpenSourceCard project={project} />}
      />
    </div>
  </section>
);
