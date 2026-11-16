"use client";

import { AnimatedCounter } from "./ui/animated-counter";
import { StatBreakdown } from "./stat-breakdown";
import { STATS } from "@/constants";
import React from "react";

const LABEL_CLASS =
  "mt-0.5 text-xs whitespace-nowrap text-foreground sm:mt-1 sm:text-base lg:text-lg";

export const Stats = React.memo(() => {
  return (
    <div className="grid w-full grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-2 py-2 sm:gap-6">
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center text-center"
        >
          <div className="text-2xl font-bold whitespace-nowrap tabular-nums text-white sm:text-3xl lg:text-4xl">
            <AnimatedCounter
              target={stat.value}
              isGrouped={stat.isGrouped}
              duration={2 + index * 0.5}
            />
            <span className="text-blue-400">{stat.suffix}</span>
          </div>
          {stat.breakdown ? (
            <StatBreakdown
              label={stat.label}
              breakdown={stat.breakdown}
              className={LABEL_CLASS}
            />
          ) : (
            <p className={LABEL_CLASS}>{stat.label}</p>
          )}
        </div>
      ))}
    </div>
  );
});

Stats.displayName = "Stats";
