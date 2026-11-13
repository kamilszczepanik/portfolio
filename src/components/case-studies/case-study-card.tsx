import Link from "next/link";
import { CaseStudy } from "@/types";
import { MetricRow } from "./metric-row";
import { StatusBadge } from "./status-badge";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => (
  <article className="relative flex w-full flex-col gap-4 rounded-2xl border border-white/15 bg-black/60 p-5 backdrop-blur-sm transition-colors focus-within:border-primary hover:border-primary/60 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-primary sm:p-6">
    <div className="flex flex-col gap-3">
      <StatusBadge status={caseStudy.status} />
      <h3 className="text-xl font-semibold text-white sm:text-2xl">
        <Link
          href={`/work/${caseStudy.slug}`}
          className="outline-none after:absolute after:inset-0 after:rounded-2xl"
        >
          {caseStudy.title}
        </Link>
      </h3>
    </div>
    <p className="text-sm leading-relaxed text-neutral-200 sm:text-base">
      {caseStudy.hook}
    </p>
    <MetricRow
      metrics={caseStudy.metrics.slice(0, 2)}
      className="mt-auto sm:grid-cols-1"
    />
    <span aria-hidden="true" className="text-sm font-semibold text-primary">
      Read the case study →
    </span>
  </article>
);
