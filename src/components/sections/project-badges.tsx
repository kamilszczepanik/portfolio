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
    return (
      <Badge phase={badge.phase} isWrapping>
        {badge.label}
      </Badge>
    );
  }
  if (badge.kind === "metric") {
    return (
      <Badge icon={badge.icon} isWrapping>
        <span>
          <strong className="mr-0.5 font-bold text-white">{badge.value}</strong>{" "}
          {badge.shortLabel ? (
            <>
              <span className="@lg:hidden">{badge.shortLabel}</span>
              <span className="hidden @lg:inline">{badge.label}</span>
            </>
          ) : (
            badge.label
          )}
        </span>
      </Badge>
    );
  }
  return (
    <Badge icon={badge.icon} isWrapping>
      {badge.label}
    </Badge>
  );
};

const statusFirst = (a: ProjectBadge, b: ProjectBadge) =>
  Number(b.kind === "status") - Number(a.kind === "status");

const hasShortLabel = (badges: ProjectBadge[]) =>
  badges.some((badge) => badge.kind === "metric" && badge.shortLabel);

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
    <span
      className={cn(
        "mt-3 flex flex-wrap gap-2",
        hasShortLabel(badges) && "@container",
        className,
      )}
    >
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={cn(
            "flex min-w-0",
            badge.kind === "status" && "max-sm:order-first",
            !shownOnPhone.has(badge.label) && "max-sm:sr-only",
          )}
        >
          <BadgeContent badge={badge} />
        </span>
      ))}
    </span>
  );
};
