import React from "react";
import Navbar from "../components/ui/menus/Navbar";
import ServicesHero from "../components/Services/ServicesHero";
import ServicesList from "../components/Services/ServicesList";

const ServicesPage = () => {
  return (
    <div className="services-page">
      <Navbar />
      <ServicesHero />
      <ServicesList />
    </div>
  );
};

export default ServicesPage;
