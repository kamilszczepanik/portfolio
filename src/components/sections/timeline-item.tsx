"use client";

import Image from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";
import { ExperienceEntry } from "@/types";

type TimelineItemProps = {
  entry: ExperienceEntry;
};

export const TIMELINE_LINE_OFFSET = ["start 0.65", "end 0.65"] as const;

export const TimelineItem = ({ entry }: TimelineItemProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const [isReached, setIsReached] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...TIMELINE_LINE_OFFSET],
  });
  useMotionValueEvent(scrollYProgress, "change", (progress) =>
    setIsReached(progress > 0),
  );
  const { metric } = entry;

  return (
    <li
      ref={ref}
      className="relative grid gap-3 sm:grid-cols-[200px_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-1.5 -left-[38px] size-3.5 rounded-full border-2 transition-all duration-500 motion-reduce:transition-none sm:top-1/2 sm:-left-[54px] sm:-translate-y-1/2",
          isReached
            ? "border-blue-500 bg-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.18)]"
            : "border-white/30 bg-black motion-reduce:border-blue-500 motion-reduce:bg-blue-500",
        )}
      />
      <p className="text-sm text-white/60">{entry.period}</p>
      <div>
        <h3 className="flex h-9 items-center">
          <Image
            src={entry.image}
            alt={entry.company}
            width={160}
            height={64}
            unoptimized={typeof entry.image === "string"}
            sizes="160px"
            className={cn(
              "h-7 w-auto sm:h-8",
              entry.isDarkOnLight && "mix-blend-screen grayscale invert",
            )}
          />
        </h3>
        <p className="mt-1 text-white/70">{entry.role}</p>
      </div>
      <div className="sm:text-right">
        <p className="text-4xl font-bold text-blue-400 sm:text-5xl">
          <AnimatedCounter
            target={metric.value}
            isGrouped={metric.isGrouped}
            duration={1.4}
          />
          {metric.suffix}
        </p>
        <p className="mt-1 text-sm text-white/70">{metric.caption}</p>
      </div>
    </li>
  );
};
