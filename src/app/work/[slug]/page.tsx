import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/ui/cta-button";
import { BadgeRow } from "@/components/case-studies/badge-row";
import { CaseStudyHeader } from "@/components/case-studies/case-study-header";
import { CaseStudySiteHeader } from "@/components/case-studies/case-study-site-header";
import { CaseStudySection } from "@/components/case-studies/case-study-section";
import { MoreProjects } from "@/components/case-studies/more-projects";
import { CASE_STUDY_HEADING } from "@/components/sections/section-styles";
import { ScreenshotGallery } from "@/components/case-studies/screenshot-gallery";
import { HorizonArc } from "@/components/backgrounds/horizon-arc";
import { SkyBackdrop } from "@/components/backgrounds/sky-backdrop";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { CONTACT_INFO, RESUME } from "@/constants/contact";
import { CASE_STUDIES, findCaseStudy } from "@/constants/case-studies";
import { brandStyle } from "@/lib/brand-style";

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
    <div
      style={brandStyle(caseStudy.brand)}
      className="relative isolate min-h-screen overflow-x-clip bg-black"
    >
      <SectionErrorBoundary name="Site header">
        <CaseStudySiteHeader />
      </SectionErrorBoundary>
      <SkyBackdrop>
        <main className="px-4 pt-6 sm:px-6 sm:pt-8">
          <article className="mx-auto flex max-w-5xl flex-col gap-5 sm:gap-7">
            <SectionErrorBoundary
              name={`Case study header "${caseStudy.slug}"`}
            >
              <CaseStudyHeader caseStudy={caseStudy} />
            </SectionErrorBoundary>

            <SectionErrorBoundary
              name={`Case study screenshots "${caseStudy.slug}"`}
            >
              <ScreenshotGallery screenshots={caseStudy.screenshots} />
            </SectionErrorBoundary>

            <div className="flex max-w-3xl flex-col gap-8">
              {caseStudy.sections.map((section) => (
                <SectionErrorBoundary
                  key={section.id}
                  name={`Case study section "${caseStudy.slug}#${section.id}"`}
                >
                  <CaseStudySection section={section} />
                </SectionErrorBoundary>
              ))}

              <SectionErrorBoundary
                name={`Case study stack "${caseStudy.slug}"`}
              >
                <section id="stack" className="flex flex-col gap-4">
                  <h2 className={CASE_STUDY_HEADING}>Stack</h2>
                  <BadgeRow label="Technologies">
                    {caseStudy.stack.map((tech) => (
                      <li key={tech} className="flex shrink-0">
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </BadgeRow>
                </section>
              </SectionErrorBoundary>
            </div>

            <SectionErrorBoundary name={`More projects "${caseStudy.slug}"`}>
              <MoreProjects currentSlug={caseStudy.slug} />
            </SectionErrorBoundary>

            <footer className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
              <CtaButton
                href={RESUME.href}
                variant="secondary"
                aria-label={`${RESUME.label} (PDF, opens in a new tab)`}
                isExternal
              >
                <FileText aria-hidden="true" />
                {RESUME.label}
              </CtaButton>
              <CtaButton href={`mailto:${CONTACT_INFO.email}`}>
                <Mail aria-hidden="true" />
                Get in touch
              </CtaButton>
            </footer>
          </article>
        </main>
        <div className="relative isolate h-48 overflow-hidden sm:h-64">
          <HorizonArc />
        </div>
      </SkyBackdrop>
    </div>
  );
};

export default CaseStudyPage;
