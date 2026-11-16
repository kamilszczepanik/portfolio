import { PHONE_MAX_WIDTH } from "@/hooks/useMobileView";
import {
  hash,
  NEUTRAL,
  PRIMARY_300,
  type Rgb,
  smooth,
} from "@/lib/sky-math.mjs";
import { distanceTo, isUnderHorizon } from "./sky-geometry";
import { SkyScene } from "./sky-scene";

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

type MixOptions = { from: Rgb; to: Rgb; amount: number };

type DotLevelOptions = { seed: number; phase: number; time: number };

type Clearance = { spacing: number; pad: number; feather: number };

type SweepBandOptions = {
  x: number;
  y: number;
  diagonal: number;
  sweep: number;
};

const TABLET_MAX_WIDTH = 1023;
const PHONE_CLEARANCE: Clearance = { spacing: 18, pad: 12, feather: 16 };
const TABLET_CLEARANCE: Clearance = { spacing: 20, pad: 16, feather: 28 };
const DESKTOP_CLEARANCE: Clearance = { spacing: 20, pad: 24, feather: 44 };
const PRIMARY_200: Rgb = [198, 214, 246];
const PRIMARY_400: Rgb = [109, 154, 239];
const SWEEP_PERIOD_S = 18;
const SWEEP_SHARE = 0.62;
const SWEEP_BAND = 0.09;

const mix = ({ from, to, amount }: MixOptions): Rgb => [
  from[0] + (to[0] - from[0]) * amount,
  from[1] + (to[1] - from[1]) * amount,
  from[2] + (to[2] - from[2]) * amount,
];

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

const clearanceFor = (width: number) =>
  width <= PHONE_MAX_WIDTH
    ? PHONE_CLEARANCE
    : width <= TABLET_MAX_WIDTH
      ? TABLET_CLEARANCE
      : DESKTOP_CLEARANCE;

const dotLevel = ({ seed, phase, time }: DotLevelOptions) => {
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
  const isPhone = width <= PHONE_MAX_WIDTH;
  const { spacing, pad, feather } = clearanceFor(width);
  const radius = isPhone ? 0.95 : 1;
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
      const distance = distanceTo({ x, y, rects: rowRects });
      const safe = smooth((distance - pad) / feather);
      if (safe <= 0.01 || isUnderHorizon({ x, y, horizons: scene.horizons })) {
        continue;
      }
      const k = safe * rowEdge * smooth(x / 40) * smooth((width - x) / 40);
      const seed = hash({ ix, iy, salt: 2 });
      const level = isStill
        ? 0.4 + 0.2 * seed
        : dotLevel({ seed, phase: hash({ ix, iy, salt: 3 }), time });
      const lit =
        sweep === null
          ? 0
          : sweepBand({ x, y, diagonal, sweep }) *
            (0.2 + 0.8 * (1 - smooth((distance - pad) / (feather * 2))));
      const tone = mix({
        from: mix({ from: NEUTRAL, to: PRIMARY_300, amount: tint }),
        to: PRIMARY_400,
        amount: level * 0.7,
      });
      const rgb = mix({ from: tone, to: PRIMARY_200, amount: lit });
      const glow = base * (0.15 + 1.7 * level);
      const alpha = Math.min(1, (glow * look.gain + 0.55 * lit) * k);
      if (alpha < 0.01) {
        continue;
      }
      ctx.fillStyle = `rgba(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0},${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};
