"use client";
import { useId } from "react";
import dynamic from "next/dynamic";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Button } from "./ui/button";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { Stats } from "./stats";
import { CONTACT_INFO, PEOPLE, ABOUT_ME } from "@/constants";
import { ExpandableCard } from "./ui/expandable-card";
import { ContactButton } from "./contact-button";
import { Person } from "@/types";
import { FileText, Linkedin } from "lucide-react";
import { LinkPreview } from "./ui/link-preview";

const LottiePlayer = dynamic(() => import("./ui/lottie-player"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full max-w-[220px] sm:max-w-[350px] lg:max-w-[450px]"
      style={{ aspectRatio: "1 / 1", minHeight: "220px" }}
    />
  ),
});

interface HeroProps {
  activeCard: Person | null;
  setActiveCard: (card: Person | null) => void;
}

export const Hero = ({ activeCard, setActiveCard }: HeroProps) => {
  const id = useId();

  return (
    <div className="relative mx-auto flex flex-1 w-full">
      <div className="relative z-20 max-w-7xl mx-auto w-full sm:py-4 lg:py-6 flex flex-col">
        <div className="flex flex-1 flex-col lg:flex-row w-full gap-2 sm:gap-4">
          <div className="flex flex-col items-start justify-center max-sm:pt-1 px-2 sm:px-6 lg:px-2 lg:w-1/2 flex-1 lg:-mt-6">
            <div className="my-2">
              <AnimatedTooltip
                items={PEOPLE}
                setActiveCard={setActiveCard}
                cardId={id}
              />
            </div>
            <h2 className="relative z-20 max-w-6xl text-left text-2xl font-bold text-balance text-white sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl">
              From Idea to MVP. I Build Your
              <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-2 py-1 text-white underline decoration-sky-500 decoration-2 sm:decoration-4 lg:decoration-[6px] underline-offset-4 sm:underline-offset-8 lg:underline-offset-16 backdrop-blur-sm">
                Product
              </span>{" "}
              Not Just Your Code.
            </h2>
            <p className="relative z-20 max-w-2xl py-2 sm:py-3 lg:py-4 text-left text-base text-neutral-200 lg:text-xl">
              Need to launch fast without sacrificing quality? I&apos;m a
              product-minded senior engineer with 5+ years of experience. I
              build and ship high-impact MVPs that get you to market, secure
              users, and prove your business case.
            </p>
            <div className="relative z-20 flex w-full gap-2 sm:gap-4 mb-2 sm:mb-3">
              <LinkPreview
                url={CONTACT_INFO.linkedin}
                imageSrc="/resume/linkedin-profile.jpg"
                isStatic
                className="flex-3 w-full"
                target="_blank"
              >
                <HoverBorderGradient
                  containerClassName="w-full"
                  className="w-full text-sm md:text-base lg:text-lg px-3 sm:px-6 lg:px-10 py-3 lg:py-4 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  <span>Connect on LinkedIn</span>
                </HoverBorderGradient>
              </LinkPreview>
              <Button
                asChild
                variant="outline"
                className="text-sm md:text-base lg:text-lg py-5 sm:py-6 lg:py-7 flex-1 flex items-center justify-center gap-2 sm:px-8 lg:px-4 xl:px-12! text-white"
              >
                <LinkPreview
                  url="/resume/ResumeKamilSzczepanik.pdf"
                  imageSrc="/resume/ResumeKamilSzczepanik.jpg"
                  isStatic
                  target="_blank"
                  className="flex-1"
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  <span className="hidden sm:inline">View My CV</span>
                  <span className="sm:hidden">CV</span>
                </LinkPreview>
              </Button>
            </div>

            <Stats />
          </div>

          <div className="flex lg:w-1/2 flex-col items-center justify-center mb-2 lg:pl-16 shrink-0">
            <div className="transform -translate-y-4 sm:-translate-y-6 lg:-translate-y-16 w-full max-w-[180px] lg:max-w-[350px] xl:max-w-[400px]">
              <LottiePlayer
                className="w-full scale-x-[-1]"
                autoplay
                loop
                speed={0.8}
              />
            </div>
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
