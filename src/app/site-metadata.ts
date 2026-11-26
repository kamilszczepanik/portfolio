import type { Metadata } from "next";
import { CONTACT_INFO } from "@/constants/contact";
import { HERO_INTRO } from "@/constants/intro";
import { getBaseUrl } from "@/lib/utils";

const JOB_TITLE = "Senior AI Engineer & AI Product Engineer";
const SITE_TITLE = `Kamil Szczepanik | ${JOB_TITLE}`;
const SITE_DESCRIPTION = HERO_INTRO;
const PREVIEW_IMAGE = "/images/og-image.png";

export const SITE_METADATA: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Kamil Szczepanik",
    "Senior AI Engineer",
    "AI Engineer",
    "AI Product Engineer",
    "LLM",
    "Claude",
    "AI agents",
    "evals",
    "guardrails",
    "RAG",
    "MCP",
    "TypeScript",
    "Next.js",
    "NestJS",
    "Full Stack Engineer",
    "Dubai",
  ],
  alternates: {
    canonical: getBaseUrl(),
  },
  authors: [{ name: "Kamil Szczepanik" }],
  creator: "Kamil Szczepanik",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: getBaseUrl(),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Kamil Szczepanik Portfolio",
    images: [
      {
        url: PREVIEW_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@kamilszczepanik",
    images: [
      {
        url: PREVIEW_IMAGE,
        alt: SITE_TITLE,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icons/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const PERSON_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kamil Szczepanik",
  jobTitle: JOB_TITLE,
  description: SITE_DESCRIPTION,
  url: getBaseUrl(),
  sameAs: [CONTACT_INFO.linkedin, CONTACT_INFO.github, CONTACT_INFO.x],
  knowsLanguage: ["pl", "en"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  knowsAbout: [
    "AI Engineering",
    "Large Language Models",
    "AI Agents",
    "LLM Evaluation",
    "Guardrails",
    "RAG",
    "Full Stack Development",
    "TypeScript",
    "Next.js",
    "NestJS",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: JOB_TITLE,
    occupationLocation: {
      "@type": "City",
      name: "Dubai",
      addressCountry: "AE",
    },
  },
});
