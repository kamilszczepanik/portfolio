import Image from "next/image";
import { cn } from "@/lib/utils";
import { memo } from "react";

type ProjectCardProps = {
  title: string;
  thumbnail: string;
  variant: "featured" | "other";
  className?: string;
  onClick: () => void;
  slug: string;
};

export const ProjectCard = memo(function ProjectCard({
  title,
  thumbnail,
  variant,
  className,
  onClick,
  slug,
}: ProjectCardProps) {
  const aspectRatio = variant === "featured" ? "aspect-[16/9]" : "aspect-[4/3]";
  const isMobileProject = slug === "reflex";

  const titleSize =
    variant === "featured"
      ? "text-base sm:text-base md:text-lg"
      : "text-xs sm:text-sm md:text-base";

  const titleBackgroundHeight =
    variant === "featured" ? "h-1/5" : "h-1/4 sm:h-1/4 md:h-1/5";

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full rounded-lg overflow-hidden hover:cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-[0_4px_12px_rgb(0,0,0,0.08)] block",
        aspectRatio,
        className
      )}
    >
      <div
        className={cn("relative w-full h-full", isMobileProject && "bg-black")}
      >
        <Image
          src={thumbnail}
          alt={`Thumbnail for ${title}`}
          fill
          sizes={
            variant === "featured"
              ? "(max-width: 640px) 100vw, 50vw"
              : "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          }
          className={cn(
            "group-hover:scale-105 transition-all duration-300",
            isMobileProject ? "object-contain" : "object-cover"
          )}
          priority={variant === "featured"}
          loading={variant === "featured" ? "eager" : "lazy"}
          quality={40}
        />
      </div>

      <div
        className={cn(
          "absolute w-full bg-gradient-to-r from-gray-600 via-blue-500 to-sky-300 flex justify-center items-center transition-all duration-300",
          "bottom-0 opacity-100 sm:opacity-90 md:-bottom-10 md:opacity-0 md:group-hover:bottom-0 md:group-hover:opacity-100",
          titleBackgroundHeight
        )}
      >
        <span
          className={cn(
            "text-white font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-center",
            titleSize
          )}
        >
          {title}
        </span>
      </div>
    </button>
  );
});
