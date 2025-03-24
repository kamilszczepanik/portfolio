import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { ImagesCarousel } from "./images-carousel";
import { Project } from "@/types";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { AlertTriangle, ChevronLeft, Play, RefreshCw } from "lucide-react";
import Image from "next/image";

interface ProjectModalProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isRouteModal?: boolean;
}

export function ProjectModal({
  selectedProject,
  setSelectedProject,
  isRouteModal = false,
}: ProjectModalProps) {
  const [ProjectDescription, setProjectDescription] =
    useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const videosCount = selectedProject?.videoPath ? 1 : 0;
  const imagesCount = selectedProject?.imagesPaths
    ? selectedProject?.imagesPaths.length
    : 0;
  const countGalleryElements = videosCount + imagesCount;
  const isGalleryVisible = countGalleryElements > 1;
  const dialogRef = useRef<HTMLDivElement>(null);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isSwipping, setIsSwipping] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    let element = e.target as HTMLElement | null;

    while (element) {
      if (
        element.hasAttribute("data-carousel") ||
        element.classList.contains("carousel") ||
        element.tagName === "VIDEO" ||
        element.tagName === "IMG" ||
        element.tagName === "BUTTON"
      ) {
        return;
      }
      element = element.parentElement;
    }

    setSwipeStartX(e.touches[0].clientX);
    setIsSwipping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipping) return;

    const currentX = e.touches[0].clientX;
    const distance = currentX - swipeStartX;

    if (distance > 0) {
      setSwipeDistance(distance);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwipping) return;

    const threshold = window.innerWidth * 0.3;

    if (swipeDistance > threshold) {
      if (dialogRef.current) {
        const dialog = dialogRef.current;
        dialog.style.transition = "transform 200ms ease-out";
        dialog.style.transform = `translateX(100%)`;
        setTimeout(() => setSelectedProject(null), 200);
      } else {
        setSelectedProject(null);
      }
    } else {
      if (dialogRef.current) {
        const dialog = dialogRef.current;
        dialog.style.transition = "transform 200ms ease-out";
        dialog.style.transform = "translateX(0)";
        setTimeout(() => {
          setSwipeDistance(0);
          dialog.style.transition = "";
          dialog.style.transform = "";
        }, 200);
      }
    }

    setIsSwipping(false);
  };

  const handleReload = () => {
    if (selectedProject) {
      setIsLoading(true);
      setError(false);
      const currentProject = { ...selectedProject };
      setSelectedProject(null);
      setTimeout(() => setSelectedProject(currentProject), 100);
    }
  };

  useEffect(() => {
    async function loadDescription() {
      if (!selectedProject || !selectedProject.fileName) {
        setIsLoading(false);
        setProjectDescription(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(false);

        const importedModule = await import(
          `@/markdown/${selectedProject.fileName}`
        );

        setProjectDescription(() => importedModule.default);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading project description:", error);
        setError(true);
        setIsLoading(false);
        setProjectDescription(null);
      }
    }

    if (selectedProject) {
      loadDescription();
      setActiveIndex(0);
      setSwipeDistance(0);
      setIsSwipping(false);
    }
  }, [selectedProject]);

  // If this is a route-based modal and no project is selected, render nothing
  if (isRouteModal && !selectedProject) {
    return null;
  }

  return (
    <>
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent
          ref={dialogRef}
          style={{
            transform:
              swipeDistance > 0 ? `translateX(${swipeDistance}px)` : undefined,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="overflow-y-auto max-sm:px-1 lg:w-[60vw]"
        >
          {selectedProject && (
            <>
              <div className="absolute sm:hidden -translate-y-1/2 text-muted-foreground flex items-center pointer-events-none z-20 opacity-80 pt-12">
                <ChevronLeft />
                <span className="ml-1 text-sm font-medium">Swipe to close</span>
              </div>

              <div data-carousel="true" className="carousel">
                <ImagesCarousel
                  images={selectedProject.imagesPaths}
                  videoPath={selectedProject.videoPath}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              </div>

              {isGalleryVisible && (
                <div className="mb-4 mt-2" data-carousel="true">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {selectedProject.videoPath && (
                      <div
                        className={`relative aspect-video rounded-md overflow-hidden cursor-pointer ${
                          activeIndex === 0
                            ? "border-gradient"
                            : "border-2 border-transparent"
                        }`}
                        onClick={() => setActiveIndex(0)}
                        data-carousel="true"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-full bg-black/60 w-10 h-10 flex items-center justify-center">
                            <Play fill="white" size={18} className="ml-0.5" />
                          </div>
                        </div>
                        <video
                          src={selectedProject.videoPath}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {selectedProject.imagesPaths.map((image, index) => {
                      const thumbnailIndex = selectedProject.videoPath
                        ? index + 1
                        : index;
                      return (
                        <div
                          key={index}
                          className={`relative aspect-video rounded-md overflow-hidden cursor-pointer ${
                            activeIndex === thumbnailIndex
                              ? "border-gradient"
                              : "border-2 border-transparent"
                          }`}
                          onClick={() => setActiveIndex(thumbnailIndex)}
                          data-carousel="true"
                        >
                          <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <DialogHeader>
                <DialogTitle className="text-4xl text-center">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Failed to load project description
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    There was an error loading the project details
                  </p>
                  <Button onClick={handleReload} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              ) : (
                ProjectDescription && <ProjectDescription />
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
