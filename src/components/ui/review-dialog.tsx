"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useFocusReturn } from "@/hooks/use-focus-return";
import { handleReviewKeys } from "@/lib/review-keys";
import { cn } from "@/lib/utils";
import { ReviewSheetProps } from "@/types";
import { ReviewHeader } from "./review-header";
import { ReviewText } from "./review-text";

const ROUND_BUTTON =
  "flex cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition hover:scale-110 hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:transition-none motion-reduce:hover:scale-100";

export const ReviewDialog = ({
  person,
  title,
  cardId,
  onClose,
  navigation,
}: ReviewSheetProps) => {
  const focusReturn = useFocusReturn();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={person !== null} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-100 bg-black/60"
          />
        </Dialog.Overlay>
        {person ? (
          <div className="pointer-events-none fixed inset-0 z-1000 grid place-items-center px-4 sm:px-6">
            <Dialog.Content
              {...focusReturn}
              onKeyDown={handleReviewKeys(navigation)}
              className="pointer-events-auto relative w-full max-w-[500px] outline-none"
            >
              <Dialog.Title className="sr-only">{title}</Dialog.Title>
              <motion.div
                layoutId={`card-${person.name}-${cardId}`}
                className="relative flex max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-background"
              >
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close"
                    className={cn(
                      ROUND_BUTTON,
                      "absolute top-4 right-4 z-10 size-11",
                    )}
                  >
                    <X aria-hidden className="size-6" />
                  </button>
                </Dialog.Close>
                <div className="py-4 pr-18 pl-4">
                  <ReviewHeader
                    person={person}
                    imageSize={72}
                    imageClassName="size-18"
                    imageLayoutId={`image-${person.name}-${cardId}`}
                  />
                </div>
                <ReviewText className="px-4 text-sm lg:text-base">
                  {person.description}
                </ReviewText>
              </motion.div>
              {navigation ? (
                <>
                  <button
                    type="button"
                    onClick={navigation.onPrev}
                    aria-label="Previous review"
                    className={cn(
                      ROUND_BUTTON,
                      "absolute top-1/2 -left-14 size-12 -translate-y-1/2",
                    )}
                  >
                    <ArrowLeft aria-hidden className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={navigation.onNext}
                    aria-label="Next review"
                    className={cn(
                      ROUND_BUTTON,
                      "absolute top-1/2 -right-14 size-12 -translate-y-1/2",
                    )}
                  >
                    <ArrowRight aria-hidden className="size-6" />
                  </button>
                </>
              ) : null}
            </Dialog.Content>
          </div>
        ) : null}
      </Dialog.Portal>
    </Dialog.Root>
  );
};
