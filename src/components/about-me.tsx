import Image from "next/image";

export default function AboutMe() {
  return (
    <div>
      <Image
        className="dark:invert rounded-full"
        src="/ProfilePicture.jpeg"
        alt="Kamil Szczepanik's Profile Picture"
        width={120}
        height={120}
        priority
      />
      <h1>About Me</h1>
      <p className="text-sm">
        I am a software engineer with a passion for building scalable and
        efficient systems. I have a strong foundation in computer science and
        software engineering principles.
      </p>
    </div>
  );
}
