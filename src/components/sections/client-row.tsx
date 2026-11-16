"use client";

import {
  motion,
  stagger,
  useReducedMotionConfig,
  Variants,
} from "motion/react";
import { useId, useRef } from "react";
import { useScrollEdges } from "@/hooks/use-scroll-edges";
import { ExperienceClients } from "@/types";
import { ClientChip } from "./client-chip";

type ClientRowProps = {
  company: string;
  clients: ExperienceClients;
};

const FADE_PX = 32;

const LIST_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(0.08) } },
};

const CHIP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const edgeMask = (hasMoreStart: boolean, hasMoreEnd: boolean) =>
  `linear-gradient(to right, ${hasMoreStart ? "transparent" : "black"}, black ${FADE_PX}px, black calc(100% - ${FADE_PX}px), ${hasMoreEnd ? "transparent" : "black"})`;

export const ClientRow = ({ company, clients }: ClientRowProps) => {
  const captionId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { hasMoreStart, hasMoreEnd } = useScrollEdges(scrollRef);
  const isStill = useReducedMotionConfig() ?? false;
  const mask = edgeMask(hasMoreStart, hasMoreEnd);

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
        <motion.ul
          aria-labelledby={captionId}
          className="flex w-max gap-2"
          {...(isStill
            ? {}
            : {
                variants: LIST_VARIANTS,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, amount: 0.3 },
              })}
        >
          {clients.items.map((client) => (
            <ClientChip
              key={client.name}
              client={client}
              variants={isStill ? undefined : CHIP_VARIANTS}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
};
