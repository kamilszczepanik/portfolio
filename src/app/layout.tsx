import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

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
    default: "Kamil Szczepanik | Senior Software Engineer",
    template: "%s | Kamil Szczepanik",
  },
  description:
    "Creative senior software engineer passionate about solving real life problems in a scalable and efficient way.",
  keywords: [
    "Software Engineer",
    "Software Developer",
    "Software Engineer Dubai",
    "Frontend Software Engineer Dubai",
    "Senior Software Engineer",
    "Senior Software Engineer Dubai",
    "Creative Senior Software Engineer",
    "Full Stack Engineer",
    "Team Leader",
    "Software Engineer",
    "Web Development",
    "React Developer",
    "Next.js Developer",
    "TypeScript Expert",
    "Frontend Developer",
    "Backend Developer",
    "Senior Backend Developer",
    "Senior Backend Developer Dubai",
    "Creative Senior Backend Developer",
    "Full Stack Developer",
    "Full Stack Developer Dubai",
    "Creative Full Stack Developer",
    "Team Leader",
    "Team Leader Dubai",
    "Creative Team Leader",
    "Project Manager",
    "Project Manager Dubai",
    "Creative Project Manager",
    "Product Manager",
    "Product Manager Dubai",
    "Creative Product Manager",
    "Scrum Master",
    "Scrum Master Dubai",
    "Creative Scrum Master",
    "Agile Coach",
    "Agile Coach Dubai",
    "Creative Agile Coach",
    "Agile Consultant",
    "Agile Consultant Dubai",
    "Creative Agile Consultant",
    "Agile Trainer",
    "Agile Trainer Dubai",
    "Creative Agile Trainer",
    "Agile Coach",
    "Agile Coach Dubai",
    "Creative Agile Coach",
    "Agile Consultant",
    "Agile Consultant Dubai",
    "Creative Agile Consultant",
    "Agile Trainer",
    "Agile Trainer Dubai",
    "Creative Agile Trainer",
    "Agile Coach",
    "Agile Coach Dubai",
    "Creative Agile Coach",
    "Agile Consultant",
    "Agile Consultant Dubai",
    "Creative Agile Consultant",
    "Agile Trainer",
    "Agile Trainer Dubai",
    "Creative Agile Trainer",
    "Agile Coach",
    "Agile Coach Dubai",
    "Creative Agile Coach",
    "Agile Consultant",
    "Agile Consultant Dubai",
    "Creative Agile Consultant",
    "Agile Trainer",
    "Agile Trainer Dubai",
    "Creative Agile Trainer",
    "Agile Coach",
  ],
  creator: "Kamil Szczepanik",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getBaseUrl(),
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
