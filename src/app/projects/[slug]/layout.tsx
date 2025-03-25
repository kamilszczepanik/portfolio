import { Metadata } from "next";
import { projectsMetadata } from "@/constants/projectData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projectMeta = projectsMetadata[slug];

  if (!projectMeta) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const metadata: Metadata = {
    title: projectMeta.title,
    description: projectMeta.description,
    keywords: projectMeta.keywords,
    openGraph: {
      title: projectMeta.title,
      description: projectMeta.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: projectMeta.title,
      description: projectMeta.description,
    },
  };

  return metadata;
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
