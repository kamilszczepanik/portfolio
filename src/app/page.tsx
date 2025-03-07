import AboutMe from "@/components/about-me";
import ModeToggle from "@/components/header/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-end">
        <ModeToggle />
      </header>
      <main>
        <AboutMe />
      </main>
      <footer className="flex justify-end">
        <Button>Contact Me</Button>
      </footer>
    </div>
  );
}
