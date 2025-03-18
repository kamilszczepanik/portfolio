import { Download } from "lucide-react";
import Image from "next/image";

export const ResumeDownload = () => {
  return (
    <div className="mt-0.5 flex flex-col items-center gap-1">
      <span className="text-sm font-medium">Resume</span>
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
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 
                           md:bg-black/0 md:group-hover:bg-black/50
                          opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <Download className="md:text-white text-black h-8 w-8" />
          </div>
        </div>
      </a>
    </div>
  );
};
