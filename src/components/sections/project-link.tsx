import Link from "next/link";
import { CSSProperties, ReactNode } from "react";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { WorkProject } from "@/types";

type ProjectLinkProps = {
  project: WorkProject;
  className?: string;
  tabIndex?: number;
  isHidden?: boolean;
  onFocus?: () => void;
  style?: CSSProperties;
  children: ReactNode;
};

export const ProjectLink = ({
  project,
  className,
  tabIndex,
  isHidden,
  onFocus,
  style,
  children,
}: ProjectLinkProps) => {
  if (!project.isExternal) {
    return (
      <Link
        href={project.href}
        tabIndex={tabIndex}
        aria-hidden={isHidden || undefined}
        onFocus={onFocus}
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
      tabIndex={tabIndex}
      aria-hidden={isHidden || undefined}
      onFocus={onFocus}
      style={style}
      className={className}
    >
      {children}
      <NewTabHint />
    </a>
  );
};
