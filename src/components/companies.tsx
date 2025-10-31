import { COMPANIES } from "@/constants";
import Image from "next/image";
import { LinkPreview } from "./ui/link-preview";

export const Companies = () => {
  return (
    <div className="relative w-full bg-transparent shadow-lg z-40 shrink-0">
      <div className="pb-2 sm:pb-3 px-2 sm:px-4">
        <h2 className="text-xs sm:text-sm md:text-base text-foreground mb-1 sm:mb-2 md:mb-3 text-left lg:text-center">
          Trusted by Innovative Startups Worldwide
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-8">
            {COMPANIES.map((company) => (
              <LinkPreview
                key={company.name}
                url={company.link}
                imageSrc={company.previewImage as string}
                isStatic
                target="_blank"
                className="group block transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center h-14 w-18 sm:h-14 sm:w-20 md:h-14 md:w-28 lg:h-20 lg:w-40 bg-white rounded-lg md:rounded-xl border border-gray-300 md:border-2 group-hover:border-primary group-hover:shadow-md transition-all duration-300">
                  <Image
                    src={company.image}
                    alt={`${company.name} logo`}
                    width={90}
                    height={45}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 96px, 160px"
                  />
                </div>
              </LinkPreview>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
