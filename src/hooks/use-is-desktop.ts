import { useState, useEffect } from "react";

export const useIsDesktop = (breakpoint = 768) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, [breakpoint]);

  return { isMounted, isDesktop };
};
