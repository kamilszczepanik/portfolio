import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { CONTACT_INFO } from "@/constants/contact";
import { getBaseUrl } from "@/lib/utils";
import { DeferredAnalytics } from "@/components/analytics/DeferredAnalytics";

const JOB_TITLE = "AI Product Engineer";
const SITE_TITLE = `Kamil Szczepanik | ${JOB_TITLE}`;
const SITE_DESCRIPTION =
  "AI product engineer in Dubai. I build LLM features end to end and prove they work with evals and red teams. 5+ years of full-stack TypeScript in startups.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Kamil Szczepanik",
    "AI Product Engineer",
    "AI Engineer",
    "LLM",
    "Claude",
    "AI agents",
    "evals",
    "red teaming",
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
        url: "/images/projects/portfolio-preview.jpg",
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
        url: "/images/projects/portfolio-preview.jpg",
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
        url: "/icons/favicon.png",
        type: "image/png",
      },
      {
        url: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kamil Szczepanik",
              jobTitle: JOB_TITLE,
              description: SITE_DESCRIPTION,
              url: getBaseUrl(),
              sameAs: [
                CONTACT_INFO.linkedin,
                CONTACT_INFO.github,
                CONTACT_INFO.x,
              ],
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
                "Red Teaming",
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
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <DeferredAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
          clarityId={process.env.NEXT_PUBLIC_CLARITY_ID}
        />
      </body>
    </html>
  );
}
