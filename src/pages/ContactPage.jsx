import React from "react";
import Navbar from "../components/ui/menus/Navbar";
import ContactHero from "../components/Contact/ContactHero";
import ContactMain from "../components/Contact/ContactMain";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <Navbar />
      <ContactHero />
      <ContactMain />
    </div>
  );
};

export default ContactPage;
