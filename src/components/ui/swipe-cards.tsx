"use client";

import { useReducedMotionConfig } from "motion/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SwipeControls } from "./swipe-controls";
import {
  countStops,
  isScrolledTo,
  nearestIndex,
  scrollLeftFor,
} from "./swipe-measure";

type SwipeCardRenderProps<T> = {
  item: T;
  index: number;
};

type SwipeCardsProps<T> = {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (props: SwipeCardRenderProps<T>) => ReactNode;
  label: string;
  isScrollableOnDesktop?: boolean;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
};

const SETTLE_MS = 150;

const LIST_BASE =
  "relative flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] max-md:-mx-4 max-md:-my-2 max-md:scroll-px-4 max-md:px-4 max-md:py-2 sm:max-md:-mx-6 sm:max-md:scroll-px-6 sm:max-md:px-6 [&::-webkit-scrollbar]:hidden";
const LIST_PHONE_ONLY = "md:snap-none md:overflow-visible";
const LIST_EVERYWHERE = "md:-m-2 md:scroll-px-2 md:gap-5 md:p-2";

const ITEM_BASE =
  "flex max-md:w-[85%] max-md:shrink-0 max-md:snap-start *:w-full";
const ITEM_EVERYWHERE =
  "shrink-0 snap-start md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]";

export const SwipeCards = <T,>({
  items,
  getKey,
  renderItem,
  label,
  isScrollableOnDesktop = false,
  className,
  listClassName,
  itemClassName,
}: SwipeCardsProps<T>) => {
  const listRef = useRef<HTMLUListElement>(null);
  const targetRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stopCount, setStopCount] = useState<number | null>(null);
  const isStill = useReducedMotionConfig() ?? false;
  const stops = stopCount ?? 1;
  const lastIndex = items.length - 1;
  const lastStop = stops - 1;
  const activeStop = Math.min(activeIndex, lastStop);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    const measure = () => setStopCount(countStops(list));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [items.length]);

  useEffect(() => () => window.clearTimeout(settleTimerRef.current), []);

  const settle = (index: number) => {
    window.clearTimeout(settleTimerRef.current);
    targetRef.current = null;
    setActiveIndex(index);
  };

  const settleWhenIdle = (list: HTMLUListElement) => {
    window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = window.setTimeout(
      () => settle(nearestIndex(list)),
      SETTLE_MS,
    );
  };

  const scrollToIndex = (index: number) => {
    const list = listRef.current;
    const left = list ? scrollLeftFor({ list, index }) : null;
    if (!list || left === null) {
      return;
    }
    if (isScrolledTo({ list, index })) {
      settle(index);
      return;
    }
    targetRef.current = index;
    setActiveIndex(index);
    list.scrollTo({ left, behavior: isStill ? "auto" : "smooth" });
    settleWhenIdle(list);
  };

  const scrollToStop = (stop: number) => {
    if (stops > 1) {
      scrollToIndex(stop >= lastStop ? lastIndex : stop);
    }
  };

  const handleScroll = () => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    const target = targetRef.current;
    if (target === null) {
      setActiveIndex(nearestIndex(list));
    } else if (isScrolledTo({ list, index: target })) {
      settle(target);
    } else {
      settleWhenIdle(list);
    }
  };

  return (
    <div className={className}>
      <ul
        ref={listRef}
        aria-label={label}
        onScroll={handleScroll}
        className={cn(
          LIST_BASE,
          isScrollableOnDesktop ? LIST_EVERYWHERE : LIST_PHONE_ONLY,
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
            className={cn(
              ITEM_BASE,
              isScrollableOnDesktop && ITEM_EVERYWHERE,
              itemClassName,
            )}
          >
            {renderItem({ item, index })}
          </li>
        ))}
      </ul>
      <SwipeControls
        label={label}
        stopCount={stops}
        activeStop={activeStop}
        isHidden={stops <= 1}
        onSelect={scrollToStop}
        className={isScrollableOnDesktop ? undefined : "md:hidden"}
      />
    </div>
  );
};
