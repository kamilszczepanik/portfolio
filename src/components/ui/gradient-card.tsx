import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientCardProps = {
  children: ReactNode;
  className?: string;
};

export const GradientCard = ({ children, className }: GradientCardProps) => (
  <div
    data-sky-safe
    className={cn(
      "card-glow rounded-[14px] border border-white/8 p-5 transition-[--card-glow-strength,border-color] duration-300 motion-reduce:transition-none sm:p-6",
      className,
    )}
  >
    {children}
  </div>
);
