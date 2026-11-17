const ARC_STYLE = {
  background:
    "radial-gradient(ellipse 46% 26% at 50% 0%, color-mix(in oklch, oklch(0.45 0.17 262) 55%, transparent), transparent 80%), linear-gradient(180deg, oklch(0.13 0.04 262), #000 34%)",
  boxShadow:
    "0 -6px 26px -6px color-mix(in oklch, var(--color-primary) 55%, transparent), 0 -30px 80px -30px color-mix(in oklch, var(--color-primary) 45%, transparent)",
};

const RINGS_STYLE = {
  background:
    "repeating-radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0 22px, rgba(255, 255, 255, 0.035) 22px 23px)",
};

const AIR_STYLE = {
  background:
    "radial-gradient(ellipse 60% 70% at 50% 100%, color-mix(in oklch, var(--color-primary) 26%, transparent), transparent 70%)",
};

export const HorizonArc = () => (
  <>
    <div
      aria-hidden
      style={AIR_STYLE}
      className="pointer-events-none absolute inset-x-0 bottom-14 -z-10 h-[130px] sm:bottom-[90px] sm:h-[190px]"
    />
    <div
      aria-hidden
      data-sky-horizon
      style={ARC_STYLE}
      className="pointer-events-none absolute bottom-[-416px] left-1/2 -z-10 h-[520px] w-[980px] -translate-x-1/2 rounded-[50%] sm:bottom-[-750px] sm:h-[900px] sm:w-[2100px]"
    >
      <div className="absolute inset-0 rounded-[50%] border-t-2 border-[#c6d6f6] mask-[linear-gradient(90deg,transparent_12%,#000_38%,#000_62%,transparent_88%)]" />
      <div
        style={RINGS_STYLE}
        className="absolute inset-0 rounded-[50%] mask-[linear-gradient(180deg,transparent_2%,#000_12%,transparent_40%)]"
      />
    </div>
  </>
);
