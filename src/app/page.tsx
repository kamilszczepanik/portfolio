"use client";
import { useId, useState } from "react";
import { Hero } from "@/components/hero";
import { ABOUT_ME, PEOPLE, PROJECT_IMAGES } from "@/constants";
import { Companies } from "@/components/companies";
import { AboutMe } from "@/components/about-me";
import { Person } from "@/types";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { CaseStudyGrid } from "@/components/case-studies/case-study-grid";
import { SiteHeader } from "@/components/layout/site-header";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { ContactButton } from "@/components/contact-button";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";

const WORK_HEADING_ID = "work-heading";

export default function Home() {
  const [activeCard, setActiveCard] = useState<Person | null>(null);
  const cardId = useId();

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-black">
      <SiteHeader />

      <main className="flex flex-col gap-4 pb-24">
        <section
          id="intro"
          aria-label="Intro"
          className="relative isolate flex min-h-[calc(100svh_-_var(--site-header-h,6rem))] flex-col overflow-hidden"
        >
          <SectionErrorBoundary name="Intro background" className="hidden">
            <ThreeDMarquee
              className="absolute inset-0 -z-10"
              images={PROJECT_IMAGES}
            />
          </SectionErrorBoundary>
          <div className="absolute inset-0 -z-10 bg-black/70" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-linear-to-b from-transparent to-black" />

          <AboutMe onClick={setActiveCard} />
          <Hero cardId={cardId} setActiveCard={setActiveCard} />
          <SectionErrorBoundary name="Companies" className="mb-6">
            <Companies />
          </SectionErrorBoundary>
        </section>

        <section
          id="work"
          aria-labelledby={WORK_HEADING_ID}
          className="relative z-20 mx-auto w-full max-w-7xl px-2 py-4 sm:px-6 lg:px-2"
        >
          <h2
            id={WORK_HEADING_ID}
            className="mb-4 text-2xl font-bold text-white md:text-3xl"
          >
            Selected work
          </h2>
          <CaseStudyGrid />
        </section>
      </main>

      <ExpandableCard
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        cardId={cardId}
        people={activeCard?.id === ABOUT_ME.id ? undefined : PEOPLE}
      />
      <ContactButton />
    </div>
  );
}
