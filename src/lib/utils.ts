import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const LOCAL_BASE_URL = "http://localhost:3000";

const toHttpsUrl = (host: string | undefined) =>
  host ? `https://${host}` : undefined;

export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    toHttpsUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    toHttpsUrl(process.env.VERCEL_URL) ||
    LOCAL_BASE_URL
  );
};
