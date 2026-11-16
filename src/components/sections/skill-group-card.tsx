"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SkillGroup } from "@/types";

type SkillGroupCardProps = {
  group: SkillGroup;
  isExpanded: boolean;
  minHeight?: number;
  onToggle: () => void;
};

const PILL =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-sm whitespace-nowrap";

const PILL_HEIGHT_PX = 32;
const PILL_GAP_PX = 8;
const COLLAPSED_ROWS = 4;
const COLLAPSED_HEIGHT_PX =
  COLLAPSED_ROWS * PILL_HEIGHT_PX + (COLLAPSED_ROWS - 1) * PILL_GAP_PX;

export const SkillGroupCard = ({
  group,
  isExpanded,
  minHeight,
  onToggle,
}: SkillGroupCardProps) => {
  const [hiddenCount, setHiddenCount] = useState<number | null>(null);
  const [fullHeight, setFullHeight] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const GroupIcon = group.icon;
  const visibleCount =
    group.top.length + group.more.length - (hiddenCount ?? 0);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    const items = Array.from(list.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    setHiddenCount(
      items.filter((item) => item.offsetTop >= COLLAPSED_HEIGHT_PX).length,
    );
    setFullHeight(list.scrollHeight);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [measure]);

  const isClipped = (index: number) => !isExpanded && index >= visibleCount;

  return (
    <div
      style={{ minHeight }}
      className="flex flex-col rounded-3xl border border-white/12 bg-black/60 p-5 backdrop-blur-sm"
    >
      <h3 className="flex items-center gap-2.5 text-xl font-semibold text-white">
        <span
          aria-hidden
          className="flex size-8 items-center justify-center rounded-lg bg-white/8 text-white/80"
        >
          <GroupIcon className="size-4" />
        </span>
        {group.label}
      </h3>
      <ul
        id={listId}
        ref={listRef}
        style={{
          maxHeight: isExpanded ? (fullHeight ?? "none") : COLLAPSED_HEIGHT_PX,
        }}
        className="relative mt-4 flex flex-wrap content-start gap-2 overflow-hidden transition-[max-height] duration-400 motion-reduce:transition-none"
      >
        {group.top.map(({ name, icon: Icon, color }, index) => (
          <li
            key={name}
            aria-hidden={isClipped(index) || undefined}
            className={cn(PILL, "text-white", isClipped(index) && "invisible")}
          >
            <span aria-hidden style={{ color }} className="flex">
              <Icon className="size-4" />
            </span>
            {name}
          </li>
        ))}
        {group.more.map((item, moreIndex) => {
          const index = group.top.length + moreIndex;
          return (
            <li
              key={item}
              aria-hidden={isClipped(index) || undefined}
              className={cn(
                PILL,
                "text-white/75",
                isClipped(index) && "invisible",
              )}
            >
              {item}
            </li>
          );
        })}
      </ul>
      {hiddenCount ? (
        <div data-skill-toggle className="mt-2">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={listId}
            onClick={onToggle}
            className="-ml-1 inline-flex min-h-11 items-center gap-1.5 rounded-full px-1 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:transition-none"
          >
            {isExpanded ? "Show less" : `+${hiddenCount} more`}
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
      ) : (
        <div
          aria-hidden
          className={cn(
            "mt-2 h-11",
            hiddenCount === 0 &&
              "hidden group-has-[[data-skill-toggle]]/skills:block",
          )}
        />
      )}
    </div>
  );
};
