import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { brandStyle } from "@/lib/brand-style";
import { cn } from "@/lib/utils";
import { ProjectBrand } from "@/types";

export type ProjectCardContent = {
  name: string;
  summary: string;
  brand: ProjectBrand;
  image: StaticImageData;
  imageAlt: string;
};

type ProjectCardProps = {
  project: ProjectCardContent;
  imageSizes: string;
  isCompact?: boolean;
  link: ReactNode;
  children: ReactNode;
};

export const PROJECT_CARD_LINK_CLASS =
  "absolute inset-0 z-10 rounded-[28px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-500";

export const ProjectCard = ({
  project,
  imageSizes,
  isCompact = false,
  link,
  children,
}: ProjectCardProps) => (
  <article
    style={brandStyle(project.brand)}
    className={cn(
      "group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#070707] p-5 transition duration-500 hover:-translate-y-1 hover:border-(color:--brand)/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      isCompact ? "sm:p-6" : "sm:p-7",
    )}
  >
    <span
      aria-hidden
      className="absolute -top-24 left-1/2 -z-10 size-72 -translate-x-1/2 rounded-full bg-(color:--brand)/20 blur-3xl"
    />
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-xl border border-white/10",
        isCompact ? "h-[180px] sm:h-[200px]" : "h-[210px] sm:h-[240px]",
      )}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={imageSizes}
        placeholder="blur"
        className="object-cover object-left"
      />
    </span>
    {link}
    <div className="pointer-events-none relative z-20 mt-5 flex flex-1 flex-col">
      <h3 className="flex items-center gap-3">
        <BrandLogo brand={project.brand} className="size-9 rounded-lg" />
        <span
          className={cn(
            "text-xl text-white",
            !isCompact && "sm:text-2xl",
            project.brand.fontClassName,
          )}
        >
          {project.name}
        </span>
      </h3>
      <p className="mt-2 text-neutral-300">{project.summary}</p>
      {children}
    </div>
  </article>
);
