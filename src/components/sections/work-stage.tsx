"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { WORK_PROJECTS } from "@/constants";
import { BrandLogo } from "@/components/ui/brand-logo";
import { useElementHeight } from "@/hooks/use-element-height";
import { brandAmbient } from "@/lib/brand-style";
import { cn } from "@/lib/utils";
import { FreelanceLine } from "./freelance-line";
import { ProjectBadges } from "./project-badges";
import { ProjectLink } from "./project-link";
import {
  SECTION_CONTAINER,
  SECTION_HEADING,
  SECTION_SPACING,
} from "./section-styles";
import { WorkFrame } from "./work-frame";

const VIEWPORTS_PER_PROJECT = 0.8;
const NAV_HEIGHT = "var(--section-nav-h, 4.5rem)";
const CROSSFADE =
  "transition-opacity duration-700 motion-reduce:transition-none";

const indexForProgress = (progress: number) =>
  Math.min(
    WORK_PROJECTS.length - 1,
    Math.max(0, Math.floor(progress * WORK_PROJECTS.length)),
  );

const centeredStickyTop = (height: number | null) =>
  height === null
    ? NAV_HEIGHT
    : `calc(${NAV_HEIGHT} + max(0px, (100svh - ${NAV_HEIGHT} - ${height}px) / 2))`;

const StageAmbient = ({ activeIndex }: { activeIndex: number }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    {WORK_PROJECTS.map((project, index) => (
      <div
        key={project.name}
        style={{ background: brandAmbient(project.brand) }}
        className={cn(
          "absolute inset-0",
          CROSSFADE,
          index === activeIndex ? "opacity-100" : "opacity-0",
        )}
      />
    ))}
  </div>
);

export const WorkStage = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stickyHeight = useElementHeight(stickyRef);
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
      className="relative hidden motion-safe:lg:block"
      style={{
        height: `${WORK_PROJECTS.length * VIEWPORTS_PER_PROJECT * 100}svh`,
      }}
    >
      <div
        ref={stickyRef}
        className={cn("sticky", SECTION_SPACING)}
        style={{ top: centeredStickyTop(stickyHeight) }}
      >
        <StageAmbient activeIndex={activeIndex} />
        <div
          className={cn(
            SECTION_CONTAINER,
            "grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-14",
          )}
        >
          <div>
            <h2 className={cn(SECTION_HEADING, "mb-8")}>Selected work</h2>
            <ol className="space-y-4">
              {WORK_PROJECTS.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={project.name}>
                    <ProjectLink
                      project={project}
                      onFocus={() => setActiveIndex(index)}
                      className={cn(
                        "group block rounded-lg transition-opacity duration-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 motion-reduce:transition-none",
                        isActive
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-85",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <BrandLogo brand={project.brand} className="size-9" />
                        <span
                          className={cn(
                            "block text-2xl text-white xl:text-3xl",
                            project.brand.fontClassName,
                          )}
                        >
                          {project.name}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none",
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <span className="grid overflow-hidden pl-12">
                          {WORK_PROJECTS.map((sizer) => {
                            const isOwn = sizer.name === project.name;
                            return (
                              <span
                                key={sizer.name}
                                aria-hidden={isOwn ? undefined : true}
                                className={cn(
                                  "col-start-1 row-start-1 block",
                                  !isOwn && "invisible",
                                )}
                              >
                                <span className="mt-2 block text-lg text-neutral-300">
                                  {sizer.summary}
                                </span>
                                <ProjectBadges
                                  badges={sizer.badges}
                                  brand={sizer.brand}
                                  className="pb-1"
                                />
                              </span>
                            );
                          })}
                        </span>
                      </span>
                    </ProjectLink>
                  </li>
                );
              })}
            </ol>
            <FreelanceLine className="mt-8 border-t border-white/10 pt-6" />
          </div>
          <WorkFrame projects={WORK_PROJECTS} activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  );
};
