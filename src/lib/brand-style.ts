import { CSSProperties } from "react";
import { ProjectBrand } from "@/types";

export const brandStyle = (brand: ProjectBrand) =>
  ({
    "--brand": brand.accent,
    "--brand-2": brand.secondary,
    "--brand-tint": brand.tint,
  }) as CSSProperties;

export const brandGlow = (brand: ProjectBrand) =>
  `radial-gradient(ellipse closest-side at 40% 45%, ${brand.accent}55, transparent), radial-gradient(ellipse closest-side at 62% 62%, ${brand.secondary}40, transparent)`;

export const brandAmbient = (brand: ProjectBrand) =>
  `radial-gradient(ellipse closest-side at 72% 50%, ${brand.accent}38, transparent), radial-gradient(ellipse closest-side at 25% 70%, ${brand.secondary}22, transparent)`;

export const brandFrameShadow = (brand: ProjectBrand) =>
  `0 40px 120px -20px ${brand.accent}80`;
