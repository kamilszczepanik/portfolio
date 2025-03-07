import Image from "next/image";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export default function AboutMe() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <div className="flex gap-6">
        <Image
          className="rounded-full object-cover"
          src="/ProfilePicture.jpeg"
          alt="Kamil Szczepanik's Profile Picture"
          width={120}
          height={120}
          priority
        />
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-sm">FULLSTACK DEVELOPER</h3>
          <h1 className="text-4xl font-bold">Kamil Szczepanik</h1>
        </div>
      </div>
      <div className="flex gap-4">
        <p>
          I am a software engineer with a passion for building scalable and
          efficient systems. I have a strong foundation in computer science and
          software engineering principles.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" className="w-20 h-32">
            <Download />
          </Button>
        </div>
      </div>
    </div>
  );
}
