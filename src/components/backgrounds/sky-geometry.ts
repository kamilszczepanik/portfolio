import { SkyClip, SkyEdge } from "./sky-styles";
import { isTextNode } from "./sky-zones";

export type SkyRect = { x0: number; y0: number; x1: number; y1: number };

export type SkyEllipse = { cx: number; cy: number; a: number; b: number };

export type ClientBox = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type EdgeBoxOptions = { box: ClientBox; edge: SkyEdge; size: number };

type TextBoxesOptions = { element: Element; range: Range };

type MoveOptions = { box: ClientBox; x: number; y: number };

type DistanceOptions = { x: number; y: number; rects: SkyRect[] };

type HorizonOptions = { x: number; y: number; horizons: SkyEllipse[] };

const HORIZON_CLEARANCE = 1.02;
const OPEN: ClientBox = {
  left: -Infinity,
  top: -Infinity,
  right: Infinity,
  bottom: Infinity,
};

export const move = ({ box, x, y }: MoveOptions): ClientBox => ({
  left: box.left + x,
  top: box.top + y,
  right: box.right + x,
  bottom: box.bottom + y,
});

export const intersect = (a: ClientBox, b: ClientBox): ClientBox => ({
  left: Math.max(a.left, b.left),
  top: Math.max(a.top, b.top),
  right: Math.min(a.right, b.right),
  bottom: Math.min(a.bottom, b.bottom),
});

export const clipBox = (clip: SkyClip | null): ClientBox => {
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

export const edgeBox = ({ box, edge, size }: EdgeBoxOptions): ClientBox => ({
  left: edge === "right" ? box.right - size : box.left,
  top: edge === "bottom" ? box.bottom - size : box.top,
  right: edge === "left" ? box.left + size : box.right,
  bottom: edge === "top" ? box.top + size : box.bottom,
});

export const textBoxes = ({ element, range }: TextBoxesOptions) => {
  const boxes: ClientBox[] = [];
  for (const node of Array.from(element.childNodes).filter(isTextNode)) {
    range.selectNodeContents(node);
    boxes.push(...Array.from(range.getClientRects()));
  }
  return boxes;
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
