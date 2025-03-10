import AboutMe from "@/components/about-me";
import ContactMe from "@/components/contact-me";
import { ProjectsSection } from "@/components/projects/projects-section";
import Header from "@/components/shared/header";
import { FEATURED_PROJECTS, OTHER_PROJECTS } from "@/shared/constants";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main>
        <div className="container mx-auto min-h-screen flex items-center flex-col gap-16">
          <div className="flex flex-col md:flex-row gap-12 w-full">
            <AboutMe />
            <ContactMe />
          </div>
          <ProjectsSection projects={FEATURED_PROJECTS} variant="featured" />
          <ProjectsSection projects={OTHER_PROJECTS} variant="other" />
        </div>
      </main>
    </div>
  );
}
