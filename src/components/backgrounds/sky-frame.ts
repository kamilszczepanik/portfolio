import { scanAnimations } from "./sky-activity";
import { paintSky, SkyLook } from "./sky-field";
import { createSceneReader } from "./sky-scene";
import { SkyZone } from "./sky-zones";

type DrawFrameOptions = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  field: HTMLElement;
  scope: HTMLElement;
  reader: ReturnType<typeof createSceneReader>;
  zones: SkyZone[];
  horizons: Element[];
  movers: Element[];
  width: number;
  height: number;
  isInDialog: boolean;
  isStill: boolean;
  look: SkyLook;
  now: number;
  level: number;
};

export const drawFrame = ({
  ctx,
  canvas,
  field,
  scope,
  reader,
  zones,
  horizons,
  movers,
  width,
  height,
  isInDialog,
  isStill,
  look,
  now,
  level,
}: DrawFrameOptions) => {
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
  ctx.globalAlpha = level;
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
  ctx.globalAlpha = 1;
};
