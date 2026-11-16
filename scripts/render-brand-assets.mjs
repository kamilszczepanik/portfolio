import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "scripts", "brand");
const ICONS_DIR = join(ROOT, "public", "icons");
const MARK_VIEW_SIZE = 64;
const SUPERSAMPLE = 4;

const renderSquare = async ({ svg, size, path }) => {
  const density = Math.ceil((72 * size * SUPERSAMPLE) / MARK_VIEW_SIZE);
  await sharp(Buffer.from(svg), { density })
    .resize(size, size)
    .png()
    .toFile(path);
};

const renderIcons = async () => {
  const tile = await readFile(join(SOURCE_DIR, "l4-mark.svg"), "utf8");
  const fullBleed = tile.replace(' rx="14"', "");
  await renderSquare({
    svg: tile,
    size: 32,
    path: join(ICONS_DIR, "favicon-32x32.png"),
  });
  await renderSquare({
    svg: tile,
    size: 192,
    path: join(ICONS_DIR, "favicon.png"),
  });
  await renderSquare({
    svg: fullBleed,
    size: 180,
    path: join(ICONS_DIR, "apple-touch-icon.png"),
  });
};

const OG_PATH = join(ROOT, "public", "images", "og-image.png");
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const DOT_SPACING = 20;
const DOT_RADIUS = 1.4;
const LOCKUP_VIEW = { width: 174, height: 32 };
const LOCKUP_INK = { x0: 0.8, y0: 7.33, x1: 172.65, y1: 26.53 };
const LOCKUP_WIDTH = 640;
const CLEARANCE = 48;
const FEATHER = 72;
const NEUTRAL = [214, 222, 240];
const PRIMARY_300 = [157, 185, 242];

const smooth = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const hash = (ix, iy, salt) => {
  let h = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + salt * 974711;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

const innerSvg = (svg) =>
  svg.slice(
    svg.indexOf(">", svg.indexOf("<svg")) + 1,
    svg.lastIndexOf("</svg>"),
  );

const dotField = (box) => {
  const dots = [];
  for (let iy = 0; (iy + 0.5) * DOT_SPACING < OG_HEIGHT; iy += 1) {
    for (let ix = 0; (ix + 0.5) * DOT_SPACING < OG_WIDTH; ix += 1) {
      const x = (ix + 0.5) * DOT_SPACING;
      const y = (iy + 0.5) * DOT_SPACING;
      const dx = Math.max(box.x0 - x, 0, x - box.x1);
      const dy = Math.max(box.y0 - y, 0, y - box.y1);
      const safe = smooth((Math.hypot(dx, dy) - CLEARANCE) / FEATHER);
      const depth = y / OG_HEIGHT;
      const edge = smooth(x / 60) * smooth((OG_WIDTH - x) / 60);
      const alpha =
        safe * edge * (0.22 + 0.48 * depth) * (0.5 + 0.9 * hash(ix, iy, 2));
      if (alpha < 0.02) {
        continue;
      }
      const rgb = NEUTRAL.map((value, index) =>
        Math.round(value + (PRIMARY_300[index] - value) * depth),
      );
      dots.push(
        `<circle cx="${x}" cy="${y}" r="${DOT_RADIUS}" fill="rgb(${rgb.join(",")})" fill-opacity="${Math.min(0.8, alpha).toFixed(3)}"/>`,
      );
    }
  }
  return dots.join("");
};

const renderOpenGraph = async () => {
  const lockup = await readFile(join(SOURCE_DIR, "l4-lockup.svg"), "utf8");
  const scale = LOCKUP_WIDTH / LOCKUP_VIEW.width;
  const height = LOCKUP_VIEW.height * scale;
  const left = (OG_WIDTH - LOCKUP_WIDTH) / 2;
  const top = OG_HEIGHT / 2 - ((LOCKUP_INK.y0 + LOCKUP_INK.y1) / 2) * scale;
  const box = {
    x0: left + LOCKUP_INK.x0 * scale,
    y0: top + LOCKUP_INK.y0 * scale,
    x1: left + LOCKUP_INK.x1 * scale,
    y1: top + LOCKUP_INK.y1 * scale,
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}"><rect width="100%" height="100%" fill="#000"/>${dotField(box)}<svg x="${left}" y="${top}" width="${LOCKUP_WIDTH}" height="${height}" viewBox="0 0 ${LOCKUP_VIEW.width} ${LOCKUP_VIEW.height}">${innerSvg(lockup)}</svg></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(OG_PATH);
};

await renderIcons();
await renderOpenGraph();
