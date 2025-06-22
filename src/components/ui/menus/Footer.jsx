import React from "react";
import { useNavigate } from "react-router-dom";
import { navLinks, footerLinks } from "../../data/navigationLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  // Utility function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle navigation with scroll to top
  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <footer className="bg-black py-6 md:py-8 px-5 md:px-12 mt-auto">
      <div className="container mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div
              className="block cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <img
                src="/logos/logo-light.jpg"
                alt="PPTPRO Logo"
                className="h-12"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow mx-8">
            <ul className="flex flex-wrap justify-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <div
                    className="text-yellow hover:text-yellow/70 transition-colors text-base cursor-pointer"
                    onClick={() => handleNavigation(link.path)}
                  >
                    {link.name}
                  </div>
                </li>
              ))}
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <div
                    className="text-yellow hover:text-yellow/70 transition-colors text-base cursor-pointer"
                    onClick={() => handleNavigation(link.path)}
                  >
                    {link.name}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <div className="text-yellow/50 text-sm whitespace-nowrap">
            © {currentYear} PPTPRO
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Top section with logo and copyright */}
          <div className="flex justify-between items-center mb-6">
            {/* Logo */}
            <div
              className="block cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <img
                src="/logos/logo-light.jpg"
                alt="PPTPRO Logo"
                className="h-10"
              />
            </div>

            {/* Copyright */}
            <div className="text-yellow/50 text-xs">© {currentYear} PPTPRO</div>
          </div>

          {/* Navigation Grid - Main nav in 3 columns */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-x-4 gap-y-5">
              {/* Main nav links in a 3-column grid */}
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="text-yellow hover:text-yellow/70 transition-colors text-sm text-center cursor-pointer"
                  onClick={() => handleNavigation(link.path)}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>

          {/* Footer links - Centered */}
          <div className="flex justify-center space-x-4 border-t border-yellow/20 pt-5">
            {footerLinks.map((link) => (
              <div
                key={link.name}
                className="text-yellow hover:text-yellow transition-colors text-xs cursor-pointer"
                onClick={() => handleNavigation(link.path)}
              >
                {link.name}
              </div>
            ))}
          </div>
        </div>

        {/* Developed By - Shown on all screen sizes */}
        <div className="text-center pt-6 mt-4 border-t border-yellow/10">
          <span className="text-white/60 text-xs">
            Developed by{" "}
            <a
              href="https://digitiohub.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-yellow transition-colors inline-block"
            >
              DigitioHub
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
