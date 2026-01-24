"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import clarity from "@microsoft/clarity";

type DeferredAnalyticsProps = {
  gaId: string;
  clarityId?: string;
};

export const DeferredAnalytics = ({
  gaId,
  clarityId,
}: DeferredAnalyticsProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const loadAnalytics = () => {
      setShouldLoad(true);

      if (clarityId) {
        clarity.init(clarityId);
      }
    };

    if ("requestIdleCallback" in window) {
      const idleCallbackId = window.requestIdleCallback(loadAnalytics, {
        timeout: 3000,
      });
      return () => window.cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = setTimeout(loadAnalytics, 2000);
    return () => clearTimeout(timeoutId);
  }, [clarityId]);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics gaId={gaId} />
    </>
  );
};
