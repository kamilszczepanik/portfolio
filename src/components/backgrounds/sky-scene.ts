export type SkyRect = { x0: number; y0: number; x1: number; y1: number };

export type SkyEllipse = { cx: number; cy: number; a: number; b: number };

export type SkyScene = { rects: SkyRect[]; horizons: SkyEllipse[] };

type ReadSceneOptions = {
  origin: DOMRect;
  safe: Element[];
  horizons: Element[];
  scale: number;
  isViewportBound: boolean;
};

type CollectSafeOptions = {
  root: HTMLElement;
  hasOverlays: boolean;
};

const SAFE_SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,span,ol,ul,dl,figure,article,blockquote,a,button,img,svg,picture,video,header,footer,nav,form,table,[data-sky-safe]";
export const HORIZON_SELECTOR = "[data-sky-horizon]";
const SKY_LAYER_SELECTOR = "[data-sky-layer]";
const SKIP_SELECTOR = "[data-sky-skip]";
const OVERLAY_SELECTOR = "[data-site-header]";
const HORIZON_CLEARANCE = 1.02;

export const collectSafeElements = ({
  root,
  hasOverlays,
}: CollectSafeOptions) => [
  ...Array.from(root.querySelectorAll(SAFE_SELECTOR)).filter((element) => {
    if (
      element.closest(
        `${SKY_LAYER_SELECTOR},${HORIZON_SELECTOR},${SKIP_SELECTOR}`,
      )
    ) {
      return false;
    }
    const parent = element.parentElement?.closest(SAFE_SELECTOR);
    return !parent || !root.contains(parent);
  }),
  ...(hasOverlays
    ? Array.from(document.querySelectorAll(OVERLAY_SELECTOR))
    : []),
];

export const readScene = ({
  origin,
  safe,
  horizons,
  scale,
  isViewportBound,
}: ReadSceneOptions) => {
  const viewportHeight = window.innerHeight;
  const rects = safe
    .map((element) => element.getBoundingClientRect())
    .filter(
      (rect) =>
        rect.width * rect.height > 4 &&
        (!isViewportBound ||
          (rect.bottom > -120 && rect.top < viewportHeight + 120)),
    )
    .map((rect) => ({
      x0: (rect.left - origin.left) / scale,
      y0: (rect.top - origin.top) / scale,
      x1: (rect.right - origin.left) / scale,
      y1: (rect.bottom - origin.top) / scale,
    }));
  const ellipses = horizons.map((element) => {
    const rect = element.getBoundingClientRect();
    return {
      cx: (rect.left + rect.width / 2 - origin.left) / scale,
      cy: (rect.top + rect.height / 2 - origin.top) / scale,
      a: rect.width / 2 / scale,
      b: rect.height / 2 / scale,
    };
  });
  return { rects, horizons: ellipses };
};

export const distanceTo = (x: number, y: number, rects: SkyRect[]) => {
  let nearest = Infinity;
  for (const rect of rects) {
    const dx = Math.max(rect.x0 - x, 0, x - rect.x1);
    const dy = Math.max(rect.y0 - y, 0, y - rect.y1);
    const squared = dx * dx + dy * dy;
    if (squared < nearest) {
      nearest = squared;
    }
  }
  return Math.sqrt(nearest);
};

export const isUnderHorizon = (x: number, y: number, horizons: SkyEllipse[]) =>
  horizons.some(
    ({ cx, cy, a, b }) =>
      ((x - cx) / a) ** 2 + ((y - cy) / b) ** 2 < HORIZON_CLEARANCE,
  );
