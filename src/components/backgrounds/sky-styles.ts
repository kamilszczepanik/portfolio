export type SkyEdge = "top" | "right" | "bottom" | "left";

export type SkyClip = { element: Element; x: boolean; y: boolean };

type EdgeStyleOptions = { style: CSSStyleDeclaration; edge: SkyEdge };

type ClipOfOptions = { element: Element; style: CSSStyleDeclaration };

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

export const edgeWidth = ({ style, edge }: EdgeStyleOptions) =>
  parseFloat(style.getPropertyValue(`border-${edge}-width`)) || 0;

export const isVisibleEdge = ({ style, edge }: EdgeStyleOptions) =>
  edgeWidth({ style, edge }) > 0 &&
  !["none", "hidden"].includes(
    style.getPropertyValue(`border-${edge}-style`),
  ) &&
  alphaOf(style.getPropertyValue(`border-${edge}-color`)) > 0;

export const hasFill = (style: CSSStyleDeclaration) =>
  style.backgroundImage !== "none" || alphaOf(style.backgroundColor) > 0;

export const isClippingStyle = (style: CSSStyleDeclaration) =>
  style.overflowX !== "visible" ||
  style.overflowY !== "visible" ||
  style.clipPath !== "none";

export const clipOf = ({ element, style }: ClipOfOptions): SkyClip | null => {
  const x = style.overflowX !== "visible";
  const y = style.overflowY !== "visible";
  return x || y ? { element, x, y } : null;
};

export const isPositioned = (style: CSSStyleDeclaration) =>
  style.position !== "static" || style.transform !== "none";
