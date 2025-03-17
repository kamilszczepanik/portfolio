import { ProjectsSection } from "@/components/projects/projects-section";
import Header from "@/components/shared/header";
import { FEATURED_PROJECTS, OTHER_PROJECTS } from "@/shared/constants";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="relative z-10 bg-background -mt-24">
        <div className="container mx-auto px-6 py-24">
          <ProjectsSection
            projects={FEATURED_PROJECTS}
            variant="featured"
            id={"featured-projects"}
          />
          <ProjectsSection
            projects={OTHER_PROJECTS}
            variant="other"
            id={"other-projects"}
          />
        </div>
      </main>
    </div>
  );
}
