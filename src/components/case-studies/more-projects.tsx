"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OPEN_SOURCE_PROJECTS, WORK_PROJECTS } from "@/constants";
import { CASE_STUDY_HEADING } from "@/components/sections/section-styles";
import { BrandLogo } from "@/components/ui/brand-logo";
import { CtaFace, ctaVariants } from "@/components/ui/cta-button";
import { SwipeCards } from "@/components/ui/swipe-cards";
import { brandStyle } from "@/lib/brand-style";
import { cn } from "@/lib/utils";
import { ProjectBrand } from "@/types";

type MoreProject = {
  name: string;
  summary: string;
  brand: ProjectBrand;
  image: StaticImageData;
  imageAlt: string;
  href: string;
};

type MoreProjectsProps = {
  currentSlug: string;
};

const MORE_PROJECTS_HEADING_ID = "more-projects-heading";

const ALL_PROJECTS: MoreProject[] = [
  ...WORK_PROJECTS.map(({ name, summary, brand, image, imageAlt, href }) => ({
    name,
    summary,
    brand,
    image,
    imageAlt,
    href,
  })),
  ...OPEN_SOURCE_PROJECTS.map(
    ({ name, summary, brand, image, imageAlt, caseStudySlug }) => ({
      name,
      summary,
      brand,
      image,
      imageAlt,
      href: `/work/${caseStudySlug}`,
    }),
  ),
];

const MoreProjectCard = ({ project }: { project: MoreProject }) => (
  <article
    style={brandStyle(project.brand)}
    className="group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#070707] p-5 transition duration-500 hover:-translate-y-1 hover:border-(color:--brand)/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
  >
    <span
      aria-hidden
      className="absolute -top-24 left-1/2 -z-10 size-72 -translate-x-1/2 rounded-full bg-(color:--brand)/20 blur-3xl"
    />
    <span className="relative block h-[180px] shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-[200px]">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(min-width: 1024px) 330px, (min-width: 768px) 50vw, 85vw"
        placeholder="blur"
        className="object-cover object-left"
      />
    </span>
    <Link
      href={project.href}
      className="absolute inset-0 z-10 rounded-[28px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-500"
    >
      <span className="sr-only">{`${project.name} case study`}</span>
    </Link>
    <div className="pointer-events-none relative z-20 mt-5 flex flex-1 flex-col">
      <h3 className="flex items-center gap-3">
        <BrandLogo brand={project.brand} className="size-9 rounded-lg" />
        <span className={cn("text-xl text-white", project.brand.fontClassName)}>
          {project.name}
        </span>
      </h3>
      <p className="mt-2 text-neutral-300">{project.summary}</p>
      <div className="mt-auto pt-5">
        <span aria-hidden className={ctaVariants()}>
          <CtaFace>
            Case study
            <ArrowRight />
          </CtaFace>
        </span>
      </div>
    </div>
  </article>
);

export const MoreProjects = ({ currentSlug }: MoreProjectsProps) => {
  const projects = ALL_PROJECTS.filter(
    ({ href }) => href !== `/work/${currentSlug}`,
  );

  return (
    <section
      aria-labelledby={MORE_PROJECTS_HEADING_ID}
      className="flex flex-col gap-6"
    >
      <h2 id={MORE_PROJECTS_HEADING_ID} className={CASE_STUDY_HEADING}>
        More projects
      </h2>
      <SwipeCards
        items={projects}
        getKey={(project) => project.href}
        label="More projects"
        listClassName="md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3"
        renderItem={({ item: project }) => (
          <MoreProjectCard project={project} />
        )}
      />
    </section>
  );
};
