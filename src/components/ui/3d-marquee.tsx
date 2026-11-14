"use client";

import Image, { StaticImageData } from "next/image";
import React, { CSSProperties, useMemo } from "react";
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
};

const buildColumns = (images: StaticImageData[]) =>
  Array.from({ length: COLUMN_COUNT }, (_, columnIndex) =>
    Array.from(
      { length: ROW_COUNT },
      (_, rowIndex) => images[(columnIndex * 5 + rowIndex * 2) % images.length],
    ),
  );

const driftStyle = (columnIndex: number) => {
  const isEven = columnIndex % 2 === 0;
  return {
    "--drift-from": `${isEven ? -DRIFT_PX : DRIFT_PX}px`,
    "--drift-to": `${isEven ? DRIFT_PX : -DRIFT_PX}px`,
    "--drift-duration": `${isEven ? 14 : 19}s`,
  } as CSSProperties;
};

const MarqueeColumn = ({ images, columnIndex }: MarqueeColumnProps) => (
  <div
    style={driftStyle(columnIndex)}
    className="flex h-full min-h-0 animate-drift flex-col justify-center gap-[18px] motion-reduce:animate-none sm:gap-7"
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
        quality={50}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    ))}
  </div>
);

export const ThreeDMarquee = React.memo(
  ({ images, className }: ThreeDMarqueeProps) => {
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
            />
          ))}
        </div>
      </div>
    );
  },
);

ThreeDMarquee.displayName = "ThreeDMarquee";
