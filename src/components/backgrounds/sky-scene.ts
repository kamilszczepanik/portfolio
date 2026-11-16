import {
  ClientBox,
  clipBox,
  edgeBox,
  intersect,
  move,
  SkyEllipse,
  SkyRect,
  textBoxes,
} from "./sky-geometry";
import { SkyZone } from "./sky-zones";

export type SkyScene = { rects: SkyRect[]; horizons: SkyEllipse[] };

type Geometry = { box: ClientBox; clip: ClientBox; lines: ClientBox[] | null };

type ReadSceneOptions = {
  origin: DOMRect;
  anchor: DOMRect;
  zones: SkyZone[];
  horizons: Element[];
  movers: Element[];
  scale: number;
  isViewportBound: boolean;
  now: number;
};

const VIEWPORT_MARGIN = 120;
const MIN_AREA = 4;
const MAX_CACHE_AGE_MS = 1000;
const ANCHOR_TOLERANCE = 0.5;
export const createSceneReader = () => {
  const cache = new Map<SkyZone, Geometry>();
  const range = document.createRange();
  let cachedZones: SkyZone[] | null = null;
  let cachedAt = -Infinity;
  let anchorX = NaN;
  let anchorY = NaN;
  let isStale = true;

  const invalidate = () => {
    isStale = true;
  };

  const read = ({
    origin,
    anchor,
    zones,
    horizons,
    movers,
    scale,
    isViewportBound,
    now,
  }: ReadSceneOptions): SkyScene => {
    const { scrollX, scrollY } = window;
    const toDoc = (box: ClientBox) => move({ box, x: scrollX, y: scrollY });
    const toClient = (box: ClientBox) =>
      move({ box, x: -scrollX, y: -scrollY });
    const isAnchorKept =
      Math.abs(anchor.left + scrollX - anchorX) <= ANCHOR_TOLERANCE &&
      Math.abs(anchor.top + scrollY - anchorY) <= ANCHOR_TOLERANCE;
    if (
      isStale ||
      !isAnchorKept ||
      zones !== cachedZones ||
      now - cachedAt > MAX_CACHE_AGE_MS
    ) {
      cache.clear();
      cachedZones = zones;
      cachedAt = now;
      anchorX = anchor.left + scrollX;
      anchorY = anchor.top + scrollY;
      isStale = false;
    }
    const viewportBottom = window.innerHeight + VIEWPORT_MARGIN;
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
      const isMoving =
        zone.isAnchored || movers.some((mover) => mover.contains(zone.element));
      let geometry = isMoving ? undefined : cache.get(zone);
      if (!geometry) {
        geometry = {
          box: toDoc(zone.element.getBoundingClientRect()),
          clip: toDoc(clipBox(zone.clip)),
          lines: null,
        };
        cache.set(zone, geometry);
      }
      const box = toClient(geometry.box);
      const clip = toClient(geometry.clip);
      if (zone.kind === "box") {
        add(intersect(box, clip));
      } else if (zone.kind === "edge") {
        add(
          intersect(edgeBox({ box, edge: zone.edge, size: zone.size }), clip),
        );
      } else if (isNear(box)) {
        geometry.lines ??= textBoxes({ element: zone.element, range }).map(
          toDoc,
        );
        const bounds = zone.isClipping ? intersect(box, clip) : clip;
        geometry.lines.forEach((line) =>
          add(intersect(toClient(line), bounds)),
        );
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

  return { invalidate, read };
};
