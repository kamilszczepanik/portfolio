import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader, DialogContent } from "./ui/dialog";
import { FeaturedProject } from "./featured-projects";
import { ImagesCarousel } from "./images-carousel";

export function ProjectModal({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: FeaturedProject | null;
  setSelectedProject: (project: FeaturedProject | null) => void;
}) {
  return (
    <Dialog
      open={!!selectedProject}
      onOpenChange={() => setSelectedProject(null)}
    >
      <DialogContent className="max-w-4xl">
        {selectedProject && (
          <>
            <ImagesCarousel />
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden rounded-lg"></div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
