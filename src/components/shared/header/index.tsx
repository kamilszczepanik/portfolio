import AboutMe from "@/components/about-me";

const Header = () => {
  return (
    <header className="relative w-full min-h-[500px] max-md:h-[55vh] md:h-[90vh] flex flex-col justify-end">
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
      <div className="relative z-20 px-6">
        <AboutMe />
      </div>
    </header>
  );
};

export default Header;
