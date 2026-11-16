"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import { ChevronDown, X } from "lucide-react";
import { ComponentProps, useRef, useState } from "react";
import { PHONE_MAX_WIDTH, useMobileView } from "@/hooks/useMobileView";
import { stopTouchPropagation } from "@/lib/stop-touch-propagation";
import { cn } from "@/lib/utils";
import { StatBreakdown as StatBreakdownData } from "@/types";
import { StatBreakdownList } from "./stat-breakdown-list";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "./ui/drawer";

type StatBreakdownProps = {
  label: string;
  breakdown: StatBreakdownData;
  className?: string;
};

type TriggerProps = ComponentProps<"button"> & {
  label: string;
  isOpen: boolean;
};

const BreakdownTrigger = ({
  label,
  isOpen,
  className,
  ...props
}: TriggerProps) => (
  <button
    {...props}
    type="button"
    aria-expanded={isOpen}
    className={cn(
      "inline-flex cursor-pointer items-center gap-0.5 rounded-md underline decoration-white/50 decoration-dotted underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:transition-none",
      className,
    )}
  >
    {label}
    <span className="sr-only"> (show how they were counted)</span>
    <ChevronDown
      aria-hidden
      className={cn(
        "size-3.5 shrink-0 transition-transform motion-reduce:transition-none sm:size-4",
        isOpen && "rotate-180",
      )}
    />
  </button>
);

export const StatBreakdown = ({
  label,
  breakdown,
  className,
}: StatBreakdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isPhone = useMobileView(PHONE_MAX_WIDTH);

  const returnFocus = (event: Event) => {
    event.preventDefault();
    triggerRef.current?.focus({ preventScroll: true });
  };

  if (isPhone) {
    return (
      <>
        <BreakdownTrigger
          ref={triggerRef}
          label={label}
          isOpen={isOpen}
          className={className}
          onClick={() => setIsOpen(true)}
        />
        <Drawer open={isOpen} onOpenChange={setIsOpen} autoFocus>
          <DrawerContent
            onCloseAutoFocus={returnFocus}
            className="max-h-[90vh] border-muted-foreground outline-none"
          >
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
              <DrawerTitle className="min-w-0 flex-1 text-xl font-bold text-white">
                {breakdown.title}
              </DrawerTitle>
              <DrawerClose asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </DrawerClose>
            </div>
            <div className="overflow-y-auto overscroll-contain px-4 pb-6">
              <StatBreakdownList breakdown={breakdown} />
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <HoverCard.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      openDelay={100}
      closeDelay={150}
    >
      <HoverCard.Trigger asChild>
        <span className="inline-flex">
          <BreakdownTrigger
            label={label}
            isOpen={isOpen}
            className={className}
            onClick={() => setIsOpen(true)}
            onTouchStart={stopTouchPropagation}
          />
        </span>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="bottom"
          sideOffset={10}
          collisionPadding={16}
          className="z-60 w-[min(30rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-neutral-950/95 p-5 shadow-2xl backdrop-blur-md"
        >
          <StatBreakdownList breakdown={breakdown} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
