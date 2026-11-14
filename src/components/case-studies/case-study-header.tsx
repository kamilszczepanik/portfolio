import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { cn } from "@/lib/utils";
import { CaseStudy } from "@/types";
import { StatusBadge } from "./status-badge";

type CaseStudyHeaderProps = {
  caseStudy: CaseStudy;
};

export const CaseStudyHeader = ({ caseStudy }: CaseStudyHeaderProps) => (
  <header className="flex max-w-3xl flex-col gap-5">
    <Link
      href="/#work"
      className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-blue-300 transition-colors hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 motion-reduce:transition-none"
    >
      <span aria-hidden="true">←</span>
      All work
    </Link>
    <div className="flex items-center gap-4 sm:gap-5">
      <BrandLogo
        brand={caseStudy.brand}
        className="size-12 rounded-2xl sm:size-16"
      />
      <h1
        className={cn(
          "text-4xl text-balance text-white sm:text-6xl",
          caseStudy.brand.fontClassName,
        )}
      >
        {caseStudy.title}
      </h1>
    </div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <StatusBadge status={caseStudy.status} phase={caseStudy.phase} />
      <p className="text-sm text-neutral-400">
        {caseStudy.period} · {caseStudy.role}
      </p>
    </div>
    <p className="text-lg leading-relaxed text-neutral-200 sm:text-xl">
      {caseStudy.hook}
    </p>
    {caseStudy.links && caseStudy.links.length > 0 ? (
      <ul className="flex flex-wrap gap-3">
        {caseStudy.links.map((link) => (
          <li key={link.href}>
            <Button asChild variant="outline" size="lg" className="text-white">
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <Github aria-hidden="true" />
                {link.label}
                <NewTabHint />
              </a>
            </Button>
          </li>
        ))}
      </ul>
    ) : null}
  </header>
);
