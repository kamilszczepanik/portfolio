"use client";

import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { cn } from "@/lib/utils";

type SectionErrorBoundaryProps = {
  name: string;
  children: ReactNode;
  className?: string;
};

type SectionFallbackProps = {
  className?: string;
};

const reloadPage = () => window.location.reload();

const describeError = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

const SectionFallback = ({ className }: SectionFallbackProps) => (
  <div
    role="alert"
    className={cn(
      "flex w-full flex-col items-start gap-2 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-neutral-200",
      className
    )}
  >
    <p>This part of the page could not be displayed.</p>
    <button
      type="button"
      onClick={reloadPage}
      className="min-h-11 font-semibold text-blue-300 underline-offset-4 hover:underline"
    >
      Reload the page
    </button>
  </div>
);

export const SectionErrorBoundary = ({
  name,
  children,
  className,
}: SectionErrorBoundaryProps) => (
  <ErrorBoundary
    fallback={<SectionFallback className={className} />}
    onError={(error) =>
      console.error(`${name} failed to render: ${describeError(error)}`)
    }
  >
    {children}
  </ErrorBoundary>
);
