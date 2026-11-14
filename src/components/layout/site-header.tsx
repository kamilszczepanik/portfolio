"use client";

import { useRef } from "react";
import { CONTACT_INFO } from "@/constants";
import { useHeaderHeightVars } from "@/hooks/use-header-height-vars";
import { SectionNav } from "./section-nav";

export const SiteHeader = () => {
  const headerRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  useHeaderHeightVars({ headerRef, bannerRef });

  return (
    <header
      ref={headerRef}
      data-site-header
      className="sticky top-[calc(-1*var(--banner-h,0px))] z-50 w-full"
    >
      <div
        ref={bannerRef}
        className="flex w-full items-center justify-center bg-linear-to-b from-blue-600 to-blue-700 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2"
      >
        <p className="max-w-[99%] text-sm leading-tight text-white drop-shadow-md sm:text-base sm:leading-relaxed md:max-w-[95%]">
          Open to AI engineering roles: full-time in Dubai or remote, and
          contracts.{" "}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="-mx-1 -my-3 inline-block rounded-md px-1 py-3 font-bold underline underline-offset-2 transition duration-200 hover:underline"
          >
            Get in touch
          </a>
        </p>
      </div>
      <SectionNav />
    </header>
  );
};
