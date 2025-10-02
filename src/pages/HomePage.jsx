import { useState, useEffect } from "react";
import { fetchCoins, logout } from "../utils/api";
import Hero from "../components/layout/Hero";
import Section from "../components/layout/Section";
import CTASection from "../components/layout/CTASection";
import BentoGrid from "../components/layout/BentoGrid";
import Pricing from "../components/layout/Pricing";
import Stat from "../components/layout/Stat";
import NewSletter from "../components/layout/NewSletter";
import TrueHeader from "../components/layout/TrueHeader";
import Testimonial from "../components/layout/Testimonial";
import Blog from "../components/layout/Blog";
import Content from "../components/layout/Content";
import LogoCloud from "../components/layout/LogoCloud";

// import Hero3D from "../components/three/Hero3D";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Section />
      <CTASection />
      <LogoCloud />
      <BentoGrid />
      <Pricing />
      <Stat />
      <NewSletter />
      <TrueHeader />
      <Testimonial />
      <Blog />
      <Content />
    </>
  );
};

export default HomePage;
