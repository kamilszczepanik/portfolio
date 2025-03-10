import { Dialog, DialogTitle } from "@radix-ui/react-dialog";

import { ImagesCarousel } from "./images-carousel";
import Inra from "@/markdown/inra.mdx";
import { Project } from "@/shared/types";
import { DialogContent, DialogHeader } from "../ui/dialog";

export function ProjectModal({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}) {
  return (
    <Dialog
      open={!!selectedProject}
      onOpenChange={() => setSelectedProject(null)}
    >
      <DialogContent className="w-7xl">
        {selectedProject && (
          <>
            <ImagesCarousel />
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
            </DialogHeader>
            <Inra />
            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden rounded-lg"></div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
