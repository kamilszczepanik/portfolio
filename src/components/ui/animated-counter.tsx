"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({
  target,
  duration = 2,
  className = "",
}: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      const controls = animate(count, target, { duration });
      hasAnimated.current = true;
      return () => controls.stop();
    }
  }, [count, target, duration]);

  return (
    <motion.span className={className} style={{ display: "inline-block" }}>
      {rounded}
    </motion.span>
  );
};
