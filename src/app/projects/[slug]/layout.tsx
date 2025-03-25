import { Metadata } from "next";
import { getProjectBySlug } from "@/constants/projectData";
import { projectsMetadata } from "@/constants/projectData";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  const metadata = projectsMetadata[params.slug];

  if (!project || !metadata) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    ...metadata.metadata,
    keywords: metadata.keywords,
    openGraph: {
      ...metadata.metadata.openGraph,
      type: "article",
      images: project.imagesPaths.map((path) => ({
        url: path,
        width: 1200,
        height: 630,
        alt: `${project.title} preview`,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: project.imagesPaths[0],
    },
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
