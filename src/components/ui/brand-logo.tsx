import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProjectBrand } from "@/types";

type BrandLogoProps = {
  brand: ProjectBrand;
  className?: string;
};

export const BrandLogo = ({ brand, className }: BrandLogoProps) => (
  <Image
    src={brand.logo}
    alt=""
    width={64}
    height={64}
    sizes="64px"
    unoptimized={typeof brand.logo === "string"}
    className={cn("size-10 shrink-0 rounded-xl", className)}
  />
);
