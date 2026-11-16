"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionConfig } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewTextProps = {
  children: ReactNode;
  className?: string;
};

const EDGE_TOLERANCE_PX = 1;

export const ReviewText = ({ children, className }: ReviewTextProps) => {
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

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        onScroll={measure}
        tabIndex={0}
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overscroll-contain pb-4 text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-500",
          className,
          hasOverflow && "pr-12",
        )}
      >
        <div ref={textRef} className="flex flex-col items-start gap-4">
          {children}
        </div>
      </div>
      {hasOverflow && !isAtEnd ? (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={scrollDown}
          className="absolute right-2 bottom-2 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <ChevronDown className="size-5" />
        </button>
      ) : null}
    </div>
  );
};
