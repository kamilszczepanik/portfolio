"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

export const useIsScrolledPast = (offset: number) => {
  const { scrollY } = useScroll();
  const [isPast, setIsPast] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setIsPast(y > offset));

  useEffect(() => {
    setIsPast(window.scrollY > offset);
  }, [offset]);

  return isPast;
};
