import Image from "next/image";
import ContactMe from "./contact-me";
import { ContactForm } from "./contact-form";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AboutMe() {
  return (
    <div className="flex flex-col justify-center w-full sm:gap-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
        <Image
          className="rounded-full object-cover border border-primary"
          src="/resume/ProfilePictureKamilSzczepanikCircle.jpeg"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
        <p className="lg:col-span-1 md:col-span-2 text-sm md:text-sm md:pt-1 tracking-wide">
          I&apos;m a creative software developer, passionate about solving real
          life problems in a scalable and efficient way. I&apos;ve worked with
          startups and established companies, leading projects from idea to
          deployment with measurable success. My goal is to learn every day and
          bring value by creating products that makes a difference. Let&apos;s
          connect and discuss how my skills can contribute to your team&apos;s
          success.
        </p>
        <Button
          asChild
          variant={"gradient"}
          className="md:hidden w-1/2 mx-auto max-sm:w-2/3"
        >
          <Link href="#contact-me">Connect</Link>
        </Button>
        <div className="md:col-span-1 max-md:hidden">
          <ContactForm className="flex flex-col gap-2 -mt-1 w-full" />
        </div>
        <div className="md:col-span-1 max-md:hidden ">
          <ContactMe className="w-full pt-2" />
        </div>
      </div>
    </div>
  );
}
