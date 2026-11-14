"use client";

import { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { SkillBelt } from "@/types";

type SkillBeltRowProps = {
  belt: SkillBelt;
};

type ChipListProps = {
  belt: SkillBelt;
  isCopy?: boolean;
  className?: string;
};

const CHIP_GAP_PX = 12;

const ChipList = ({ belt, isCopy = false, className }: ChipListProps) => (
  <ul
    aria-hidden={isCopy || undefined}
    className={cn("flex shrink-0 gap-3", className)}
  >
    {belt.items.map((item) => (
      <li
        key={item}
        className={cn(
          "rounded-full border px-3.5 py-1.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-300 hover:border-blue-500 hover:bg-blue-500 motion-reduce:transition-none sm:px-5 sm:py-2.5 sm:text-xl",
          belt.isHighlighted
            ? "border-blue-400/50 text-blue-100"
            : "border-white/15 text-white",
        )}
      >
        {item}
      </li>
    ))}
  </ul>
);

export const SkillBeltRow = ({ belt }: SkillBeltRowProps) => {
  const beltStyle = {
    "--animation-duration": `${belt.durationSeconds}s`,
    "--animation-direction": belt.isReversed ? "reverse" : "forwards",
    "--marquee-gap": `${CHIP_GAP_PX}px`,
  } as CSSProperties;

  return (
    <div className="group flex items-center gap-4">
      <h3 className="w-16 shrink-0 text-sm text-white/60 sm:w-28 sm:text-base">
        {belt.label}
      </h3>
      <ChipList
        belt={belt}
        className="hidden min-w-0 flex-1 flex-wrap motion-reduce:flex"
      />
      <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:hidden">
        <div
          style={beltStyle}
          className="flex w-max animate-scroll gap-3 group-hover:[animation-play-state:paused]"
        >
          <ChipList belt={belt} />
          <ChipList belt={belt} isCopy />
        </div>
      </div>
    </div>
  );
};
