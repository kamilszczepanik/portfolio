import Image from "next/image";
import { ResumeDownload } from "./resume-download";

export default function AboutMe() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <div className="flex gap-6">
        <Image
          className="rounded-full object-cover border border-primary"
          src="/resume/KamilSzczepanikProfilePicture.jpeg"
          alt="Kamil Szczepanik's Profile Picture"
          width={120}
          height={120}
          priority
        />
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-sm text-accent-foreground">
            FULLSTACK DEVELOPER
          </h3>
          <h1 className="text-5xl font-bold">Kamil Szczepanik</h1>
        </div>
      </div>
      <div className="flex gap-4">
        <p>
          I am a software engineer with a passion for building scalable and
          efficient systems. I have a strong foundation in computer science and
          software engineering principles.I have a strong foundation in computer
          science and software engineering principles.I have a strong foundation
          in computer science and software engineering
        </p>
        <ResumeDownload />
      </div>
    </div>
  );
}
