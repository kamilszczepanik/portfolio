import { CONTACT_INFO } from "@/constants";
import { CtaButton } from "@/components/ui/cta-button";
import { GridPattern } from "./grid-glow-backdrop";
import { MarqueeBackdrop } from "./marquee-backdrop";
import { HEADING_FONT, SECTION_CONTAINER } from "./section-styles";

const CONTACT_HEADING_ID = "contact-heading";

export const ContactSection = () => (
  <section
    id="contact"
    aria-labelledby={CONTACT_HEADING_ID}
    className="relative isolate overflow-hidden py-14 sm:py-20"
  >
    <MarqueeBackdrop />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 mask-[linear-gradient(to_bottom,#000,#000_25%,transparent)]"
    >
      <GridPattern />
    </div>
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,rgba(59,130,246,0.35),transparent_60%)]"
    />
    <div className={`${SECTION_CONTAINER} text-center`}>
      <h2
        id={CONTACT_HEADING_ID}
        className={`${HEADING_FONT} text-4xl text-white sm:text-7xl`}
      >
        {"Let's build it."}
      </h2>
      <p className="mt-5 text-lg text-neutral-200">
        Full-time in Dubai, remote, or a contract.
      </p>
      <div className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <CtaButton
          href={`mailto:${CONTACT_INFO.email}`}
          size="hero"
          faceClassName="px-8"
        >
          {CONTACT_INFO.email}
        </CtaButton>
        <CtaButton
          href={CONTACT_INFO.linkedin}
          variant="secondary"
          size="hero"
          className="px-8"
          isExternal
        >
          LinkedIn
        </CtaButton>
      </div>
    </div>
  </section>
);
