"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useFocusReturn } from "@/hooks/use-focus-return";
import { handleReviewKeys } from "@/lib/review-keys";
import { ReviewSheetProps } from "@/types";
import { Button } from "./button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from "./drawer";
import { ReviewHeader } from "./review-header";
import { ReviewText } from "./review-text";

export const ReviewDrawer = ({
  person,
  title,
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
    <Drawer open={person !== null} onOpenChange={handleOpenChange} autoFocus>
      <DrawerContent
        {...focusReturn}
        onKeyDown={handleReviewKeys(navigation)}
        className="max-h-[90vh] border-muted-foreground outline-none"
      >
        {person ? (
          <>
            <DrawerTitle className="sr-only">{title}</DrawerTitle>
            <div className="flex items-center gap-2 p-4 pb-2">
              <div className="min-w-0 flex-1">
                <ReviewHeader
                  person={person}
                  imageSize={60}
                  imageClassName="size-15"
                />
              </div>
              <DrawerClose asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </DrawerClose>
            </div>
            <ReviewText className="px-4 text-sm">
              {person.description}
            </ReviewText>
            {navigation ? (
              <DrawerFooter className="flex-row justify-between pt-2">
                <Button
                  type="button"
                  variant="muted"
                  onClick={navigation.onPrev}
                  aria-label="Previous review"
                >
                  <ArrowLeft aria-hidden className="size-4" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="muted"
                  onClick={navigation.onNext}
                  aria-label="Next review"
                >
                  Next
                  <ArrowRight aria-hidden className="size-4" />
                </Button>
              </DrawerFooter>
            ) : null}
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};
