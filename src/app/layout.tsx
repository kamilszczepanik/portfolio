import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { DeferredAnalytics } from "@/components/analytics/DeferredAnalytics";
import { MotionPreferenceProvider } from "@/components/motion/motion-preference";
import { FONT_VARIABLES } from "./fonts";
import { PERSON_JSON_LD, SITE_METADATA } from "./site-metadata";

export const metadata: Metadata = SITE_METADATA;

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
          dangerouslySetInnerHTML={{ __html: PERSON_JSON_LD }}
        />
      </head>
      <body className={`${FONT_VARIABLES} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionPreferenceProvider>{children}</MotionPreferenceProvider>
        </ThemeProvider>
        <DeferredAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
          clarityId={process.env.NEXT_PUBLIC_CLARITY_ID}
        />
      </body>
    </html>
  );
}
