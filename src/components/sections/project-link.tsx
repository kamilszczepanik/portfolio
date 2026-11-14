import Link from "next/link";
import { CSSProperties, ReactNode } from "react";
import { NEW_TAB_TEXT, NewTabHint } from "@/components/ui/new-tab-hint";
import { WorkProject } from "@/types";

type ProjectLinkProps = {
  project: WorkProject;
  className?: string;
  ariaLabel?: string;
  tabIndex?: number;
  style?: CSSProperties;
  children: ReactNode;
};

export const ProjectLink = ({
  project,
  className,
  ariaLabel,
  tabIndex,
  style,
  children,
}: ProjectLinkProps) => {
  if (!project.isExternal) {
    return (
      <Link
        href={project.href}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        style={style}
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
      style={style}
      className={className}
    >
      {children}
      <NewTabHint />
    </a>
  );
};
