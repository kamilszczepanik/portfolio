import { useEffect, useState } from "react";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

export const useCanHover = () => {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(HOVER_QUERY);
    const handleChange = () => setCanHover(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return canHover;
};
