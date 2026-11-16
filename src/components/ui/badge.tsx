import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { PhaseDot } from "@/components/ui/phase-dot";
import { cn } from "@/lib/utils";
import { ProjectPhase } from "@/types";

type BadgeProps = {
  children: ReactNode;
  icon?: LucideIcon;
  phase?: ProjectPhase;
  isWrapping?: boolean;
  className?: string;
};

const WRAPPING_CLASS =
  "h-auto min-h-7 min-w-0 shrink rounded-[14px] py-1 whitespace-normal sm:h-auto sm:min-h-8 sm:rounded-2xl";

export const Badge = ({
  children,
  icon: Icon,
  phase,
  isWrapping = false,
  className,
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-2.5 text-xs whitespace-nowrap text-white/85 sm:h-8 sm:px-3 sm:text-sm",
      isWrapping && WRAPPING_CLASS,
      className,
    )}
  >
    {phase ? <PhaseDot phase={phase} /> : null}
    {Icon ? (
      <Icon aria-hidden className="size-3.5 shrink-0 text-primary-light" />
    ) : null}
    {children}
  </span>
);
