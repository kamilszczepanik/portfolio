"use client";

import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "./motion-preference";

type MotionToggleProps = {
  className?: string;
};

export const MotionToggle = ({ className }: MotionToggleProps) => {
  const { isPaused, togglePaused } = useMotionPreference();
  const Icon = isPaused ? Play : Pause;

  return (
    <button
      type="button"
      onClick={togglePaused}
      aria-pressed={isPaused}
      aria-label="Pause animations"
      className={cn(
        "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
        className,
      )}
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
};
