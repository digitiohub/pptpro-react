import React from "react";
import Navbar from "../components/ui/menus/Navbar";
import AboutHero from "../components/About/AboutHero";
import AboutClients from "../components/About/AboutClients";
import AboutVision from "../components/About/AboutVision";
import AboutMission from "../components/About/AboutMission";
import AboutTeam from "../components/About/AboutTeam";
import AnimatedTestimonialsDemo from "../components/animated-testimonials-demo";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <AboutHero />
      <AboutClients />
      <AboutVision />
      <AboutMission />
      <AboutTeam />
    </div>
  );
};

export default AboutPage;
