import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks } from "../../data/navigationLinks";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add effect to handle body scrolling when mobile menu is open
  useEffect(() => {
    // Add a CSS class to the body when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to ensure we remove the class when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  // Add effect to detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-black shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="hidden md:flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="block">
              <img
                src={
                  scrolled ? "/logos/logo-light.jpg" : "/logos/logo-dark.jpg"
                }
                alt="PPTPRO Logo"
                className="h-12"
              />
            </Link>

            {/* Main Navigation */}
            <nav className="flex-grow mx-8">
              <ul className="flex items-center justify-center space-x-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`text-base font-medium transition-colors ${
                        scrolled
                          ? "text-yellow hover:text-white"
                          : "text-black hover:text-yellow"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button */}
            <motion.button
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                scrolled
                  ? "bg-yellow text-black hover:bg-white"
                  : "bg-black text-yellow hover:bg-yellow hover:text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </div>

          {/* Mobile Navbar - Just the logo and hamburger */}
          <div className="md:hidden flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="block">
              <img
                src={
                  scrolled ? "/logos/logo-light.jpg" : "/logos/logo-dark.jpg"
                }
                alt="PPTPRO Logo"
                className="h-10"
              />
            </Link>

            {/* Mobile Hamburger Button - Only visible on mobile and when menu is closed */}
            <motion.button
              onClick={toggleMobileMenu}
              className="z-50 p-2 cursor-pointer"
              style={{ display: isMobileMenuOpen ? "none" : "" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <div
                className={`w-6 h-0.5 ${
                  scrolled ? "bg-yellow" : "bg-black"
                } mb-1.5 rounded-full`}
              ></div>
              <div
                className={`w-6 h-0.5 ${
                  scrolled ? "bg-yellow" : "bg-black"
                } mb-1.5 rounded-full`}
              ></div>
              <div
                className={`w-6 h-0.5 ${
                  scrolled ? "bg-yellow" : "bg-black"
                } rounded-full`}
              ></div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Component */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
};

export default Navbar;
