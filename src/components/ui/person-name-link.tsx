import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { NewTabHint } from "./new-tab-hint";

type PersonNameLinkProps = {
  name: string;
  link?: string;
  className: string;
  iconClassName: string;
};

export const PersonNameLink = ({
  name,
  link,
  className,
  iconClassName,
}: PersonNameLinkProps) =>
  link === undefined ? (
    <span className={className}>{name}</span>
  ) : (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {name}
      <NewTabHint />
      <ExternalLink aria-hidden className={iconClassName} />
    </Link>
  );
