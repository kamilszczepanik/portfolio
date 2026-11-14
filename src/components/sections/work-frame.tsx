"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { WorkProject } from "@/types";
import { ProjectLink } from "./project-link";

type WorkFrameProps = {
  projects: WorkProject[];
  activeIndex: number;
};

const TILT = { rotateY: -16, rotateX: 8, rotateZ: 1, y: 0 };
const FLOAT = {
  rotateY: [-16, -11],
  rotateX: [8, 5],
  rotateZ: [1, 0],
  y: [0, -10],
};
const STILL_TRANSITION = { duration: 0 };
const FLOAT_TRANSITION = {
  duration: 7,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse",
} as const;
const SCREEN_TRANSITION = {
  opacity: { duration: 0.6 },
  default: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
} as const;

export const WorkFrame = ({ projects, activeIndex }: WorkFrameProps) => {
  const isStill = useReducedMotion() ?? false;
  const activeProject = projects[activeIndex];

  return (
    <div className="relative perspective-[1800px]">
      <div
        aria-hidden
        className="absolute -inset-16 -z-10 bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.22),transparent_65%)]"
      />
      <motion.div
        initial={TILT}
        animate={FLOAT}
        transition={isStill ? STILL_TRANSITION : FLOAT_TRANSITION}
        className="transform-3d"
      >
        <ProjectLink
          project={activeProject}
          ariaLabel={`Open ${activeProject.name}`}
          tabIndex={-1}
          className="block overflow-hidden rounded-[22px] border border-white/15 bg-neutral-950 shadow-[0_40px_120px_-20px_rgba(59,130,246,0.45)] transition-colors hover:border-blue-400/60"
        >
          <span
            aria-hidden
            className="flex h-9 items-center gap-2 border-b border-white/10 px-4"
          >
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </span>
          <span className="relative block aspect-16/10">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.span
                  key={project.name}
                  className="absolute inset-0 block"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 60,
                    scale: isActive ? 1 : 0.96,
                  }}
                  transition={isStill ? STILL_TRANSITION : SCREEN_TRANSITION}
                >
                  <Image
                    src={project.image}
                    alt={isActive ? project.imageAlt : ""}
                    fill
                    sizes="(min-width: 1280px) 720px, 58vw"
                    placeholder="blur"
                    className="object-cover object-top"
                  />
                </motion.span>
              );
            })}
          </span>
        </ProjectLink>
      </motion.div>
    </div>
  );
};
