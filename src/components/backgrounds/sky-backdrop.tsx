"use client";

import { useReducedMotionConfig } from "motion/react";
import { ReactNode, RefObject, useRef } from "react";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { useSkyCanvas } from "@/hooks/use-sky-canvas";
import { cn } from "@/lib/utils";
import { SkyEdges } from "./sky-field";

type SkyVariant = "page" | "band";

type SkyBackdropProps = {
  children?: ReactNode;
  className?: string;
  variant?: SkyVariant;
};

type SkyCanvasProps = {
  fieldRef: RefObject<HTMLDivElement | null>;
  variant: SkyVariant;
};

const SKY_EDGES: Record<SkyVariant, SkyEdges> = {
  page: { top: 120, bottom: 40 },
  band: { top: 1, bottom: 24 },
};

const CANVAS_CLASS: Record<SkyVariant, string> = {
  page: "sticky top-0 block h-screen w-full",
  band: "absolute inset-0 block size-full",
};

const SkyCanvas = ({ fieldRef, variant }: SkyCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isStill = useReducedMotionConfig() ?? false;
  useSkyCanvas({ fieldRef, canvasRef, isStill, edges: SKY_EDGES[variant] });

  return <canvas ref={canvasRef} className={CANVAS_CLASS[variant]} />;
};

export const SkyBackdrop = ({
  children,
  className,
  variant = "page",
}: SkyBackdropProps) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={fieldRef} className={cn("relative isolate", className)}>
      <div
        aria-hidden
        data-sky-layer
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <SectionErrorBoundary name="Sky background" className="hidden">
          <SkyCanvas fieldRef={fieldRef} variant={variant} />
        </SectionErrorBoundary>
      </div>
      {children}
    </div>
  );
};
