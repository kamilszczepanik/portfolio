"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Ref } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";
import { ExperienceEntry } from "@/types";

type TimelineItemProps = {
  entry: ExperienceEntry;
  isActive: boolean;
  isReached: boolean;
  itemRef: Ref<HTMLLIElement>;
};

const ACTIVE_SCALE = 1.03;
const SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;

export const TIMELINE_LINE_OFFSET = ["start 0.65", "end 0.65"] as const;

export const TimelineItem = ({
  entry,
  isActive,
  isReached,
  itemRef,
}: TimelineItemProps) => {
  const isStill = useReducedMotion() ?? false;
  const { metric } = entry;

  return (
    <li ref={itemRef} className="relative">
      <span
        aria-hidden
        className={cn(
          "absolute top-1.5 -left-[38px] size-3.5 rounded-full border-2 transition-all duration-500 motion-reduce:transition-none sm:top-1/2 sm:-left-[54px] sm:-translate-y-1/2",
          isReached
            ? "border-blue-500 bg-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.18)]"
            : "border-white/30 bg-black motion-reduce:border-blue-500 motion-reduce:bg-blue-500",
          isActive && "shadow-[0_0_0_8px_rgba(59,130,246,0.3)]",
        )}
      />
      <motion.div
        initial={false}
        animate={{ scale: isActive && !isStill ? ACTIVE_SCALE : 1 }}
        transition={SPRING}
        className={cn(
          "grid origin-center gap-3 transition-opacity duration-500 motion-reduce:opacity-100 motion-reduce:transition-none sm:grid-cols-[200px_minmax(0,1fr)_auto] sm:items-center sm:gap-8",
          isActive ? "opacity-100" : "opacity-45",
        )}
      >
        <p
          className={cn(
            "text-sm transition-colors duration-500",
            isActive ? "text-white/85" : "text-white/60",
          )}
        >
          {entry.period}
        </p>
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
          <p
            className={cn(
              "text-4xl font-bold transition-[color,text-shadow] duration-500 sm:text-5xl",
              isActive
                ? "text-sky-300 [text-shadow:0_0_24px_rgba(56,189,248,0.55)]"
                : "text-blue-400",
            )}
          >
            <AnimatedCounter
              target={metric.value}
              isGrouped={metric.isGrouped}
              isTriggered={isReached}
              duration={1.4}
            />
            {metric.suffix}
          </p>
          <p className="mt-1 text-sm text-white/70">{metric.caption}</p>
        </div>
      </motion.div>
    </li>
  );
};
