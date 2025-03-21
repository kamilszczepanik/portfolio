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
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 flex flex-col gap-1 items-center justify-center transition-opacity duration-300
                           bg-black/20 group-hover:bg-black/0
                          opacity-100 group-hover:opacity-100"
          >
            <Download className="text-black h-8 w-8" />
            <span className="text-sm font-medium text-black">Resume</span>
          </div>
        </div>
      </a>
    </div>
  );
};
