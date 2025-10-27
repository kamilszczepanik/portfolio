import { Download } from "lucide-react";
import Image from "next/image";

export const ResumeDownload = () => {
  return (
    <div className="mt-0.5 flex flex-col items-center gap-1">
      <a
        href="/resume/ResumeKamilSzczepanik.pdf"
        download="ResumeKamilSzczepanik.pdf"
        className="block"
      >
        <div className="relative w-20 h-26 group overflow-hidden rounded-md border border-secondary">
          <Image
            src="/resume/ResumeKamilSzczepanik.jpg"
            alt="Resume preview"
            fill
            sizes="max-sm:80px sm:80px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="rounded-full bg-black/40 w-12 h-12 flex items-center justify-center">
              <Download size={24} className="" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
