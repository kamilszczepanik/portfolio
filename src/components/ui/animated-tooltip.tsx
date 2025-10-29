"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Person } from "@/types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

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

  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <motion.div
          layoutId={`card-${item.name}-${cardId}`}
          className="group relative -mr-4"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
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
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="absolute -top-37 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <motion.h3 layoutId={`title-${item.name}-${cardId}`}>
                  <Link
                    href={item.link}
                    target="_blank"
                    className="relative z-30 text-sm font-semibold text-white text-center text-nowrap flex items-center gap-2"
                  >
                    {item.name}
                    <ExternalLink className="w-4 h-4" />
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
                    <p className="line-clamp-3">{item.description}</p>
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
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
