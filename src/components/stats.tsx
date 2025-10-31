"use client";

import { AnimatedCounter } from "./ui/animated-counter";
import { STATS } from "@/constants";

export const Stats = () => {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-20 py-4 sm:py-6 lg:py-8 w-full">
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center text-center"
        >
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            <AnimatedCounter
              target={stat.value}
              duration={2 + index * 0.5}
              className={`${
                stat.value < 10 ? "w-8 sm:w-11" : "w-12 sm:w-16 lg:w-20"
              }`}
            />
            <span className="text-blue-400">{stat.suffix}</span>
          </div>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};
