"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { EXPERIENCE } from "@/constants";
import { MarqueeBackdrop } from "./marquee-backdrop";
import { SECTION_CONTAINER, SECTION_HEADING } from "./section-styles";
import { TIMELINE_LINE_OFFSET, TimelineItem } from "./timeline-item";

const EXPERIENCE_HEADING_ID = "experience-heading";

const FILL_STYLE =
  "absolute inset-y-0 left-0 w-0.5 origin-top bg-linear-to-b from-sky-500 to-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]";

export const ExperienceSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: [...TIMELINE_LINE_OFFSET],
  });

  return (
    <section
      id="experience"
      aria-labelledby={EXPERIENCE_HEADING_ID}
      className="relative isolate overflow-hidden py-16 sm:py-24"
    >
      <MarqueeBackdrop />
      <div className={SECTION_CONTAINER}>
        <h2 id={EXPERIENCE_HEADING_ID} className={SECTION_HEADING}>
          {"Where I've worked"}
        </h2>
        <div ref={timelineRef} className="relative mt-14 pl-8 sm:pl-12">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-0.5 bg-white/12"
          />
          <motion.span
            aria-hidden
            className={`${FILL_STYLE} motion-reduce:hidden`}
            style={{ scaleY: scrollYProgress }}
          />
          <span
            aria-hidden
            className={`${FILL_STYLE} hidden motion-reduce:block`}
          />
          <ol className="space-y-12 sm:space-y-16">
            {EXPERIENCE.map((entry) => (
              <TimelineItem key={entry.company} entry={entry} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
