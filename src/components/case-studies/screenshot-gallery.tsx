"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { CaseStudyScreenshot } from "@/types";
import { cn } from "@/lib/utils";
import { ScreenshotLightbox } from "./screenshot-lightbox";

type ScreenshotGalleryProps = {
  screenshots: CaseStudyScreenshot[];
};

type ScreenshotButtonProps = {
  screenshot: CaseStudyScreenshot;
  sizes: string;
  isMain: boolean;
  onOpen: () => void;
};

const THUMB_COLUMNS: Record<number, string> = {
  1: "grid-cols-2 sm:grid-cols-4",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

const isPortrait = ({ image }: CaseStudyScreenshot) =>
  image.height > image.width;

const ScreenshotButton = ({
  screenshot,
  sizes,
  isMain,
  onOpen,
}: ScreenshotButtonProps) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={`Open full size: ${screenshot.alt}`}
    className={cn(
      "group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden border border-white/10 bg-[#070707] transition duration-300 hover:border-blue-500/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 motion-reduce:transition-none",
      isMain ? "rounded-2xl sm:rounded-[28px]" : "rounded-xl",
    )}
  >
    <Image
      src={screenshot.image}
      alt={screenshot.alt}
      fill
      sizes={sizes}
      priority={isMain}
      placeholder="blur"
      className={cn(
        "transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        isPortrait(screenshot)
          ? "object-contain py-2"
          : "object-cover object-top",
      )}
    />
    {isMain ? (
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white opacity-80 transition-opacity group-hover:opacity-100 motion-reduce:transition-none sm:right-4 sm:bottom-4"
      >
        <Expand className="size-4" />
      </span>
    ) : null}
  </button>
);

export const ScreenshotGallery = ({ screenshots }: ScreenshotGalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [main, ...thumbnails] = screenshots;

  if (!main) {
    return null;
  }

  return (
    <section aria-label="Screenshots" className="flex flex-col gap-3 sm:gap-4">
      <ScreenshotButton
        screenshot={main}
        sizes="(min-width: 1088px) 1024px, 100vw"
        isMain
        onOpen={() => setOpenIndex(0)}
      />
      {thumbnails.length > 0 ? (
        <ul
          className={cn(
            "grid gap-3 sm:gap-4",
            THUMB_COLUMNS[Math.min(thumbnails.length, 4)],
          )}
        >
          {thumbnails.map((screenshot, index) => (
            <li key={screenshot.image.src}>
              <ScreenshotButton
                screenshot={screenshot}
                sizes="(min-width: 640px) 256px, 50vw"
                isMain={false}
                onOpen={() => setOpenIndex(index + 1)}
              />
            </li>
          ))}
        </ul>
      ) : null}
      <ScreenshotLightbox
        screenshots={screenshots}
        openIndex={openIndex}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
};
