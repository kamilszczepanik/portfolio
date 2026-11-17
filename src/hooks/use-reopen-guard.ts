"use client";

import { useRef } from "react";

type GuardState = "none" | "active" | "returned";

export const useReopenGuard = () => {
  const stateRef = useRef<GuardState>("none");

  const isGuarded = () => stateRef.current !== "none";

  const guard = () => {
    stateRef.current = "active";
  };

  const release = () => {
    stateRef.current = "none";
  };

  const markReturned = () => {
    if (stateRef.current === "active") {
      stateRef.current = "returned";
    }
  };

  const releaseAfterReturn = () => {
    if (stateRef.current === "returned") {
      release();
    }
  };

  return {
    isGuarded,
    guard,
    triggerProps: {
      onPointerEnter: release,
      onFocus: markReturned,
      onBlur: releaseAfterReturn,
    },
  };
};
