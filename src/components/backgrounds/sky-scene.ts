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
import {
  ANCHOR_TOLERANCE,
  isProbeKept,
  pickProbes,
  Probe,
  readPageKey,
} from "./sky-probes";
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

export const createSceneReader = () => {
  const cache = new Map<SkyZone, Geometry>();
  const range = document.createRange();
  const pageStyles = [document.documentElement, document.body].map((element) =>
    window.getComputedStyle(element),
  );
  let cachedZones: SkyZone[] | null = null;
  let cachedAt = -Infinity;
  let anchorX = NaN;
  let anchorY = NaN;
  let pageKey = "";
  let probes: Probe[] = [];
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
    const currentPageKey = readPageKey(pageStyles);
    if (
      isStale ||
      !isAnchorKept ||
      currentPageKey !== pageKey ||
      zones !== cachedZones ||
      now - cachedAt > MAX_CACHE_AGE_MS ||
      !probes.every((probe) =>
        isProbeKept({ probe, movers, x: scrollX, y: scrollY }),
      )
    ) {
      cache.clear();
      cachedZones = zones;
      cachedAt = now;
      anchorX = anchor.left + scrollX;
      anchorY = anchor.top + scrollY;
      pageKey = currentPageKey;
      isStale = false;
    }
    const candidates: Probe[] = [];
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
      if (!zone.isAnchored && isNear(box)) {
        candidates.push({ element: zone.element, box: geometry.box });
      }
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
    probes = pickProbes(candidates);
    return { rects, horizons: ellipses };
  };

  return { invalidate, read };
};
