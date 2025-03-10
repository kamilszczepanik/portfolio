import { Download } from "lucide-react";
import Image from "next/image";

export const ResumeDownload = () => {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-sm font-medium">Resume</span>
      <a
        href="/resume/KamilSzczepanikResume.pdf"
        download="KamilSzczepanikResume.pdf"
        className="block"
      >
        <div className="relative w-20 h-28 group overflow-hidden rounded-md border border-secondary">
          <Image
            src="/resume/KamilSzczepanikResume.jpg"
            alt="Resume preview"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <Download className="text-white h-8 w-8" />
          </div>
        </div>
      </a>
    </div>
  );
};
