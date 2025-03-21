import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="flex flex-col justify-center gap-4 w-full max-w-xl pt-24 md:pt-0">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
        <Image
          className="rounded-full object-cover border border-primary"
          src="/resume/ProfilePictureKamilSzczepanik.jpeg"
          alt="Kamil Szczepanik's Profile Picture"
          width={120}
          height={120}
          priority
        />
        <div className="flex flex-col gap-2 justify-center mt-4">
          <h3 className="text-sm text-accent-foreground">
            FULLSTACK DEVELOPER
          </h3>
          <h1 className="text-5xl font-bold">Kamil Szczepanik</h1>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <p className="text-sm sm:text-base">
          I am a software engineer with a passion for building scalable and
          efficient systems. I have a strong foundation in computer science and
          software engineering principles.I have a strong foundation in computer
          science and software engineering principles.I have a strong foundation
          in computer science and software engineering
        </p>
      </div>
    </div>
  );
}
