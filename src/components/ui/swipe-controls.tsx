"use client";

import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { KeyboardEvent, useRef } from "react";
import { cn } from "@/lib/utils";

type SwipeControlsProps = {
  label: string;
  stopCount: number;
  activeStop: number;
  onSelect: (stop: number) => void;
  className?: string;
};

type ArrowButtonProps = {
  label: string;
  icon: LucideIcon;
  isDisabled: boolean;
  onPress: () => void;
};

const CONTROL =
  "flex h-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

const ArrowButton = ({
  label,
  icon: Icon,
  isDisabled,
  onPress,
}: ArrowButtonProps) => (
  <button
    type="button"
    aria-label={label}
    aria-disabled={isDisabled || undefined}
    onClick={() => {
      if (!isDisabled) {
        onPress();
      }
    }}
    className={cn(
      CONTROL,
      "w-11 shrink-0 border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-white/5 motion-reduce:transition-none",
    )}
  >
    <Icon aria-hidden className="size-5" />
  </button>
);

export const SwipeControls = ({
  label,
  stopCount,
  activeStop,
  onSelect,
  className,
}: SwipeControlsProps) => {
  const controlsRef = useRef<HTMLDivElement>(null);
  const lastStop = stopCount - 1;
  const stops = Array.from({ length: stopCount }, (_, stop) => stop);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) {
      return;
    }
    event.preventDefault();
    const next = Math.min(lastStop, Math.max(0, activeStop + step));
    onSelect(next);
    const isOnDot =
      event.target instanceof HTMLElement && event.target.dataset.swipeDot;
    if (isOnDot) {
      controlsRef.current
        ?.querySelector<HTMLButtonElement>(`[data-swipe-dot="${next}"]`)
        ?.focus();
    }
  };

  return (
    <div
      ref={controlsRef}
      role="group"
      aria-label={`${label} navigation`}
      onKeyDown={handleKeyDown}
      className={cn("mt-4 flex items-center justify-between gap-4", className)}
    >
      <div className="flex min-w-0 flex-1 items-center">
        {stopCount > 1
          ? stops.map((stop) => {
              const isActive = stop === activeStop;
              return (
                <button
                  key={stop}
                  type="button"
                  data-swipe-dot={stop}
                  aria-label={`${label}, card ${stop + 1} of ${stopCount}`}
                  aria-current={isActive || undefined}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onSelect(stop)}
                  className={cn(CONTROL, "max-w-11 min-w-6 flex-1")}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-2 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                      isActive ? "w-5 bg-white" : "w-2 bg-white/55",
                    )}
                  />
                </button>
              );
            })
          : null}
      </div>
      <div className="flex shrink-0 gap-2">
        <ArrowButton
          label={`Previous card in ${label}`}
          icon={ChevronLeft}
          isDisabled={activeStop <= 0}
          onPress={() => onSelect(activeStop - 1)}
        />
        <ArrowButton
          label={`Next card in ${label}`}
          icon={ChevronRight}
          isDisabled={activeStop >= lastStop}
          onPress={() => onSelect(activeStop + 1)}
        />
      </div>
    </div>
  );
};
