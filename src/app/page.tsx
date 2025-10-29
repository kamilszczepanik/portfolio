import { Hero } from "@/components/hero";
import { StickyBanner } from "@/components/ui/sticky-banner";
import { CONTACT_INFO } from "@/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <StickyBanner className="bg-linear-to-b from-blue-500 to-blue-600">
        <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
          Book a Free 30-Min &quot;Website Growth&quot; Audit. I&apos;ll find 3
          bottlenecks in your site&apos;s performance, UI/UX, and SEO that are
          losing you money and show you exactly how to fix them.{" "}
          <Link
            href={CONTACT_INFO.googleCalendar}
            className="transition duration-200 hover:underline font-semibold"
            target="_blank"
          >
            Book My Free 30-Min Audit
          </Link>
        </p>
      </StickyBanner>

      <Hero />
    </div>
  );
}
