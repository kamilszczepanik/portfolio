import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudyHeader } from "@/components/case-studies/case-study-header";
import {
  CASE_STUDY_HEADING,
  CaseStudySection,
} from "@/components/case-studies/case-study-section";
import { ScreenshotGallery } from "@/components/case-studies/screenshot-gallery";
import { GridGlowBackdrop } from "@/components/sections/grid-glow-backdrop";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { CONTACT_INFO } from "@/constants/contact";
import { CASE_STUDIES, findCaseStudy } from "@/constants/case-studies";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

const PREVIEW_IMAGE = "/images/projects/portfolio-preview.jpg";

export const dynamicParams = false;

export const generateStaticParams = () =>
  CASE_STUDIES.map(({ slug }) => ({ slug }));

export const generateMetadata = async ({
  params,
}: CaseStudyPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const caseStudy = findCaseStudy(slug);

  if (!caseStudy) {
    return {};
  }

  const title = `${caseStudy.title} | Kamil Szczepanik`;
  const path = `/work/${caseStudy.slug}`;

  return {
    title: { absolute: title },
    description: caseStudy.hook,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description: caseStudy.hook,
      siteName: "Kamil Szczepanik Portfolio",
      images: [{ url: PREVIEW_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: caseStudy.hook,
      images: [{ url: PREVIEW_IMAGE, alt: title }],
    },
  };
};

const CaseStudyPage = async ({ params }: CaseStudyPageProps) => {
  const { slug } = await params;
  const caseStudy = findCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-black">
      <div aria-hidden className="fixed inset-0 -z-10">
        <SectionErrorBoundary name="Case study background" className="hidden">
          <GridGlowBackdrop side="right" />
        </SectionErrorBoundary>
      </div>
      <main className="px-4 py-10 sm:px-6 sm:py-16">
        <article className="mx-auto flex max-w-5xl flex-col gap-12 sm:gap-16">
          <SectionErrorBoundary name={`Case study header "${caseStudy.slug}"`}>
            <CaseStudyHeader caseStudy={caseStudy} />
          </SectionErrorBoundary>

          <SectionErrorBoundary
            name={`Case study screenshots "${caseStudy.slug}"`}
          >
            <ScreenshotGallery screenshots={caseStudy.screenshots} />
          </SectionErrorBoundary>

          <div className="flex max-w-3xl flex-col gap-12">
            {caseStudy.sections.map((section) => (
              <SectionErrorBoundary
                key={section.id}
                name={`Case study section "${caseStudy.slug}#${section.id}"`}
              >
                <CaseStudySection section={section} />
              </SectionErrorBoundary>
            ))}

            <SectionErrorBoundary name={`Case study stack "${caseStudy.slug}"`}>
              <section id="stack" className="flex flex-col gap-4">
                <h2 className={CASE_STUDY_HEADING}>Stack</h2>
                <ul className="flex flex-wrap gap-2">
                  {caseStudy.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
            </SectionErrorBoundary>
          </div>

          <footer className="flex flex-col-reverse gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-end">
            <Button asChild variant="outline" size="lg" className="text-white">
              <a
                href="/resume/ResumeKamilSzczepanik.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText aria-hidden="true" />
                View my CV
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </Button>
            <Button
              asChild
              variant="gradient"
              size="lg"
              className="rounded-full"
            >
              <a href={`mailto:${CONTACT_INFO.email}`}>
                <Mail aria-hidden="true" />
                Get in touch
              </a>
            </Button>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default CaseStudyPage;
