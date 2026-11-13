"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = React.memo(
  ({ target, duration = 2, className = "" }: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(target);
    const rounded = useTransform(() => Math.round(count.get()));

    useEffect(() => {
      if (!isInView) {
        return;
      }
      count.set(0);
      const controls = animate(count, target, { duration });
      return () => controls.stop();
    }, [isInView, count, target, duration]);

    return (
      <motion.span
        ref={ref}
        className={`tabular-nums ${className}`}
        style={{ display: "inline-block" }}
      >
        {rounded}
      </motion.span>
    );
  }
);

AnimatedCounter.displayName = "AnimatedCounter";
