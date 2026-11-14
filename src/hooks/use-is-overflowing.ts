"use client";

import { RefObject, useEffect, useState } from "react";

const OVERFLOW_TOLERANCE_PX = 1;

export const useIsOverflowing = (ref: RefObject<HTMLElement | null>) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const measure = () =>
      setIsOverflowing(
        node.scrollHeight > node.clientHeight + OVERFLOW_TOLERANCE_PX,
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return isOverflowing;
};
