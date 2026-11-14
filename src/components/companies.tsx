"use client";

import { COMPANIES } from "@/constants";
import { Company } from "@/types";
import Image from "next/image";
import { LinkPreview } from "./ui/link-preview";
import { NEW_TAB_TEXT } from "./ui/new-tab-hint";
import { cn } from "@/lib/utils";
import React from "react";

const COMPANIES_HEADING_ID = "companies-heading";

const CompanyLogo = ({ company }: { company: Company }) => (
  <Image
    src={company.image}
    alt={`${company.name} logo`}
    width={160}
    height={64}
    unoptimized={typeof company.image === "string"}
    sizes="(max-width: 640px) 120px, 220px"
    className={cn(
      "h-4 w-auto opacity-80 transition-opacity duration-300 group-hover:opacity-100 sm:h-8",
      company.isDarkOnLight && "mix-blend-screen grayscale invert",
    )}
  />
);

const CompanyItem = ({ company }: { company: Company }) => (
  <li className="flex shrink-0 items-center">
    {company.link ? (
      <LinkPreview
        url={company.link}
        imageSrc={company.previewImage}
        isStatic
        target="_blank"
        ariaLabel={`${company.name} website, ${NEW_TAB_TEXT}`}
        className="group flex min-h-11 items-center rounded-md"
      >
        <CompanyLogo company={company} />
      </LinkPreview>
    ) : (
      <span className="group flex min-h-11 items-center">
        <CompanyLogo company={company} />
      </span>
    )}
  </li>
);

export const Companies = React.memo(() => (
  <section
    aria-labelledby={COMPANIES_HEADING_ID}
    className="relative z-10 w-full shrink-0 pb-6 sm:pb-8"
  >
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
      <div className="flex flex-col gap-1 rounded-3xl border border-white/12 bg-black/60 px-5 py-2 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-10 sm:px-8 sm:py-3">
        <h2
          id={COMPANIES_HEADING_ID}
          className="shrink-0 text-xs text-white/60 sm:text-sm"
        >
          Shipped at
        </h2>
        <ul className="flex flex-1 items-center justify-between gap-3">
          {COMPANIES.map((company) => (
            <CompanyItem key={company.name} company={company} />
          ))}
        </ul>
      </div>
    </div>
  </section>
));

Companies.displayName = "Companies";
