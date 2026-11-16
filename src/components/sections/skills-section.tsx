"use client";

import { SKILL_GROUPS } from "@/constants";
import { useExpandHeightLock } from "@/hooks/use-expand-height-lock";
import { cn } from "@/lib/utils";
import { GridGlowBackdrop } from "./grid-glow-backdrop";
import {
  SECTION_CONTAINER,
  SECTION_HEADING,
  SECTION_SPACING,
} from "./section-styles";
import { SkillGroupCard } from "./skill-group-card";

const SKILLS_HEADING_ID = "skills-heading";

export const SkillsSection = () => {
  const { gridRef, expanded, lockedHeights, toggle } = useExpandHeightLock();

  return (
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
        <div
          ref={gridRef}
          className={cn(
            "mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4",
            lockedHeights && "items-start",
          )}
        >
          {SKILL_GROUPS.map((group, index) => (
            <SkillGroupCard
              key={group.label}
              group={group}
              isExpanded={expanded.has(index)}
              minHeight={lockedHeights?.[index]}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
