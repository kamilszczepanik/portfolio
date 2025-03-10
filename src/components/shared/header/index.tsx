import AboutMe from "@/components/about-me";
import ContactMe from "@/components/contact-me";

const Header = () => {
  return (
    <header className="relative w-full h-[80vh] flex flex-col justify-end">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/dubai-skyline.jpg')",
        }}
      />
      <div
        className={
          "absolute inset-0 z-10 bg-gradient-to-t from-secondary/100 via-black/60 to-black/20"
        }
      />
      <div className="relative z-20 container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <AboutMe />
          <ContactMe />
        </div>
      </div>
    </header>
  );
};

export default Header;
