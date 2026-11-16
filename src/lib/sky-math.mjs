export const NEUTRAL = [214, 222, 240];
export const PRIMARY_300 = [157, 185, 242];

export const smooth = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

export const hash = ({ ix, iy, salt }) => {
  let h = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + salt * 974711;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};
