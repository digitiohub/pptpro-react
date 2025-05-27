import React from "react";
import HomeIntro from "../components/Home/HomeIntro";
import ThreeDMarqueeDemo from "../components/ui/3d-marquee-demo";
import HomeMarquee from "../components/Home/HomeMarquee";
import HomeCards from "../components/Home/HomeCards";
import HomeAccordion from "../components/Home/HomeAccordion";
import AnimatedTestimonialsDemo from "../components/animated-testimonials-demo";
import HomeProjects from "../components/Home/HomeProjects";
const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section with Navbar */}
      <ThreeDMarqueeDemo />
      <HomeIntro />
      <HomeMarquee />
      <HomeCards />
      <HomeAccordion />
      <AnimatedTestimonialsDemo />
      <HomeProjects />
    </div>
  );
};

export default HomePage;
