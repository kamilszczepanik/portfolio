"use client";

import { AnimatedCounter } from "./ui/animated-counter";
import { STATS } from "@/constants";
import React from "react";

export const Stats = React.memo(() => {
  return (
    <div className="grid w-full grid-cols-2 gap-x-6 gap-y-4 py-2 sm:grid-cols-4 sm:gap-6">
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center text-center"
        >
          <div className="text-3xl font-bold whitespace-nowrap text-white lg:text-4xl">
            <AnimatedCounter
              target={stat.value}
              isGrouped={stat.isGrouped}
              duration={2 + index * 0.5}
            />
            <span className="text-blue-400">{stat.suffix}</span>
          </div>
          <p className="mt-0.5 text-base text-foreground sm:mt-1 lg:text-lg">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
});

Stats.displayName = "Stats";
