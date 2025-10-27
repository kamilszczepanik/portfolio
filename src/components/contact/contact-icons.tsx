import { CONTACT_INFO } from "@/constants";
import { cn } from "@/lib/utils";
import { Github, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";

const ICONS = [
  {
    label: "email",
    href: CONTACT_INFO.email,
    icon: <Mail className={"text-primary"} />,
  },
  {
    label: "whatsapp",
    href: CONTACT_INFO.whatsapp,
    icon: <Phone className={"text-primary"} />,
  },
  {
    label: "x",
    href: CONTACT_INFO.x,
    icon: <Twitter className={"text-primary"} />,
  },
  {
    label: "github",
    href: CONTACT_INFO.github,
    icon: <Github className={"text-primary"} />,
  },
];

const Icon = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <Link href={href} target="_blank">
      <div className="flex items-center gap-2">{icon}</div>
    </Link>
  );
};

interface Props {
  className?: string;
}

export const ContactIcons = ({ className }: Props) => {
  return (
    <div className={cn("flex gap-4 items-center px-6", className)}>
      {ICONS.map((icon) => {
        return (
          <div key={icon.label}>
            <hr className="h-8 w-px bg-gray-500 first:hidden" />
            <Icon href={icon.href} icon={icon.icon} />
          </div>
        );
      })}
    </div>
  );
};
