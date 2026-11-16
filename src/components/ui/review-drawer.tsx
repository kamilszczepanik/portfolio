"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useFocusReturn } from "@/hooks/use-focus-return";
import { handleReviewKeys } from "@/lib/review-keys";
import { cn } from "@/lib/utils";
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
        className={cn(
          "max-h-[90vh] border-muted-foreground outline-none",
          person?.banner && "overflow-hidden",
        )}
      >
        {person ? (
          <>
            <DrawerTitle className="sr-only">{title}</DrawerTitle>
            {person.banner ? (
              <div className="absolute inset-x-0 top-0 -z-10">
                {person.banner}
              </div>
            ) : null}
            <div
              className={cn(
                "flex gap-2 p-4 pb-2",
                person.banner ? "mt-10 items-end" : "items-center",
              )}
            >
              <div className="min-w-0 flex-1">
                <ReviewHeader
                  person={person}
                  imageSize={person.banner ? 72 : 60}
                  imageClassName={person.banner ? "size-18" : "size-15"}
                  className={person.banner ? "items-end" : undefined}
                />
              </div>
              <DrawerClose asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className={cn(
                    "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                    person.banner
                      ? "absolute top-3 right-3 bg-black/50 hover:bg-black/70"
                      : "bg-white/10 hover:bg-white/20",
                  )}
                >
                  <X aria-hidden className="size-5" />
                </button>
              </DrawerClose>
            </div>
            <ReviewText className="px-4 text-sm">
              {person.description}
            </ReviewText>
            {person.actions ? (
              <DrawerFooter className="flex-row gap-3 border-t border-white/10 pt-3">
                {person.actions}
              </DrawerFooter>
            ) : null}
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
