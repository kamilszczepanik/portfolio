"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeRowProps = {
  label: string;
  items: string[];
};

type CountFittingOptions = {
  list: HTMLElement;
  more: HTMLElement;
};

const WIDE_QUERY = "(min-width: 640px)";
const ITEM_SELECTOR = "[data-badge-item]";
const MORE_DIGIT_RESERVE_PX = 8;

const countFitting = ({ list, more }: CountFittingOptions) => {
  const widths = Array.from(
    list.querySelectorAll<HTMLElement>(ITEM_SELECTOR),
  ).map((item) => item.getBoundingClientRect().width);
  const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
  const available = list.clientWidth;
  const total =
    widths.reduce((sum, width) => sum + width, 0) +
    gap * Math.max(0, widths.length - 1);
  if (total <= available) {
    return widths.length;
  }
  let used = more.getBoundingClientRect().width + MORE_DIGIT_RESERVE_PX;
  let count = 0;
  for (const width of widths) {
    if (used + gap + width > available) {
      break;
    }
    used += gap + width;
    count += 1;
  }
  return count;
};

export const BadgeRow = ({ label, items }: BadgeRowProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    const more = moreRef.current;
    if (!list || !more) {
      return;
    }
    const query = window.matchMedia(WIDE_QUERY);
    const fit = () => {
      setIsWide(query.matches);
      setVisibleCount(
        query.matches ? countFitting({ list, more }) : items.length,
      );
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(list);
    list
      .querySelectorAll(ITEM_SELECTOR)
      .forEach((item) => observer.observe(item));
    query.addEventListener("change", fit);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", fit);
    };
  }, [items]);

  const hidden = items.slice(visibleCount);

  return (
    <ul
      ref={listRef}
      aria-label={label}
      tabIndex={isWide ? undefined : 0}
      className="-my-1 flex flex-nowrap items-center gap-2 overflow-x-auto py-1 pr-10 [scrollbar-width:none] mask-[linear-gradient(to_right,#000_calc(100%-2.5rem),transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:max-h-10 sm:flex-wrap sm:overflow-hidden sm:pr-0 sm:mask-none [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item, index) => (
        <li
          key={item}
          data-badge-item
          className={cn("flex shrink-0", index >= visibleCount && "sm:order-2")}
        >
          <Badge>{item}</Badge>
        </li>
      ))}
      <li
        ref={moreRef}
        aria-hidden
        title={hidden.join(", ")}
        className={cn(
          "hidden shrink-0 sm:order-1 sm:flex",
          hidden.length === 0 && "sm:invisible",
        )}
      >
        <Badge>+{hidden.length}</Badge>
      </li>
    </ul>
  );
};
