import Image from "next/image";
import { OPEN_SOURCE_PROJECTS } from "@/constants";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { OpenSourceProject } from "@/types";
import { GridGlowBackdrop } from "./grid-glow-backdrop";
import { SECTION_CONTAINER, SECTION_HEADING } from "./section-styles";

const OPEN_SOURCE_HEADING_ID = "open-source-heading";

const OpenSourceCard = ({ project }: { project: OpenSourceProject }) => (
  <a
    href={project.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative isolate block h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-[#070707] transition duration-500 hover:-translate-y-1 hover:border-blue-500/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:h-[400px]"
  >
    <span className="absolute inset-x-5 top-5 block h-[210px] overflow-hidden rounded-xl border border-white/10 sm:inset-x-7 sm:top-7 sm:h-[240px]">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(min-width: 768px) 560px, 100vw"
        placeholder="blur"
        className="animate-pan object-cover object-top motion-reduce:animate-none"
      />
    </span>
    <span className="absolute inset-x-0 bottom-0 z-10 block bg-linear-to-b from-transparent to-black/90 to-45% px-6 pt-10 pb-6">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-xl font-semibold text-white sm:text-2xl">
          {project.name}
        </span>
        <span className="shrink-0 text-sm text-white/60">
          {project.platform}
        </span>
      </span>
      <span className="mt-1 block text-neutral-300">{project.summary}</span>
    </span>
    <NewTabHint />
  </a>
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
          <li key={project.name}>
            <OpenSourceCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
