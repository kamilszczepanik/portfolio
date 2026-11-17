"use client";

import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { KeyboardEvent, useRef } from "react";
import { cn } from "@/lib/utils";

type SwipeControlsProps = {
  label: string;
  stopCount: number;
  activeStop: number;
  isHidden: boolean;
  onSelect: (stop: number) => void;
  className?: string;
};

type ArrowButtonProps = {
  label: string;
  icon: LucideIcon;
  isDisabled: boolean;
  onPress: () => void;
};

type StopForKeyArgs = {
  key: string;
  activeStop: number;
  lastStop: number;
};

const MAX_PHONE_DOTS = 5;

const CONTROL =
  "flex h-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

const DotMark = ({ isActive }: { isActive: boolean }) => (
  <span
    aria-hidden
    className={cn(
      "h-2 shrink-0 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
      isActive ? "w-5 bg-white" : "w-2 bg-white/55",
    )}
  />
);

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

const stopForKey = ({ key, activeStop, lastStop }: StopForKeyArgs) => {
  if (key === "Home") {
    return 0;
  }
  if (key === "End") {
    return lastStop;
  }
  if (key === "ArrowRight") {
    return Math.min(lastStop, activeStop + 1);
  }
  if (key === "ArrowLeft") {
    return Math.max(0, activeStop - 1);
  }
  return null;
};

export const SwipeControls = ({
  label,
  stopCount,
  activeStop,
  isHidden,
  onSelect,
  className,
}: SwipeControlsProps) => {
  const dotsRef = useRef<HTMLDivElement>(null);
  const lastStop = stopCount - 1;
  const stops = Array.from({ length: stopCount }, (_, stop) => stop);
  const hasManyDots = stopCount > MAX_PHONE_DOTS;

  const handleDotKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = stopForKey({ key: event.key, activeStop, lastStop });
    if (next === null) {
      return;
    }
    event.preventDefault();
    onSelect(next);
    dotsRef.current
      ?.querySelector<HTMLButtonElement>(`[data-swipe-dot="${next}"]`)
      ?.focus();
  };

  return (
    <div
      role="group"
      aria-label={`${label} navigation`}
      inert={isHidden}
      className={cn(
        "mt-4 flex items-center justify-between gap-4",
        isHidden && "invisible",
        className,
      )}
    >
      <div
        ref={dotsRef}
        onKeyDown={handleDotKeyDown}
        className={cn(
          "flex min-w-0 flex-1 items-center",
          hasManyDots && "max-sm:hidden",
        )}
      >
        {stops.map((stop) => {
          const isActive = stop === activeStop;
          return (
            <button
              key={stop}
              type="button"
              data-swipe-dot={stop}
              aria-label={`Go to position ${stop + 1} of ${stopCount} in ${label}`}
              aria-current={isActive || undefined}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(stop)}
              className={cn(CONTROL, "max-w-11 min-w-6 flex-1")}
            >
              <DotMark isActive={isActive} />
            </button>
          );
        })}
      </div>
      {hasManyDots ? (
        <div
          aria-hidden
          className="flex min-w-0 flex-1 items-center gap-2 sm:hidden"
        >
          {stops.map((stop) => (
            <DotMark key={stop} isActive={stop === activeStop} />
          ))}
        </div>
      ) : null}
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
