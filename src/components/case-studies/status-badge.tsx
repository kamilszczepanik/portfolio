import { PhaseDot } from "@/components/ui/phase-dot";
import { ProjectPhase } from "@/types";

type StatusBadgeProps = {
  status: string;
  phase: ProjectPhase;
};

export const StatusBadge = ({ status, phase }: StatusBadgeProps) => (
  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-(color:--brand)/45 bg-(color:--brand)/15 px-3 py-1 text-xs font-medium text-(color:--brand-tint)">
    <PhaseDot phase={phase} />
    {status}
  </span>
);
