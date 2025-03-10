"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const bigProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js, React, and Stripe.",
    imageUrl: "/projects/project1.jpg",
    videoUrl: "/projects/project1-video.mp4",
    fullDescription:
      "This is a full description that would be loaded from a markdown file.",
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "An AI-powered content generation tool using OpenAI's GPT-4.",
    imageUrl: "/projects/project2.jpg",
    videoUrl: "/projects/project2-video.mp4",
    fullDescription:
      "This is a full description that would be loaded from a markdown file.",
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description: "A real-time chat application built with Socket.io and React.",
    imageUrl: "/projects/project3.jpg",
    videoUrl: "/projects/project3-video.mp4",
    fullDescription:
      "This is a full description that would be loaded from a markdown file.",
  },
];

export function FeaturedProjects() {
  const [selectedBigProject, setSelectedBigProject] = useState<
    (typeof bigProjects)[0] | null
  >(null);

  return (
    <>
      <div>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {bigProjects.map((project) => (
            <div key={project.id}>{project.title}</div>
          ))}
        </div>
      </div>
      <Dialog
        open={!!selectedBigProject}
        onOpenChange={() => setSelectedBigProject(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedBigProject?.title}</DialogTitle>
            <DialogDescription>
              {selectedBigProject?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedBigProject && (
            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <video
                  src={selectedBigProject.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p>{selectedBigProject.fullDescription}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      ;
    </>
  );
}
