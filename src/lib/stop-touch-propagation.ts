import { TouchEvent } from "react";

export const stopTouchPropagation = (event: TouchEvent) =>
  event.stopPropagation();
