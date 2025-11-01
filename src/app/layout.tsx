import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CONTACT_INFO } from "@/constants";
import { getBaseUrl } from "@/lib/utils";

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
    default: "Kamil Szczepanik | Senior Software Engineer",
    template: "%s | Kamil Szczepanik",
  },
  description:
    "Transform your vision into a reality. Kamil Szczepanik is a Senior Software Engineer in Dubai who helps startups build and launch scalable MVPs, faster. Get a free website growth audit.",
  keywords: [
    "Software Engineer Dubai",
    "Senior Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Expert",
    "MVP Development",
    "Product Engineer",
    "Startup Developer",
    "Web Development Dubai",
    "Frontend Developer UAE",
    "Backend Developer Dubai",
    "Team Leader",
    "Scrum Master",
    "Agile Coach",
    "Project Manager",
    "Product Manager",
  ],
  alternates: {
    canonical: getBaseUrl(),
  },
  authors: [{ name: "Kamil Szczepanik" }],
  creator: "Kamil Szczepanik",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getBaseUrl(),
    title: "Kamil Szczepanik | Senior Software Engineer",
    description:
      "Transform your vision into a reality. Kamil Szczepanik is a Senior Software Engineer in Dubai who helps startups build and launch scalable MVPs, faster. Get a free website growth audit.",
    siteName: "Kamil Szczepanik Portfolio",
    images: [
      {
        url: "/projects/portfolio-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Kamil Szczepanik - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamil Szczepanik | Senior Software Engineer",
    description:
      "Transform your vision into a reality. Kamil Szczepanik is a Senior Software Engineer in Dubai who helps startups build and launch scalable MVPs, faster. Get a free website growth audit.",
    creator: "@kamilszczepanik",
    images: [
      {
        url: "/projects/portfolio-preview.jpg",
        alt: "Kamil Szczepanik - Senior Software Engineer",
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
              jobTitle: "Senior Software Engineer",
              description:
                "Senior Software Engineer in Dubai specializing in MVP development with 5+ years of experience building scalable products.",
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
                "Software Engineering",
                "Full Stack Development",
                "React",
                "Next.js",
                "TypeScript",
                "MVP Development",
                "Product Engineering",
                "Agile Development",
                "Scrum",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Senior Software Engineer",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
