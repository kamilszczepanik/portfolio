export type SkyEdge = "top" | "right" | "bottom" | "left";

export type SkyZone =
  | { kind: "box"; element: Element }
  | { kind: "edge"; element: Element; edge: SkyEdge; size: number }
  | { kind: "text"; element: Element; isClipping: boolean };

type CollectZonesOptions = {
  root: HTMLElement;
  field: HTMLElement;
  hasOverlays: boolean;
};

type WalkOptions = {
  element: Element;
  field: HTMLElement;
  isCovered: boolean;
  zones: SkyZone[];
};

type EdgeStyleOptions = { style: CSSStyleDeclaration; edge: SkyEdge };

export const HORIZON_SELECTOR = "[data-sky-horizon]";
const LEAF_SELECTOR =
  "img,svg,video,canvas,picture,iframe,input,textarea,select";
const BOX_SELECTOR = "button,[role='button'],[data-sky-safe]";
const EXCLUDED_SELECTOR = `[data-sky-layer],[data-sky-skip],${HORIZON_SELECTOR}`;
const OVERLAY_SELECTOR = "[data-site-header]";
const EDGES: SkyEdge[] = ["top", "right", "bottom", "left"];
const OUT_OF_FLOW = new Set(["absolute", "fixed"]);

const alphaOf = (color: string) => {
  if (color === "transparent") {
    return 0;
  }
  const [, slashAlpha] = color.split("/");
  const commaParts = color.split(",");
  const alpha = parseFloat(
    slashAlpha ?? (commaParts.length === 4 ? commaParts[3] : "1"),
  );
  return Number.isNaN(alpha) ? 1 : alpha;
};

const edgeWidth = ({ style, edge }: EdgeStyleOptions) =>
  parseFloat(style.getPropertyValue(`border-${edge}-width`)) || 0;

const isVisibleEdge = ({ style, edge }: EdgeStyleOptions) =>
  edgeWidth({ style, edge }) > 0 &&
  !["none", "hidden"].includes(
    style.getPropertyValue(`border-${edge}-style`),
  ) &&
  alphaOf(style.getPropertyValue(`border-${edge}-color`)) > 0;

const hasFill = (style: CSSStyleDeclaration) =>
  style.backgroundImage !== "none" || alphaOf(style.backgroundColor) > 0;

const isClippingStyle = (style: CSSStyleDeclaration) =>
  style.overflowX !== "visible" ||
  style.overflowY !== "visible" ||
  style.clipPath !== "none";

export const isTextNode = (node: Node) =>
  node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim());

const walk = ({ element, field, isCovered, zones }: WalkOptions) => {
  if (element.matches(EXCLUDED_SELECTOR)) {
    return;
  }
  const style = window.getComputedStyle(element);
  const isFree = !isCovered || OUT_OF_FLOW.has(style.position);
  if (element.matches(LEAF_SELECTOR)) {
    if (isFree) {
      zones.push({ kind: "box", element });
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
    zones.push({ kind: "box", element });
  }
  if (isFree && !isBox) {
    edges.forEach((edge) =>
      zones.push({
        kind: "edge",
        element,
        edge,
        size: edgeWidth({ style, edge }),
      }),
    );
    if (Array.from(element.childNodes).some(isTextNode)) {
      zones.push({
        kind: "text",
        element,
        isClipping: isClippingStyle(style),
      });
    }
  }
  for (const child of Array.from(element.children)) {
    walk({ element: child, field, isCovered: !isFree || isBox, zones });
  }
};

export const collectZones = ({
  root,
  field,
  hasOverlays,
}: CollectZonesOptions) => {
  const zones: SkyZone[] = [];
  for (const element of Array.from(root.children)) {
    walk({ element, field, isCovered: false, zones });
  }
  if (hasOverlays) {
    document
      .querySelectorAll(OVERLAY_SELECTOR)
      .forEach((element) => zones.push({ kind: "box", element }));
  }
  return zones;
};
