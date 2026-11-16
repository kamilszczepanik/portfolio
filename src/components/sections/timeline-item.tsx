"use client";

import Image from "next/image";
import { Ref } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { NoBreakHyphens } from "@/components/ui/no-break-hyphens";
import { cn } from "@/lib/utils";
import { ExperienceEntry } from "@/types";

type TimelineItemProps = {
  entry: ExperienceEntry;
  isActive: boolean;
  isReached: boolean;
  itemRef: Ref<HTMLLIElement>;
};

export const TIMELINE_LINE_OFFSET = ["start 0.65", "end 0.65"] as const;

export const TimelineItem = ({
  entry,
  isActive,
  isReached,
  itemRef,
}: TimelineItemProps) => {
  const { metric } = entry;

  return (
    <li ref={itemRef} className="relative">
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 -left-[38px] size-3.5 rounded-full border-2 transition-all duration-500 motion-reduce:transition-none sm:top-1/2 sm:-left-[54px] sm:-translate-y-1/2",
          isReached
            ? "border-primary bg-primary ring-6 ring-primary/20"
            : "border-white/30 bg-black motion-reduce:border-primary motion-reduce:bg-primary",
          isActive && "ring-8 ring-primary/30",
        )}
      />
      <div
        className={cn(
          "grid gap-2 transition-opacity duration-500 motion-reduce:opacity-100 motion-reduce:transition-none sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8",
          isActive ? "opacity-100" : "opacity-75",
        )}
      >
        <div>
          <p className="mb-1.5 font-mono text-xs tracking-wide text-white/65 tabular-nums">
            {entry.period}
          </p>
          <h3 className="flex h-9 items-center">
            <Image
              src={entry.image}
              alt={entry.company}
              width={160}
              height={64}
              unoptimized={typeof entry.image === "string"}
              sizes="160px"
              className="h-7 w-auto sm:h-8"
            />
          </h3>
          <p className="mt-1 text-white/80">
            <NoBreakHyphens text={entry.role} />
          </p>
        </div>
        <div className="sm:text-right">
          <p
            className={cn(
              "text-3xl font-bold transition-[color,text-shadow] duration-500 sm:text-5xl",
              isActive
                ? "text-primary-light [text-shadow:0_0_24px_var(--color-primary)]"
                : "text-primary",
            )}
          >
            <AnimatedCounter
              target={metric.value}
              isGrouped={metric.isGrouped}
              isTriggered={isReached}
              duration={1.4}
              suffix={metric.suffix}
              className="text-left sm:text-right"
            />
          </p>
          <p className="mt-1 text-sm text-white/70">{metric.caption}</p>
        </div>
      </div>
    </li>
  );
};
