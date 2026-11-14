"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { WORK_PROJECTS } from "@/constants";
import { cn } from "@/lib/utils";
import { FreelanceLine } from "./freelance-line";
import { ProjectBadges } from "./project-badges";
import { ProjectLink } from "./project-link";
import { SECTION_CONTAINER, SECTION_HEADING } from "./section-styles";
import { WorkFrame } from "./work-frame";

const VIEWPORTS_PER_PROJECT = 0.8;

const indexForProgress = (progress: number) =>
  Math.min(
    WORK_PROJECTS.length - 1,
    Math.max(0, Math.floor(progress * WORK_PROJECTS.length)),
  );

export const WorkStage = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (progress) =>
    setActiveIndex(indexForProgress(progress)),
  );

  return (
    <div
      ref={stageRef}
      className="relative hidden lg:block"
      style={{
        height: `${WORK_PROJECTS.length * VIEWPORTS_PER_PROJECT * 100}svh`,
      }}
    >
      <div className="sticky top-[var(--section-nav-h,4.5rem)] flex h-[calc(100svh-var(--section-nav-h,4.5rem))] items-center">
        <div
          className={cn(
            SECTION_CONTAINER,
            "grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-14",
          )}
        >
          <div>
            <h2 className={cn(SECTION_HEADING, "mb-10")}>Selected work</h2>
            <ol className="space-y-5">
              {WORK_PROJECTS.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={project.name}>
                    <ProjectLink
                      project={project}
                      className={cn(
                        "group block rounded-lg transition-opacity duration-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 motion-reduce:transition-none",
                        isActive
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-85",
                      )}
                    >
                      <span
                        className={cn(
                          "block text-2xl text-white xl:text-3xl",
                          isActive ? "font-bold" : "font-semibold",
                        )}
                      >
                        {project.name}
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none",
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <span className="block overflow-hidden">
                          <span className="mt-2 block text-lg text-neutral-300">
                            {project.summary}
                          </span>
                          <ProjectBadges badges={project.badges} />
                        </span>
                      </span>
                    </ProjectLink>
                  </li>
                );
              })}
            </ol>
            <FreelanceLine className="mt-10 border-t border-white/10 pt-6" />
          </div>
          <WorkFrame projects={WORK_PROJECTS} activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  );
};
