import React from "react";
import Navbar from "../components/ui/menus/Navbar";
import ContactHero from "../components/Contact/ContactHero";
import ContactMain from "../components/Contact/ContactMain";
import ContactMap from "../components/Contact/ContactMap";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <Navbar />
      <ContactHero />
      <ContactMain />
      <ContactMap />
    </div>
  );
};

export default ContactPage;
