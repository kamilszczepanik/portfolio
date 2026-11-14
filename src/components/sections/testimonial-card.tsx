"use client";

import { useRef } from "react";
import Image from "next/image";
import { PersonNameLink } from "@/components/ui/person-name-link";
import { useIsOverflowing } from "@/hooks/use-is-overflowing";
import { cn } from "@/lib/utils";
import { Person } from "@/types";

type TestimonialCardProps = {
  person: Person;
  onReadMore: (person: Person) => void;
  isDuplicate?: boolean;
};

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

export const TestimonialCard = ({
  person,
  onReadMore,
  isDuplicate = false,
}: TestimonialCardProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isClamped = useIsOverflowing(textRef);
  const isFocusable = !isDuplicate && !isClamped;

  return (
    <article
      aria-hidden={isDuplicate || undefined}
      inert={isDuplicate}
      aria-label={`Review from ${person.name}`}
      tabIndex={isFocusable ? 0 : undefined}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-950/85 p-5 shadow-xl backdrop-blur-sm sm:p-6",
        FOCUS_RING,
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={person.image}
          width={48}
          height={48}
          alt=""
          sizes="48px"
          placeholder={typeof person.image !== "string" ? "blur" : undefined}
          className="size-12 shrink-0 rounded-full border-2 border-white/80 object-cover object-top"
        />
        <div className="min-w-0">
          <PersonNameLink
            name={person.name}
            link={person.link}
            className={cn(
              "flex items-center gap-1.5 rounded-sm font-semibold text-white hover:underline",
              FOCUS_RING,
            )}
            iconClassName="size-3.5 shrink-0"
          />
          <p className="text-sm text-neutral-400">{person.designation}</p>
        </div>
      </div>
      <div
        ref={textRef}
        className={cn(
          "mt-4 max-h-[6lh] overflow-hidden text-[15px] leading-relaxed text-neutral-200",
          isClamped &&
            "mask-[linear-gradient(to_bottom,black_55%,transparent)]",
        )}
      >
        {person.description}
      </div>
      {isClamped && (
        <button
          type="button"
          onClick={() => onReadMore(person)}
          className={cn(
            "mt-3 cursor-pointer self-start rounded-sm text-sm font-medium text-sky-400 hover:underline",
            FOCUS_RING,
          )}
        >
          Read more
          <span className="sr-only">{` from ${person.name}`}</span>
        </button>
      )}
    </article>
  );
};
