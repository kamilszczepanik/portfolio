"use client";
import { Hero } from "@/components/hero";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { CONTACT_INFO, PROJECT_IMAGES } from "@/constants";
import Link from "next/link";
import { Companies } from "@/components/companies";
import { AboutMe } from "@/components/about-me";
import { useState } from "react";
import { Person } from "@/types";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export default function Home() {
  const [activeCard, setActiveCard] = useState<Person | null>(null);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset z-10 h-full w-full bg-black/70" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={PROJECT_IMAGES}
      />

      <div className="relative z-10 flex h-full w-full flex-col">
        <StickyBanner className="bg-linear-to-b from-blue-500 to-blue-600">
          <p className="mx-0 max-w-[99%] md:max-w-[95%] text-sm sm:text-base text-white drop-shadow-md leading-tight sm:leading-relaxed">
            Book a Free 30-Min &quot;Website Growth&quot; Audit. I&apos;ll find
            3 bottlenecks in your site&apos;s performance, UI/UX, and SEO that
            are losing you money and show you exactly how to fix them.{" "}
            <Link
              href={CONTACT_INFO.googleCalendar}
              className="transition duration-200 hover:underline font-semibold"
              target="_blank"
            >
              Book My Free 30-Min Audit
            </Link>
          </p>
        </StickyBanner>

        <div className="flex flex-1 flex-col overflow-hidden">
          <AboutMe onClick={setActiveCard} />

          <Hero activeCard={activeCard} setActiveCard={setActiveCard} />

          <Companies />
        </div>
      </div>
    </div>
  );
}
