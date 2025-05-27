import React from "react";
import HomeIntro from "../components/Home/HomeIntro";
import ThreeDMarqueeDemo from "../components/ui/3d-marquee-demo";
import HomeMarquee from "../components/Home/HomeMarquee";
import HomeCards from "../components/Home/HomeCards";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section with Navbar */}
     
      <ThreeDMarqueeDemo />
      <HomeIntro />
      <HomeMarquee />
      <HomeCards />
    </div>
  );
};

export default HomePage;

