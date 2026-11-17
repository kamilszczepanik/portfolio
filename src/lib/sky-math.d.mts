export type Rgb = readonly [number, number, number];

export type HashOptions = { ix: number; iy: number; salt: number };

export declare const NEUTRAL: Rgb;
export declare const PRIMARY_300: Rgb;

export declare const smooth: (x: number) => number;

export declare const hash: (options: HashOptions) => number;
