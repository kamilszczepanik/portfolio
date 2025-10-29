"use client";

import { AnimatedCounter } from "./ui/animated-counter";
import { STATS } from "@/constants";

export const Stats = () => {
  return (
    <div className="flex items-center justify-center gap-20 py-8 w-full pr-4">
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center text-center"
        >
          <div className="text-6xl font-bold text-white">
            <AnimatedCounter
              target={stat.value}
              duration={2 + index * 0.5}
              className={`${stat.value < 10 ? "w-11" : "w-20"}`}
            />
            <span className="text-blue-400">{stat.suffix}</span>
          </div>
          <p className="mt-2 text-lg text-neutral-300 md:text-xl">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};
