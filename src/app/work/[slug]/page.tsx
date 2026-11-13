import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudySection } from "@/components/case-studies/case-study-section";
import { MetricRow } from "@/components/case-studies/metric-row";
import { StatusBadge } from "@/components/case-studies/status-badge";
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
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-16">
      <article className="mx-auto flex max-w-3xl flex-col gap-10">
        <SectionErrorBoundary name={`Case study header "${caseStudy.slug}"`}>
          <header className="flex flex-col gap-4">
            <Link
              href="/#work"
              className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <span aria-hidden="true">←</span>
              All work
            </Link>
            <h1 className="text-3xl font-bold text-balance text-white sm:text-4xl md:text-5xl">
              {caseStudy.title}
            </h1>
            <StatusBadge status={caseStudy.status} />
            <p className="text-sm text-neutral-300">
              {caseStudy.period} · {caseStudy.role}
            </p>
            <p className="text-lg leading-relaxed text-neutral-100">
              {caseStudy.hook}
            </p>
          </header>
        </SectionErrorBoundary>

        <SectionErrorBoundary name={`Case study metrics "${caseStudy.slug}"`}>
          <MetricRow metrics={caseStudy.metrics} />
        </SectionErrorBoundary>

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
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Stack
            </h2>
            <ul className="flex flex-wrap gap-1.5">
              {caseStudy.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-blue-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </SectionErrorBoundary>

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
          <Button asChild variant="gradient" size="lg" className="rounded-full">
            <a href={`mailto:${CONTACT_INFO.email}`}>
              <Mail aria-hidden="true" />
              Get in touch
            </a>
          </Button>
        </footer>
      </article>
    </main>
  );
};

export default CaseStudyPage;
