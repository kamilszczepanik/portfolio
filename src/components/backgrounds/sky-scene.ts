import { SkyClip, SkyEdge } from "./sky-styles";
import { isTextNode, SkyZone } from "./sky-zones";

export type SkyRect = { x0: number; y0: number; x1: number; y1: number };

export type SkyEllipse = { cx: number; cy: number; a: number; b: number };

export type SkyScene = { rects: SkyRect[]; horizons: SkyEllipse[] };

type ClientBox = { left: number; top: number; right: number; bottom: number };

type EdgeBoxOptions = { box: ClientBox; edge: SkyEdge; size: number };

type TextBoxesOptions = {
  element: Element;
  bounds: ClientBox;
  range: Range;
};

type ReadSceneOptions = {
  origin: DOMRect;
  zones: SkyZone[];
  horizons: Element[];
  scale: number;
  isViewportBound: boolean;
};

type DistanceOptions = { x: number; y: number; rects: SkyRect[] };

type HorizonOptions = { x: number; y: number; horizons: SkyEllipse[] };

const VIEWPORT_MARGIN = 120;
const MIN_AREA = 4;
const HORIZON_CLEARANCE = 1.02;
const OPEN: ClientBox = {
  left: -Infinity,
  top: -Infinity,
  right: Infinity,
  bottom: Infinity,
};

const intersect = (a: ClientBox, b: ClientBox): ClientBox => ({
  left: Math.max(a.left, b.left),
  top: Math.max(a.top, b.top),
  right: Math.min(a.right, b.right),
  bottom: Math.min(a.bottom, b.bottom),
});

const clipBox = (clip: SkyClip | null): ClientBox => {
  if (!clip) {
    return OPEN;
  }
  const rect = clip.element.getBoundingClientRect();
  return {
    left: clip.x ? rect.left : -Infinity,
    top: clip.y ? rect.top : -Infinity,
    right: clip.x ? rect.right : Infinity,
    bottom: clip.y ? rect.bottom : Infinity,
  };
};

const edgeBox = ({ box, edge, size }: EdgeBoxOptions): ClientBox => ({
  left: edge === "right" ? box.right - size : box.left,
  top: edge === "bottom" ? box.bottom - size : box.top,
  right: edge === "left" ? box.left + size : box.right,
  bottom: edge === "top" ? box.top + size : box.bottom,
});

const textBoxes = ({ element, bounds, range }: TextBoxesOptions) => {
  const boxes: ClientBox[] = [];
  for (const node of Array.from(element.childNodes).filter(isTextNode)) {
    range.selectNodeContents(node);
    for (const rect of Array.from(range.getClientRects())) {
      boxes.push(intersect(rect, bounds));
    }
  }
  return boxes;
};

export const readScene = ({
  origin,
  zones,
  horizons,
  scale,
  isViewportBound,
}: ReadSceneOptions): SkyScene => {
  const viewportBottom = window.innerHeight + VIEWPORT_MARGIN;
  const range = document.createRange();
  const rects: SkyRect[] = [];
  const isNear = (box: ClientBox) =>
    !isViewportBound ||
    (box.bottom > -VIEWPORT_MARGIN && box.top < viewportBottom);
  const add = (box: ClientBox) => {
    const width = box.right - box.left;
    const height = box.bottom - box.top;
    if (width > 0 && height > 0 && width * height > MIN_AREA && isNear(box)) {
      rects.push({
        x0: (box.left - origin.left) / scale,
        y0: (box.top - origin.top) / scale,
        x1: (box.right - origin.left) / scale,
        y1: (box.bottom - origin.top) / scale,
      });
    }
  };
  for (const zone of zones) {
    const box = zone.element.getBoundingClientRect();
    const clip = clipBox(zone.clip);
    if (zone.kind === "box") {
      add(intersect(box, clip));
    } else if (zone.kind === "edge") {
      add(intersect(edgeBox({ box, edge: zone.edge, size: zone.size }), clip));
    } else if (isNear(box)) {
      const bounds = zone.isClipping ? intersect(box, clip) : clip;
      textBoxes({ element: zone.element, bounds, range }).forEach(add);
    }
  }
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

export const distanceTo = ({ x, y, rects }: DistanceOptions) => {
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

export const isUnderHorizon = ({ x, y, horizons }: HorizonOptions) =>
  horizons.some(
    ({ cx, cy, a, b }) =>
      ((x - cx) / a) ** 2 + ((y - cy) / b) ** 2 < HORIZON_CLEARANCE,
  );
