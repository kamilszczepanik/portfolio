"use client";

import { MotionValue, motion } from "motion/react";
import { SITE_SECTIONS } from "@/constants";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { MotionToggle } from "@/components/motion/motion-toggle";
import { cn } from "@/lib/utils";

type SegmentState = "active" | "past" | "upcoming";

type NavSegmentProps = {
  id: string;
  label: string;
  fill: MotionValue<number>;
  state: SegmentState;
};

const SEGMENT_TEXT: Record<SegmentState, string> = {
  active: "text-white",
  past: "text-white/80",
  upcoming: "text-white/60",
};

const segmentState = (index: number, activeIndex: number): SegmentState => {
  if (index === activeIndex) {
    return "active";
  }
  return index < activeIndex ? "past" : "upcoming";
};

const NavSegment = ({ id, label, fill, state }: NavSegmentProps) => (
  <a
    href={`#${id}`}
    aria-current={state === "active" ? "true" : undefined}
    className={cn(
      "relative flex min-h-11 min-w-0 flex-1 items-center rounded-sm text-left text-xs font-medium md:text-[13px] whitespace-nowrap transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
      SEGMENT_TEXT[state]
    )}
  >
    <span className="sr-only sm:not-sr-only">{label}</span>
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-full bg-white/12"
    >
      <motion.span
        className="absolute inset-0 origin-left bg-blue-500"
        style={{ scaleX: fill }}
      />
    </span>
  </a>
);

export const SectionNav = () => {
  const { activeIndex, fills } = useSectionProgress(SITE_SECTIONS);
  const current = SITE_SECTIONS[activeIndex];
  const next = SITE_SECTIONS[activeIndex + 1];

  return (
    <nav
      aria-label="Sections"
      className="border-b border-white/10 bg-black/75 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl gap-2 px-4 sm:gap-3 sm:px-6 md:gap-4 lg:px-2">
        {SITE_SECTIONS.map(({ id, label }, index) => (
          <NavSegment
            key={id}
            id={id}
            label={label}
            fill={fills[index]}
            state={segmentState(index, activeIndex)}
          />
        ))}
        <MotionToggle className="-mr-2" />
      </div>
      <div
        aria-hidden
        className="mx-auto flex max-w-7xl justify-between px-4 pt-1.5 pb-2 text-xs sm:hidden"
      >
        <span className="font-semibold text-white">{current.label}</span>
        <span className="text-white/60">{next ? `Next: ${next.label}` : ""}</span>
      </div>
    </nav>
  );
};
