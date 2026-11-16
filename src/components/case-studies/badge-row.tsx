"use client";

import {
  KeyboardEvent,
  PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeRowProps = {
  label: string;
  items: string[];
};

type CountFittingOptions = {
  list: HTMLElement;
  more: HTMLElement;
};

const WIDE_QUERY = "(min-width: 640px)";
const ITEM_SELECTOR = "[data-badge-item]";
const MORE_DIGIT_RESERVE_PX = 8;
const POPOVER_GAP_PX = 8;
const VIEWPORT_MARGIN_PX = 8;

type PopoverPlacement = {
  isAbove: boolean;
  right: number;
  maxHeight: number;
};

const countFitting = ({ list, more }: CountFittingOptions) => {
  const widths = Array.from(
    list.querySelectorAll<HTMLElement>(ITEM_SELECTOR),
  ).map((item) => item.getBoundingClientRect().width);
  const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
  const available = list.clientWidth;
  const total =
    widths.reduce((sum, width) => sum + width, 0) +
    gap * Math.max(0, widths.length - 1);
  if (total <= available) {
    return widths.length;
  }
  let used = more.getBoundingClientRect().width + MORE_DIGIT_RESERVE_PX;
  let count = 0;
  for (const width of widths) {
    if (used + gap + width > available) {
      break;
    }
    used += gap + width;
    count += 1;
  }
  return count;
};

export const BadgeRow = ({ label, items }: BadgeRowProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ type: "", wasOpen: false });
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [isWide, setIsWide] = useState(false);
  const [isMeasured, setIsMeasured] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<PopoverPlacement>({
    isAbove: false,
    right: 0,
    maxHeight: 0,
  });

  useEffect(() => {
    const list = listRef.current;
    const more = moreRef.current;
    if (!list || !more) {
      return;
    }
    const query = window.matchMedia(WIDE_QUERY);
    const fit = () => {
      setIsWide(query.matches);
      setVisibleCount(
        query.matches ? countFitting({ list, more }) : items.length,
      );
      setIsMeasured(true);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(list);
    list
      .querySelectorAll(ITEM_SELECTOR)
      .forEach((item) => observer.observe(item));
    query.addEventListener("change", fit);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", fit);
    };
  }, [items]);

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
    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [isOpen]);

  const hidden = items.slice(visibleCount);
  const isPopoverShown = isOpen && isWide && hidden.length > 0;

  useLayoutEffect(() => {
    if (!isPopoverShown) {
      return;
    }
    const place = () => {
      const root = rootRef.current;
      const button = buttonRef.current;
      const popover = popoverRef.current;
      if (!root || !button || !popover) {
        return;
      }
      const rootRect = root.getBoundingClientRect();
      const below =
        window.innerHeight -
        rootRect.bottom -
        POPOVER_GAP_PX -
        VIEWPORT_MARGIN_PX;
      const above = rootRect.top - POPOVER_GAP_PX - VIEWPORT_MARGIN_PX;
      const isAbove = popover.scrollHeight > below && above > below;
      setPlacement({
        isAbove,
        right: rootRect.right - button.getBoundingClientRect().right,
        maxHeight: Math.max(0, isAbove ? above : below),
      });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { capture: true, passive: true });
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, { capture: true });
    };
  }, [isPopoverShown, hidden.length]);

  const open = () => setIsOpen(true);

  const rememberPointer = (event: PointerEvent<HTMLButtonElement>) => {
    pointerRef.current = { type: event.pointerType, wasOpen: isOpen };
  };

  const toggleOnTap = () => {
    const { type, wasOpen } = pointerRef.current;
    pointerRef.current = { type: "", wasOpen: false };
    setIsOpen(type === "mouse" || !wasOpen);
  };

  const openOnMouse = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse") {
      open();
    }
  };

  const closeOnMouse = (event: PointerEvent<HTMLButtonElement>) => {
    if (
      event.pointerType === "mouse" &&
      document.activeElement !== event.currentTarget
    ) {
      setIsOpen(false);
    }
  };

  const closeOnEscape = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape" && isOpen) {
      event.stopPropagation();
      setIsOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <ul
        ref={listRef}
        aria-label={label}
        tabIndex={isWide ? undefined : 0}
        className={cn(
          "-my-1 flex flex-nowrap items-center gap-2 overflow-x-auto py-1 pr-10 [scrollbar-width:none] mask-[linear-gradient(to_right,#000_calc(100%-2.5rem),transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:max-h-10 sm:flex-wrap sm:overflow-hidden sm:mask-none [&::-webkit-scrollbar]:hidden",
          isMeasured ? "sm:pr-0" : "sm:pr-14",
        )}
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
            aria-label={`Show ${hidden.length} more ${label.toLowerCase()}`}
            aria-expanded={isPopoverShown}
            onPointerDown={rememberPointer}
            onClick={toggleOnTap}
            onFocus={open}
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
      <div
        ref={popoverRef}
        aria-hidden
        hidden={!isPopoverShown}
        style={{ right: placement.right, maxHeight: placement.maxHeight }}
        className={cn(
          "absolute z-20 w-max max-w-72 overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/95 p-2 shadow-xl backdrop-blur",
          placement.isAbove ? "bottom-full mb-2" : "top-full mt-2",
        )}
      >
        <ul className="flex flex-wrap gap-2">
          {hidden.map((item) => (
            <li key={item} className="flex">
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
