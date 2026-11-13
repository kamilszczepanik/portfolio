"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type RouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const RouteError = ({ error, reset }: RouteErrorProps) => {
  useEffect(() => {
    console.error(`Route failed to render: ${error.message}`);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-background">
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
          <Button asChild variant="outline" size="lg">
            <Link href="/#work">All work</Link>
          </Button>
          <Button type="button" variant="gradient" size="lg" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
};

export default RouteError;
