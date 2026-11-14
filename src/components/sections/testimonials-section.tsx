"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { PEOPLE } from "@/constants";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Person } from "@/types";
import { GridGlowBackdrop } from "./grid-glow-backdrop";
import { SECTION_CONTAINER, SECTION_HEADING } from "./section-styles";
import { TestimonialCard } from "./testimonial-card";

type TestimonialsSectionProps = {
  onReadMore: (person: Person) => void;
};

type TestimonialRow = {
  people: Person[];
  direction: "left" | "right";
};

const TESTIMONIALS_HEADING_ID = "testimonials-heading";

const TESTIMONIAL_ROWS: TestimonialRow[] = [
  {
    people: PEOPLE.filter((_, index) => index % 2 === 0),
    direction: "left",
  },
  {
    people: PEOPLE.filter((_, index) => index % 2 === 1),
    direction: "right",
  },
];

const StaticTestimonials = ({ onReadMore }: TestimonialsSectionProps) => (
  <ul className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
    {PEOPLE.map((person) => (
      <li key={person.id}>
        <TestimonialCard person={person} onReadMore={onReadMore} />
      </li>
    ))}
  </ul>
);

const MovingTestimonials = ({ onReadMore }: TestimonialsSectionProps) => (
  <div className="mt-10 flex flex-col gap-5 sm:mt-12">
    {TESTIMONIAL_ROWS.map(({ people, direction }, rowIndex) => (
      <InfiniteMovingCards
        key={direction}
        label={`testimonials, row ${rowIndex + 1}`}
        direction={direction}
        speed="slow"
        listClassName="py-1 [--marquee-gap:1.25rem]"
      >
        {({ isDuplicate }) =>
          people.map((person) => (
            <li key={person.id} className="w-[290px] shrink-0 sm:w-[380px]">
              <TestimonialCard
                person={person}
                onReadMore={onReadMore}
                isDuplicate={isDuplicate}
              />
            </li>
          ))
        }
      </InfiniteMovingCards>
    ))}
  </div>
);

export const TestimonialsSection = ({
  onReadMore,
}: TestimonialsSectionProps) => {
  const prefersStill = useReducedMotion() ?? false;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isStill = isMounted && prefersStill;

  return (
    <section
      id="testimonials"
      aria-labelledby={TESTIMONIALS_HEADING_ID}
      className="relative isolate overflow-hidden py-16 sm:py-24"
    >
      <GridGlowBackdrop side="left" fadeEdges={["bottom"]} />
      <div className={SECTION_CONTAINER}>
        <h2 id={TESTIMONIALS_HEADING_ID} className={SECTION_HEADING}>
          Testimonials
        </h2>
        {isStill ? (
          <StaticTestimonials onReadMore={onReadMore} />
        ) : (
          <MovingTestimonials onReadMore={onReadMore} />
        )}
      </div>
    </section>
  );
};
