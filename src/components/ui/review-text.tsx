"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionConfig } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewTextProps = {
  children: ReactNode;
  className?: string;
  hasButtonGutter?: boolean;
};

const EDGE_TOLERANCE_PX = 1;

const ARROW_CLASS =
  "flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80";

export const ReviewText = ({
  children,
  className,
  hasButtonGutter = true,
}: ReviewTextProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(true);
  const isStill = useReducedMotionConfig() ?? false;

  const measure = useCallback(() => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }
    setHasOverflow(node.scrollHeight > node.clientHeight + EDGE_TOLERANCE_PX);
    setIsAtEnd(
      node.scrollTop + node.clientHeight >=
        node.scrollHeight - EDGE_TOLERANCE_PX,
    );
  }, []);

  useEffect(() => {
    const scroll = scrollRef.current;
    const text = textRef.current;
    if (!scroll || !text) {
      return;
    }
    scroll.scrollTop = 0;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scroll);
    observer.observe(text);
    return () => observer.disconnect();
  }, [children, measure]);

  const scrollDown = () => {
    const node = scrollRef.current;
    node?.scrollBy({
      top: node.clientHeight * 0.8,
      behavior: isStill ? "auto" : "smooth",
    });
  };

  const isArrowShown = hasOverflow && !isAtEnd;
  const hasArrowRow = hasOverflow && !hasButtonGutter;

  const arrow = (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden
      onClick={scrollDown}
      className={cn(
        ARROW_CLASS,
        hasButtonGutter && "absolute right-2 bottom-2",
        !isArrowShown && "invisible",
      )}
    >
      <ChevronDown className="size-5" />
    </button>
  );

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        onScroll={measure}
        tabIndex={0}
        data-sky-skip
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overscroll-contain pb-4 text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-500",
          className,
          hasOverflow && hasButtonGutter && "pr-12",
          hasArrowRow && "pb-1",
        )}
      >
        <div ref={textRef} className="flex flex-col items-start gap-4">
          {children}
        </div>
      </div>
      {hasArrowRow ? (
        <div className="flex shrink-0 justify-center py-1.5">{arrow}</div>
      ) : null}
      {isArrowShown && hasButtonGutter ? arrow : null}
    </div>
  );
};
