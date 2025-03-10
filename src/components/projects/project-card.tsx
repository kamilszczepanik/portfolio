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
  const styles = variant === "featured" ? "" : "";
  const width = variant === "featured" ? 1200 : 500;
  const height = variant === "featured" ? 500 : 250;

  return (
    <button
      className={cn(
        "group relative rounded-lg overflow-hidden  hover:cursor-pointer ",
        styles,
        className
      )}
      onClick={onClick}
    >
      <Image
        src={thumbnail}
        alt={`Thumbnail for ${title}`}
        width={width}
        height={height}
        className="object-cover w-full h-full hover:scale-105 transition-all duration-300"
      />
      <div className="absolute h-1/5 w-full bg-gradient-to-t from-black via-black/90 to-black/70 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white py-2 px-5 font-bold">{title}</p>
      </div>
    </button>
  );
}
