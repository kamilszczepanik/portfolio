"use client";

import React, { useState } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { motion, useReducedMotionConfig } from "motion/react";
import Image from "next/image";
import { Person } from "@/types";
import { PersonNameLink } from "./person-name-link";
import { useIsDesktop } from "@/hooks/use-is-desktop";

type AnimatedTooltipProps = {
  items: Person[];
  setActiveCard: (item: Person) => void;
  cardId: string;
};

type ReviewAvatarProps = {
  person: Person;
  onOpen: (person: Person) => void;
  cardId?: string;
};

const EDGE_PADDING_PX = 12;
const OPEN_DELAY_MS = 80;
const CLOSE_DELAY_MS = 150;

const AVATAR_CLASS =
  "relative m-0! size-11 sm:size-12 lg:size-14 rounded-full border-2 border-white object-cover object-top p-0! transition duration-500 group-hover:scale-105";

const AVATAR_BUTTON_CLASS =
  "block cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

const readTopPadding = () => {
  const headerBottom =
    document.querySelector("[data-site-header]")?.getBoundingClientRect().bottom ?? 0;
  return Math.max(headerBottom, 0) + EDGE_PADDING_PX;
};

const AvatarImage = ({ person }: { person: Person }) => (
  <Image
    height={56}
    width={56}
    src={person.image}
    alt=""
    className={AVATAR_CLASS}
    sizes="(max-width: 640px) 44px, (max-width: 1024px) 48px, 56px"
    placeholder={typeof person.image !== "string" ? "blur" : undefined}
  />
);

const ReviewTooltipBody = ({ person }: { person: Person }) => {
  const isStill = useReducedMotionConfig() ?? false;

  return (
    <motion.div
      initial={isStill ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="relative rounded-xl border border-white/10 bg-black px-5 py-4 shadow-2xl"
    >
      <span
        aria-hidden
        className="absolute inset-x-10 -bottom-px h-px w-[20%] bg-linear-to-r from-transparent via-emerald-500 to-transparent"
      />
      <span
        aria-hidden
        className="absolute left-10 -bottom-px h-px w-[40%] bg-linear-to-r from-transparent via-sky-500 to-transparent"
      />
      <PersonNameLink
        name={person.name}
        link={person.link}
        className="flex items-center gap-2 text-base font-semibold text-white"
        iconClassName="size-4"
      />
      <p className="mt-0.5 text-sm text-white/70">{person.designation}</p>
      <div className="mt-3 max-h-[min(15rem,calc(var(--radix-hover-card-content-available-height)_-_6rem))] overflow-y-auto overscroll-contain pr-2 text-[15px] leading-relaxed text-neutral-100">
        {person.description}
      </div>
    </motion.div>
  );
};

const ReviewAvatar = ({ person, onOpen, cardId }: ReviewAvatarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topPadding, setTopPadding] = useState(EDGE_PADDING_PX);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setTopPadding(readTopPadding());
    }
    setIsOpen(nextOpen);
  };

  const handleClick = () => {
    setIsOpen(false);
    onOpen(person);
  };

  return (
    <HoverCardPrimitive.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
      openDelay={OPEN_DELAY_MS}
      closeDelay={CLOSE_DELAY_MS}
    >
      <motion.div
        layoutId={`card-${person.name}-${cardId}`}
        className="group relative hover:z-30 focus-within:z-30 lg:-mr-4"
      >
        <HoverCardPrimitive.Trigger asChild>
          <button
            type="button"
            onClick={handleClick}
            aria-label={`Read the review from ${person.name}`}
            className={AVATAR_BUTTON_CLASS}
          >
            <motion.span
              layoutId={`image-${person.name}-${cardId}`}
              className="block"
            >
              <AvatarImage person={person} />
            </motion.span>
          </button>
        </HoverCardPrimitive.Trigger>
      </motion.div>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side="top"
          align="center"
          sideOffset={12}
          collisionPadding={{
            top: topPadding,
            right: EDGE_PADDING_PX,
            bottom: EDGE_PADDING_PX,
            left: EDGE_PADDING_PX,
          }}
          className="z-60 w-[min(420px,calc(100vw_-_24px))] origin-(--radix-hover-card-content-transform-origin)"
        >
          <ReviewTooltipBody person={person} />
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};

const TouchAvatar = ({ person, onOpen }: ReviewAvatarProps) => (
  <div className="group relative">
    <button
      type="button"
      onClick={() => onOpen(person)}
      aria-label={`Read the review from ${person.name}`}
      className={AVATAR_BUTTON_CLASS}
    >
      <AvatarImage person={person} />
    </button>
  </div>
);

export const AnimatedTooltip = React.memo(
  ({ items, setActiveCard, cardId }: AnimatedTooltipProps) => {
    const { isDesktop } = useIsDesktop();
    const Avatar = isDesktop ? ReviewAvatar : TouchAvatar;

    return (
      <div className="grid grid-cols-5 gap-2 sm:flex sm:items-center">
        {items.map((item) => (
          <Avatar
            key={item.name}
            person={item}
            onOpen={setActiveCard}
            cardId={cardId}
          />
        ))}
      </div>
    );
  },
);

AnimatedTooltip.displayName = "AnimatedTooltip";
