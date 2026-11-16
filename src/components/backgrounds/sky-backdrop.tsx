"use client";

import { useReducedMotionConfig } from "motion/react";
import { ReactNode, RefObject, useRef } from "react";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { useSkyCanvas } from "@/hooks/use-sky-canvas";
import { cn } from "@/lib/utils";

type SkyBackdropProps = {
  children: ReactNode;
  className?: string;
};

type SkyCanvasProps = {
  fieldRef: RefObject<HTMLDivElement | null>;
};

const SkyCanvas = ({ fieldRef }: SkyCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isStill = useReducedMotionConfig() ?? false;
  useSkyCanvas({ fieldRef, canvasRef, isStill });

  return (
    <canvas ref={canvasRef} className="sticky top-0 block h-screen w-full" />
  );
};

export const SkyBackdrop = ({ children, className }: SkyBackdropProps) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={fieldRef} className={cn("relative isolate", className)}>
      <div
        aria-hidden
        data-sky-layer
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <SectionErrorBoundary name="Sky background" className="hidden">
          <SkyCanvas fieldRef={fieldRef} />
        </SectionErrorBoundary>
      </div>
      {children}
    </div>
  );
};
