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
  const styles = variant === "featured" ? "w-1/2" : "w-1/4";
  const width = variant === "featured" ? 1000 : 500;
  const height = variant === "featured" ? 500 : 250;

  return (
    <button
      type="button"
      className={cn(
        "group relative rounded-lg overflow-hidden transition-all duration-300 hover:cursor-pointer",
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
        className="object-cover w-full h-full"
      />
    </button>
  );
}
