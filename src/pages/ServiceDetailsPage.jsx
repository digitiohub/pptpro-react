import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import Navbar from "../components/ui/menus/Navbar";
import ServiceHero from "../components/ServiceDetails/ServiceHero";
import ServiceIntro from "../components/ServiceDetails/ServiceIntro";
import ServiceInfoGrid from "../components/ServiceDetails/ServiceInfoGrid";
import ServiceSteps from "../components/ServiceDetails/ServiceSteps";
import ServiceIncludes from "../components/ServiceDetails/ServiceIncludes";
import ServiceFAQ from "../components/ServiceDetails/ServiceFAQ";

const ServiceDetailsPage = () => {
  const { serviceSlug } = useParams();

  // Get the current service data based on URL parameter
  const currentService =
    servicesData[serviceSlug] || servicesData["corporate-presentation"];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  return (
    <div className="service-details-page">
      <Navbar />
      <ServiceHero
        title={currentService.title}
        subtitle={currentService.subtitle}
        image={currentService.heroImage}
      />
      <ServiceIntro
        heading={currentService.intro.heading}
        subheading={currentService.intro.subheading}
        description={currentService.intro.description}
      />
      <ServiceInfoGrid items={currentService.infoGrid} />
      <ServiceSteps steps={currentService.steps} />
      <ServiceIncludes items={currentService.includes} />
      <ServiceFAQ faqs={currentService.faqs} />
    </div>
  );
};

export default ServiceDetailsPage;
