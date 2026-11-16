import { Badge } from "@/components/ui/badge";
import { ProjectPhase } from "@/types";

type StatusBadgeProps = {
  status: string;
  phase: ProjectPhase;
};

export const StatusBadge = ({ status, phase }: StatusBadgeProps) => (
  <Badge phase={phase} className="w-fit">
    {status}
  </Badge>
);
