"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Project } from "@/types";
import { ProjectModal } from "@/components/projects/project-modal";
import { getProjectBySlug } from "@/constants/projectData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ProjectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  const [project, setProject] = useState<Project | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await getProjectBySlug(slug);
        if (projectData) {
          setProject(projectData);
          setShowSkeleton(false);
        } else {
          router.back();
        }
      } catch (error) {
        console.error("Error loading project:", error);
        router.back();
      }
    };

    loadProject();
  }, [slug, router]);

  const handleCloseModal = () => {
    router.back();
  };

  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      {showSkeleton && (
        <Dialog open={true} onOpenChange={() => {}}>
          <DialogContent className="overflow-y-auto max-sm:px-3 lg:w-[60vw]">
            <div className="w-full aspect-video bg-muted rounded-lg mb-4 sm:mt-6"></div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-video bg-muted rounded-md"></div>
              ))}
              <div className="aspect-video bg-muted rounded-md max-sm:hidden"></div>
            </div>

            <DialogHeader>
              <DialogTitle className="text-4xl text-center">
                {formattedTitle}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Details and visuals for {formattedTitle} project
              </DialogDescription>
            </DialogHeader>

            <div className="py-8">
              <div className="space-y-4">
                <div className="h-5 bg-muted rounded-md w-full"></div>
                <div className="h-5 bg-muted rounded-md w-full"></div>
                <div className="h-5 bg-muted rounded-md w-5/6"></div>
                <div className="h-5 bg-muted rounded-md w-4/5"></div>
                <div className="h-5 bg-muted rounded-md w-full"></div>
                <div className="h-5 bg-muted rounded-md w-3/4"></div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {project && !showSkeleton && (
        <ProjectModal
          selectedProject={project}
          setSelectedProject={handleCloseModal}
          isRouteModal={true}
        />
      )}
    </>
  );
}
