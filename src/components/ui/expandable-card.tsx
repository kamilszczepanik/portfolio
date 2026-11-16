"use client";

import React, { useCallback, useMemo } from "react";
import { Person, ReviewNavigation } from "@/types";
import { useMobileView } from "@/hooks/useMobileView";
import { ReviewDialog } from "./review-dialog";
import { ReviewDrawer } from "./review-drawer";

type ExpandableCardProps = {
  activeCard: Person | null;
  setActiveCard: (card: Person | null) => void;
  cardId: string;
  people?: Person[];
};

export const ExpandableCard = React.memo(
  ({ activeCard, setActiveCard, cardId, people }: ExpandableCardProps) => {
    const isMobile = useMobileView();

    const step = useCallback(
      (offset: number) => {
        if (!activeCard || !people) {
          return;
        }
        const currentIndex = people.findIndex(
          (person) => person.id === activeCard.id,
        );
        const nextIndex =
          (currentIndex + offset + people.length) % people.length;
        setActiveCard(people[nextIndex]);
      },
      [activeCard, people, setActiveCard],
    );

    const navigation = useMemo<ReviewNavigation | undefined>(
      () =>
        people && people.length > 1
          ? { onPrev: () => step(-1), onNext: () => step(1) }
          : undefined,
      [people, step],
    );

    const close = useCallback(() => setActiveCard(null), [setActiveCard]);

    const title = activeCard
      ? `${people ? "Review from" : "About"} ${activeCard.name}`
      : "";

    const Sheet = isMobile ? ReviewDrawer : ReviewDialog;

    return (
      <Sheet
        person={activeCard}
        title={title}
        cardId={cardId}
        onClose={close}
        navigation={navigation}
      />
    );
  },
);

ExpandableCard.displayName = "ExpandableCard";
