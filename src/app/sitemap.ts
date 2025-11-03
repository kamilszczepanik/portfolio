import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Get base URL dynamically - works in both development and production
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];
}
