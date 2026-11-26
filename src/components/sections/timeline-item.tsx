"use client";

import Image from "next/image";
import { Ref } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { BrandLogo } from "@/components/ui/brand-logo";
import { NoBreakHyphens } from "@/components/ui/no-break-hyphens";
import { cn } from "@/lib/utils";
import { ExperienceEntry } from "@/types";
import { ClientRow } from "./client-row";

type TimelineItemProps = {
  entry: ExperienceEntry;
  isActive: boolean;
  isReached: boolean;
  itemRef: Ref<HTMLLIElement>;
};

export const TIMELINE_LINE_OFFSET = ["start 0.65", "end 0.65"] as const;

export const TIMELINE_LINE_LEFT = "left-[17px] sm:left-[21px]";

export const TimelineItem = ({
  entry,
  isActive,
  isReached,
  itemRef,
}: TimelineItemProps) => {
  const { metric, icon: Icon } = entry;

  return (
    <li ref={itemRef} className="relative">
      <span
        aria-hidden
        className={cn(
          "absolute top-0 -left-12 flex size-9 items-center justify-center rounded-full border-2 transition-all duration-500 motion-reduce:transition-none sm:-left-20 sm:size-11",
          isReached
            ? "border-primary bg-primary-strong text-white ring-6 ring-primary/20"
            : "border-white/25 bg-black text-white/55 motion-reduce:border-primary motion-reduce:bg-primary-strong motion-reduce:text-white",
          isActive && "ring-8 ring-primary/30",
        )}
      >
        <Icon className="size-4 sm:size-5" />
      </span>
      <div
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 transition-opacity duration-500 motion-reduce:opacity-100 motion-reduce:transition-none sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:gap-x-8",
          isActive ? "opacity-100" : "opacity-75",
        )}
      >
        <p className="col-span-2 mb-1 flex h-9 items-center sm:col-span-1 sm:mb-0 sm:h-11">
          <span className="rounded-full border border-primary/40 bg-primary/12 px-3 py-1 font-mono text-xs tracking-wide text-primary-light tabular-nums">
            {entry.period}
          </span>
        </p>
        <h3 className="flex h-9 items-center sm:h-11">
          {entry.brand ? (
            <span className="flex items-center gap-2.5">
              <BrandLogo
                brand={entry.brand}
                className="size-7 rounded-md sm:size-8"
              />
              <span
                className={cn(
                  "text-xl whitespace-nowrap text-white sm:text-2xl",
                  entry.brand.fontClassName,
                )}
              >
                {entry.company}
              </span>
            </span>
          ) : (
            <Image
              src={entry.image}
              alt={entry.company}
              width={160}
              height={64}
              unoptimized={typeof entry.image === "string"}
              sizes="160px"
              className="h-7 w-auto sm:h-8"
            />
          )}
        </h3>
        <p
          className={cn(
            "bg-linear-to-b from-primary-light to-primary bg-clip-text text-right text-3xl font-bold text-transparent transition-[filter] duration-500 motion-reduce:transition-none sm:text-5xl",
            isActive && "drop-shadow-[0_0_18px_var(--color-primary)]",
          )}
        >
          <AnimatedCounter
            target={metric.value}
            isGrouped={metric.isGrouped}
            isTriggered={isReached}
            duration={1.4}
            suffix={metric.suffix}
          />
        </p>
        <p className="col-span-2 text-white/80 sm:col-span-1 sm:col-start-2">
          <NoBreakHyphens text={entry.role} />
        </p>
        <p className="col-span-2 text-sm text-white/70 max-sm:text-primary-light sm:col-span-1 sm:text-right">
          {metric.caption}
        </p>
        <ul className="col-span-2 mt-3 list-disc space-y-1 border-t border-white/10 pt-3 pl-4 text-sm text-white/70 marker:text-primary-light/60 sm:col-start-2 sm:mt-1 sm:border-t-0 sm:pt-0">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {entry.clients ? (
          <div className="col-span-2 mt-4 sm:col-start-2">
            <ClientRow company={entry.company} clients={entry.clients} />
          </div>
        ) : null}
      </div>
    </li>
  );
};
