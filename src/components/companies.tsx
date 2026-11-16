"use client";

import { COMPANIES } from "@/constants";
import {
  COMPANIES_STRIP_ID,
  COMPANY_PREVIEW_SIZE,
} from "@/constants/companies";
import { Company } from "@/types";
import Image from "next/image";
import { LinkPreview } from "./ui/link-preview";
import { SECTION_CONTAINER } from "./sections/section-styles";
import { NEW_TAB_TEXT } from "./ui/new-tab-hint";
import React from "react";

const COMPANIES_HEADING_ID = "companies-heading";

const CompanyLogo = ({ company }: { company: Company }) => (
  <Image
    src={company.image}
    alt={`${company.name} logo`}
    width={160}
    height={64}
    unoptimized={typeof company.image === "string"}
    sizes="(max-width: 640px) 160px, 260px"
    className="h-6 w-auto max-w-full lg:h-8"
  />
);

const CompanyItem = ({ company }: { company: Company }) => (
  <li className="flex min-w-0 items-center justify-center sm:shrink-0">
    {company.link ? (
      <LinkPreview
        url={company.link}
        imageSrc={company.previewImage}
        {...COMPANY_PREVIEW_SIZE}
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
    className="relative z-10 w-full shrink-0 pb-10 lg:pb-12"
  >
    <div className={SECTION_CONTAINER}>
      <div
        id={COMPANIES_STRIP_ID}
        className="py-2 sm:py-3"
      >
        <h2 id={COMPANIES_HEADING_ID} className="sr-only">
          Shipped at
        </h2>
        <ul className="grid grid-cols-2 items-center gap-x-4 gap-y-2 sm:flex sm:justify-between sm:gap-6">
          {COMPANIES.map((company) => (
            <CompanyItem key={company.name} company={company} />
          ))}
        </ul>
      </div>
    </div>
  </section>
));

Companies.displayName = "Companies";
