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
          router.push("/");
        }
      } catch (error) {
        console.error("Error loading project:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [slug, router]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
