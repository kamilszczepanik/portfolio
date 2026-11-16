import { BrandLogo } from "@/components/ui/brand-logo";
import { CtaButton } from "@/components/ui/cta-button";
import { HEADING_FONT } from "@/components/sections/section-styles";
import { CaseStudy } from "@/types";
import { StatusBadge } from "./status-badge";

type CaseStudyHeaderProps = {
  caseStudy: CaseStudy;
};

export const CaseStudyHeader = ({ caseStudy }: CaseStudyHeaderProps) => (
  <header className="flex max-w-3xl flex-col gap-3 sm:gap-4">
    <div className="flex items-center gap-4 sm:gap-5">
      <BrandLogo
        brand={caseStudy.brand}
        className="size-12 shrink-0 rounded-2xl sm:size-16"
      />
      <h1
        className={`${HEADING_FONT} min-w-0 text-[clamp(1.75rem,7vw,2.25rem)] text-balance break-words hyphens-auto text-white sm:text-5xl`}
      >
        {caseStudy.title}
      </h1>
    </div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <StatusBadge status={caseStudy.status} phase={caseStudy.phase} />
      <p className="line-clamp-2 min-w-[min(100%,18rem)] flex-1 text-sm text-pretty text-neutral-400">
        {caseStudy.period} · {caseStudy.role}
      </p>
    </div>
    <p className="text-lg leading-snug text-neutral-200 sm:text-xl">
      {caseStudy.hook}
    </p>
    {caseStudy.links && caseStudy.links.length > 0 ? (
      <ul className="mt-1 flex flex-wrap gap-3">
        {caseStudy.links.map(({ href, label, icon: Icon }, index) => (
          <li key={href} className="flex">
            <CtaButton
              href={href}
              variant={index === 0 ? "primary" : "secondary"}
              isExternal
            >
              <Icon aria-hidden="true" />
              {label}
            </CtaButton>
          </li>
        ))}
      </ul>
    ) : null}
  </header>
);
