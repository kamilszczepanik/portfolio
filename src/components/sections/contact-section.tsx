import { CONTACT_INFO } from "@/constants";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { MarqueeBackdrop } from "./marquee-backdrop";
import { SECTION_CONTAINER } from "./section-styles";

const CONTACT_HEADING_ID = "contact-heading";

const BUTTON_BASE =
  "flex h-14 items-center justify-center rounded-full px-8 font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500";

export const ContactSection = () => (
  <section
    id="contact"
    aria-labelledby={CONTACT_HEADING_ID}
    className="relative isolate overflow-hidden py-28 sm:py-40"
  >
    <MarqueeBackdrop />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,rgba(59,130,246,0.35),transparent_60%)]"
    />
    <div className={`${SECTION_CONTAINER} text-center`}>
      <h2
        id={CONTACT_HEADING_ID}
        className="text-4xl font-bold tracking-tight text-white sm:text-7xl"
      >
        {"Let's build it."}
      </h2>
      <p className="mt-5 text-lg text-neutral-200">
        Full-time in Dubai, remote, or a contract.
      </p>
      <div className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className={`${BUTTON_BASE} bg-blue-600 hover:bg-blue-700`}
        >
          {CONTACT_INFO.email}
        </a>
        <a
          href={CONTACT_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${BUTTON_BASE} border border-blue-400/70 hover:bg-white/5`}
        >
          LinkedIn
          <NewTabHint />
        </a>
      </div>
    </div>
  </section>
);
