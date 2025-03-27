import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kamil Szczepanik | Full-Stack Software Developer",
    template: "%s | Kamil Szczepanik",
  },
  description:
    "Creative software developer passionate about solving real life problems in a scalable and efficient way.",
  keywords: [
    "Software Developer",
    "Full Stack Developer",
    "Team Leader",
    "Software Engineer",
    "Web Development",
    "React Developer",
    "Next.js Developer",
    "TypeScript Expert",
    "Frontend Developer",
    "Backend Developer",
  ],
  creator: "Kamil Szczepanik",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-topaz-zeta-76.vercel.app",
    title: "Kamil Szczepanik | Full-Stack Software Developer",
    description:
      "Creative software developer passionate about solving real life problems in a scalable and efficient way.",
    siteName: "Kamil Szczepanik Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamil Szczepanik | Full-Stack Software Developer",
    description:
      "Creative software developer specializing in scalable solutions. Experienced in leading startup projects from concept to deployment.",
    creator: "@kamilszczepanik",
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
