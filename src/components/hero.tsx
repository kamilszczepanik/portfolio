"use client";
import { useState, useId } from "react";
import dynamic from "next/dynamic";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Button } from "./ui/button";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { Stats } from "./stats";
import { CONTACT_INFO, PEOPLE, PROJECT_IMAGES } from "@/constants";
import { Companies } from "./companies";
import { ExpandableCard } from "./ui/expandable-card";
import { Person } from "@/types";
import Link from "next/link";
import { FileText, Linkedin } from "lucide-react";

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
      <div className="max-w-7xl mx-auto">
        <div className="relative z-20 flex h-full w-full">
          <div className="flex w-1/2 flex-col items-start justify-center pl-8">
            <AnimatedTooltip
              items={PEOPLE}
              setActiveCard={setActiveCard}
              cardId={id}
            />
            <h2 className="relative z-20 max-w-6xl text-left text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl mt-4">
              From Idea to MVP. I Build Your
              <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
                Product
              </span>{" "}
              Not Just Your Code.
            </h2>
            <p className="relative z-20 max-w-2xl py-8 text-left text-base text-neutral-200 md:text-lg">
              Need to launch fast without sacrificing quality? I&apos;m a
              product-minded senior engineer with 5+ years of experience. I
              build and ship high-impact MVPs that get you to market, secure
              users, and prove your business case.
            </p>
            <div className="relative z-20 flex flex-wrap items-center gap-4">
              <HoverBorderGradient
                className="text-lg px-10 py-4 flex items-center gap-2 cursor-pointer flex-1"
                onClick={() => window.open(CONTACT_INFO.linkedin, "_blank")}
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </HoverBorderGradient>
              <Button asChild variant="outline" className="text-lg py-7 flex-1">
                <Link
                  href="/resume/ResumeKamilSzczepanik.pdf"
                  target="_blank"
                  className="flex items-center gap-2 !px-12"
                >
                  <FileText className="w-5 h-5" />
                  <span>View My CV</span>
                </Link>
              </Button>
            </div>

            <Stats />
          </div>

          <div className="flex w-1/2 flex-col items-center justify-center">
            <LottiePlayer
              className="w-full max-w-md h-auto scale-x-[-1]"
              autoplay
              loop
              speed={0.8}
            />
          </div>
        </div>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30">
          <Companies />
        </div>
      </div>
      <ExpandableCard
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        cardId={id}
        people={PEOPLE}
      />
    </div>
  );
};

export default Hero;
