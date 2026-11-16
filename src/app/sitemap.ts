import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/constants/case-studies";
import { getBaseUrl } from "@/lib/utils";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = getBaseUrl();

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
