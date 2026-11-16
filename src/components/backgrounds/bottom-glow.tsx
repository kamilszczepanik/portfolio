import { cn } from "@/lib/utils";

type BottomGlowProps = {
  className?: string;
};

const GLOW_STYLE = {
  background:
    "radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in oklch, var(--color-primary) 16%, transparent), transparent 80%), linear-gradient(to top, color-mix(in oklch, var(--color-primary) 10%, transparent), transparent)",
};

export const BottomGlow = ({ className }: BottomGlowProps) => (
  <div
    aria-hidden
    style={GLOW_STYLE}
    className={cn(
      "pointer-events-none absolute inset-x-0 bottom-0 -z-10",
      className,
    )}
  />
);
