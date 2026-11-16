import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeRowProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export const BadgeRow = ({ label, children, className }: BadgeRowProps) => (
  <ul
    aria-label={label}
    tabIndex={0}
    className={cn(
      "-my-1 flex flex-nowrap items-center gap-2 overflow-x-auto py-1 pr-10 [scrollbar-width:none] mask-[linear-gradient(to_right,#000_calc(100%-2.5rem),transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 [&::-webkit-scrollbar]:hidden",
      className,
    )}
  >
    {children}
  </ul>
);
