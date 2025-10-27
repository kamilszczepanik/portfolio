import { Hero } from "@/components/hero";
import { StickyBanner } from "@/components/ui/sticky-banner";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
        <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
          Announcing $10M seed funding from project mayhem ventures.{" "}
          <Link
            href="#"
            className="transition duration-200 hover:underline font-semibold"
          >
            Book a call
          </Link>
        </p>
      </StickyBanner>

      <Hero />
    </div>
  );
}
