"use client";

import {
  KeyboardEvent,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Badge } from "@/components/ui/badge";
import { useBadgeOverflow } from "@/hooks/use-badge-overflow";
import { useTapToggle } from "@/hooks/use-tap-toggle";
import { cn } from "@/lib/utils";
import { BadgePopover } from "./badge-popover";

type BadgeRowProps = {
  label: string;
  items: string[];
};

const HOVER_CLOSE_DELAY_MS = 150;

export const BadgeRow = ({ label, items }: BadgeRowProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const { visibleCount, isWide, isMeasured } = useBadgeOverflow({
    listRef,
    moreRef,
    items,
  });
  const tapToggle = useTapToggle({ isOpen, setIsOpen });

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const closeOnOutside = (event: globalThis.PointerEvent) => {
      if (
        event.target instanceof Node &&
        rootRef.current?.contains(event.target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const hidden = items.slice(visibleCount);
  const isPopoverShown = isOpen && isWide && hidden.length > 0;

  const cancelClose = () => window.clearTimeout(closeTimerRef.current);

  const openOnMouse = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") {
      cancelClose();
      setIsOpen(true);
    }
  };

  const keepOpenOnMouse = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") {
      cancelClose();
    }
  };

  const closeOnMouse = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== "mouse" ||
      document.activeElement === buttonRef.current
    ) {
      return;
    }
    cancelClose();
    closeTimerRef.current = window.setTimeout(
      () => setIsOpen(false),
      HOVER_CLOSE_DELAY_MS,
    );
  };

  const closeOnEscape = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape" && isOpen) {
      event.stopPropagation();
      setIsOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <div
        role={isWide ? undefined : "region"}
        aria-label={isWide ? undefined : label}
        tabIndex={isWide ? undefined : 0}
        className={cn(
          "-my-1 flex overflow-x-auto py-1 pr-10 [scrollbar-width:none] mask-[linear-gradient(to_right,#000_calc(100%-2.5rem),transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:block sm:max-h-10 sm:overflow-hidden sm:mask-none [&::-webkit-scrollbar]:hidden",
          isMeasured ? "sm:pr-0" : "sm:pr-14",
        )}
      >
        <ul
          ref={listRef}
          aria-label={isWide ? label : undefined}
          className="flex shrink-0 flex-nowrap items-center gap-2 sm:flex-wrap"
        >
          {items.map((item, index) => (
            <li
              key={item}
              data-badge-item
              className={cn(
                "flex shrink-0",
                index >= visibleCount && "sm:order-2",
              )}
            >
              <Badge>{item}</Badge>
            </li>
          ))}
          <li
            ref={moreRef}
            className={cn(
              "hidden shrink-0 sm:order-1 sm:flex",
              hidden.length === 0 && "sm:invisible",
            )}
          >
            <button
              ref={buttonRef}
              type="button"
              aria-label={`${hidden.length} more ${label.toLowerCase()}`}
              onPointerDown={tapToggle.onPointerDown}
              onClick={tapToggle.onClick}
              onFocus={() => {
                cancelClose();
                setIsOpen(true);
              }}
              onBlur={() => setIsOpen(false)}
              onKeyDown={closeOnEscape}
              onPointerEnter={openOnMouse}
              onPointerLeave={closeOnMouse}
              className="flex cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              <Badge className="transition-colors hover:border-white/25 hover:text-white">
                +{hidden.length}
              </Badge>
            </button>
          </li>
        </ul>
      </div>
      <BadgePopover
        items={hidden}
        isShown={isPopoverShown}
        rootRef={rootRef}
        anchorRef={buttonRef}
        onPointerEnter={keepOpenOnMouse}
        onPointerLeave={closeOnMouse}
      />
    </div>
  );
};
