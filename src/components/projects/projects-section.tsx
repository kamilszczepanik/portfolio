"use client";
import { useState } from "react";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import { Project } from "@/shared/types";

export function ProjectsSection({
  projects,
  variant,
}: {
  projects: Project[];
  variant: "featured" | "other";
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const title = variant === "featured" ? "Featured" : "Other";

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold">{title} Projects</h2>
      <div>
        <div className="flex gap-6 overflow-x-auto pb-6 scroll-m-0 no-scrollbar">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              thumbnail={project.imagesPaths[0]}
              variant={variant}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>
      <ProjectModal
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </section>
  );
}
