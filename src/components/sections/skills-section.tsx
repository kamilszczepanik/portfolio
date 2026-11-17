"use client";

import { useState } from "react";
import { SKILL_GROUPS } from "@/constants";
import { SwipeCards } from "@/components/ui/swipe-cards";
import {
  SECTION_CONTAINER,
  SECTION_HEADING,
  SECTION_SPACING,
} from "./section-styles";
import { SkillGroupCard } from "./skill-group-card";

const SKILLS_HEADING_ID = "skills-heading";

export const SkillsSection = () => {
  const [expanded, setExpanded] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  const toggle = (index: number) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });

  return (
    <section
      id="skills"
      aria-labelledby={SKILLS_HEADING_ID}
      className={`relative isolate overflow-hidden ${SECTION_SPACING}`}
    >
      <div className={SECTION_CONTAINER}>
        <h2 id={SKILLS_HEADING_ID} className={SECTION_HEADING}>
          What I work with
        </h2>
        <SwipeCards
          items={SKILL_GROUPS}
          getKey={(group) => group.label}
          label="Skill groups"
          className="mt-8 sm:mt-10"
          listClassName="group/skills has-[[data-skill-toggle]]:items-start md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4"
          itemClassName="max-md:w-[76%]"
          renderItem={({ item: group, index }) => (
            <SkillGroupCard
              group={group}
              isExpanded={expanded.has(index)}
              onToggle={() => toggle(index)}
            />
          )}
        />
      </div>
    </section>
  );
};
