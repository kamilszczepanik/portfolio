"use client";

import { ReactNode, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollEnd } from "@/hooks/use-scroll-end";
import { cn } from "@/lib/utils";

type ReviewTooltipTextProps = {
  children: ReactNode;
};

export const ReviewTooltipText = ({ children }: ReviewTooltipTextProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { hasOverflow, isAtEnd, measure } = useScrollEnd(scrollRef);
  const hasMore = hasOverflow && !isAtEnd;

  return (
    <div className="relative mt-3">
      <div
        ref={scrollRef}
        onScroll={measure}
        className="max-h-[min(15rem,calc(var(--radix-hover-card-content-available-height)_-_6rem))] overflow-y-auto overscroll-contain pr-2 text-[15px] leading-relaxed text-neutral-100"
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 flex h-14 items-end justify-center bg-linear-to-t from-black via-black/80 to-transparent transition-opacity duration-200 motion-reduce:transition-none",
          hasMore ? "opacity-100" : "opacity-0",
        )}
      >
        <ChevronDown className="size-4 text-white/70" />
      </div>
    </div>
  );
};
