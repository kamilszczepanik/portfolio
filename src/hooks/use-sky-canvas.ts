import { RefObject, useEffect } from "react";
import { SkyLook } from "@/components/backgrounds/sky-field";
import { drawFrame } from "@/components/backgrounds/sky-frame";
import { createHush } from "@/components/backgrounds/sky-hush";
import { createSceneReader } from "@/components/backgrounds/sky-scene";
import {
  fitCanvas,
  throttle,
  watchSky,
} from "@/components/backgrounds/sky-watch";
import {
  collectLayout,
  SkyLayout,
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
    const hush = createHush();
    const movers = new Set<Element>();
    let layout: SkyLayout = { zones: [], horizons: [] };
    let isDirty = true;
    let isInView = isInDialog;
    let hasScrolled = false;
    let frameId = 0;
    let idleTimer = 0;
    let lastPaint = -Infinity;
    let width = 0;
    let height = 0;

    const resize = () => {
      ({ width, height } = fitCanvas({ canvas, ctx }));
    };

    const paint = (now: number) => {
      lastPaint = now;
      hasScrolled = false;
      const level = hush.step({ now, isStill });
      if (level === 0) {
        ctx.clearRect(0, 0, width, height);
        isDirty = true;
        reader.invalidate();
        return;
      }
      if (isDirty) {
        layout = collectLayout({ root: scope, field, hasOverlays: !isInDialog });
        isDirty = false;
      }
      drawFrame({
        ctx,
        canvas,
        field,
        scope,
        reader,
        ...layout,
        movers: [...movers],
        width,
        height,
        isInDialog,
        isStill,
        look,
        now,
        level,
      });
      movers.clear();
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
      if (hush.isActive()) {
        repaint();
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

    const collect = throttle({
      intervalMs: COLLECT_INTERVAL_MS,
      run: () => {
        isDirty = true;
        repaint();
      },
    });

    const recollect = () => {
      reader.invalidate();
      collect.call();
    };

    const relayout = () => {
      reader.invalidate();
      nudge();
    };

    const quiet = () => {
      hush.start();
      ctx.clearRect(0, 0, width, height);
      repaint();
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
      onPage: () => {
        reader.invalidate();
        repaint();
      },
      onLock: quiet,
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
      collect.cancel();
      stopWatching();
    };
  }, [fieldRef, canvasRef, isStill, look, isInDialog]);
};
