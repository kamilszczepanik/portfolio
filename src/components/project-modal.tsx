import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader, DialogContent } from "./ui/dialog";
import { FeaturedProject } from "./featured-projects";

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
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <video
                  src={selectedProject.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p>{selectedProject.fullDescription}</p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
