"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { CaseStudyScreenshot } from "@/types";

type ScreenshotLightboxProps = {
  screenshots: CaseStudyScreenshot[];
  openIndex: number | null;
  onIndexChange: (index: number | null) => void;
};

const ROUND_BUTTON =
  "flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:transition-none";

const STEP_BY_KEY: Record<string, number> = {
  ArrowRight: 1,
  ArrowLeft: -1,
};

export const ScreenshotLightbox = ({
  screenshots,
  openIndex,
  onIndexChange,
}: ScreenshotLightboxProps) => {
  const count = screenshots.length;
  const current = openIndex === null ? undefined : screenshots[openIndex];
  const hasSteps = count > 1;

  const step = (offset: number) => {
    if (openIndex === null) {
      return;
    }
    onIndexChange((openIndex + offset + count) % count);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const offset = STEP_BY_KEY[event.key];
    if (!offset || !hasSteps) {
      return;
    }
    event.preventDefault();
    step(offset);
  };

  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onIndexChange(null);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onIndexChange(null);
    }
  };

  return (
    <Dialog.Root open={current !== undefined} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm" />
        {current && openIndex !== null ? (
          <Dialog.Content
            onKeyDown={handleKeyDown}
            onClick={closeOnBackdrop}
            className="fixed inset-0 z-50 grid grid-rows-[auto_minmax(0,1fr)_auto] gap-3 p-3 outline-none sm:gap-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Dialog.Title className="text-sm font-medium text-neutral-300">
                {`Screenshot ${openIndex + 1} of ${count}`}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className={ROUND_BUTTON}
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </Dialog.Close>
            </div>
            <div className="relative mx-auto h-full w-full max-w-7xl">
              <Image
                key={openIndex}
                src={current.image}
                alt=""
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
              {hasSteps ? (
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={() => step(-1)}
                  className={ROUND_BUTTON}
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
              ) : null}
              <Dialog.Description className="flex-1 text-center text-sm text-neutral-200">
                {current.alt}
              </Dialog.Description>
              {hasSteps ? (
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={() => step(1)}
                  className={ROUND_BUTTON}
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
              ) : null}
            </div>
          </Dialog.Content>
        ) : null}
      </Dialog.Portal>
    </Dialog.Root>
  );
};
