"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Person } from "@/types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useIsDesktop } from "@/hooks/use-is-desktop";

export const AnimatedTooltip = ({
  items,
  setActiveCard,
  cardId,
}: {
  items: Person[];
  setActiveCard: (item: Person) => void;
  cardId: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">(
    "top"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useIsDesktop();

  useEffect(() => {
    if (hoveredIndex !== null && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const tooltipHeight = window.innerWidth < 640 ? 100 : 120; // Smaller tooltip on mobile
      const bannerHeight = 60; // Account for top banner
      const spaceAbove = rect.top;

      // If there's not enough space above (less than tooltip height + banner + padding), show below
      setTooltipPosition(
        spaceAbove < tooltipHeight + bannerHeight + 20 ? "bottom" : "top"
      );
    }
  }, [hoveredIndex]);

  if (!isDesktop) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        {items.map((item) => (
          <div
            className="group relative -mr-3 sm:-mr-4 cursor-pointer"
            key={item.name}
            onClick={() => setActiveCard(item)}
          >
            <Image
              height={56}
              width={56}
              src={item.image}
              alt={item.name}
              className="relative m-0! h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full border-2 border-white object-cover object-top p-0! transition duration-500 group-hover:z-30 group-hover:scale-105"
              sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 56px"
              placeholder={typeof item.image !== "string" ? "blur" : undefined}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex items-center gap-1 sm:gap-2">
      {items.map((item) => (
        <motion.div
          layoutId={`card-${item.name}-${cardId}`}
          className="group relative -mr-3 sm:-mr-4"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: tooltipPosition === "top" ? 20 : -20,
                  scale: 0.6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: tooltipPosition === "top" ? 20 : -20,
                  scale: 0.6,
                }}
                className={`absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-2 sm:px-4 py-1.5 sm:py-2 text-xs shadow-xl ${
                  tooltipPosition === "top"
                    ? "-top-32 sm:-top-37"
                    : "-bottom-36 sm:-bottom-37"
                }`}
              >
                <div
                  className={`absolute inset-x-10 z-30 h-px w-[20%] bg-linear-to-r from-transparent via-emerald-500 to-transparent ${
                    tooltipPosition === "top" ? "-bottom-px" : "-top-px"
                  }`}
                />
                <div
                  className={`absolute left-10 z-30 h-px w-[40%] bg-linear-to-r from-transparent via-sky-500 to-transparent ${
                    tooltipPosition === "top" ? "-bottom-px" : "-top-px"
                  }`}
                />
                <motion.h3 layoutId={`title-${item.name}-${cardId}`}>
                  <Link
                    href={item.link}
                    target="_blank"
                    className="relative z-30 text-xs sm:text-sm font-semibold text-white text-center text-nowrap flex items-center gap-1 sm:gap-2"
                  >
                    {item.name}
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </motion.h3>
                <motion.div
                  layoutId={`description-${item.designation}-${cardId}`}
                  className="text-xs text-white/80 text-center mb-1 text-nowrap"
                >
                  {item.designation}
                </motion.div>
                <div className="text-xs text-white leading-relaxed text-center max-w-full pt-1">
                  <div>
                    <span className="line-clamp-3">{item.description}</span>
                    <button
                      onClick={() => setActiveCard(item)}
                      className="text-sky-500 hover:underline mt-1"
                    >
                      Read more
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div layoutId={`image-${item.name}-${cardId}`}>
            <Image
              height={56}
              width={56}
              src={item.image}
              alt={item.name}
              className="relative m-0! h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full border-2 border-white object-cover object-top p-0! transition duration-500 group-hover:z-30 group-hover:scale-105"
              sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 56px"
              placeholder={typeof item.image !== "string" ? "blur" : undefined}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
