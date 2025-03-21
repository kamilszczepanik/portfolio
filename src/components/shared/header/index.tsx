import AboutMe from "@/components/about-me";
import ContactMe from "@/components/contact-me";

const Header = () => {
  return (
    <header className="relative w-full sm:h-[80vh] flex flex-col justify-end h-[35vh]">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center "
        style={{
          backgroundImage: "url('/images/dubai-skyline.jpg')",
        }}
      />
      <div
        className={
          "absolute inset-0 z-10 bg-gradient-to-t from-black/100 via-black/60 to-black/5"
        }
      />
      <div className="relative z-20 container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row gap-12 w-full">
          <AboutMe />
          <ContactMe className="hidden pt-14 w-full sm:flex sm:gap-12 sm:flex-row flex-col gap-4" />
        </div>
      </div>
    </header>
  );
};

export default Header;
