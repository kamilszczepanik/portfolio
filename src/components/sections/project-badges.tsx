import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectBadge } from "@/types";

type ProjectBadgesProps = {
  badges: ProjectBadge[];
  className?: string;
};

const PHONE_BADGE_LIMIT = 2;

const BadgeContent = ({ badge }: { badge: ProjectBadge }) => {
  if (badge.kind === "status") {
    return <Badge phase={badge.phase}>{badge.label}</Badge>;
  }
  if (badge.kind === "metric") {
    return (
      <Badge icon={badge.icon}>
        <strong className="font-bold text-white">{badge.value}</strong>
        {badge.label}
      </Badge>
    );
  }
  return <Badge icon={badge.icon}>{badge.label}</Badge>;
};

export const ProjectBadges = ({ badges, className }: ProjectBadgesProps) => (
  <span
    className={cn(
      "mt-3 flex flex-wrap gap-2 max-sm:h-7 max-sm:overflow-hidden",
      className,
    )}
  >
    {badges.map((badge, index) => (
      <span
        key={badge.label}
        className={cn("flex", index >= PHONE_BADGE_LIMIT && "max-sm:hidden")}
      >
        <BadgeContent badge={badge} />
      </span>
    ))}
  </span>
);
