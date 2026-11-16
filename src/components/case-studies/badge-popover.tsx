"use client";

import {
  PointerEvent,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgePopoverProps = {
  items: string[];
  isShown: boolean;
  rootRef: RefObject<HTMLElement | null>;
  anchorRef: RefObject<HTMLElement | null>;
  onPointerEnter: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: (event: PointerEvent<HTMLDivElement>) => void;
};

type PopoverPlacement = {
  isAbove: boolean;
  right: number;
  maxHeight: number;
};

const POPOVER_GAP_PX = 8;
const VIEWPORT_MARGIN_PX = 8;

export const BadgePopover = ({
  items,
  isShown,
  rootRef,
  anchorRef,
  onPointerEnter,
  onPointerLeave,
}: BadgePopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<PopoverPlacement>({
    isAbove: false,
    right: 0,
    maxHeight: 0,
  });

  useLayoutEffect(() => {
    if (!isShown) {
      return;
    }
    const place = () => {
      const root = rootRef.current;
      const anchor = anchorRef.current;
      const popover = popoverRef.current;
      if (!root || !anchor || !popover) {
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
        right: rootRect.right - anchor.getBoundingClientRect().right,
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
  }, [isShown, items.length, rootRef, anchorRef]);

  return (
    <div
      ref={popoverRef}
      aria-hidden
      hidden={!isShown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{ right: placement.right, maxHeight: placement.maxHeight }}
      className={cn(
        "absolute z-20 w-max max-w-72 overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/95 p-2 shadow-xl backdrop-blur",
        placement.isAbove ? "bottom-full mb-2" : "top-full mt-2",
      )}
    >
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="flex">
            <Badge>{item}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};
