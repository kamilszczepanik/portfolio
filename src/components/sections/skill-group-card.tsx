"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { SkillGroup } from "@/types";

type SkillGroupCardProps = {
  group: SkillGroup;
};

export const SkillGroupCard = ({ group }: SkillGroupCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const moreId = useId();
  const GroupIcon = group.icon;

  return (
    <div
      className={cn(
        "rounded-3xl border p-5 backdrop-blur-sm sm:p-6",
        group.isHighlighted
          ? "border-blue-500/40 bg-linear-to-b from-blue-500/12 to-black/70"
          : "border-white/12 bg-black/60",
      )}
    >
      <h3 className="flex items-center gap-2.5 text-lg font-semibold text-white">
        <span
          aria-hidden
          className={cn(
            "flex size-8 items-center justify-center rounded-lg",
            group.isHighlighted
              ? "bg-blue-500/20 text-blue-200"
              : "bg-white/8 text-white/80",
          )}
        >
          <GroupIcon className="size-4" />
        </span>
        {group.label}
      </h3>
      <ul className="mt-5 space-y-3">
        {group.top.map(({ name, icon: Icon, color }) => (
          <li key={name} className="flex items-center gap-3">
            <span
              aria-hidden
              style={{ color }}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
            >
              <Icon className="size-5" />
            </span>
            <span className="text-base text-white">{name}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={moreId}
        onClick={() => setIsExpanded((current) => !current)}
        className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 px-4 text-sm font-medium text-white/80 transition-colors hover:border-blue-400/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:transition-none"
      >
        {isExpanded ? "Show less" : `+${group.more.length} more`}
        <span className="sr-only">{` in ${group.label}`}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 transition-transform duration-300 motion-reduce:transition-none",
            isExpanded && "rotate-180",
          )}
        />
      </button>
      <div
        id={moreId}
        className={cn(
          "grid transition-[grid-template-rows] duration-400 motion-reduce:transition-none",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <ul
          className={cn(
            "flex flex-wrap gap-2 overflow-hidden",
            !isExpanded && "invisible",
          )}
        >
          {group.more.map((item) => (
            <li
              key={item}
              className="mt-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/75"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
