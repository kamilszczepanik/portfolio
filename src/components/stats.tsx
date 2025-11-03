"use client";

import { AnimatedCounter } from "./ui/animated-counter";
import { STATS } from "@/constants";
import React from "react";

export const Stats = React.memo(() => {
  return (
    <div className="flex items-center justify-center gap-12 lg:gap-20 py-2 w-full">
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center text-center"
        >
          <div className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
            <AnimatedCounter
              target={stat.value}
              duration={2 + index * 0.5}
              className={`${
                stat.value < 10 ? "w-5 sm:w-8 lg:w-10" : "w-10 sm:w-12 lg:w-16"
              }`}
            />
            <span className="text-blue-400">{stat.suffix}</span>
          </div>
          <p className="mt-0.5 sm:mt-1 text-base lg:text-xl text-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
});

Stats.displayName = "Stats";
