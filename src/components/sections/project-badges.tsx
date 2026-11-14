import { PhaseDot } from "@/components/ui/phase-dot";
import { brandStyle } from "@/lib/brand-style";
import { cn } from "@/lib/utils";
import { ProjectBadge, ProjectBrand } from "@/types";

type ProjectBadgesProps = {
  badges: ProjectBadge[];
  brand: ProjectBrand;
  className?: string;
};

const CHIP =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm leading-6";
const ICON = "size-3.5 shrink-0 text-(color:--brand-tint)";

const Badge = ({ badge }: { badge: ProjectBadge }) => {
  if (badge.kind === "status") {
    return (
      <span
        className={cn(
          CHIP,
          "border border-(color:--brand)/45 bg-(color:--brand)/15 font-medium text-(color:--brand-tint)",
        )}
      >
        <PhaseDot phase={badge.phase} />
        {badge.label}
      </span>
    );
  }
  const Icon = badge.icon;
  if (badge.kind === "metric") {
    return (
      <span
        className={cn(
          CHIP,
          "bg-linear-to-r from-(color:--brand)/35 to-(color:--brand-2)/15 text-white ring-1 ring-(color:--brand)/50",
        )}
      >
        <Icon aria-hidden className={ICON} />
        <strong className="text-base font-bold text-(color:--brand-tint)">
          {badge.value}
        </strong>
        {badge.label}
      </span>
    );
  }
  return (
    <span className={cn(CHIP, "border border-white/10 bg-white/6 text-white/85")}>
      <Icon aria-hidden className={ICON} />
      {badge.label}
    </span>
  );
};

export const ProjectBadges = ({
  badges,
  brand,
  className,
}: ProjectBadgesProps) => (
  <span
    style={brandStyle(brand)}
    className={cn("mt-3 flex flex-wrap gap-2", className)}
  >
    {badges.map((badge) => (
      <Badge key={badge.label} badge={badge} />
    ))}
  </span>
);
