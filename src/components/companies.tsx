import { COMPANIES } from "@/constants";
import Image from "next/image";
import { LinkPreview } from "./ui/link-preview";

export const Companies = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-screen bg-transparent shadow-lg z-40">
      <div className="py-4 px-4">
        <h2 className="text-sm sm:text-base md:text-lg text-foreground mb-2 sm:mb-3 md:mb-4 text-left sm:text-center">
          Trusted by Innovative Startups Worldwide
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-8">
            {COMPANIES.map((company) => (
              <LinkPreview
                key={company.name}
                url={company.link}
                imageSrc={company.previewImage as string}
                isStatic
                target="_blank"
                className="group block transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center h-8 w-16 sm:h-10 sm:w-20 md:h-12 md:w-24 lg:h-16 lg:w-32 bg-gray-50 rounded-lg md:rounded-xl border border-gray-300 md:border-2 group-hover:border-primary group-hover:shadow-md transition-all duration-300">
                  <Image
                    src={company.image}
                    alt={`${company.name} logo`}
                    width={60}
                    height={30}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 60px, 120px"
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
