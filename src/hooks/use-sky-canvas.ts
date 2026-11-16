import { RefObject, useEffect } from "react";
import { paintSky, SkyEdges } from "@/components/backgrounds/sky-field";
import {
  collectSafeElements,
  HORIZON_SELECTOR,
  readScene,
} from "@/components/backgrounds/sky-scene";

type UseSkyCanvasOptions = {
  fieldRef: RefObject<HTMLElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  isStill: boolean;
  edges: SkyEdges;
};

const IDLE_FRAME_MS = 1000 / 30;
const MAX_PIXEL_RATIO = 2;

export const useSkyCanvas = ({
  fieldRef,
  canvasRef,
  isStill,
  edges,
}: UseSkyCanvasOptions) => {
  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!field || !canvas || !ctx) {
      return;
    }

    let safe: Element[] = [];
    let horizons: Element[] = [];
    let isDirty = true;
    let isInView = false;
    let hasScrolled = false;
    let frameId = 0;
    let lastPaint = -Infinity;
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(MAX_PIXEL_RATIO, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const paint = (now: number) => {
      if (isDirty) {
        safe = collectSafeElements(field);
        horizons = Array.from(field.querySelectorAll(HORIZON_SELECTOR));
        isDirty = false;
      }
      const origin = canvas.getBoundingClientRect();
      const fieldRect = field.getBoundingClientRect();
      lastPaint = now;
      hasScrolled = false;
      paintSky({
        ctx,
        width,
        height,
        offsetY: origin.top - fieldRect.top,
        fieldHeight: fieldRect.height,
        visibleTop: Math.max(0, -origin.top),
        visibleBottom: Math.min(height, window.innerHeight - origin.top),
        scene: readScene({ origin, safe, horizons }),
        time: now / 1000,
        isStill,
        edges,
      });
    };

    const isRunning = () => isInView && document.visibilityState === "visible";

    const tick = (now: number) => {
      frameId = 0;
      if (!isRunning()) {
        return;
      }
      if (hasScrolled || now - lastPaint >= IDLE_FRAME_MS) {
        paint(now);
      }
      if (!isStill) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const request = () => {
      if (!frameId && isRunning()) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const invalidate = () => {
      isDirty = true;
      hasScrolled = true;
      request();
    };

    const handleScroll = () => {
      hasScrolled = true;
      request();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      invalidate();
    });
    resizeObserver.observe(canvas);
    resizeObserver.observe(field);

    const mutationObserver = new MutationObserver(invalidate);
    mutationObserver.observe(field, { childList: true, subtree: true });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      request();
    });
    intersectionObserver.observe(field);

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", request);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", request);
    };
  }, [fieldRef, canvasRef, isStill, edges]);
};
