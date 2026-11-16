"use client";

import { RefObject, useEffect, useState } from "react";

type BadgeOverflowOptions = {
  listRef: RefObject<HTMLElement | null>;
  moreRef: RefObject<HTMLElement | null>;
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

export const useBadgeOverflow = ({
  listRef,
  moreRef,
  items,
}: BadgeOverflowOptions) => {
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [isWide, setIsWide] = useState(false);
  const [isMeasured, setIsMeasured] = useState(false);

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
      setIsMeasured(true);
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
  }, [listRef, moreRef, items]);

  return { visibleCount, isWide, isMeasured };
};
