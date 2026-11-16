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

await renderIcons();
