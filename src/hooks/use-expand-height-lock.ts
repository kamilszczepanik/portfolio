"use client";

import { useEffect, useRef, useState } from "react";

const UNLOCK_DELAY_MS = 400;

export const useExpandHeightLock = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<ReadonlySet<number>>(
    () => new Set(),
  );
  const [lockedHeights, setLockedHeights] = useState<number[] | null>(null);

  useEffect(() => {
    if (expanded.size > 0 || !lockedHeights) {
      return;
    }
    const timeout = window.setTimeout(
      () => setLockedHeights(null),
      UNLOCK_DELAY_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [expanded, lockedHeights]);

  const toggle = (index: number) => {
    const grid = gridRef.current;
    if (grid && !lockedHeights && !expanded.has(index)) {
      setLockedHeights(
        Array.from(grid.children, (child) =>
          child instanceof HTMLElement ? child.offsetHeight : 0,
        ),
      );
    }
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return { gridRef, expanded, lockedHeights, toggle };
};
