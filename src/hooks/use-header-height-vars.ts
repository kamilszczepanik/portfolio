"use client";

import { RefObject, useEffect } from "react";

type HeaderHeightRefs = {
  headerRef: RefObject<HTMLElement | null>;
  bannerRef: RefObject<HTMLElement | null>;
};

const HEADER_VARS = ["--site-header-h", "--banner-h", "--section-nav-h"];

const setRootVar = (name: string, px: number) =>
  document.documentElement.style.setProperty(name, `${px}px`);

const clearRootVars = () =>
  HEADER_VARS.forEach((name) =>
    document.documentElement.style.removeProperty(name),
  );

export const useHeaderHeightVars = ({
  headerRef,
  bannerRef,
}: HeaderHeightRefs) => {
  useEffect(() => {
    const header = headerRef.current;
    const banner = bannerRef.current;
    if (!header || !banner) {
      return;
    }
    const publish = () => {
      const headerHeight = header.offsetHeight;
      const bannerHeight = banner.offsetHeight;
      setRootVar("--site-header-h", headerHeight);
      setRootVar("--banner-h", bannerHeight);
      setRootVar("--section-nav-h", headerHeight - bannerHeight);
    };
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(header);
    observer.observe(banner);
    return () => {
      observer.disconnect();
      clearRootVars();
    };
  }, [headerRef, bannerRef]);
};
