"use client";

import { ChevronRight, ChevronUp } from "lucide-react";
import { MotionValue, motion } from "motion/react";
import { SITE_SECTIONS } from "@/constants";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { cn } from "@/lib/utils";

type SegmentState = "active" | "past" | "upcoming";

type NavSegmentProps = {
  id: string;
  label: string;
  fill: MotionValue<number>;
  state: SegmentState;
};

type SegmentBarProps = {
  fill: MotionValue<number>;
  className: string;
};

type PhoneStepperProps = {
  activeIndex: number;
  fills: MotionValue<number>[];
};

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

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

const SegmentBar = ({ fill, className }: SegmentBarProps) => (
  <span
    aria-hidden
    className={cn(
      "h-[3px] overflow-hidden rounded-full bg-white/12",
      className,
    )}
  >
    <motion.span
      className="absolute inset-0 origin-left bg-blue-500"
      style={{ scaleX: fill }}
    />
  </span>
);

const NavSegment = ({ id, label, fill, state }: NavSegmentProps) => (
  <a
    href={`#${id}`}
    aria-current={state === "active" ? "true" : undefined}
    className={cn(
      "relative flex min-h-11 min-w-0 flex-1 items-center self-stretch rounded-sm text-left text-[13px] font-medium whitespace-nowrap transition-colors duration-300 hover:text-white",
      FOCUS_RING,
      SEGMENT_TEXT[state],
    )}
  >
    <span className="sr-only lg:not-sr-only">{label}</span>
    <SegmentBar fill={fill} className="absolute inset-x-0 bottom-0" />
  </a>
);

const PhoneStepper = ({ activeIndex, fills }: PhoneStepperProps) => {
  const current = SITE_SECTIONS[activeIndex] ?? SITE_SECTIONS[0];
  const next = SITE_SECTIONS[activeIndex + 1];
  const Icon = next ? ChevronRight : ChevronUp;

  return (
    <a
      href={`#${(next ?? SITE_SECTIONS[0]).id}`}
      className={cn(
        "relative flex min-h-11 min-w-0 flex-1 items-center gap-1 self-stretch rounded-sm text-[13px] font-medium text-white sm:hidden",
        FOCUS_RING,
      )}
    >
      <span className="truncate">{current.label}</span>
      <span className="sr-only">
        {next ? `, next section: ${next.label}` : ", back to top"}
      </span>
      <Icon aria-hidden className="size-4 shrink-0 text-white/60" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 flex gap-1">
        {fills.map((fill, index) => (
          <SegmentBar
            key={SITE_SECTIONS[index].id}
            fill={fill}
            className="relative flex-1"
          />
        ))}
      </span>
    </a>
  );
};

export const SectionNav = () => {
  const { activeIndex, fills } = useSectionProgress(SITE_SECTIONS);

  return (
    <>
      <PhoneStepper activeIndex={activeIndex} fills={fills} />
      <div className="hidden min-w-0 flex-1 gap-2 self-stretch sm:flex lg:gap-4">
        {SITE_SECTIONS.map(({ id, label }, index) => (
          <NavSegment
            key={id}
            id={id}
            label={label}
            fill={fills[index]}
            state={segmentState(index, activeIndex)}
          />
        ))}
      </div>
    </>
  );
};
