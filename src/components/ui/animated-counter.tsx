"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type CounterPhase = "pending" | "static" | "animated";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  isGrouped?: boolean;
  isTriggered?: boolean;
  className?: string;
}

const formatCount = (value: number, isGrouped: boolean) =>
  isGrouped ? value.toLocaleString("en-US") : String(value);

export const AnimatedCounter = React.memo(
  ({
    target,
    duration = 2,
    isGrouped = false,
    isTriggered,
    className = "",
  }: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const shouldStart = isTriggered ?? isInView;
    const hasStartedRef = useRef(false);
    const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
    const count = useMotionValue(target);
    const rounded = useTransform(() =>
      formatCount(Math.round(count.get()), isGrouped)
    );
    const [phase, setPhase] = useState<CounterPhase>("pending");

    useEffect(() => {
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
        setPhase("static");
        return;
      }
      count.set(0);
      setPhase("animated");
    }, [count]);

    useEffect(() => {
      if (!shouldStart || phase !== "animated" || hasStartedRef.current) {
        return;
      }
      hasStartedRef.current = true;
      controlsRef.current = animate(count, target, { duration });
    }, [shouldStart, phase, count, target, duration]);

    useEffect(() => () => controlsRef.current?.stop(), []);

    return (
      <motion.span
        ref={ref}
        className={cn(
          "inline-block text-right tabular-nums",
          phase === "pending" &&
            "motion-safe:opacity-0 motion-safe:animate-counter-reveal",
          className
        )}
        style={{ width: `${formatCount(target, isGrouped).length}ch` }}
      >
        {rounded}
      </motion.span>
    );
  }
);

AnimatedCounter.displayName = "AnimatedCounter";
