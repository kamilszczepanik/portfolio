import Image from "next/image";
import { WORK_PROJECTS } from "@/constants";
import { cn } from "@/lib/utils";
import { FreelanceLine } from "./freelance-line";
import { ProjectBadges } from "./project-badges";
import { ProjectLink } from "./project-link";
import { SECTION_CONTAINER, SECTION_HEADING } from "./section-styles";

export const WorkCards = () => (
  <div className={cn(SECTION_CONTAINER, "py-16 sm:py-24 lg:hidden")}>
    <h2 className={SECTION_HEADING}>Selected work</h2>
    <ul className="mt-10 grid gap-10 md:grid-cols-2 md:gap-x-6">
      {WORK_PROJECTS.map((project) => (
        <li key={project.name}>
          <ProjectLink
            project={project}
            className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            <span className="relative block aspect-16/10 overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-[0_30px_80px_-30px_rgba(59,130,246,0.5)]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                placeholder="blur"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </span>
            <span className="mt-4 block text-2xl font-semibold text-white">
              {project.name}
            </span>
            <span className="mt-1 block text-base text-neutral-300">
              {project.summary}
            </span>
            <ProjectBadges badges={project.badges} />
          </ProjectLink>
        </li>
      ))}
    </ul>
    <FreelanceLine className="mt-12 border-t border-white/10 pt-6" />
  </div>
);
