"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type GlowSide = "left" | "right";

type GridGlowBackdropProps = {
  side: GlowSide;
};

const GRID_CELL_PX = 56;
const STILL_TRANSITION = { duration: 0 };

const GLOW_POSITION: Record<GlowSide, string> = {
  left: "left-[calc(30%-320px)]",
  right: "left-[calc(70%-320px)]",
};

const GLOW_DRIFT: Record<GlowSide, { x: number[]; y: number[] }> = {
  left: { x: [-80, 140], y: [-40, 50] },
  right: { x: [80, -140], y: [40, -50] },
};

export const GridGlowBackdrop = ({ side }: GridGlowBackdropProps) => {
  const isStill = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_75%)]"
        style={{ backgroundSize: `${GRID_CELL_PX}px ${GRID_CELL_PX}px` }}
        animate={{
          backgroundPosition: ["0px 0px", `${GRID_CELL_PX}px ${GRID_CELL_PX}px`],
        }}
        transition={
          isStill
            ? STILL_TRANSITION
            : { duration: 14, ease: "linear", repeat: Infinity }
        }
      />
      <motion.div
        className={cn(
          "absolute top-[calc(50%-320px)] size-[640px] rounded-full bg-blue-600/20 blur-[120px]",
          GLOW_POSITION[side],
        )}
        animate={GLOW_DRIFT[side]}
        transition={
          isStill
            ? STILL_TRANSITION
            : {
                duration: 18,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }
        }
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />
    </div>
  );
};
