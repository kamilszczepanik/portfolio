import type { KeyboardEvent } from "react";
import { ReviewNavigation } from "@/types";

export const handleReviewKeys =
  (navigation?: ReviewNavigation) => (event: KeyboardEvent<HTMLElement>) => {
    if (!navigation) {
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigation.onNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigation.onPrev();
    }
  };
