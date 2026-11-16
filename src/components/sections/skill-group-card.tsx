"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { SkillGroup } from "@/types";

type SkillGroupCardProps = {
  group: SkillGroup;
};

const PILL =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-sm whitespace-nowrap";

export const SkillGroupCard = ({ group }: SkillGroupCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const moreId = useId();
  const GroupIcon = group.icon;

  return (
    <div className="rounded-3xl border border-white/12 bg-black/60 p-5 backdrop-blur-sm">
      <h3 className="flex items-center gap-2.5 text-xl font-semibold text-white">
        <span
          aria-hidden
          className="flex size-8 items-center justify-center rounded-lg bg-white/8 text-white/80"
        >
          <GroupIcon className="size-4" />
        </span>
        {group.label}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.top.map(({ name, icon: Icon, color }) => (
          <li key={name} className={cn(PILL, "text-white")}>
            <span aria-hidden style={{ color }} className="flex">
              <Icon className="size-4" />
            </span>
            {name}
          </li>
        ))}
      </ul>
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
            <li key={item} className={cn(PILL, "mt-2 text-white/75")}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={moreId}
        onClick={() => setIsExpanded((current) => !current)}
        className="mt-3 -ml-1 inline-flex min-h-11 items-center gap-1.5 rounded-full px-1 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:transition-none"
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
    </div>
  );
};
