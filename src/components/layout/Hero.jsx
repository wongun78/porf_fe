const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F19]">
      {/* lớp sáng mờ */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl z-0"></div>

      {/* chữ hero */}
      <div className="relative z-10 whitespace-nowrap animate-marquee font-bold text-white text-[15rem] leading-none">
        COOP PORTFOLIO WITH REACTJS
      </div>
    </div>
  );
};

export default Hero;
