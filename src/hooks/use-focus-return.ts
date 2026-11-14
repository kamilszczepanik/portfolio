"use client";

import { useCallback, useRef } from "react";

export const useFocusReturn = () => {
  const openerRef = useRef<HTMLElement | null>(null);

  const onOpenAutoFocus = useCallback(() => {
    const { activeElement } = document;
    openerRef.current =
      activeElement instanceof HTMLElement && activeElement !== document.body
        ? activeElement
        : null;
  }, []);

  const onCloseAutoFocus = useCallback((event: Event) => {
    const opener = openerRef.current;
    openerRef.current = null;
    if (!opener?.isConnected) {
      return;
    }
    event.preventDefault();
    opener.focus();
  }, []);

  return { onOpenAutoFocus, onCloseAutoFocus };
};
