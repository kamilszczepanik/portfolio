import { ClientBox, move } from "./sky-geometry";

export type Probe = { element: Element; box: ClientBox };

type ProbeCheckOptions = {
  probe: Probe;
  movers: Element[];
  x: number;
  y: number;
};

export const ANCHOR_TOLERANCE = 0.5;
const SPREAD_PROBES = 6;
const CENTRE_PROBES = 4;
const SIDES = ["left", "top", "right", "bottom"] as const;

export const readPageKey = (styles: CSSStyleDeclaration[]) => {
  const root = document.documentElement;
  const viewport = window.visualViewport;
  return [
    root.scrollWidth,
    root.scrollHeight,
    window.innerWidth - root.clientWidth,
    viewport?.width,
    viewport?.height,
    viewport?.scale,
    ...styles.flatMap((style) => [
      style.position,
      style.overflowX,
      style.overflowY,
      style.top,
      style.marginRight,
      style.paddingRight,
      style.scrollbarGutter,
    ]),
  ].join("|");
};

export const isProbeKept = ({ probe, movers, x, y }: ProbeCheckOptions) => {
  if (movers.some((mover) => mover.contains(probe.element))) {
    return true;
  }
  const box = move({ box: probe.element.getBoundingClientRect(), x, y });
  return SIDES.every(
    (side) => Math.abs(box[side] - probe.box[side]) <= ANCHOR_TOLERANCE,
  );
};

export const pickProbes = (candidates: Probe[]) => {
  const centre = window.scrollY + window.innerHeight / 2;
  const offset = ({ box }: Probe) =>
    Math.abs((box.top + box.bottom) / 2 - centre);
  const nearest = [...candidates]
    .sort((a, b) => offset(a) - offset(b))
    .slice(0, CENTRE_PROBES);
  const step = Math.max(1, candidates.length / SPREAD_PROBES);
  const spread = Array.from(
    { length: Math.min(SPREAD_PROBES, candidates.length) },
    (_, index) => candidates[Math.floor(index * step)],
  );
  return [...new Set([...nearest, ...spread])];
};
