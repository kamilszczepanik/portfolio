"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OPEN_SOURCE_PROJECTS, WORK_PROJECTS } from "@/constants";
import {
  PROJECT_CARD_LINK_CLASS,
  ProjectCard,
  ProjectCardContent,
} from "@/components/sections/project-card";
import { CASE_STUDY_HEADING } from "@/components/sections/section-styles";
import { CtaFace, ctaVariants } from "@/components/ui/cta-button";
import { SwipeCards } from "@/components/ui/swipe-cards";

type MoreProject = ProjectCardContent & {
  slug: string;
};

type MoreProjectsProps = {
  currentSlug: string;
};

const MORE_PROJECTS_HEADING_ID = "more-projects-heading";
const CASE_STUDY_PATH = "/work/";

const ALL_PROJECTS: MoreProject[] = [
  ...WORK_PROJECTS.filter(({ isExternal }) => !isExternal).map(
    ({ name, summary, brand, image, imageAlt, href }) => ({
      name,
      summary,
      brand,
      image,
      imageAlt,
      slug: href.slice(CASE_STUDY_PATH.length),
    }),
  ),
  ...OPEN_SOURCE_PROJECTS.map(
    ({ name, summary, brand, image, imageAlt, caseStudySlug }) => ({
      name,
      summary,
      brand,
      image,
      imageAlt,
      slug: caseStudySlug,
    }),
  ),
];

const MoreProjectCard = ({ project }: { project: MoreProject }) => (
  <ProjectCard
    project={project}
    imageSizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 85vw"
    isCompact
    link={
      <Link
        href={`${CASE_STUDY_PATH}${project.slug}`}
        className={PROJECT_CARD_LINK_CLASS}
      >
        <span className="sr-only">{`${project.name} case study`}</span>
      </Link>
    }
  >
    <div className="mt-auto pt-5">
      <span aria-hidden className={ctaVariants()}>
        <CtaFace>
          Case study
          <ArrowRight />
        </CtaFace>
      </span>
    </div>
  </ProjectCard>
);

export const MoreProjects = ({ currentSlug }: MoreProjectsProps) => {
  const projects = ALL_PROJECTS.filter(({ slug }) => slug !== currentSlug);

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
        getKey={(project) => project.slug}
        label="More projects"
        isScrollableOnDesktop
        renderItem={({ item: project }) => (
          <MoreProjectCard project={project} />
        )}
      />
    </section>
  );
};
