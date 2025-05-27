import React from "react";
import Navbar from "../components/ui/menus/Navbar";
import AboutHero from "../components/About/AboutHero";
import AboutClients from "../components/About/AboutClients";
import AnimatedTestimonialsDemo from "../components/animated-testimonials-demo";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <AboutHero />
      <AboutClients />
      <AnimatedTestimonialsDemo />
    </div>
  );
};

export default AboutPage;
