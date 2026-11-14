import { cn } from "@/lib/utils";
import { ProjectPhase } from "@/types";

const PHASE_COLOR: Record<ProjectPhase, string> = {
  live: "bg-emerald-400",
  beta: "bg-amber-300",
  testing: "bg-sky-300",
  done: "bg-white/50",
};

type PhaseDotProps = {
  phase: ProjectPhase;
};

export const PhaseDot = ({ phase }: PhaseDotProps) => (
  <span aria-hidden className="relative flex size-2 shrink-0">
    {phase === "done" ? null : (
      <span
        className={cn(
          "absolute inset-0 animate-ping rounded-full opacity-70 motion-reduce:animate-none",
          PHASE_COLOR[phase],
        )}
      />
    )}
    <span className={cn("relative size-2 rounded-full", PHASE_COLOR[phase])} />
  </span>
);
