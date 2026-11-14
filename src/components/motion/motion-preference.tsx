"use client";

import { MotionConfig } from "motion/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type MotionPreference = {
  isPaused: boolean;
  togglePaused: () => void;
};

const STORAGE_KEY = "motion-paused";
const PAUSED_ATTRIBUTE = "data-motion-paused";

const MotionPreferenceContext = createContext<MotionPreference>({
  isPaused: false,
  togglePaused: () => undefined,
});

export const MotionPreferenceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsPaused(window.localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute(PAUSED_ATTRIBUTE, isPaused);
  }, [isPaused]);

  const togglePaused = useCallback(() => {
    const next = !isPaused;
    window.localStorage.setItem(STORAGE_KEY, String(next));
    setIsPaused(next);
  }, [isPaused]);

  const value = useMemo(
    () => ({ isPaused, togglePaused }),
    [isPaused, togglePaused],
  );

  return (
    <MotionPreferenceContext.Provider value={value}>
      <MotionConfig reducedMotion={isPaused ? "always" : "user"}>
        {children}
      </MotionConfig>
    </MotionPreferenceContext.Provider>
  );
};

export const useMotionPreference = () => useContext(MotionPreferenceContext);
