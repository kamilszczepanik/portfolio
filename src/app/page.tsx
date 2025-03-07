import AboutMe from "@/components/about-me";
import ContactMe from "@/components/contact-me";
import Header from "@/components/shared/header";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="container mx-auto px-6 py-24 min-h-screen flex items-center">
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <AboutMe />
          <ContactMe />
        </div>
      </div>
    </div>
  );
}
