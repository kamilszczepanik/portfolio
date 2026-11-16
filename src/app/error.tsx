"use client";

import { useEffect } from "react";
import { CtaButton, CtaFace, ctaVariants } from "@/components/ui/cta-button";

type RouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const RouteError = ({ error, reset }: RouteErrorProps) => {
  useEffect(() => {
    console.error(`Route failed to render: ${error.message}`);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-black">
      <div
        role="alert"
        className="max-w-md w-full text-center flex flex-col items-center gap-6"
      >
        <h1 className="text-2xl font-semibold text-foreground">
          This page could not be displayed
        </h1>
        <p className="text-muted-foreground">
          Try again, or go back to the list of my work.
        </p>
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-center">
          <CtaButton href="/#work" variant="secondary">
            All work
          </CtaButton>
          <button
            type="button"
            onClick={reset}
            className={ctaVariants({ variant: "primary" })}
          >
            <CtaFace variant="primary">Try again</CtaFace>
          </button>
        </div>
      </div>
    </main>
  );
};

export default RouteError;
