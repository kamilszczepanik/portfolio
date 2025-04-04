import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { ImagesCarousel } from "./images-carousel";
import { Project } from "@/types";
import { DialogContent, DialogDescription, DialogHeader } from "../ui/dialog";
import { useState, useRef, useCallback, memo, useEffect } from "react";
import { Button } from "../ui/button";
import { AlertTriangle, ChevronLeft, Play, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProjectModalProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isRouteModal?: boolean;
  initialLoading?: boolean;
  projectDataLoading?: boolean;
  hasProjectError?: boolean;
}

export const ProjectModal = memo(function ProjectModal({
  selectedProject,
  setSelectedProject,
  isRouteModal = false,
  initialLoading = false,
  projectDataLoading = false,
  hasProjectError = false,
}: ProjectModalProps) {
  const router = useRouter();
  const [ProjectDescription, setProjectDescription] =
    useState<React.ComponentType | null>(null);
  const [isContentLoading, setIsContentLoading] = useState<boolean>(
    initialLoading || true
  );
  const [contentError, setContentError] = useState(false);
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
  const isLoading = projectDataLoading || isContentLoading;
  const hasError = hasProjectError || contentError;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
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
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isSwipping) return;

      const currentX = e.touches[0].clientX;
      const distance = currentX - swipeStartX;

      if (distance > 0) {
        setSwipeDistance(distance);
      }
    },
    [isSwipping, swipeStartX]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isSwipping) return;

    const threshold = window.innerWidth * 0.3;

    if (swipeDistance > threshold) {
      if (dialogRef.current) {
        const dialog = dialogRef.current;
        dialog.style.transition = "transform 200ms ease-out";
        dialog.style.transform = `translateX(100%)`;

        setTimeout(async () => {
          if (isRouteModal) {
            await router.push("/", { scroll: false });
          } else {
            setSelectedProject(null);
          }
        }, 200);
      } else {
        if (isRouteModal) {
          router.push("/", { scroll: false });
        } else {
          setSelectedProject(null);
        }
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
  }, [isSwipping, swipeDistance, setSelectedProject, isRouteModal, router]);

  const handleReload = useCallback(() => {
    if (selectedProject) {
      setIsContentLoading(true);
      setContentError(false);
      const currentProject = { ...selectedProject };
      setSelectedProject(null);
      setTimeout(() => setSelectedProject(currentProject), 100);
    }
  }, [selectedProject, setSelectedProject]);

  const handleCloseModal = useCallback(async () => {
    if (isRouteModal) {
      await router.push("/", { scroll: false });
    } else {
      setSelectedProject(null);
    }
  }, [isRouteModal, router, setSelectedProject]);

  const loadDescription = useCallback(async () => {
    if (!selectedProject || !selectedProject.fileName || projectDataLoading) {
      if (!projectDataLoading) {
        setIsContentLoading(false);
      }
      setProjectDescription(null);
      return;
    }

    try {
      setIsContentLoading(true);
      setContentError(false);

      const importedModule = await import(
        `@/markdown/${selectedProject.fileName}`
      );

      setProjectDescription(() => importedModule.default);
      setIsContentLoading(false);
    } catch (error) {
      console.error("Error loading project description:", error);
      setContentError(true);
      setIsContentLoading(false);
      setProjectDescription(null);
    }
  }, [selectedProject, projectDataLoading]);

  useEffect(() => {
    if (selectedProject) {
      if (!projectDataLoading) {
        loadDescription();
      }
      setActiveIndex(0);
      setSwipeDistance(0);
      setIsSwipping(false);
    }

    return () => {
      setProjectDescription(null);
    };
  }, [selectedProject, loadDescription, projectDataLoading]);

  if (isRouteModal && !selectedProject) {
    return null;
  }

  const shouldRenderPlaceholders = projectDataLoading || !selectedProject;

  return (
    <Dialog open={true} onOpenChange={() => handleCloseModal()}>
      <DialogContent
        ref={dialogRef}
        style={{
          transform:
            swipeDistance > 0 ? `translateX(${swipeDistance}px)` : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="overflow-y-auto max-sm:px-3 lg:w-[60vw] max-sm:h-[85vh] sm:my-8 max-sm:mb-4 max-sm:pt-3.5 rounded-lg"
      >
        <button
          onClick={() => handleCloseModal()}
          className="sm:hidden flex items-center text-muted-foreground hover:text-foreground z-50 transition-colors duration-200"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="ml-1 text-sm font-medium">Swipe to close</span>
        </button>

        {selectedProject && (
          <>
            {shouldRenderPlaceholders ? (
              <div className="w-full aspect-video bg-neutral-700 rounded-lg mb-4 sm:mt-6"></div>
            ) : (
              <div data-carousel="true" className="carousel sm:mt-6">
                <ImagesCarousel
                  images={selectedProject.imagesPaths}
                  videoPath={selectedProject.videoPath}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              </div>
            )}

            {shouldRenderPlaceholders ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-neutral-700 rounded-md"
                  ></div>
                ))}
              </div>
            ) : (
              isGalleryVisible && (
                <div className="mb-4 mt-2" data-carousel="true">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {selectedProject.imagesPaths
                      .slice(0, 7)
                      .map((image, index) => (
                        <div
                          key={index}
                          className={`relative aspect-video rounded-md overflow-hidden cursor-pointer ${
                            activeIndex === index
                              ? "border-gradient"
                              : "border-2 border-transparent"
                          }`}
                          onClick={() => setActiveIndex(index)}
                          data-carousel="true"
                        >
                          <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            sizes="max-sm:33vw max-md:25vw 20vw"
                            className="object-cover"
                            quality={40}
                          />
                        </div>
                      ))}
                    {selectedProject.videoPath && (
                      <div
                        className={`relative aspect-video rounded-md overflow-hidden cursor-pointer ${
                          activeIndex === selectedProject.imagesPaths.length
                            ? "border-gradient"
                            : "border-2 border-transparent"
                        }`}
                        onClick={() =>
                          setActiveIndex(selectedProject.imagesPaths.length)
                        }
                        data-carousel="true"
                      >
                        <Image
                          src={selectedProject.imagesPaths[0]}
                          alt="Video thumbnail"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                          className="object-cover"
                          priority
                          quality={75}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="rounded-full bg-black/60 w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center">
                            <Play
                              fill="white"
                              className="ml-0.5 w-4 h-4 sm:w-6 sm:h-6"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}

            <DialogHeader className="space-y-2">
              {hasError && (
                <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-medium">Failed to load content</h4>
                    <p className="text-sm text-muted-foreground">
                      There was an error loading the project details.
                    </p>
                    <Button
                      onClick={handleReload}
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              <DialogTitle className="text-2xl sm:text-3xl font-semibold text-center">
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Details and visuals for {selectedProject.title} project
              </DialogDescription>
            </DialogHeader>

            {/* Content area */}
            {isLoading && !hasError && (
              <div className="py-8 space-y-4">
                <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
                <div className="h-4 bg-neutral-700 rounded w-full"></div>
                <div className="h-4 bg-neutral-700 rounded w-full"></div>
                <div className="h-4 bg-neutral-700 rounded w-4/6"></div>
                <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
                <div className="h-4 bg-neutral-700 rounded w-3/6"></div>
              </div>
            )}

            {!isLoading && !hasError && ProjectDescription && (
              <div className="py-8">
                <ProjectDescription />
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
});
