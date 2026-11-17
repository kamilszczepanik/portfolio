"use client";

import { PointerEvent, useRef } from "react";

type TapToggleOptions = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useTapToggle = ({ isOpen, setIsOpen }: TapToggleOptions) => {
  const pointerRef = useRef({ type: "", wasOpen: false });

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    pointerRef.current = { type: event.pointerType, wasOpen: isOpen };
  };

  const onClick = () => {
    const { type, wasOpen } = pointerRef.current;
    pointerRef.current = { type: "", wasOpen: false };
    setIsOpen(type === "mouse" || !wasOpen);
  };

  return { onPointerDown, onClick };
};
