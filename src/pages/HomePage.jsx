import React from "react";
import HomeIntro from "../components/Home/HomeIntro";
import ThreeDMarqueeDemo from "../components/ui/3d-marquee-demo";
import HomeMarquee from "../components/Home/HomeMarquee";
import HomeCards from "../components/Home/HomeCards";
import HomeAccordion from "../components/Home/HomeAccordion";
import AnimatedTestimonialsDemo from "../components/animated-testimonials-demo";
import HomeProjects from "../components/Home/HomeProjects";
import AboutClients from "../components/About/AboutClients";
import HomeHero from "../components/Home/HomeHero";
import Navbar from "../components/ui/menus/Navbar";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section with Navbar */}  
      <Navbar/>
      <HomeHero />
      <HomeIntro />
      <HomeMarquee />
      <HomeCards />
      <HomeAccordion />
      <AboutClients />
      <AnimatedTestimonialsDemo />
      <HomeProjects />
    </div>
  );
};

export default HomePage;
