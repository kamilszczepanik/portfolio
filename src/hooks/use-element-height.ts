"use client";

import { RefObject, useEffect, useState } from "react";

export const useElementHeight = (ref: RefObject<HTMLElement | null>) => {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const measure = () => setHeight(node.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return height;
};
