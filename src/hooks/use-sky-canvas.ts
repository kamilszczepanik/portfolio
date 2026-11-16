import { RefObject, useEffect } from "react";
import { paintSky, SkyLook } from "@/components/backgrounds/sky-field";
import { readScene } from "@/components/backgrounds/sky-scene";
import {
  collectZones,
  HORIZON_SELECTOR,
  SkyZone,
} from "@/components/backgrounds/sky-zones";

type UseSkyCanvasOptions = {
  fieldRef: RefObject<HTMLElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  isStill: boolean;
  look: SkyLook;
  isInDialog: boolean;
};

const IDLE_FRAME_MS = 1000 / 30;
const MAX_PIXEL_RATIO = 2;
const COLLECT_INTERVAL_MS = 250;
const DIALOG_SELECTOR = '[role="dialog"]';

export const useSkyCanvas = ({
  fieldRef,
  canvasRef,
  isStill,
  look,
  isInDialog,
}: UseSkyCanvasOptions) => {
  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!field || !canvas || !ctx) {
      return;
    }

    const scope = isInDialog
      ? (field.closest<HTMLElement>(DIALOG_SELECTOR) ?? field)
      : field;
    let zones: SkyZone[] = [];
    let horizons: Element[] = [];
    let isDirty = true;
    let isInView = isInDialog;
    let hasScrolled = false;
    let frameId = 0;
    let lastPaint = -Infinity;
    let collectTimer = 0;
    let isPending = false;
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
        zones = collectZones({
          root: scope,
          field,
          hasOverlays: !isInDialog,
        });
        horizons = Array.from(field.querySelectorAll(HORIZON_SELECTOR));
        isDirty = false;
      }
      const origin = canvas.getBoundingClientRect();
      const fieldRect = field.getBoundingClientRect();
      const scale = width > 0 && origin.width > 0 ? origin.width / width : 1;
      lastPaint = now;
      hasScrolled = false;
      paintSky({
        ctx,
        width,
        height,
        offsetY: (origin.top - fieldRect.top) / scale,
        fieldHeight: fieldRect.height / scale,
        visibleTop: isInDialog ? 0 : Math.max(0, -origin.top),
        visibleBottom: isInDialog
          ? height
          : Math.min(height, window.innerHeight - origin.top),
        scene: readScene({
          origin,
          zones,
          horizons,
          scale,
          isViewportBound: !isInDialog,
        }),
        time: now / 1000,
        isStill,
        look,
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

    const handleScroll = () => {
      hasScrolled = true;
      request();
    };

    const invalidate = () => {
      if (collectTimer) {
        isPending = true;
        return;
      }
      isDirty = true;
      handleScroll();
      collectTimer = window.setTimeout(() => {
        collectTimer = 0;
        if (isPending) {
          isPending = false;
          invalidate();
        }
      }, COLLECT_INTERVAL_MS);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      handleScroll();
      invalidate();
    });
    resizeObserver.observe(canvas);
    resizeObserver.observe(field);

    const mutationObserver = new MutationObserver(invalidate);
    mutationObserver.observe(scope, { childList: true, subtree: true });

    const intersectionObserver = isInDialog
      ? null
      : new IntersectionObserver(([entry]) => {
          isInView = entry.isIntersecting;
          request();
        });
    intersectionObserver?.observe(field);

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", request);
    request();

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(collectTimer);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", request);
    };
  }, [fieldRef, canvasRef, isStill, look, isInDialog]);
};
