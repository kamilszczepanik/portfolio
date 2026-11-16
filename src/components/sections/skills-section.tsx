"use client";

import { SKILL_GROUPS } from "@/constants";
import { SwipeCards } from "@/components/ui/swipe-cards";
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
        <SwipeCards
          items={SKILL_GROUPS}
          getKey={(group) => group.label}
          label="Skill groups"
          listRef={gridRef}
          className="mt-8 sm:mt-10"
          listClassName={cn(
            "md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4",
            lockedHeights && "items-start",
          )}
          renderItem={({ item: group, index }) => (
            <SkillGroupCard
              group={group}
              isExpanded={expanded.has(index)}
              minHeight={lockedHeights?.[index]}
              onToggle={() => toggle(index)}
            />
          )}
        />
      </div>
    </section>
  );
};
