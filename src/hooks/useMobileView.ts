import { useEffect, useState } from "react";

const TABLET_MAX_WIDTH = 768;
export const PHONE_MAX_WIDTH = 639;

export const useMobileView = (maxWidth = TABLET_MAX_WIDTH) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [maxWidth]);

  return isMobile;
};
