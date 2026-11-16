"use client";

import { SKILL_GROUPS } from "@/constants";
import { GridGlowBackdrop } from "./grid-glow-backdrop";
import {
  SECTION_CONTAINER,
  SECTION_HEADING,
  SECTION_SPACING,
} from "./section-styles";
import { SkillGroupCard } from "./skill-group-card";

const SKILLS_HEADING_ID = "skills-heading";

export const SkillsSection = () => (
  <section
    id="skills"
    aria-labelledby={SKILLS_HEADING_ID}
    className={`relative isolate overflow-hidden ${SECTION_SPACING}`}
  >
    <GridGlowBackdrop side="left" fadeEdges={["top"]} />
    <div className={SECTION_CONTAINER}>
      <h2 id={SKILLS_HEADING_ID} className={SECTION_HEADING}>
        What I work with
      </h2>
      <div className="mt-12 grid items-start gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {SKILL_GROUPS.map((group) => (
          <SkillGroupCard key={group.label} group={group} />
        ))}
      </div>
    </div>
  </section>
);
