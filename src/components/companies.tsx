import { COMPANIES } from "@/constants";
import Image from "next/image";
import { LinkPreview } from "./ui/link-preview";

export const Companies = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-screen bg-transparent shadow-lg z-40">
      <div className="py-4 px-4">
        <h2 className="text-lg text-foreground mb-4 text-center">
          Trusted by Innovative Startups Worldwide
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-6 md:gap-8">
            {COMPANIES.map((company) => (
              <LinkPreview
                key={company.name}
                url={company.link}
                imageSrc={company.previewImage as string}
                isStatic
                target="_blank"
                className="group block transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center h-12 w-24 md:h-16 md:w-32 bg-gray-50 rounded-xl border-2 border-gray-300 group-hover:border-primary group-hover:shadow-md transition-all duration-300">
                  <Image
                    src={company.image}
                    alt={`${company.name} logo`}
                    width={80}
                    height={40}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 640px) 80px, 120px"
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
