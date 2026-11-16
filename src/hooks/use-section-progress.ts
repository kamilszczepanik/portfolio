"use client";

import {
  MotionValue,
  motionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SiteSection } from "@/types";

const ACTIVE_LINE_RATIO = 0.4;
const END_TOLERANCE_PX = 4;

type SectionReading = {
  index: number;
  progress: number;
  isReached: boolean;
};

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

const readSection = (id: string, index: number, line: number) => {
  const element = document.getElementById(id);
  if (!element) {
    return null;
  }
  const top = element.getBoundingClientRect().top + window.scrollY;
  const height = Math.max(element.offsetHeight, 1);
  return {
    index,
    progress: clampProgress((line - top) / height),
    isReached: line >= top,
  };
};

const isScrolledToEnd = () =>
  window.scrollY + window.innerHeight >=
  document.documentElement.scrollHeight - END_TOLERANCE_PX;

export const useSectionProgress = (sections: SiteSection[]) => {
  const { scrollY } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const fills = useMemo<MotionValue<number>[]>(
    () => sections.map(() => motionValue(0)),
    [sections]
  );

  const update = useCallback(() => {
    const line = window.scrollY + window.innerHeight * ACTIVE_LINE_RATIO;
    const isAtEnd = isScrolledToEnd();
    const readings = sections
      .map(({ id }, index) => readSection(id, index, line))
      .filter((reading): reading is SectionReading => reading !== null);

    fills.forEach((fill) => fill.set(0));
    readings.forEach(({ index, progress }) =>
      fills[index].set(isAtEnd ? 1 : progress)
    );

    const reached = readings.filter(({ isReached }) => isReached);
    const lastReading = readings.at(-1);
    const nextActive = isAtEnd ? lastReading : reached.at(-1);
    setActiveIndex(nextActive?.index ?? 0);
  }, [sections, fills]);

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return { activeIndex, fills };
};
