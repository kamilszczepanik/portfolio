import AboutMe from "@/components/about-me";

const Header = () => {
  return (
    <header className="relative w-full min-h-[500px] h-[55vh] md:h-[70vh] lg:h-[50vh] flex flex-col justify-end">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/dubai-skyline.jpg')",
        }}
      />
      <div
        className={
          "absolute inset-0 z-10 bg-gradient-to-t from-neutral-800/100 via-neutral-900/60 to-neutral-800/5"
        }
      />
      <div className="relative z-20 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <AboutMe />
        </div>
      </div>
    </header>
  );
};

export default Header;
