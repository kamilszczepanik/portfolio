import { ErrorBoundary } from "react-error-boundary";
import { CASE_STUDIES } from "@/constants/case-studies";
import { CaseStudyCard } from "./case-study-card";

export const CaseStudyGrid = () => (
  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {CASE_STUDIES.map((caseStudy) => (
      <li key={caseStudy.slug} className="flex">
        <ErrorBoundary fallback={null}>
          <CaseStudyCard caseStudy={caseStudy} />
        </ErrorBoundary>
      </li>
    ))}
  </ul>
);
