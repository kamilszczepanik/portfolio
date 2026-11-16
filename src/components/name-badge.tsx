"use client";

import { motion, useReducedMotionConfig } from "motion/react";
import Image from "next/image";
import { ABOUT_ME } from "@/constants";
import { cn } from "@/lib/utils";

type NameBadgeVariant = "hero" | "nav";

type NameBadgeProps = {
  variant: NameBadgeVariant;
  onOpen?: () => void;
  isPlaceholder?: boolean;
};

type VariantStyle = {
  badge: string;
  photo: string;
  sizes: string;
  name: string;
  role: string;
};

export const NAME_BADGE_DOCK_PX = 72;

const LAYOUT_ID = "name-badge";
const SPRING = { type: "spring", stiffness: 320, damping: 32 } as const;
const STILL = { duration: 0 };

const BADGE_BASE =
  "flex items-center rounded-full border text-left backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

const STYLES: Record<NameBadgeVariant, VariantStyle> = {
  hero: {
    badge:
      "gap-2 border-white/30 bg-black/50 px-3 py-1.5 hover:bg-black/70 sm:gap-3 sm:px-4 sm:py-2 lg:gap-4 lg:py-2.5",
    photo: "size-14 border-2 sm:size-16 lg:size-20",
    sizes: "(max-width: 640px) 56px, (max-width: 1024px) 64px, 80px",
    name: "text-base font-bold sm:text-lg lg:text-2xl",
    role: "text-xs text-foreground sm:text-sm md:text-base lg:text-lg",
  },
  nav: {
    badge:
      "shrink-0 gap-1.5 border-white/20 bg-white/6 py-0.5 pr-3 pl-0.5 hover:bg-white/12 lg:gap-2",
    photo: "size-8 border",
    sizes: "32px",
    name: "text-xs font-semibold sm:text-sm",
    role: "hidden text-xs text-foreground lg:block",
  },
};

const BadgeContent = ({ style }: { style: VariantStyle }) => (
  <>
    <motion.span layout className="flex shrink-0">
      <Image
        width={80}
        height={80}
        src={ABOUT_ME.image}
        alt=""
        className={cn(
          "rounded-full border-white object-cover object-top",
          style.photo,
        )}
        sizes={style.sizes}
        placeholder={typeof ABOUT_ME.image !== "string" ? "blur" : undefined}
      />
    </motion.span>
    <motion.span layout className="flex flex-col whitespace-nowrap">
      <span className={cn("leading-tight text-white", style.name)}>
        {ABOUT_ME.name}
      </span>
      <span className={cn("leading-tight", style.role)}>
        {ABOUT_ME.designation}
      </span>
    </motion.span>
  </>
);

export const NameBadge = ({
  variant,
  onOpen,
  isPlaceholder = false,
}: NameBadgeProps) => {
  const isStill = useReducedMotionConfig() ?? false;
  const style = STYLES[variant];

  if (isPlaceholder) {
    return (
      <span aria-hidden className={cn(BADGE_BASE, style.badge, "invisible")}>
        <BadgeContent style={style} />
      </span>
    );
  }

  return (
    <motion.button
      type="button"
      layoutId={LAYOUT_ID}
      aria-haspopup="dialog"
      onClick={onOpen}
      transition={{ layout: isStill ? STILL : SPRING }}
      whileTap={isStill ? undefined : { scale: 0.95 }}
      className={cn(BADGE_BASE, style.badge, "cursor-pointer")}
    >
      <BadgeContent style={style} />
    </motion.button>
  );
};
