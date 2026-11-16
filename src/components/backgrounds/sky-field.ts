import { distanceTo, isUnderHorizon, SkyScene } from "./sky-scene";

type Rgb = readonly [number, number, number];

export type SkyLook = {
  top: number;
  bottom: number;
  depthFloor: number;
  gain: number;
};

type PaintSkyOptions = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  offsetY: number;
  fieldHeight: number;
  visibleTop: number;
  visibleBottom: number;
  scene: SkyScene;
  time: number;
  isStill: boolean;
  look: SkyLook;
};

type SweepBandOptions = {
  x: number;
  y: number;
  diagonal: number;
  sweep: number;
};

const PHONE_MAX_WIDTH = 640;
const NEUTRAL: Rgb = [214, 222, 240];
const PRIMARY_200: Rgb = [198, 214, 246];
const PRIMARY_300: Rgb = [157, 185, 242];
const PRIMARY_400: Rgb = [109, 154, 239];
const STAR_SHARE = 0.014;
const SWEEP_PERIOD_S = 18;
const SWEEP_SHARE = 0.62;
const SWEEP_BAND = 0.09;

const smooth = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const hash = (ix: number, iy: number, salt: number) => {
  let h = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + salt * 974711;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

const sweepCenter = (time: number) => {
  const progress = (time % SWEEP_PERIOD_S) / SWEEP_PERIOD_S;
  return progress > SWEEP_SHARE
    ? null
    : -0.15 + 1.3 * smooth(progress / SWEEP_SHARE);
};

const sweepBand = ({ x, y, diagonal, sweep }: SweepBandOptions) =>
  Math.max(
    0,
    1 - Math.abs((x * 0.53 + y * 0.85) / diagonal - sweep) / SWEEP_BAND,
  );

const dotLevel = (seed: number, phase: number, time: number) => {
  const wave =
    0.5 - 0.5 * Math.cos(2 * Math.PI * (time / (6 + 10 * seed) + phase));
  return smooth(wave);
};

export const paintSky = ({
  ctx,
  width,
  height,
  offsetY,
  fieldHeight,
  visibleTop,
  visibleBottom,
  scene,
  time,
  isStill,
  look,
}: PaintSkyOptions) => {
  ctx.clearRect(0, 0, width, height);
  const isPhone = width < PHONE_MAX_WIDTH;
  const spacing = isPhone ? 18 : 20;
  const pad = isPhone ? 20 : 24;
  const feather = isPhone ? 22 : 44;
  const reach = pad + feather * 2;
  const originX = ((width % spacing) + spacing) / 2;
  const sweep = isStill ? null : sweepCenter(time);
  const diagonal = width * 0.53 + height * 0.85;
  const firstRow = Math.max(
    0,
    Math.ceil((offsetY + visibleTop) / spacing - 0.5),
  );
  const lastRow = Math.floor((offsetY + visibleBottom) / spacing - 0.5);

  for (let iy = firstRow; iy <= lastRow; iy += 1) {
    const fieldY = spacing / 2 + iy * spacing;
    if (fieldY > fieldHeight) {
      break;
    }
    const y = fieldY - offsetY;
    const rowRects = scene.rects.filter(
      (rect) => rect.y0 - reach < y && rect.y1 + reach > y,
    );
    const depth = Math.max(look.depthFloor, Math.min(1, fieldY / fieldHeight));
    const tint = smooth((depth - 0.4) / 0.6);
    const base =
      (0.1 + 0.09 * depth ** 1.4) * (1 + 0.6 * tint) * (isPhone ? 1.3 : 1);
    const rowEdge =
      smooth(fieldY / look.top) * smooth((fieldHeight - fieldY) / look.bottom);

    for (let ix = 0, x = originX; x < width; ix += 1, x += spacing) {
      const distance = distanceTo(x, y, rowRects);
      const safe = smooth((distance - pad) / feather);
      if (safe <= 0.01 || isUnderHorizon(x, y, scene.horizons)) {
        continue;
      }
      const k = safe * rowEdge * smooth(x / 40) * smooth((width - x) / 40);
      const isStar = hash(ix, iy, 1) < STAR_SHARE;
      const level = isStill
        ? 0.4 + 0.2 * hash(ix, iy, 2)
        : dotLevel(hash(ix, iy, 2), hash(ix, iy, 3), time);
      const lit =
        sweep === null
          ? 0
          : sweepBand({ x, y, diagonal, sweep }) *
            (0.2 + 0.8 * (1 - smooth((distance - pad) / (feather * 2))));
      const tone = isStar
        ? PRIMARY_200
        : mix(mix(NEUTRAL, PRIMARY_300, tint), PRIMARY_400, level * 0.7);
      const rgb = mix(tone, PRIMARY_200, lit);
      const glow = isStar ? 0.35 + 0.5 * level : base * (0.15 + 1.7 * level);
      const alpha = Math.min(1, (glow * look.gain + 0.55 * lit) * k);
      if (alpha < 0.01) {
        continue;
      }
      ctx.fillStyle = `rgba(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0},${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(
        x,
        y,
        (isStar ? 1.3 : isPhone ? 0.95 : 1) + 0.35 * lit,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
  }
};
