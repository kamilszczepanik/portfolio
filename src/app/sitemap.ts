import type { MetadataRoute } from "next";
import { slugToTitleMap } from "../constants/projectData";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = Object.keys(slugToTitleMap).map((slug) => ({
    url: `https://portfolio-topaz-zeta-76.vercel.app/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://portfolio-topaz-zeta-76.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://portfolio-topaz-zeta-76.vercel.app/projects",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...projectUrls,
  ];
}
