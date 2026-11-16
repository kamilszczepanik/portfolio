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

const statusFirst = (a: ProjectBadge, b: ProjectBadge) =>
  Number(b.kind === "status") - Number(a.kind === "status");

const phoneLabels = (badges: ProjectBadge[]) =>
  new Set(
    [...badges]
      .sort(statusFirst)
      .slice(0, PHONE_BADGE_LIMIT)
      .map(({ label }) => label),
  );

export const ProjectBadges = ({ badges, className }: ProjectBadgesProps) => {
  const shownOnPhone = phoneLabels(badges);

  return (
    <span className={cn("mt-3 flex flex-wrap gap-2", className)}>
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={cn(
            "flex",
            !shownOnPhone.has(badge.label) && "max-sm:sr-only",
          )}
        >
          <BadgeContent badge={badge} />
        </span>
      ))}
    </span>
  );
};
