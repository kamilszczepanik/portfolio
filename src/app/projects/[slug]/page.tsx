"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Project } from "@/types";
import { ProjectModal } from "@/components/projects/project-modal";
import { getProjectBySlug } from "@/constants/projectData";

export default function ProjectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  const [project, setProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      setIsLoading(true);
      try {
        const projectData = await getProjectBySlug(slug);

        if (projectData) {
          setProject(projectData);
          setIsModalOpen(true);
        } else {
          router.back();
        }
      } catch (error) {
        console.error("Error loading project:", error);
        router.back();
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [slug, router]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.back();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="w-full max-w-3xl mx-auto px-6 py-8 bg-background rounded-lg shadow-lg">
          <div className="w-full aspect-video bg-muted animate-pulse rounded-lg mb-4"></div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-muted animate-pulse rounded-md"
              ></div>
            ))}
          </div>
          <div className="h-8 bg-muted animate-pulse rounded-md w-3/4 mx-auto mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded-md w-full"></div>
            <div className="h-4 bg-muted animate-pulse rounded-md w-full"></div>
            <div className="h-4 bg-muted animate-pulse rounded-md w-5/6"></div>
            <div className="h-4 bg-muted animate-pulse rounded-md w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {project && (
        <ProjectModal
          selectedProject={isModalOpen ? project : null}
          setSelectedProject={() => handleCloseModal()}
          isRouteModal={true}
        />
      )}
    </>
  );
}
