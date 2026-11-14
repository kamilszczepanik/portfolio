"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { useIsDesktop } from "@/hooks/use-is-desktop";
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
    const fixedSize = height === undefined ? undefined : { width, height };

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
      []
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
      [x]
    );

    if (isMounted && !isDesktop) {
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
          openDelay={50}
          closeDelay={100}
          onOpenChange={(open) => {
            setOpen(open);
          }}
        >
          <HoverCardPrimitive.Trigger asChild onMouseMove={handleMouseMove}>
            {triggerLink}
          </HoverCardPrimitive.Trigger>

          <HoverCardPrimitive.Portal forceMount>
            <HoverCardPrimitive.Content
              className="origin-(--radix-hover-card-content-transform-origin) bg-transparent border-none shadow-none z-1100"
              side="top"
              align="center"
              sideOffset={10}
            >
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    className="shadow-xl rounded-xl"
                    style={{
                      x: translateX,
                    }}
                  >
                    <a
                      href={url}
                      target={target}
                      rel={rel}
                      tabIndex={-1}
                      aria-hidden
                      className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                      style={{ fontSize: 0 }}
                    >
                      <Image
                        src={isStatic ? imageSrc : src}
                        width={width}
                        height={imageHeight}
                        style={fixedSize}
                        className={cn(
                          "rounded-lg",
                          fixedSize && "object-cover object-top",
                        )}
                        alt="preview image"
                        quality={quality}
                      />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </HoverCardPrimitive.Content>
          </HoverCardPrimitive.Portal>
        </HoverCardPrimitive.Root>
      </>
    );
  }
);

LinkPreview.displayName = "LinkPreview";
