import Image from "next/image";
import ContactMe from "./contact-me";
import { ContactForm } from "./contact-form";

export default function AboutMe() {
  return (
    <div className="flex flex-col justify-center gap-6 w-full">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
        <Image
          className="rounded-full object-cover border border-primary"
          src="/resume/ProfilePictureKamilSzczepanik.jpeg"
          alt="Kamil Szczepanik's Profile Picture"
          width={120}
          height={120}
          priority
        />
        <div className="flex flex-col gap-2 justify-center mt-4">
          <h3 className="text-accent-foreground text-center md:text-left">
            FULLSTACK DEVELOPER
          </h3>
          <h1 className="text-4xl font-bold text-center md:text-left">
            Kamil Szczepanik
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
        <p className="lg:col-span-1 md:col-span-2 text-sm md:text-base">
          I am a software engineer with a passion for building scalable and
          efficient systems. I have a strong foundation in computer science and
          software engineering principles.I have a strong foundation in computer
          science and software engineering principles.I have a strong foundation
        </p>
        <div className="md:col-span-1 max-md:hidden">
          <ContactMe className="w-full pt-2" />
        </div>
        <div className="md:col-span-1 max-md:hidden">
          <ContactForm className="flex flex-col gap-2 -mt-1 w-full" />
        </div>
      </div>
    </div>
  );
}
