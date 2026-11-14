import { WorkProject } from "@/types";

type ProjectBadgesProps = {
  badges: WorkProject["badges"];
};

export const ProjectBadges = ({
  badges: [lead, extra],
}: ProjectBadgesProps) => (
  <span className="mt-3 flex flex-wrap gap-2 text-sm">
    <span className="rounded-full bg-blue-500/15 px-3 py-1 text-blue-200">
      {lead}
    </span>
    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-white/85">
      {extra}
    </span>
  </span>
);
