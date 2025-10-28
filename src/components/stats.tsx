"use client";

import { AnimatedCounter } from "./ui/animated-counter";
import { STATS } from "@/constants";

export const Stats = () => {
  return (
    <div className="flex items-center justify-center gap-8">
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center text-center"
        >
          <div className="text-4xl font-bold text-white">
            <AnimatedCounter target={stat.value} duration={2 + index * 0.5} />
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
