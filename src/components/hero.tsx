"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Button } from "./ui/button";
import { AnimatedTooltip } from "./ui/animated-tooltip";

export const Hero = () => {
  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];
  return (
    <div className="relative mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-7xl overflow-hidden rounded-3xl">
      {/* Background overlay and animation */}
      <div className="absolute inset z-10 h-full w-full bg-black/60" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />

      {/* Two-column layout */}
      <div className="relative z-20 flex h-full w-full">
        {/* Left side - Content */}
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

          <AnimatedTooltip
            items={[
              {
                id: 1,
                name: "John Doe",
                designation: "CEO",
                image: "https://assets.aceternity.com/john-doe.png",
              },
            ]}
          />
        </div>

        {/* Right side - Empty for now */}
        <div className="flex w-1/2 flex-col items-center justify-center">
          {/* Empty space for future content */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
