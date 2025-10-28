import { BRANDS } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export const Brands = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {BRANDS.map((brand, index) => (
        <div key={index}>
          <Link
            key={index}
            href={brand.link}
            className="block p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-center h-16 md:h-20">
              <Image
                src={`/images/brands/${brand.image}`}
                alt={`${brand.name} logo`}
                width={120}
                height={60}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2 font-medium">
              {brand.name}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};
