"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { PEOPLE } from "@/constants";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useMotionPreference } from "@/components/motion/motion-preference";
import { cn } from "@/lib/utils";
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

const TestimonialRows = ({
  onReadMore,
  isPaused,
}: TestimonialsSectionProps & { isPaused: boolean }) => (
  <div className="mt-8 flex flex-col gap-5">
    {TESTIMONIAL_ROWS.map(({ people, direction }, rowIndex) => (
      <InfiniteMovingCards
        key={direction}
        label={`Testimonials, row ${rowIndex + 1}`}
        direction={direction}
        speed="slow"
        isPaused={isPaused}
        listClassName="py-1 [--marquee-gap:1.25rem]"
      >
        {({ isDuplicate }) =>
          people.map((person) => (
            <li
              key={person.id}
              aria-hidden={isDuplicate || undefined}
              inert={isDuplicate}
              className={cn(
                "w-[290px] shrink-0 sm:w-[380px]",
                isDuplicate && "motion-reduce:hidden",
              )}
            >
              <TestimonialCard person={person} onReadMore={onReadMore} />
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
  const [isPaused, setIsPaused] = useState(false);
  const { isPaused: isMotionPaused } = useMotionPreference();
  const Icon = isPaused ? Play : Pause;

  return (
    <section
      id="testimonials"
      aria-labelledby={TESTIMONIALS_HEADING_ID}
      className="relative isolate overflow-hidden py-16 sm:py-24"
    >
      <GridGlowBackdrop side="left" fadeEdges={["bottom"]} />
      <div className={SECTION_CONTAINER}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id={TESTIMONIALS_HEADING_ID} className={SECTION_HEADING}>
            Testimonials
          </h2>
          <button
            type="button"
            onClick={() => setIsPaused((current) => !current)}
            aria-pressed={isPaused}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:hidden"
          >
            <Icon aria-hidden className="size-4" />
            Pause scrolling
            <span className="sr-only"> testimonials</span>
          </button>
        </div>
        <TestimonialRows
          onReadMore={onReadMore}
          isPaused={isPaused || isMotionPaused}
        />
      </div>
    </section>
  );
};
