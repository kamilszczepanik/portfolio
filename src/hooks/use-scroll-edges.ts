"use client";

import { RefObject, useCallback, useEffect, useState } from "react";

const EDGE_TOLERANCE_PX = 1;

type ScrollEdges = {
  hasMoreStart: boolean;
  hasMoreEnd: boolean;
};

export const useScrollEdges = (ref: RefObject<HTMLElement | null>) => {
  const [edges, setEdges] = useState<ScrollEdges>({
    hasMoreStart: false,
    hasMoreEnd: false,
  });

  const measure = useCallback(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const hasMoreStart = node.scrollLeft > EDGE_TOLERANCE_PX;
    const hasMoreEnd =
      node.scrollLeft + node.clientWidth < node.scrollWidth - EDGE_TOLERANCE_PX;
    setEdges((previous) =>
      previous.hasMoreStart === hasMoreStart &&
      previous.hasMoreEnd === hasMoreEnd
        ? previous
        : { hasMoreStart, hasMoreEnd },
    );
  }, [ref]);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    if (node.firstElementChild) {
      observer.observe(node.firstElementChild);
    }
    node.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", measure);
    };
  }, [ref, measure]);

  return edges;
};
