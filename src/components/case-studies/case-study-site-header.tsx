"use client";

import { useCallback, useId, useState } from "react";
import { ABOUT_ME } from "@/constants";
import { SiteHeader } from "@/components/layout/site-header";
import { CtaButton } from "@/components/ui/cta-button";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { Person } from "@/types";

export const CaseStudySiteHeader = () => {
  const [activeCard, setActiveCard] = useState<Person | null>(null);
  const cardId = useId();
  const openAbout = useCallback(() => setActiveCard(ABOUT_ME), []);

  return (
    <>
      <SiteHeader navLabel="Site" isBadgeDocked onOpenAbout={openAbout}>
        <CtaButton href="/#work" variant="secondary" className="px-4">
          <span aria-hidden="true">←</span>
          All work
        </CtaButton>
        <span className="flex-1" />
      </SiteHeader>
      <SectionErrorBoundary name="About modal" className="hidden">
        <ExpandableCard
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          cardId={cardId}
        />
      </SectionErrorBoundary>
    </>
  );
};
