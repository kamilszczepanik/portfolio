import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl(): string {
  // For static generation (build time)
  if (typeof window === "undefined") {
    // Check for custom base URL first
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }

    // Check if we're in a Vercel environment
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    // Default for development
    return "http://localhost:3000";
  }

  // For client-side, use the current origin
  return window.location.origin;
}
