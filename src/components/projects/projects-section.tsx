"use client";
import { ProjectCard } from "./project-card";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Profiler, memo, useCallback } from "react";

type ProjectPreview = {
  id: number;
  title: string;
  thumbnailPath: string;
  slug: string;
};

export const ProjectsSection = memo(function ProjectsSection({
  id,
  projects: projectPreviews,
  variant,
}: {
  id: string;
  projects: ProjectPreview[];
  variant: "featured" | "other";
}) {
  const router = useRouter();
  const title = variant === "featured" ? "Featured" : "Other";
  const hasOverflow = variant === "featured" && projectPreviews.length > 2;
  const containerClasses =
    variant === "featured"
      ? cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6",
          hasOverflow && "overflow-x-auto"
        )
      : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6";

  const handleProjectClick = useCallback(
    (slug: string) => {
      router.push(`/projects/${slug}`, { scroll: false });
    },
    [router]
  );

  return (
    <Profiler
      id="ProjectsSection"
      onRender={(
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime
      ) => {
        console.log(
          `[${id}] ${phase} took ${actualDuration}ms (base: ${baseDuration}ms)`
        );
      }}
    >
      <section
        id={id}
        className="w-full max-w-7xl mx-auto my-8 sm:my-10 md:my-12"
      >
        <div className="flex justify-between items-center mb-2 sm:mb-3 md:mb-4">
          <h2 className="text-xl sm:text-xl md:text-2xl font-bold">
            {title} Projects
          </h2>
          {variant === "featured" && hasOverflow && (
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <span>Scroll for more</span>
              <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </div>
          )}
        </div>

        <div className={containerClasses}>
          {projectPreviews.map((project) => (
            <div key={project.id} className="w-full">
              <ProjectCard
                title={project.title}
                thumbnail={project.thumbnailPath}
                variant={variant}
                slug={project.slug}
                onClick={() => handleProjectClick(project.slug)}
              />
            </div>
          ))}
        </div>
      </section>
    </Profiler>
  );
});
