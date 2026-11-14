import Image from "next/image";
import { FREELANCE_SUMMARY, FREELANCE_THUMBNAILS } from "@/constants";
import { cn } from "@/lib/utils";

type FreelanceLineProps = {
  className?: string;
};

export const FreelanceLine = ({ className }: FreelanceLineProps) => (
  <div className={cn("flex items-center gap-4", className)}>
    <div className="flex shrink-0 -space-x-3">
      {FREELANCE_THUMBNAILS.map(({ image, alt }) => (
        <Image
          key={alt}
          src={image}
          alt={alt}
          width={80}
          height={50}
          sizes="80px"
          className="h-10 w-16 rounded-lg border border-white/20 object-cover object-top shadow-lg sm:h-12 sm:w-20"
        />
      ))}
    </div>
    <p className="text-sm text-white/70 sm:text-base">{FREELANCE_SUMMARY}</p>
  </div>
);
