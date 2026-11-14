"use client";

import { RefObject, useEffect, useState } from "react";

type UseIsOverElementArgs = {
  ref: RefObject<HTMLElement | null>;
  targetId: string;
  gapPx: number;
};

type RectsOverlapArgs = {
  source: DOMRect;
  target: DOMRect;
  gapPx: number;
};

const rectsOverlap = ({ source, target, gapPx }: RectsOverlapArgs) =>
  source.left - gapPx < target.right &&
  source.right + gapPx > target.left &&
  source.top - gapPx < target.bottom &&
  source.bottom + gapPx > target.top;

export const useIsOverElement = ({
  ref,
  targetId,
  gapPx,
}: UseIsOverElementArgs) => {
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const target = document.getElementById(targetId);
    if (!node || !target) {
      return;
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      setIsOver(
        rectsOverlap({
          source: node.getBoundingClientRect(),
          target: target.getBoundingClientRect(),
          gapPx,
        }),
      );
    };
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(target);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [ref, targetId, gapPx]);

  return isOver;
};
