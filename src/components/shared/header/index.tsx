import AboutMe from "@/components/about-me";

const Header = () => {
  return (
    <header className="relative w-full min-h-[500px] h-[100vh] sm:h-[90vh] flex flex-col justify-end">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/dubai-skyline.jpg')",
        }}
      />
      <div
        className={
          "absolute inset-0 z-10 bg-gradient-to-t from-black/100 via-black/60 to-black/5"
        }
      />
      <div className="relative z-20 px-6 pb-20 sm:pb-28 md:pb-32">
        <AboutMe />
      </div>
    </header>
  );
};

export default Header;
