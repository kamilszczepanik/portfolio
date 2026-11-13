"use client";
import { Hero } from "@/components/hero";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { CONTACT_INFO, PROJECT_IMAGES } from "@/constants";
import { Companies } from "@/components/companies";
import { AboutMe } from "@/components/about-me";
import { useState } from "react";
import { Person } from "@/types";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { CaseStudyGrid } from "@/components/case-studies/case-study-grid";

export default function Home() {
  const [activeCard, setActiveCard] = useState<Person | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="absolute inset z-10 h-full w-full bg-black/70" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={PROJECT_IMAGES}
      />

      <div className="relative z-10 flex min-h-full w-full flex-col">
        <StickyBanner className="bg-linear-to-b from-blue-500 to-blue-600">
          <p className="mx-0 max-w-[99%] md:max-w-[95%] text-sm sm:text-base text-white drop-shadow-md leading-tight sm:leading-relaxed">
            Open to AI engineering roles: full-time in Dubai or remote, and
            contracts.{" "}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="transition duration-200 hover:underline font-bold underline underline-offset-2 rounded-md"
            >
              Get in touch
            </a>
          </p>
        </StickyBanner>

        <div className="flex flex-1 flex-col gap-4">
          <AboutMe onClick={setActiveCard} />

          <Hero activeCard={activeCard} setActiveCard={setActiveCard} />

          <section
            id="work"
            className="relative z-20 mx-auto w-full max-w-7xl scroll-mt-20 px-2 py-4 sm:px-6 lg:px-2"
          >
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Selected work
            </h2>
            <CaseStudyGrid />
          </section>

          <Companies />
        </div>
      </div>
    </div>
  );
}
