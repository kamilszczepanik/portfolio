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
import Image from "next/image";
import { useIsDesktop } from "@/hooks/use-is-desktop";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
  target?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = React.memo(
  ({
    children,
    url,
    className,
    width = 200,
    height = 125,
    quality = 50,
    isStatic = false,
    imageSrc = "",
    target,
  }: LinkPreviewProps) => {
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
        "viewport.height": height * 3,
      });
      return `https://api.microlink.io/?${params}`;
    }, [url, width, height, isStatic, imageSrc]);

    const [isOpen, setOpen] = React.useState(false);

    const { isMounted, isDesktop } = useIsDesktop();

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
      return (
        <a
          href={url}
          target={target}
          className={cn("text-black dark:text-white", className)}
        >
          {children}
        </a>
      );
    }

    return (
      <>
        {isMounted ? (
          <div className="hidden">
            <Image
              src={src}
              width={width}
              height={height}
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
            <a
              href={url}
              target={target}
              className={cn("text-black dark:text-white", className)}
            >
              {children}
            </a>
          </HoverCardPrimitive.Trigger>

          <HoverCardPrimitive.Portal forceMount>
            <HoverCardPrimitive.Content
              className="origin-(--radix-hover-card-content-transform-origin) bg-transparent border-none shadow-none z-10"
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
                      className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                      style={{ fontSize: 0 }}
                    >
                      <Image
                        src={isStatic ? imageSrc : src}
                        width={width}
                        height={height}
                        className="rounded-lg"
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
