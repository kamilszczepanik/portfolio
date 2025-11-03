"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import React, { ComponentProps, useEffect, useRef, useState } from "react";

type PlayerProps = ComponentProps<typeof Player>;

interface LottiePlayerProps extends Omit<PlayerProps, "className" | "src"> {
  className?: string;
  playerClassName?: string;
  src?: PlayerProps["src"];
}

const LottiePlayer = ({
  className,
  autoplay = true,
  loop = true,
  renderer,
  src = "/animations/web-development.json",
  playerClassName = "w-full h-full object-contain",
  ...restProps
}: LottiePlayerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setShouldReduceMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const effectiveAutoplay = shouldReduceMotion ? false : autoplay;
  const effectiveLoop = shouldReduceMotion ? false : loop;

  return (
    <div
      ref={containerRef}
      className={`w-full ${className || ""}`}
      style={{ aspectRatio: "1 / 1", minHeight: "220px" }}
    >
      {isVisible && (
        <Player
          autoplay={effectiveAutoplay}
          loop={effectiveLoop}
          renderer={renderer}
          src={src}
          className={playerClassName}
          {...restProps}
        />
      )}
    </div>
  );
};

export default React.memo(LottiePlayer);
