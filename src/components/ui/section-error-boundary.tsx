"use client";

import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { cn } from "@/lib/utils";

type SectionErrorBoundaryProps = {
  name: string;
  children: ReactNode;
  className?: string;
  onDismiss?: () => void;
};

type SectionFallbackProps = {
  className?: string;
  onDismiss?: () => void;
};

const FALLBACK_ACTION =
  "min-h-11 font-semibold text-blue-300 underline-offset-4 hover:underline";

const reloadPage = () => window.location.reload();

const describeError = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

const SectionFallback = ({ className, onDismiss }: SectionFallbackProps) => (
  <div
    role="alert"
    className={cn(
      "flex w-full flex-col items-start gap-2 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-neutral-200",
      onDismiss &&
        "fixed inset-x-4 bottom-4 z-1100 mx-auto w-auto max-w-sm bg-neutral-900 shadow-xl",
      className,
    )}
  >
    <p>This part of the page could not be displayed.</p>
    <div className="flex gap-6">
      <button type="button" onClick={reloadPage} className={FALLBACK_ACTION}>
        Reload the page
      </button>
      {onDismiss ? (
        <button type="button" onClick={onDismiss} className={FALLBACK_ACTION}>
          Close
        </button>
      ) : null}
    </div>
  </div>
);

export const SectionErrorBoundary = ({
  name,
  children,
  className,
  onDismiss,
}: SectionErrorBoundaryProps) => (
  <ErrorBoundary
    fallbackRender={({ resetErrorBoundary }) => (
      <SectionFallback
        className={className}
        onDismiss={onDismiss ? () => resetErrorBoundary() : undefined}
      />
    )}
    onReset={onDismiss}
    onError={(error) =>
      console.error(`${name} failed to render: ${describeError(error)}`)
    }
  >
    {children}
  </ErrorBoundary>
);
