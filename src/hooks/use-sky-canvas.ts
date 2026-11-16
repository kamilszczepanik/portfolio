import { RefObject, useEffect } from "react";
import { scanAnimations } from "@/components/backgrounds/sky-activity";
import { paintSky, SkyLook } from "@/components/backgrounds/sky-field";
import { createSceneReader } from "@/components/backgrounds/sky-scene";
import { fitCanvas, watchSky } from "@/components/backgrounds/sky-watch";
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
const FRAME_LEAD_MS = 8;
const FRAME_SLACK_MS = 2;
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
    const reader = createSceneReader();
    const movers = new Set<Element>();
    let zones: SkyZone[] = [];
    let horizons: Element[] = [];
    let isDirty = true;
    let isInView = isInDialog;
    let hasScrolled = false;
    let frameId = 0;
    let idleTimer = 0;
    let lastPaint = -Infinity;
    let collectTimer = 0;
    let isPending = false;
    let width = 0;
    let height = 0;

    const resize = () => {
      ({ width, height } = fitCanvas({ canvas, ctx }));
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
      const animations = scanAnimations(scope);
      if (animations.isLayout) {
        reader.invalidate();
      }
      const scale = width > 0 && origin.width > 0 ? origin.width / width : 1;
      const scene = reader.read({
        origin,
        anchor: fieldRect,
        zones,
        horizons,
        movers: [...animations.movers, ...movers],
        scale,
        isViewportBound: !isInDialog,
        now,
      });
      movers.clear();
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
        scene,
        time: now / 1000,
        isStill,
        look,
      });
    };

    const isRunning = () => isInView && document.visibilityState === "visible";

    const request = () => {
      if (!frameId && isRunning()) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const tick = (now: number) => {
      frameId = 0;
      if (!isRunning()) {
        return;
      }
      if (hasScrolled || now - lastPaint >= IDLE_FRAME_MS - FRAME_SLACK_MS) {
        paint(now);
      }
      if (!isStill) {
        const due = lastPaint + IDLE_FRAME_MS - FRAME_LEAD_MS;
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(
          request,
          Math.max(0, due - performance.now()),
        );
      }
    };

    const repaint = () => {
      hasScrolled = true;
      request();
    };

    const nudge = () => (isStill ? repaint() : undefined);

    const recollect = () => {
      reader.invalidate();
      if (collectTimer) {
        isPending = true;
        return;
      }
      isDirty = true;
      repaint();
      collectTimer = window.setTimeout(() => {
        collectTimer = 0;
        if (isPending) {
          isPending = false;
          recollect();
        }
      }, COLLECT_INTERVAL_MS);
    };

    const relayout = () => {
      reader.invalidate();
      nudge();
    };

    resize();

    const stopWatching = watchSky({
      scope,
      field,
      canvas,
      isViewportBound: !isInDialog,
      onResize: () => {
        resize();
        repaint();
        recollect();
      },
      onTree: recollect,
      onLayout: relayout,
      onMovers: (changed) => {
        changed.forEach((mover) => movers.add(mover));
        nudge();
      },
      onScroll: repaint,
      onView: (isVisible) => {
        isInView = isVisible;
        request();
      },
      onVisibility: request,
    });
    request();

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(idleTimer);
      window.clearTimeout(collectTimer);
      stopWatching();
    };
  }, [fieldRef, canvasRef, isStill, look, isInDialog]);
};
