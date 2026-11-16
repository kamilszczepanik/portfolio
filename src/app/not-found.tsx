import type { Metadata } from "next";
import { ArrowRight, Home } from "lucide-react";
import { CtaButton } from "@/components/ui/cta-button";
import { RequestedPath } from "@/components/requested-path";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-black">
    <div className="max-w-md w-full text-center space-y-6">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-blue-500 to-sky-300">
        404
      </h1>

      <h2 className="text-2xl font-semibold text-foreground">
        Page Not Found
      </h2>

      <p className="text-muted-foreground mb-2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="text-sm text-muted-foreground border-l-2 border-primary pl-4 py-2 mb-6 text-left">
        <RequestedPath />
      </div>

      <p className="text-foreground">
        Hi, this is Kamil. You&apos;re probably looking for one of these:
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <CtaButton href="/">
          <Home aria-hidden="true" />
          Home Page
        </CtaButton>

        <CtaButton href="/#work" variant="secondary">
          Learn More
          <ArrowRight aria-hidden="true" />
        </CtaButton>
      </div>
    </div>
  </div>
);

export default NotFound;
