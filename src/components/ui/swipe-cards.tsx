"use client";

import { ChevronRight } from "lucide-react";
import { useReducedMotionConfig } from "motion/react";
import {
  KeyboardEvent,
  ReactNode,
  RefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type SwipeCardRenderProps<T> = {
  item: T;
  index: number;
};

type SwipeCardsProps<T> = {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (props: SwipeCardRenderProps<T>) => ReactNode;
  label: string;
  className?: string;
  listClassName?: string;
  listRef?: RefObject<HTMLUListElement | null>;
};

const CONTROL =
  "flex h-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

const END_TOLERANCE_PX = 2;

const itemsOf = (list: HTMLUListElement) =>
  Array.from(list.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );

const startPadding = (list: HTMLUListElement) =>
  parseFloat(window.getComputedStyle(list).paddingLeft) || 0;

const nearestIndex = (list: HTMLUListElement) => {
  const items = itemsOf(list);
  const maxScroll = list.scrollWidth - list.clientWidth;
  if (list.scrollLeft >= maxScroll - END_TOLERANCE_PX) {
    return items.length - 1;
  }
  const padding = startPadding(list);
  const distances = items.map((item) =>
    Math.abs(item.offsetLeft - padding - list.scrollLeft),
  );
  return distances.indexOf(Math.min(...distances));
};

export const SwipeCards = <T,>({
  items,
  getKey,
  renderItem,
  label,
  className,
  listClassName,
  listRef,
}: SwipeCardsProps<T>) => {
  const ownListRef = useRef<HTMLUListElement | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isStill = useReducedMotionConfig() ?? false;
  const lastIndex = items.length - 1;

  const setList = useCallback(
    (node: HTMLUListElement | null) => {
      ownListRef.current = node;
      if (listRef) {
        listRef.current = node;
      }
    },
    [listRef],
  );

  const scrollToIndex = (index: number) => {
    const list = ownListRef.current;
    const target = list ? itemsOf(list)[index] : undefined;
    if (!list || !target) {
      return;
    }
    list.scrollTo({
      left: target.offsetLeft - startPadding(list),
      behavior: isStill ? "auto" : "smooth",
    });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const list = ownListRef.current;
    if (list) {
      setActiveIndex(nearestIndex(list));
    }
  };

  const handleControlsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) {
      return;
    }
    event.preventDefault();
    const next = Math.min(lastIndex, Math.max(0, activeIndex + step));
    scrollToIndex(next);
    const isOnDot =
      event.target instanceof HTMLElement && event.target.dataset.swipeDot;
    if (isOnDot) {
      controlsRef.current
        ?.querySelector<HTMLButtonElement>(`[data-swipe-dot="${next}"]`)
        ?.focus();
    }
  };

  return (
    <div className={className}>
      <ul
        ref={setList}
        aria-label={label}
        onScroll={handleScroll}
        className={cn(
          "relative flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] max-md:-mx-4 max-md:-my-2 max-md:scroll-px-4 max-md:px-4 max-md:py-2 sm:max-md:-mx-6 sm:max-md:scroll-px-6 sm:max-md:px-6 md:snap-none md:overflow-visible [&::-webkit-scrollbar]:hidden",
          listClassName,
        )}
      >
        {items.map((item, index) => (
          <li
            key={getKey(item)}
            onFocus={(event) => {
              if (event.target.matches(":focus-visible")) {
                scrollToIndex(index);
              }
            }}
            className="flex max-md:w-[85%] max-md:shrink-0 max-md:snap-start *:w-full"
          >
            {renderItem({ item, index })}
          </li>
        ))}
      </ul>
      <div
        ref={controlsRef}
        onKeyDown={handleControlsKeyDown}
        className="mt-4 flex items-center justify-between gap-4 md:hidden"
      >
        <div className="flex min-w-0 flex-1 items-center">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={getKey(item)}
                type="button"
                data-swipe-dot={index}
                aria-label={`Show card ${index + 1} of ${items.length}`}
                aria-current={isActive || undefined}
                onClick={() => scrollToIndex(index)}
                className={cn(CONTROL, "max-w-11 min-w-6 flex-1")}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-2 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                    isActive ? "w-5 bg-white" : "w-2 bg-white/30",
                  )}
                />
              </button>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Next card"
          disabled={activeIndex >= lastIndex}
          onClick={() => scrollToIndex(activeIndex + 1)}
          className={cn(
            CONTROL,
            "w-11 shrink-0 border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5 motion-reduce:transition-none",
          )}
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  );
};
