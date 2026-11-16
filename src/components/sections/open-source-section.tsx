import { ArrowRight, Github } from "lucide-react";
import { OPEN_SOURCE_PROJECTS } from "@/constants";
import { CtaButton, ctaVariants } from "@/components/ui/cta-button";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { SwipeCards } from "@/components/ui/swipe-cards";
import { cn } from "@/lib/utils";
import { OpenSourceProject } from "@/types";
import { PROJECT_CARD_LINK_CLASS, ProjectCard } from "./project-card";
import { ProjectBadges } from "./project-badges";
import {
  SECTION_CONTAINER,
  SECTION_HEADING,
  SECTION_SPACING,
} from "./section-styles";

const OPEN_SOURCE_HEADING_ID = "open-source-heading";

const OpenSourceCard = ({ project }: { project: OpenSourceProject }) => (
  <ProjectCard
    project={project}
    imageSizes="(min-width: 768px) 560px, 100vw"
    link={
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={PROJECT_CARD_LINK_CLASS}
      >
        <span className="sr-only">{`${project.name} on GitHub`}</span>
        <NewTabHint />
      </a>
    }
  >
    <ProjectBadges badges={project.badges} />
    <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
      <CtaButton
        href={`/work/${project.caseStudySlug}`}
        className="pointer-events-auto"
      >
        Case study
        <ArrowRight aria-hidden />
      </CtaButton>
      <span
        aria-hidden
        className={cn(
          ctaVariants({ variant: "secondary" }),
          "group-hover:bg-primary/15",
        )}
      >
        <Github />
        GitHub
      </span>
    </div>
  </ProjectCard>
);

export const OpenSourceSection = () => (
  <section
    id="open-source"
    aria-labelledby={OPEN_SOURCE_HEADING_ID}
    className={`relative isolate overflow-hidden ${SECTION_SPACING}`}
  >
    <div className={SECTION_CONTAINER}>
      <h2 id={OPEN_SOURCE_HEADING_ID} className={SECTION_HEADING}>
        Open source
      </h2>
      <SwipeCards
        items={OPEN_SOURCE_PROJECTS}
        getKey={(project) => project.name}
        label="Open source projects"
        className="mt-10 sm:mt-12"
        listClassName="md:grid md:grid-cols-2 md:gap-5"
        renderItem={({ item: project }) => <OpenSourceCard project={project} />}
      />
    </div>
  </section>
);
