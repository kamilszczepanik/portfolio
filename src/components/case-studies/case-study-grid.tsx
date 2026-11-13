import { CASE_STUDIES } from "@/constants/case-studies";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { CaseStudyCard } from "./case-study-card";

export const CaseStudyGrid = () => (
  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {CASE_STUDIES.map((caseStudy) => (
      <li key={caseStudy.slug} className="flex">
        <SectionErrorBoundary name={`Case study card "${caseStudy.slug}"`}>
          <CaseStudyCard caseStudy={caseStudy} />
        </SectionErrorBoundary>
      </li>
    ))}
  </ul>
);
