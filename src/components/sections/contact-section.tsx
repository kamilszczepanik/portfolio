import { CONTACT_INFO } from "@/constants";
import { CtaButton } from "@/components/ui/cta-button";
import { HorizonArc } from "@/components/backgrounds/horizon-arc";
import { HEADING_FONT, SECTION_CONTAINER } from "./section-styles";

const CONTACT_HEADING_ID = "contact-heading";

export const ContactSection = () => (
  <section
    id="contact"
    aria-labelledby={CONTACT_HEADING_ID}
    className="relative isolate overflow-hidden pt-14 pb-[216px] sm:pt-20 sm:pb-[300px]"
  >
    <HorizonArc />
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
