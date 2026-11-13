"use client";

import { COMPANIES } from "@/constants";
import { Company } from "@/types";
import Image from "next/image";
import { LinkPreview } from "./ui/link-preview";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { NEW_TAB_TEXT } from "./ui/new-tab-hint";
import React from "react";

const COMPANIES_HEADING_ID = "companies-heading";

const CompanyLogoTile = ({ company }: { company: Company }) => (
  <div className="flex items-center justify-center h-14 w-18 sm:h-14 sm:w-20 md:h-14 md:w-28 lg:h-20 lg:w-40 bg-white rounded-lg md:rounded-xl border border-gray-300 md:border-2 group-hover:border-primary transition-all duration-300">
    {"image" in company ? (
      <Image
        src={company.image}
        alt={`${company.name} logo`}
        width={90}
        height={45}
        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
        sizes="(max-width: 640px) 64px, (max-width: 1024px) 96px, 160px"
      />
    ) : (
      <span
        role="img"
        aria-label={`${company.name} logo`}
        className="text-lg md:text-2xl lg:text-3xl font-bold tracking-wide text-gray-500 group-hover:text-primary transition-colors duration-300"
      >
        {company.initials}
      </span>
    )}
  </div>
);

const CompanyItem = ({
  company,
  isDuplicate,
}: {
  company: Company;
  isDuplicate: boolean;
}) => (
  <li
    className={isDuplicate ? "shrink-0 motion-reduce:hidden" : "shrink-0"}
    aria-hidden={isDuplicate || undefined}
  >
    {company.link ? (
      <LinkPreview
        url={company.link}
        imageSrc={company.previewImage}
        isStatic
        target="_blank"
        tabIndex={isDuplicate ? -1 : undefined}
        ariaLabel={`${company.name} website, ${NEW_TAB_TEXT}`}
        className="group block transition-transform duration-300 hover:scale-105"
      >
        <CompanyLogoTile company={company} />
      </LinkPreview>
    ) : (
      <div className="group block transition-transform duration-300 hover:scale-105">
        <CompanyLogoTile company={company} />
      </div>
    )}
  </li>
);

export const Companies = React.memo(() => {
  return (
    <section
      aria-labelledby={COMPANIES_HEADING_ID}
      className="relative w-full bg-transparent z-40 shrink-0"
    >
      <div className="pb-2 sm:pb-3 px-2 sm:px-4">
        <h2
          id={COMPANIES_HEADING_ID}
          className="text-sm sm:text-base md:text-xl text-foreground mb-1 sm:mb-1 md:mb-2 text-center"
        >
          Trusted by Innovative Startups Worldwide
        </h2>
        <div className="max-w-7xl mx-auto">
          <InfiniteMovingCards
            label="company logos"
            listClassName="gap-4 md:gap-6 lg:gap-8 py-1"
          >
            {({ isDuplicate }) =>
              COMPANIES.map((company) => (
                <CompanyItem
                  key={company.name}
                  company={company}
                  isDuplicate={isDuplicate}
                />
              ))
            }
          </InfiniteMovingCards>
        </div>
      </div>
    </section>
  );
});

Companies.displayName = "Companies";
