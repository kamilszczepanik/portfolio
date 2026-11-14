"use client";
import { useId, useState } from "react";
import { Hero } from "@/components/hero";
import { ABOUT_ME, PEOPLE, PROJECT_IMAGES } from "@/constants";
import { Companies } from "@/components/companies";
import { AboutMe } from "@/components/about-me";
import { Person } from "@/types";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { SiteHeader } from "@/components/layout/site-header";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { ContactButton } from "@/components/contact-button";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorkSection } from "@/components/sections/work-section";
import { OpenSourceSection } from "@/components/sections/open-source-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  const [activeCard, setActiveCard] = useState<Person | null>(null);
  const cardId = useId();

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-black">
      <SiteHeader />

      <main className="flex flex-col">
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

        <SectionErrorBoundary name="Experience">
          <ExperienceSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="Skills">
          <SkillsSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="Work">
          <WorkSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="Open source">
          <OpenSourceSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="Contact">
          <ContactSection />
        </SectionErrorBoundary>
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
