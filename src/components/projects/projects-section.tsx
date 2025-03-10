"use client";
import { useState } from "react";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import { Project } from "@/shared/types";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectsSection({
  projects,
  variant,
}: {
  projects: Project[];
  variant: "featured" | "other";
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const title = variant === "featured" ? "Featured" : "Other";

  // Calculate if featured projects need horizontal scrolling
  const hasOverflow = variant === "featured" && projects.length > 2;

  // Container classes based on variant
  const containerClasses =
    variant === "featured"
      ? cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-6",
          hasOverflow && "overflow-x-auto"
        )
      : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"; // Standard grid for "other" projects

  return (
    <section className="w-full max-w-7xl mx-auto my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title} Projects</h2>
        {variant === "featured" && hasOverflow && (
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Scroll for more</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </div>
        )}
      </div>

      <div className={containerClasses}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={variant === "featured" ? "w-full max-w-2xl" : "w-full"}
          >
            <ProjectCard
              title={project.title}
              thumbnail={project.imagesPaths[0]}
              variant={variant}
              onClick={() => setSelectedProject(project)}
            />
          </div>
        ))}
      </div>

      <ProjectModal
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </section>
  );
}
