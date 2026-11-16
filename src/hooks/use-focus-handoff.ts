"use client";

import { useLayoutEffect, useRef } from "react";

const pendingKeys = new Set<string>();

export const useFocusHandoff = <T extends HTMLElement>(key: string) => {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node && pendingKeys.delete(key)) {
      node.focus({ preventScroll: true });
    }
    return () => {
      if (!node || node !== document.activeElement) {
        return;
      }
      pendingKeys.add(key);
      queueMicrotask(() => pendingKeys.delete(key));
    };
  }, [key]);

  return ref;
};
