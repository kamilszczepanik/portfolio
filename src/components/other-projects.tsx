"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

const otherProjects = [
  {
    id: 4,
    title: "Weather App",
    description: "A simple weather application using OpenWeatherMap API.",
    imageUrl: "/projects/project4.jpg",
    screenshots: [
      "/projects/project4-screenshot1.jpg",
      "/projects/project4-screenshot2.jpg",
    ],
    fullDescription:
      "This is a full description that would be loaded from a markdown file.",
  },
  {
    id: 5,
    title: "Task Manager",
    description:
      "A task management application with drag-and-drop functionality.",
    imageUrl: "/projects/project5.jpg",
    screenshots: [
      "/projects/project5-screenshot1.jpg",
      "/projects/project5-screenshot2.jpg",
    ],
    fullDescription:
      "This is a full description that would be loaded from a markdown file.",
  },
  {
    id: 6,
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with Next.js and Tailwind CSS.",
    imageUrl: "/projects/project6.jpg",
    screenshots: [
      "/projects/project6-screenshot1.jpg",
      "/projects/project6-screenshot2.jpg",
    ],
    fullDescription:
      "This is a full description that would be loaded from a markdown file.",
  },
];

export function OtherProjects() {
  const [selectedOtherProject, setSelectedOtherProject] = useState<
    (typeof otherProjects)[0] | null
  >(null);

  return (
    <>
      <div>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {otherProjects.map((project) => (
            <div key={project.id}>{project.title}</div>
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedOtherProject}
        onOpenChange={() => setSelectedOtherProject(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedOtherProject?.title}</DialogTitle>
            <DialogDescription>
              {selectedOtherProject?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedOtherProject && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedOtherProject.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className="aspect-video relative overflow-hidden rounded-lg"
                  >
                    <Image
                      src={screenshot}
                      alt={`${selectedOtherProject.title} screenshot ${
                        index + 1
                      }`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p>{selectedOtherProject.fullDescription}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
