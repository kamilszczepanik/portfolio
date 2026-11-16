"use client";
import { memo } from "react";
import dynamic from "next/dynamic";
import { CtaFace, ctaVariants } from "./ui/cta-button";
import { cn } from "@/lib/utils";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { Stats } from "./stats";
import { CONTACT_INFO, HERO_INTRO, PEOPLE } from "@/constants";
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
  cardId: string;
  setActiveCard: (card: Person | null) => void;
}

export const Hero = memo(({ cardId, setActiveCard }: HeroProps) => {
  return (
    <div className="relative mx-auto flex flex-1 w-full">
      <div className="relative z-20 max-w-7xl mx-auto w-full sm:py-4 lg:py-6 flex flex-col">
        <div className="flex flex-1 flex-col lg:flex-row w-full gap-2 sm:gap-4">
          <div className="flex flex-col items-start justify-center max-sm:pt-1 px-2 sm:px-6 lg:px-2 lg:w-3/5 flex-1 lg:-mt-6">
            <div className="my-2">
              <AnimatedTooltip
                items={PEOPLE}
                setActiveCard={setActiveCard}
                cardId={cardId}
              />
            </div>
            <h1 className="relative z-20 max-w-6xl text-left text-2xl font-bold text-balance text-white md:text-3xl lg:text-4xl lg:leading-snug xl:text-5xl xl:leading-tight">
              I Build{" "}
              <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-2 py-1 text-white underline decoration-sky-500 decoration-2 sm:decoration-4 lg:decoration-[6px] underline-offset-4 sm:underline-offset-8 lg:underline-offset-16 backdrop-blur-sm">
                AI Products
              </span>{" "}
              That Work in Production.
            </h1>
            <p className="relative z-20 max-w-2xl py-2 sm:py-3 lg:py-4 text-left text-base text-neutral-200 lg:text-xl">
              {HERO_INTRO}
            </p>
            <div className="relative z-20 flex w-full gap-2 sm:gap-4 mb-2 sm:mb-3">
              <LinkPreview
                url={CONTACT_INFO.linkedin}
                imageSrc="/resume/linkedin-profile.jpg"
                isStatic
                className={cn(
                  ctaVariants({ variant: "primary", size: "hero" }),
                  "flex-3 w-full",
                )}
                target="_blank"
              >
                <CtaFace variant="primary" className="px-3 sm:px-6 lg:px-10">
                  <Linkedin aria-hidden />
                  <span>Connect on LinkedIn</span>
                </CtaFace>
              </LinkPreview>
              <LinkPreview
                url="/resume/ResumeKamilSzczepanik.pdf"
                imageSrc="/resume/ResumeKamilSzczepanik.jpg"
                isStatic
                target="_blank"
                className={cn(
                  ctaVariants({ variant: "secondary", size: "hero" }),
                  "flex-1 px-3 sm:px-8 lg:px-4 xl:px-12",
                )}
              >
                <FileText aria-hidden />
                <span className="hidden sm:inline">View My CV</span>
                <span className="sm:hidden">CV</span>
              </LinkPreview>
            </div>

            <Stats />
          </div>

          <div className="flex lg:w-2/5 flex-col items-center justify-center mb-2 lg:pl-16 shrink-0">
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
    </div>
  );
});

Hero.displayName = "Hero";
