"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Project } from "@/types";
import { getProjectBySlug, prefetchProjects } from "@/constants/projectData";
import dynamic from "next/dynamic";

const ProjectModal = dynamic(
  () =>
    import("@/components/projects/project-modal").then(
      (mod) => mod.ProjectModal
    ),
  {
    loading: () => null,
    ssr: false,
  }
);

export default function ProjectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const slug = useMemo(() => pathname.split("/").pop() || "", [pathname]);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProject = useCallback(async () => {
    try {
      const projectData = await getProjectBySlug(slug);

      if (projectData) {
        setProject(projectData);
        setIsLoading(false);
        setError(false);

        const otherSlugs = [
          "independent-ranking",
          "e-commerce-platform",
          "excel-clone",
          "apple-calculator",
          "tic-tac-toe",
        ].filter((s) => s !== slug);

        setTimeout(() => {
          prefetchProjects(otherSlugs.slice(0, 2));
        }, 1000);
      } else {
        setError(true);
        setTimeout(() => router.back(), 500);
      }
    } catch (error) {
      console.error("Error loading project:", error);
      setError(true);
      setTimeout(() => router.back(), 500);
    }
  }, [slug, router]);

  useEffect(() => {
    loadProject();
  }, [slug, loadProject]);

  const handleCloseModal = useCallback(() => {
    router.back();
  }, [router]);

  const formattedTitle = useMemo(
    () =>
      slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    [slug]
  );

  const placeholderProject = useMemo(() => {
    if (project) return project;

    return {
      id: 9999,
      title: formattedTitle,
      description: "Loading...",
      slug: slug,
      imagesPaths: Array(4).fill("/placeholder.jpg"),
      thumbnailPath: "/placeholder.jpg",
      fileName: "",
      featured: false,
    } as Project;
  }, [project, formattedTitle, slug]);

  return (
    <ProjectModal
      key={`project-modal-${slug}`}
      selectedProject={placeholderProject}
      setSelectedProject={handleCloseModal}
      isRouteModal={true}
      initialLoading={isLoading}
      projectDataLoading={isLoading}
      hasProjectError={error}
    />
  );
}
