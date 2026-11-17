"use client";

import { FileText, Linkedin } from "lucide-react";
import { SkyBackdrop } from "@/components/backgrounds/sky-backdrop";
import { CtaButton } from "@/components/ui/cta-button";
import { CONTACT_INFO, RESUME } from "@/constants/contact";

export const AboutBand = () => (
  <SkyBackdrop
    variant="band"
    className="h-28 bg-[radial-gradient(120%_100%_at_50%_0%,color-mix(in_oklab,var(--color-primary)_32%,transparent),transparent_80%)] sm:h-32"
  />
);

export const AboutActions = () => (
  <>
    <CtaButton
      href={CONTACT_INFO.linkedin}
      isExternal
      className="flex-1"
      aria-label="LinkedIn (opens in a new tab)"
    >
      <Linkedin aria-hidden />
      LinkedIn
    </CtaButton>
    <CtaButton
      href={RESUME.href}
      variant="secondary"
      isExternal
      className="flex-1"
      aria-label={`${RESUME.label} (PDF, opens in a new tab)`}
    >
      <FileText aria-hidden />
      {RESUME.label}
    </CtaButton>
  </>
);
