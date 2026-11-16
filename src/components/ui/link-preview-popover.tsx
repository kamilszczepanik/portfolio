"use client";

import { motion, MotionValue } from "motion/react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type LinkPreviewPopoverProps = {
  url: string;
  target?: string;
  rel?: string;
  src: string | StaticImageData;
  width: number;
  height: number;
  quality: number;
  isFixedSize: boolean;
  translateX: MotionValue<number>;
};

export const LinkPreviewPopover = ({
  url,
  target,
  rel,
  src,
  width,
  height,
  quality,
  isFixedSize,
  translateX,
}: LinkPreviewPopoverProps) => (
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
        src={src}
        width={width}
        height={height}
        style={isFixedSize ? { width, height } : undefined}
        className={cn("rounded-lg", isFixedSize && "object-cover object-top")}
        alt="preview image"
        quality={quality}
      />
    </a>
  </motion.div>
);
