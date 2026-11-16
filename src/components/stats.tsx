"use client";

import { AnimatedCounter } from "./ui/animated-counter";
import { STATS } from "@/constants";
import React from "react";

export const Stats = React.memo(() => {
  return (
    <div className="grid w-full grid-cols-4 gap-2 py-2 sm:gap-6">
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
          <p className="mt-0.5 text-xs whitespace-nowrap text-foreground sm:mt-1 sm:text-base lg:text-lg">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
});

Stats.displayName = "Stats";
