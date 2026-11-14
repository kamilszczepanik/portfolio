import Link from "next/link";
import { ReactNode } from "react";
import { NEW_TAB_TEXT, NewTabHint } from "@/components/ui/new-tab-hint";
import { WorkProject } from "@/types";

type ProjectLinkProps = {
  project: WorkProject;
  className?: string;
  ariaLabel?: string;
  tabIndex?: number;
  children: ReactNode;
};

export const ProjectLink = ({
  project,
  className,
  ariaLabel,
  tabIndex,
  children,
}: ProjectLinkProps) => {
  if (!project.isExternal) {
    return (
      <Link
        href={project.href}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel && `${ariaLabel}, ${NEW_TAB_TEXT}`}
      tabIndex={tabIndex}
      className={className}
    >
      {children}
      <NewTabHint />
    </a>
  );
};
