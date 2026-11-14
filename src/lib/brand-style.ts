import { CSSProperties } from "react";
import { ProjectBrand } from "@/types";

export const brandStyle = (brand: ProjectBrand) =>
  ({
    "--brand": brand.accent,
    "--brand-2": brand.secondary,
    "--brand-tint": brand.tint,
  }) as CSSProperties;

export const brandGlow = (brand: ProjectBrand) =>
  `radial-gradient(circle at 30% 35%, ${brand.accent}55, transparent 60%), radial-gradient(circle at 75% 70%, ${brand.secondary}40, transparent 60%)`;

export const brandAmbient = (brand: ProjectBrand) =>
  `radial-gradient(ellipse at 78% 40%, ${brand.accent}38, transparent 58%), radial-gradient(ellipse at 12% 85%, ${brand.secondary}22, transparent 55%)`;

export const brandFrameShadow = (brand: ProjectBrand) =>
  `0 40px 120px -20px ${brand.accent}80`;
