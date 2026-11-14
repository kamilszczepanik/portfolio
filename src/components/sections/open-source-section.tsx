import Image from "next/image";
import { OPEN_SOURCE_PROJECTS } from "@/constants";
import { BrandLogo } from "@/components/ui/brand-logo";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { brandStyle } from "@/lib/brand-style";
import { cn } from "@/lib/utils";
import { OpenSourceProject } from "@/types";
import { GridGlowBackdrop } from "./grid-glow-backdrop";
import { SECTION_CONTAINER, SECTION_HEADING } from "./section-styles";

const OPEN_SOURCE_HEADING_ID = "open-source-heading";

const PlatformChip = ({ project }: { project: OpenSourceProject }) => {
  const Icon = project.platformIcon;
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-(color:--brand)/45 bg-(color:--brand)/15 px-3 py-1 text-sm font-medium text-(color:--brand-tint)">
      <Icon aria-hidden className="size-3.5" />
      {project.platform}
    </span>
  );
};

const OpenSourceCard = ({ project }: { project: OpenSourceProject }) => (
  <a
    href={project.href}
    target="_blank"
    rel="noopener noreferrer"
    style={brandStyle(project.brand)}
    className="group relative isolate block h-[380px] overflow-hidden rounded-[28px] border border-white/10 bg-[#070707] transition duration-500 hover:-translate-y-1 hover:border-(color:--brand)/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:h-[400px]"
  >
    <span
      aria-hidden
      className="absolute -top-24 left-1/2 -z-10 size-72 -translate-x-1/2 rounded-full bg-(color:--brand)/20 blur-3xl"
    />
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
      <span className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="flex items-center gap-3">
          <BrandLogo brand={project.brand} className="size-9 rounded-lg" />
          <span
            className={cn(
              "text-xl text-white sm:text-2xl",
              project.brand.fontClassName,
            )}
          >
            {project.name}
          </span>
        </span>
        <PlatformChip project={project} />
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
