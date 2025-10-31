"use client";
import { useState, useId } from "react";
import dynamic from "next/dynamic";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Button } from "./ui/button";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { Stats } from "./stats";
import { CONTACT_INFO, PEOPLE, PROJECT_IMAGES, ABOUT_ME } from "@/constants";
import { ExpandableCard } from "./ui/expandable-card";
import { ContactButton } from "./contact-button";
import { AboutMe } from "./about-me";
import { Person } from "@/types";
import { FileText, Linkedin } from "lucide-react";
import { LinkPreview } from "./ui/link-preview";

const LottiePlayer = dynamic(() => import("./ui/lottie-player"), {
  ssr: false,
  loading: () => <div className="w-full max-w-md h-auto" />,
});

export const Hero = () => {
  const [activeCard, setActiveCard] = useState<Person | null>(null);
  const id = useId();

  return (
    <div className="relative mx-auto flex h-[calc(100vh-3.5rem)] w-full overflow-hidden">
      <div className="absolute inset z-10 h-full w-full bg-black/70" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full rounded-3xl"
        images={PROJECT_IMAGES}
      />
      <div className="max-w-7xl mx-auto w-full">
        <AboutMe onClick={setActiveCard} />
        <div className="relative z-20 flex flex-col-reverse lg:flex-row h-full w-full">
          <div className="flex flex-col items-start justify-center pl-4 sm:pl-6 lg:pl-8 lg:w-1/2">
            <AnimatedTooltip
              items={PEOPLE}
              setActiveCard={setActiveCard}
              cardId={id}
            />
            <h2 className="relative z-20 max-w-6xl text-left text-2xl font-bold text-balance text-white sm:text-3xl md:text-4xl lg:text-6xl mt-4">
              From Idea to MVP. I Build Your
              <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-2 py-1 text-white underline decoration-sky-500 decoration-[3px] sm:decoration-[6px] underline-offset-8 sm:underline-offset-16 backdrop-blur-sm">
                Product
              </span>{" "}
              Not Just Your Code.
            </h2>
            <p className="relative z-20 max-w-2xl py-4 lg:py-8 text-left text-sm text-neutral-200 sm:text-base md:text-lg">
              Need to launch fast without sacrificing quality? I&apos;m a
              product-minded senior engineer with 5+ years of experience. I
              build and ship high-impact MVPs that get you to market, secure
              users, and prove your business case.
            </p>
            <div className="relative z-20 flex w-full gap-2 sm:gap-4">
              <LinkPreview
                url={CONTACT_INFO.linkedin}
                imageSrc="/resume/linkedin-profile.jpg"
                isStatic
                className="flex-3"
              >
                <HoverBorderGradient className="text-sm sm:text-lg px-4 sm:px-10 py-3 sm:py-4 flex items-center gap-2 cursor-pointer w-full">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="inlin">Connect on LinkedIn</span>
                </HoverBorderGradient>
              </LinkPreview>
              <Button
                asChild
                variant="outline"
                className="text-sm sm:text-lg py-3 sm:py-7 flex-1 flex items-center justify-center gap-2 px-4 sm:px-12! text-white"
              >
                <LinkPreview
                  url="/resume/ResumeKamilSzczepanik.pdf"
                  imageSrc="/resume/ResumeKamilSzczepanik.jpg"
                  isStatic
                  target="_blank"
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">View My CV</span>
                  <span className="sm:hidden">CV</span>
                </LinkPreview>
              </Button>
            </div>

            <Stats />
          </div>

          <div className="flex lg:w-1/2 flex-col items-center justify-center order-first lg:order-last">
            <LottiePlayer
              className="w-full max-w-[220px] sm:max-w-[350px] lg:max-w-[450px] h-auto scale-x-[-1]"
              autoplay
              loop
              speed={0.8}
            />
          </div>
        </div>
      </div>
      <ExpandableCard
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        cardId={id}
        people={activeCard?.id === ABOUT_ME.id ? undefined : PEOPLE}
      />
      <ContactButton />
    </div>
  );
};

export default Hero;
