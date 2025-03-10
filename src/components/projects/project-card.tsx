import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProjectCard({
  title,
  thumbnail,
  variant,
  className,
  onClick,
}: {
  title: string;
  thumbnail: string;
  variant: "featured" | "other";
  className?: string;
  onClick?: () => void;
}) {
  const aspectRatio = variant === "featured" ? "aspect-[16/9]" : "aspect-[4/3]";
  const titleSize =
    variant === "featured" ? "text-base md:text-lg" : "text-xs md:text-base";
  const titleBackgroundHeight =
    variant === "featured" ? "h-1/5" : "h-1/3 md:h-1/4";

  return (
    <button
      type="button"
      className={cn(
        "group relative w-full rounded-lg overflow-hidden hover:cursor-pointer transition-all duration-300 hover:shadow-lg",
        aspectRatio,
        className
      )}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <Image
          src={thumbnail}
          alt={`Thumbnail for ${title}`}
          fill
          sizes={
            variant === "featured"
              ? "(max-width: 640px) 100vw, 50vw"
              : "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          }
          className="object-cover group-hover:scale-105 transition-all duration-300"
        />
      </div>

      <div
        className={cn(
          "absolute w-full bg-gradient-to-r from-gray-600 via-blue-500 to-sky-300 flex justify-center items-center transition-all duration-300",
          "bottom-0 opacity-100 md:-bottom-10 md:opacity-0 md:group-hover:bottom-0 md:group-hover:opacity-100",
          titleBackgroundHeight
        )}
      >
        <span
          className={cn(
            "text-white font-bold px-4 py-2 text-center ",
            titleSize
          )}
        >
          {title}
        </span>
      </div>
    </button>
  );
}
