"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Person } from "@/types";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  X,
} from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { useMobileView } from "@/hooks/useMobileView";
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter } from "./drawer";

interface ExpandableCardProps {
  activeCard: Person | null;
  setActiveCard: (card: Person | null) => void;
  cardId: string;
  people?: Person[];
}

export const ExpandableCard = React.memo(
  ({ activeCard, setActiveCard, cardId, people }: ExpandableCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const previousBodyOverflow = useRef<string | null>(null);
    const previousBodyPaddingRight = useRef<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const isMobile = useMobileView();

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

    const updateScrollIndicator = useCallback(() => {
      const content = contentRef.current;
      if (!content) return;
      const hasOverflow = content.scrollHeight > content.clientHeight + 1;
      const isAtBottom =
        content.scrollTop + content.clientHeight >= content.scrollHeight - 1;
      setShowScrollIndicator(hasOverflow && !isAtBottom);
    }, []);

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

      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeCard, setActiveCard, handleNext, handlePrev]);

    useEffect(() => {
      const bodyStyle = document.body.style;
      if (activeCard) {
        previousBodyOverflow.current = bodyStyle.overflow;
        previousBodyPaddingRight.current = bodyStyle.paddingRight;
        const scrollBarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        if (scrollBarWidth > 0) {
          bodyStyle.paddingRight = `${scrollBarWidth}px`;
        }
        bodyStyle.overflow = "hidden";
      } else {
        bodyStyle.overflow = previousBodyOverflow.current || "";
        bodyStyle.paddingRight = previousBodyPaddingRight.current || "";
      }

      return () => {
        bodyStyle.overflow = previousBodyOverflow.current || "";
        bodyStyle.paddingRight = previousBodyPaddingRight.current || "";
      };
    }, [activeCard]);

    useEffect(() => {
      if (!activeCard) {
        setShowScrollIndicator(false);
        return;
      }
      const frame = requestAnimationFrame(() => {
        updateScrollIndicator();
      });
      const handleResize = () => {
        updateScrollIndicator();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", handleResize);
      };
    }, [activeCard, updateScrollIndicator]);

    useOutsideClick(ref, () => setActiveCard(null));

    const handleScrollIndicatorClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const content = contentRef.current;
        if (!content) return;
        content.scrollBy({ top: content.clientHeight, behavior: "smooth" });
      },
      []
    );

    if (isMobile) {
      return (
        <Drawer
          open={!!activeCard}
          onOpenChange={(open) => !open && setActiveCard(null)}
        >
          <DrawerContent className="max-h-[90vh] border-muted-foreground">
            {activeCard && (
              <>
                <DrawerHeader className="pb-2">
                  <div className="flex items-center">
                    <Image
                      width={60}
                      height={60}
                      src={activeCard.image}
                      alt={activeCard.name}
                      className="relative m-0 h-15 w-15 rounded-full border-2 border-white object-cover object-top p-0 mr-3"
                      sizes="60px"
                      onLoadingComplete={updateScrollIndicator}
                      placeholder={
                        typeof activeCard.image !== "string"
                          ? "blur"
                          : undefined
                      }
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-white">
                        <Link
                          href={activeCard.link}
                          target="_blank"
                          className="relative z-30 font-semibold text-white flex items-center gap-1"
                        >
                          {activeCard.name}
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </h3>
                      <p className="text-foreground-muted text-sm text-left">
                        {activeCard.designation}
                      </p>
                    </div>
                  </div>
                </DrawerHeader>

                <div className="relative px-4 flex-1 min-h-0">
                  <div
                    ref={contentRef}
                    onScroll={updateScrollIndicator}
                    className="text-foreground text-sm overflow-y-auto max-h-[50vh] flex flex-col items-start gap-4 pb-4"
                  >
                    {activeCard.description}
                  </div>
                  {showScrollIndicator && (
                    <button
                      onClick={handleScrollIndicatorClick}
                      className="absolute bottom-2 right-0 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white"
                      aria-label="Scroll for more"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {people && people.length > 1 && (
                  <DrawerFooter className="pt-2">
                    <div className="flex justify-between items-center w-full">
                      <Button
                        variant="muted"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        aria-label="Previous review"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        aria-label="Next review"
                        variant="muted"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </DrawerFooter>
                )}
              </>
            )}
          </DrawerContent>
        </Drawer>
      );
    }

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
            <div className="fixed inset-0 grid place-items-center z-1000 px-4 sm:px-6">
              <div className="relative" ref={ref}>
                {people && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
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
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
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
                  className="w-full max-w-[500px] max-h-[85vh] md:max-h-[90%] flex flex-col bg-background rounded-3xl overflow-hidden relative"
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
                        onLoadingComplete={updateScrollIndicator}
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
                            <Link
                              href={activeCard.link}
                              target="_blank"
                              className="relative z-30 font-semibold text-white text-center text-nowrap flex items-center gap-1 sm:gap-2"
                            >
                              {activeCard.name}
                              <ExternalLink className="w-4 h-4" />
                            </Link>
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

                  <div className="relative px-4 pt-4 flex-1 min-h-0">
                    <motion.div
                      ref={contentRef}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onScroll={updateScrollIndicator}
                      className="text-foreground text-xs md:text-sm lg:text-base overflow-y-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh] flex flex-col items-start gap-4 pb-4"
                    >
                      {activeCard.description}
                    </motion.div>
                    <AnimatePresence>
                      {showScrollIndicator && (
                        <motion.button
                          key="scroll-indicator"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          }}
                          onClick={handleScrollIndicatorClick}
                          className="absolute bottom-2 right-0 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white"
                          aria-label="Scroll for more"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : null}
        </AnimatePresence>
      </>
    );
  }
);

ExpandableCard.displayName = "ExpandableCard";
