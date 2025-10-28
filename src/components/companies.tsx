import { COMPANIES } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export const Companies = () => {
  return (
    <div className="flex items-center justify-center gap-16">
      {COMPANIES.map((company) => (
        <div key={company.name}>
          <Link
            key={company.name}
            href={company.link}
            className="block p-4 bg-transparent rounded-lg transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center justify-end h-20">
              <Image
                src={company.image}
                alt={`${company.name} logo`}
                width={120}
                height={60}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
