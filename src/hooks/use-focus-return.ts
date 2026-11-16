"use client";

import { useCallback, useRef } from "react";

type FocusOpener = {
  element: HTMLElement;
  key?: string;
};

const findMounted = ({ element, key }: FocusOpener) => {
  if (element.isConnected) {
    return element;
  }
  if (!key) {
    return null;
  }
  return document.querySelector<HTMLElement>(
    `[data-focus-key="${CSS.escape(key)}"]`,
  );
};

export const useFocusReturn = () => {
  const openerRef = useRef<FocusOpener | null>(null);

  const onOpenAutoFocus = useCallback(() => {
    const { activeElement } = document;
    openerRef.current =
      activeElement instanceof HTMLElement && activeElement !== document.body
        ? { element: activeElement, key: activeElement.dataset.focusKey }
        : null;
  }, []);

  const onCloseAutoFocus = useCallback((event: Event) => {
    const opener = openerRef.current;
    openerRef.current = null;
    const target = opener ? findMounted(opener) : null;
    if (!target) {
      return;
    }
    event.preventDefault();
    target.focus({ preventScroll: true });
  }, []);

  return { onOpenAutoFocus, onCloseAutoFocus };
};
