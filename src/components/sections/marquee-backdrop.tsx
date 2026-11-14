"use client";

import { PROJECT_IMAGES } from "@/constants";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";

export const MarqueeBackdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    <SectionErrorBoundary name="Section background" className="hidden">
      <ThreeDMarquee
        className="absolute inset-0 opacity-50 blur-[3px]"
        images={PROJECT_IMAGES}
      />
    </SectionErrorBoundary>
    <div className="absolute inset-0 bg-black/80" />
    <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent" />
  </div>
);
