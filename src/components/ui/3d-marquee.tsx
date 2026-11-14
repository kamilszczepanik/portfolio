"use client";

import { motion, useReducedMotion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

const COLUMN_COUNT = 6;
const ROW_COUNT = 10;
const DRIFT_PX = 120;
const PLANE_TRANSFORM = "translate(-50%, -50%) rotateX(55deg) rotateZ(-45deg)";

type ThreeDMarqueeProps = {
  images: StaticImageData[];
  className?: string;
};

type MarqueeColumnProps = {
  images: StaticImageData[];
  columnIndex: number;
  isStill: boolean;
};

const buildColumns = (images: StaticImageData[]) =>
  Array.from({ length: COLUMN_COUNT }, (_, columnIndex) =>
    Array.from(
      { length: ROW_COUNT },
      (_, rowIndex) => images[(columnIndex * 5 + rowIndex * 2) % images.length],
    ),
  );

const MarqueeColumn = ({
  images,
  columnIndex,
  isStill,
}: MarqueeColumnProps) => {
  const isEven = columnIndex % 2 === 0;
  const drift = isEven ? [-DRIFT_PX, DRIFT_PX] : [DRIFT_PX, -DRIFT_PX];

  return (
    <motion.div
      className="flex h-full min-h-0 flex-col justify-center gap-[18px] sm:gap-7"
      animate={isStill ? undefined : { y: drift }}
      transition={{
        duration: isEven ? 14 : 19,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {images.map((image, rowIndex) => (
        <Image
          key={`${columnIndex}-${rowIndex}`}
          src={image}
          alt=""
          width={970}
          height={700}
          className="aspect-970/700 h-auto w-full shrink-0 rounded-xl object-cover object-top"
          sizes="(max-width: 640px) 320px, (max-width: 1280px) 420px, 520px"
          placeholder="blur"
          quality={50}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      ))}
    </motion.div>
  );
};

export const ThreeDMarquee = React.memo(
  ({ images, className }: ThreeDMarqueeProps) => {
    const isStill = useReducedMotion() ?? false;
    const columns = useMemo(() => buildColumns(images), [images]);

    return (
      <div
        aria-hidden
        className={cn("pointer-events-none overflow-hidden", className)}
      >
        <div
          style={{ transform: PLANE_TRANSFORM }}
          className="absolute top-1/2 left-1/2 grid size-[2000px] grid-cols-6 grid-rows-1 gap-[18px] sm:size-[2600px] sm:gap-7 xl:size-[3200px]"
        >
          {columns.map((columnImages, columnIndex) => (
            <MarqueeColumn
              key={columnIndex}
              images={columnImages}
              columnIndex={columnIndex}
              isStill={isStill}
            />
          ))}
        </div>
      </div>
    );
  },
);

ThreeDMarquee.displayName = "ThreeDMarquee";
