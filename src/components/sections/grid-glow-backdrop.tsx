"use client";

import { motion, useReducedMotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

type GlowSide = "left" | "right";
type FadeEdge = "top" | "bottom";

type GridGlowBackdropProps = {
  side: GlowSide;
  fadeEdges?: FadeEdge[];
};

const STILL_TRANSITION = { duration: 0 };
const DRIFT_TRANSITION = {
  duration: 18,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse",
} as const;

const GLOW_POSITION: Record<GlowSide, string> = {
  left: "left-[calc(30%-min(480px,50%))]",
  right: "left-[calc(70%-min(480px,50%))]",
};

const GLOW_DRIFT: Record<GlowSide, number[]> = {
  left: [-80, 140],
  right: [80, -140],
};

const EDGE_FADE: Record<FadeEdge, string> = {
  top: "top-0 bg-linear-to-b",
  bottom: "bottom-0 bg-linear-to-t",
};

export const GridGlowBackdrop = ({
  side,
  fadeEdges = [],
}: GridGlowBackdropProps) => {
  const isStill = useReducedMotionConfig() ?? false;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden mask-[linear-gradient(to_right,rgba(0,0,0,0.35),#000_30%,#000_70%,rgba(0,0,0,0.35))]">
        <div className="absolute -top-14 -left-14 right-0 bottom-0 animate-grid-pan bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] motion-reduce:animate-none" />
      </div>
      <motion.div
        className={cn(
          "absolute inset-y-0 w-[min(960px,100%)] bg-[radial-gradient(closest-side,rgba(37,99,235,0.2),transparent)]",
          GLOW_POSITION[side],
        )}
        animate={{ x: GLOW_DRIFT[side] }}
        transition={isStill ? STILL_TRANSITION : DRIFT_TRANSITION}
      />
      {fadeEdges.map((edge) => (
        <div
          key={edge}
          className={cn(
            "absolute inset-x-0 h-32 from-black to-transparent",
            EDGE_FADE[edge],
          )}
        />
      ))}
    </div>
  );
};
