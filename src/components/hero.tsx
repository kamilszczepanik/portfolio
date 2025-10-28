"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Button } from "./ui/button";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { Stats } from "./stats";
import { PEOPLE, PROJECT_IMAGES } from "@/constants";
import { Companies } from "./companies";

export const Hero = () => {
  return (
    <div className="relative mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-7xl overflow-hidden rounded-3xl">
      <div className="absolute inset z-10 h-full w-full bg-black/70" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={PROJECT_IMAGES}
      />

      <div className="relative z-20 flex h-full w-full">
        <div className="flex w-1/2 flex-col items-start justify-center pl-8 md:pl-16 lg:pl-20">
          <h2 className="relative z-20 max-w-4xl text-left text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
            This is your life and it&apos;s ending one{" "}
            <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
              moment
            </span>{" "}
            at a time.
          </h2>
          <p className="relative z-20 max-w-2xl py-8 text-left text-sm text-neutral-200 md:text-base">
            You are not your job, you&apos;re not how much money you have in the
            bank. You are not the car you drive. You&apos;re not the contents of
            your wallet.
          </p>

          <div className="relative z-20 flex flex-wrap items-center gap-4 pt-4">
            <HoverBorderGradient className="text-lg px-10 py-3">
              Learn more
            </HoverBorderGradient>
            <Button variant="outline" className="text-lg px-10 py-6">
              Read more
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center gap-12 py-8">
            <Stats />
            <AnimatedTooltip items={PEOPLE} />
          </div>
        </div>

        <div className="flex w-1/2 flex-col items-center justify-center pr-8 md:pr-16 lg:pr-20"></div>
      </div>

      {/* Companies section - centered at bottom */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30">
        <Companies />
      </div>
    </div>
  );
};

export default Hero;
