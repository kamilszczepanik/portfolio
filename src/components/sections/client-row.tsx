"use client";

import {
  stagger,
  useAnimate,
  useInView,
  useReducedMotionConfig,
} from "motion/react";
import { useEffect, useId, useRef } from "react";
import { useScrollEdges } from "@/hooks/use-scroll-edges";
import { ExperienceClients } from "@/types";
import { ClientChip } from "./client-chip";

type ClientRowProps = {
  company: string;
  clients: ExperienceClients;
};

const FADE_PX = 32;
const CHIP_SELECTOR = "li";
const CHIP_HIDDEN = { opacity: 0, y: 8 };
const CHIP_SHOWN = { opacity: 1, y: 0 };

const edgeMask = (hasMoreStart: boolean, hasMoreEnd: boolean) =>
  `linear-gradient(to right, ${hasMoreStart ? "transparent" : "black"}, black ${FADE_PX}px, black calc(100% - ${FADE_PX}px), ${hasMoreEnd ? "transparent" : "black"})`;

export const ClientRow = ({ company, clients }: ClientRowProps) => {
  const captionId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [listRef, animate] = useAnimate<HTMLUListElement>();
  const { hasMoreStart, hasMoreEnd } = useScrollEdges(scrollRef);
  const isInView = useInView(scrollRef, { once: true, amount: 0.3 });
  const isStill = useReducedMotionConfig() ?? false;
  const mask = edgeMask(hasMoreStart, hasMoreEnd);

  useEffect(() => {
    if (isStill) {
      animate(CHIP_SELECTOR, CHIP_SHOWN, { duration: 0 });
      return;
    }
    if (isInView) {
      animate(CHIP_SELECTOR, CHIP_SHOWN, {
        duration: 0.4,
        delay: stagger(0.08),
      });
      return;
    }
    animate(CHIP_SELECTOR, CHIP_HIDDEN, { duration: 0 });
  }, [animate, isInView, isStill]);

  return (
    <div className="border-t border-dashed border-white/12 pt-4">
      <p id={captionId} className="text-xs text-white/65 sm:text-sm">
        {clients.lead}{" "}
        <strong className="font-semibold text-white">{company}</strong>{" "}
        {clients.trail}
      </p>
      <div
        ref={scrollRef}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className="-mx-1 mt-2 overflow-x-auto overscroll-x-contain p-1 [scrollbar-color:rgb(255_255_255/0.2)_transparent] [scrollbar-width:thin]"
      >
        <ul
          ref={listRef}
          aria-labelledby={captionId}
          className="flex w-max gap-2"
        >
          {clients.items.map((client) => (
            <ClientChip key={client.name} client={client} />
          ))}
        </ul>
      </div>
    </div>
  );
};
