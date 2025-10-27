"use client";
import Header from "@/components/hero";
import { ProjectsSection } from "@/components/projects/projects-section";
import { FEATURED_PROJECTS, OTHER_PROJECTS } from "@/constants";
import { ContactForm } from "@/components/contact-form";
import ContactMe from "@/components/contact-me";
import { ContactIcons } from "@/components/contact-icons";
import { Dialog } from "@/components/ui/dialog";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="relative z-10 bg-background">
        <div className="container mx-auto px-6">
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
      <footer className="pt-12 flex flex-col gap-20 pb-24 px-6">
        <ContactForm className="md:hidden flex flex-col container gap-4 md:gap-1" />
        <ContactMe className="md:hidden flex flex-col container" />
        <ContactIcons className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-around bg-background/80 backdrop-blur-sm py-4 border-t border-border" />
      </footer>

      {/* Preload Dialog component and important UI elements */}
      <div style={{ display: "none" }}>
        <Dialog open={false} />
      </div>

      {children}

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
