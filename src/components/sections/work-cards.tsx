import Image from "next/image";
import { WORK_PROJECTS } from "@/constants";
import { BrandLogo } from "@/components/ui/brand-logo";
import { SwipeCards } from "@/components/ui/swipe-cards";
import { brandFrameShadow, brandStyle } from "@/lib/brand-style";
import { cn } from "@/lib/utils";
import { ProjectBadges } from "./project-badges";
import { ProjectLink } from "./project-link";
import {
  SECTION_CONTAINER,
  SECTION_HEADING,
  SECTION_SPACING,
} from "./section-styles";

const isWideAt = (index: number) =>
  WORK_PROJECTS.length % 2 === 1 && index === WORK_PROJECTS.length - 1;

export const WorkCards = () => (
  <div
    className={cn(SECTION_CONTAINER, SECTION_SPACING, "motion-safe:lg:hidden")}
  >
    <h2 className={SECTION_HEADING}>Selected work</h2>
    <SwipeCards
      items={WORK_PROJECTS}
      getKey={(project) => project.name}
      label="Selected work"
      className="mt-10"
      listClassName="md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-10 md:[&>li:last-child:nth-child(odd)]:col-span-2"
      renderItem={({ item: project, index }) => (
        <ProjectLink
          project={project}
          style={brandStyle(project.brand)}
          className={cn(
            "group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500",
            isWideAt(index) &&
              "md:grid md:grid-cols-2 md:items-center md:gap-x-6",
          )}
        >
          <span
            style={{ boxShadow: brandFrameShadow(project.brand) }}
            className="block rounded-2xl"
          >
            <span className="relative block aspect-16/10 overflow-hidden rounded-2xl border border-(color:--brand)/45 bg-neutral-950">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 85vw"
                placeholder="blur"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </span>
          </span>
          <span className="block">
            <span
              className={cn(
                "mt-5 flex items-center gap-3",
                isWideAt(index) && "md:mt-0",
              )}
            >
              <BrandLogo brand={project.brand} className="size-9" />
              <span
                className={cn(
                  "block text-2xl text-white",
                  project.brand.fontClassName,
                )}
              >
                {project.name}
              </span>
            </span>
            <span className="mt-2 block text-base text-neutral-300">
              {project.summary}
            </span>
            <ProjectBadges badges={project.badges} />
          </span>
        </ProjectLink>
      )}
    />
  </div>
);
