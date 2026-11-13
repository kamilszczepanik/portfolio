import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/constants/case-studies";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kamilszczepanik.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...CASE_STUDIES.map(({ slug }) => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
};

export default sitemap;
