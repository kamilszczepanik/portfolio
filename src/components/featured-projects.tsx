"use client";
import { useState } from "react";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";

const bigProjects = [
  {
    id: 1,
    title: "INRA - Independent Ranking",
    imagesUrl: [
      "/images/INRA-Ranking-Page.png",
      "/images/INRA-Product-Page.png",
    ],
  },
  {
    id: 2,
    title: "Prostore",
    imagesUrl: [
      "/images/INRA-Ranking-Page.png",
      "/images/INRA-Product-Page.png",
    ],
  },
  {
    id: 3,
    title: "Coming Soon",
    imagesUrl: [
      "/images/INRA-Ranking-Page.png",
      "/images/INRA-Product-Page.png",
    ],
  },
];

export type FeaturedProject = (typeof bigProjects)[0];

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] =
    useState<FeaturedProject | null>(null);

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold">Featured Projects</h2>
      <div>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {bigProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              thumbnail={project.imagesUrl[0]}
              variant="featured"
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
