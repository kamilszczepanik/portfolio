"use client";

import { cn } from "@/lib/utils";
import React, { Fragment, ReactNode, useEffect, useState } from "react";

type InfiniteMovingCardsProps = {
  children: (options: { isDuplicate: boolean }) => ReactNode;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  isPaused?: boolean;
  className?: string;
  listClassName?: string;
  label: string;
};

export const InfiniteMovingCards = React.memo(
  ({
    children,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    isPaused = false,
    className,
    listClassName,
    label,
  }: InfiniteMovingCardsProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
      const node = containerRef.current;
      if (!node) {
        return;
      }
      const directionValue = direction === "left" ? "forwards" : "reverse";
      const speedValue =
        speed === "fast" ? "20s" : speed === "slow" ? "80s" : "40s";
      node.style.setProperty("--animation-direction", directionValue);
      node.style.setProperty("--animation-duration", speedValue);
      setStart(false);
      const raf = requestAnimationFrame(() => {
        setStart(true);
      });
      return () => cancelAnimationFrame(raf);
    }, [direction, speed]);

    return (
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-w-7xl overflow-hidden mask-[linear-gradient(to_right,transparent,white_6%,white_94%,transparent)] motion-reduce:mask-none",
          className
        )}
      >
        <ul
          aria-label={label}
          className={cn(
            "flex w-max min-w-full shrink-0 flex-nowrap gap-(--marquee-gap) motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center",
            start && "animate-scroll motion-reduce:animate-none",
            pauseOnHover && "hover:[animation-play-state:paused]",
            "focus-within:[animation-play-state:paused]",
            isPaused && "[animation-play-state:paused]",
            listClassName
          )}
        >
          <Fragment key="original">
            {children({ isDuplicate: false })}
          </Fragment>
          <Fragment key="duplicate">
            {children({ isDuplicate: true })}
          </Fragment>
        </ul>
      </div>
    );
  }
);

InfiniteMovingCards.displayName = "InfiniteMovingCards";
