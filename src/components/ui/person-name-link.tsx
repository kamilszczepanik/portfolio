import Link from "next/link";
import { ExternalLink } from "lucide-react";

type PersonNameLinkProps = {
  name: string;
  link: string;
  className: string;
  iconClassName: string;
};

export const PersonNameLink = ({
  name,
  link,
  className,
  iconClassName,
}: PersonNameLinkProps) =>
  link ? (
    <Link href={link} target="_blank" className={className}>
      {name}
      <ExternalLink className={iconClassName} />
    </Link>
  ) : (
    <span className={className}>{name}</span>
  );
