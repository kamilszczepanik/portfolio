"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { encode } from "qss";
import React from "react";
import { AnimatePresence, useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { useCanHover } from "@/hooks/use-can-hover";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { LinkPreviewPopover } from "./link-preview-popover";
import { NewTabHint } from "./new-tab-hint";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
  target?: string;
  tabIndex?: number;
  ariaLabel?: string;
} & (
  | { isStatic: true; imageSrc: string | StaticImageData }
  | { isStatic?: false; imageSrc?: never }
);

const DEFAULT_PREVIEW_HEIGHT = 125;

export const LinkPreview = React.memo(
  ({
    children,
    url,
    className,
    width = 200,
    height,
    quality = 50,
    isStatic = false,
    imageSrc = "",
    target,
    tabIndex,
    ariaLabel,
  }: LinkPreviewProps) => {
    const imageHeight = height ?? DEFAULT_PREVIEW_HEIGHT;

    const src = React.useMemo(() => {
      if (isStatic) {
        return imageSrc;
      }
      const params = encode({
        url,
        screenshot: true,
        meta: false,
        embed: "screenshot.url",
        colorScheme: "dark",
        "viewport.isMobile": true,
        "viewport.deviceScaleFactor": 1,
        "viewport.width": width * 3,
        "viewport.height": imageHeight * 3,
      });
      return `https://api.microlink.io/?${params}`;
    }, [url, width, imageHeight, isStatic, imageSrc]);

    const [isOpen, setOpen] = React.useState(false);

    const { isMounted, isDesktop } = useIsDesktop();
    const canHover = useCanHover();

    const opensInNewTab = target === "_blank";
    const rel = opensInNewTab ? "noopener noreferrer" : undefined;
    const triggerLink = (
      <a
        href={url}
        target={target}
        rel={rel}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        className={cn("text-black dark:text-white", className)}
      >
        {children}
        {opensInNewTab && !ariaLabel ? <NewTabHint /> : null}
      </a>
    );

    const springConfig = React.useMemo(
      () => ({ stiffness: 100, damping: 15 }),
      [],
    );
    const x = useMotionValue(0);

    const translateX = useSpring(x, springConfig);

    const handleMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        const targetRect = (
          event.target as HTMLElement
        ).getBoundingClientRect();
        const eventOffsetX = event.clientX - targetRect.left;
        const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
        x.set(offsetFromCenter);
      },
      [x],
    );

    if (isMounted && (!isDesktop || !canHover)) {
      return triggerLink;
    }

    return (
      <>
        {isMounted ? (
          <div className="hidden">
            <Image
              src={src}
              width={width}
              height={imageHeight}
              alt="hidden image"
              quality={quality}
            />
          </div>
        ) : null}

        <HoverCardPrimitive.Root
          open={isOpen}
          openDelay={50}
          closeDelay={100}
          onOpenChange={setOpen}
        >
          <HoverCardPrimitive.Trigger asChild onMouseMove={handleMouseMove}>
            {triggerLink}
          </HoverCardPrimitive.Trigger>

          <AnimatePresence>
            {isOpen && (
              <HoverCardPrimitive.Portal forceMount>
                <HoverCardPrimitive.Content
                  forceMount
                  className="origin-(--radix-hover-card-content-transform-origin) bg-transparent border-none shadow-none z-1100"
                  side="top"
                  align="center"
                  sideOffset={10}
                >
                  <LinkPreviewPopover
                    url={url}
                    target={target}
                    rel={rel}
                    src={src}
                    width={width}
                    height={imageHeight}
                    quality={quality}
                    isFixedSize={height !== undefined}
                    translateX={translateX}
                  />
                </HoverCardPrimitive.Content>
              </HoverCardPrimitive.Portal>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Root>
      </>
    );
  },
);

LinkPreview.displayName = "LinkPreview";
