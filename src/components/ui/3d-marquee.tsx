"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";

export const ThreeDMarquee = React.memo(
  ({
    images,
    className,
  }: {
    images: (StaticImageData | string)[];
    className?: string;
  }) => {
    // Split the images array into 4 equal parts
    const chunks = React.useMemo(() => {
      const chunkSize = Math.ceil(images.length / 4);
      return Array.from({ length: 4 }, (_, colIndex) => {
        const start = colIndex * chunkSize;
        return images.slice(start, start + chunkSize);
      });
    }, [images]);

    return (
      <div className={cn("mx-auto block h-[600px] overflow-hidden", className)}>
        <div className="flex size-full items-center justify-center">
          <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
            <div
              style={{
                transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              }}
              className="relative top-[512px] right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d"
            >
              {chunks.map((subarray, colIndex) => (
                <motion.div
                  animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                  transition={{
                    duration: colIndex % 2 === 0 ? 10 : 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  key={colIndex + "marquee"}
                  className="flex flex-col items-start gap-8"
                >
                  <GridLineVertical className="-left-4" offset="80px" />
                  {subarray.map((image, imageIndex) => (
                    <div
                      className="relative"
                      key={
                        imageIndex +
                        (typeof image === "string" ? image : image.src)
                      }
                    >
                      <GridLineHorizontal className="-top-4" offset="20px" />
                      <motion.div
                        whileHover={{
                          y: -10,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className="hover:shadow-2xl"
                      >
                        <Image
                          src={image}
                          alt={`Kamil Szczepanik's project portfolio - ${
                            typeof image === "string"
                              ? image
                                  .split("/")
                                  .pop()
                                  ?.split(".")[0]
                                  ?.replace(/-/g, " ")
                              : "project image"
                          }`}
                          className="aspect-970/700 rounded-xl object-cover ring ring-gray-950/5"
                          width={970}
                          height={700}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder={
                            typeof image !== "string" ? "blur" : undefined
                          }
                          quality={50}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                        />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ThreeDMarquee.displayName = "ThreeDMarquee";

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-(--height) w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "bg-size-[var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "mask-exclude",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-(--width)",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "bg-size-[var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "mask-exclude",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};
