"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState, ReactNode } from "react";

export const InfiniteMovingCards = React.memo(
  ({
    children,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
    listClassName,
  }: {
    children: ReactNode;
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
    listClassName?: string;
  }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [start, setStart] = useState(false);

    const duplicatedChildren = useMemo(() => {
      const items = React.Children.toArray(children);
      const clones = items.map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        return React.cloneElement(child, {
          key: `duplicate-${index}`,
        });
      });
      return [...items, ...clones];
    }, [children]);

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
    }, [direction, speed, duplicatedChildren.length]);

    return (
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-w-7xl overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}
      >
        <ul
          className={cn(
            "flex w-max min-w-full shrink-0 flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]",
            listClassName
          )}
        >
          {duplicatedChildren}
        </ul>
      </div>
    );
  }
);

InfiniteMovingCards.displayName = "InfiniteMovingCards";
