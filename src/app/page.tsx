import AboutMe from "@/components/about-me";
import ContactMe from "@/components/contact-me";
import { FeaturedProjects } from "@/components/featured-projects";
import { OtherProjects } from "@/components/other-projects";
import Header from "@/components/shared/header";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main>
        <div className="container mx-auto px-6  min-h-screen flex items-center flex-col">
          <div className="flex flex-col md:flex-row gap-12 w-full">
            <AboutMe />
            <ContactMe />
          </div>
          <FeaturedProjects />
          <OtherProjects />
        </div>
      </main>
    </div>
  );
}
