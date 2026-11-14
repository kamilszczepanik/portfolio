"use client";

import { RefObject, useCallback, useEffect, useState } from "react";

const EDGE_TOLERANCE_PX = 1;

type ScrollEndState = {
  hasOverflow: boolean;
  isAtEnd: boolean;
};

const INITIAL_STATE: ScrollEndState = { hasOverflow: false, isAtEnd: true };

export const useScrollEnd = (ref: RefObject<HTMLElement | null>) => {
  const [state, setState] = useState(INITIAL_STATE);

  const measure = useCallback(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    setState({
      hasOverflow: node.scrollHeight > node.clientHeight + EDGE_TOLERANCE_PX,
      isAtEnd:
        node.scrollTop + node.clientHeight >=
        node.scrollHeight - EDGE_TOLERANCE_PX,
    });
  }, [ref]);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, measure]);

  return { ...state, measure };
};
