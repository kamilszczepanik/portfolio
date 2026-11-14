"use client";

import { SKILL_BELTS } from "@/constants";
import { GridGlowBackdrop } from "./grid-glow-backdrop";
import { SECTION_CONTAINER, SECTION_HEADING } from "./section-styles";
import { SkillBeltRow } from "./skill-belt-row";

const SKILLS_HEADING_ID = "skills-heading";

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      aria-labelledby={SKILLS_HEADING_ID}
      className="relative isolate overflow-hidden py-16 sm:py-24"
    >
      <GridGlowBackdrop side="left" />
      <div className={SECTION_CONTAINER}>
        <h2 id={SKILLS_HEADING_ID} className={SECTION_HEADING}>
          What I work with
        </h2>
        <div className="mt-12 space-y-5">
          {SKILL_BELTS.map((belt) => (
            <SkillBeltRow key={belt.label} belt={belt} />
          ))}
        </div>
      </div>
    </section>
  );
};
