import {
  clipOf,
  edgeWidth,
  hasFill,
  isClippingStyle,
  isPositioned,
  isVisibleEdge,
  SkyClip,
  SkyEdge,
} from "./sky-styles";

type ZoneBase = {
  element: Element;
  clip: SkyClip | null;
  isAnchored: boolean;
};

export type SkyZone = ZoneBase &
  (
    | { kind: "box" }
    | { kind: "edge"; edge: SkyEdge; size: number }
    | { kind: "text"; isClipping: boolean }
  );

export type SkyLayout = { zones: SkyZone[]; horizons: Element[] };

type CollectZonesOptions = {
  root: HTMLElement;
  field: HTMLElement;
  hasOverlays: boolean;
};

type WalkContext = {
  isCovered: boolean;
  isAnchored: boolean;
  clip: SkyClip | null;
  absoluteClip: SkyClip | null;
};

type WalkOptions = {
  element: Element;
  field: HTMLElement;
  context: WalkContext;
  zones: SkyZone[];
};

type StyleContextOptions = { style: CSSStyleDeclaration; context: WalkContext };

type FindOverlaysOptions = {
  element: Element;
  field: HTMLElement;
  overlays: Element[];
};

export const HORIZON_SELECTOR = "[data-sky-horizon]";
const LEAF_SELECTOR =
  "img,svg,video,canvas,picture,iframe,input,textarea,select";
const BOX_SELECTOR = "button,[role='button'],[data-sky-safe]";
const EXCLUDED_SELECTOR = `[data-sky-layer],[data-sky-skip],${HORIZON_SELECTOR}`;
const OVERLAY_SELECTOR = "[data-site-header]";
const EDGES: SkyEdge[] = ["top", "right", "bottom", "left"];
const OUT_OF_FLOW = new Set(["absolute", "fixed"]);
const ANCHORED = new Set(["fixed", "sticky"]);

const ownClip = ({ style, context }: StyleContextOptions) =>
  style.position === "fixed"
    ? null
    : style.position === "absolute"
      ? context.absoluteClip
      : context.clip;

const isDecorative = (element: Element) =>
  element.getAttribute("aria-hidden") === "true" &&
  !element.matches(LEAF_SELECTOR) &&
  !element.textContent?.trim() &&
  !element.querySelector(LEAF_SELECTOR);

const FREE_CONTEXT: WalkContext = {
  isCovered: false,
  isAnchored: false,
  clip: null,
  absoluteClip: null,
};

const OVERLAY_CONTEXT: WalkContext = { ...FREE_CONTEXT, isAnchored: true };

export const isTextNode = (node: Node) =>
  node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim());

const walk = ({ element, field, context, zones }: WalkOptions) => {
  if (element.matches(EXCLUDED_SELECTOR) || isDecorative(element)) {
    return;
  }
  const style = window.getComputedStyle(element);
  const clip = ownClip({ style, context });
  const isAnchored = context.isAnchored || ANCHORED.has(style.position);
  const isFree = !context.isCovered || OUT_OF_FLOW.has(style.position);
  if (element.matches(LEAF_SELECTOR)) {
    if (isFree) {
      zones.push({ kind: "box", element, clip, isAnchored });
    }
    return;
  }
  const isAround = element.contains(field);
  const isDrawn = !isAround && style.pointerEvents !== "none";
  const edges = isDrawn
    ? EDGES.filter((edge) => isVisibleEdge({ style, edge }))
    : [];
  const isBox =
    !isAround &&
    (element.matches(BOX_SELECTOR) ||
      (isDrawn && (hasFill(style) || edges.length === EDGES.length)));
  if (isFree && isBox) {
    zones.push({ kind: "box", element, clip, isAnchored });
  }
  if (isFree && !isBox) {
    edges.forEach((edge) =>
      zones.push({
        kind: "edge",
        element,
        clip,
        isAnchored,
        edge,
        size: edgeWidth({ style, edge }),
      }),
    );
    if (Array.from(element.childNodes).some(isTextNode)) {
      zones.push({
        kind: "text",
        element,
        clip,
        isAnchored,
        isClipping: isClippingStyle(style),
      });
    }
  }
  const innerClip = clipOf({ element, style }) ?? clip;
  const childContext: WalkContext = {
    isCovered: !isFree || isBox,
    isAnchored,
    clip: innerClip,
    absoluteClip: isPositioned(style) ? innerClip : context.absoluteClip,
  };
  for (const child of Array.from(element.children)) {
    walk({ element: child, field, context: childContext, zones });
  }
};

const findOverlays = ({ element, field, overlays }: FindOverlaysOptions) => {
  for (const child of Array.from(element.children)) {
    if (child === field || child.matches(EXCLUDED_SELECTOR)) {
      continue;
    }
    if (ANCHORED.has(window.getComputedStyle(child).position)) {
      overlays.push(child);
    } else if (!child.matches(LEAF_SELECTOR)) {
      findOverlays({ element: child, field, overlays });
    }
  }
};

export const collectZones = ({
  root,
  field,
  hasOverlays,
}: CollectZonesOptions) => {
  const zones: SkyZone[] = [];
  for (const element of Array.from(root.children)) {
    walk({ element, field, context: FREE_CONTEXT, zones });
  }
  if (hasOverlays) {
    const overlays: Element[] = [];
    findOverlays({ element: document.body, field, overlays });
    for (const element of overlays) {
      if (element.matches(OVERLAY_SELECTOR)) {
        zones.push({ kind: "box", element, clip: null, isAnchored: true });
      } else {
        walk({ element, field, context: OVERLAY_CONTEXT, zones });
      }
    }
  }
  return zones;
};

export const collectLayout = (options: CollectZonesOptions): SkyLayout => ({
  zones: collectZones(options),
  horizons: Array.from(options.field.querySelectorAll(HORIZON_SELECTOR)),
});
