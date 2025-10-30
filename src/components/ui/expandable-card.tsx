"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Person } from "@/types";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface ExpandableCardProps {
  activeCard: Person | null;
  setActiveCard: (card: Person | null) => void;
  cardId: string;
  people?: Person[];
}

export function ExpandableCard({
  activeCard,
  setActiveCard,
  cardId,
  people,
}: ExpandableCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (!activeCard || !people) return;
    const currentIndex = people.findIndex((p) => p.id === activeCard.id);
    const nextIndex = (currentIndex + 1) % people.length;
    setActiveCard(people[nextIndex]);
  }, [activeCard, people, setActiveCard]);

  const handlePrev = useCallback(() => {
    if (!activeCard || !people) return;
    const currentIndex = people.findIndex((p) => p.id === activeCard.id);
    const prevIndex = (currentIndex - 1 + people.length) % people.length;
    setActiveCard(people[prevIndex]);
  }, [activeCard, people, setActiveCard]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveCard(null);
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      }
    }

    if (activeCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCard, setActiveCard, handleNext, handlePrev]);

  useOutsideClick(ref, () => setActiveCard(null));

  return (
    <>
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 h-full w-full z-100"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeCard ? (
          <div className="fixed inset-0 grid place-items-center z-1000">
            <div className="relative" ref={ref}>
              {people && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
                    aria-label="Previous review"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
                    aria-label="Next review"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.button>
                </>
              )}
              <motion.div
                layoutId={`card-${activeCard.name}-${cardId}`}
                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-background sm:rounded-3xl overflow-hidden relative"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9, rotate: -90 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCard(null);
                  }}
                  className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6 text-white" />
                </motion.button>
                <motion.div layoutId={`image-${activeCard.name}-${cardId}`}>
                  <div className="flex items-center px-4 py-2">
                    <Image
                      width={80}
                      height={80}
                      src={activeCard.image}
                      alt={activeCard.name}
                      className="relative m-0 h-18 w-18 rounded-full border-2 border-white object-cover object-top p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
                      sizes="80px"
                      placeholder={
                        typeof activeCard.image !== "string"
                          ? "blur"
                          : undefined
                      }
                    />
                    <div className="flex justify-between items-start p-4">
                      <div className="">
                        <motion.h3
                          layoutId={`title-${activeCard.name}-${cardId}`}
                          className="font-bold text-white"
                        >
                          {activeCard.name}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${activeCard.designation}-${cardId}`}
                          className="text-foreground-muted"
                        >
                          {activeCard.designation}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div>
                  <div className="pt-4 relative px-4">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-foreground text-xs md:text-sm lg:text-base h-40 md:h-fit pb-4 flex flex-col items-start gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
                      {activeCard.description}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
