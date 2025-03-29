import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks, footerLinks } from '../../data/navigationLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-6 md:py-8 px-5 md:px-12 mt-auto">
      <div className="container mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img
                src="/logo-light.jpg"
                alt="PPTPRO Logo"
                className="h-12"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow mx-8">
            <ul className="flex flex-wrap justify-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-yellow hover:text-yellow/70 transition-colors text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-yellow hover:text-yellow/70 transition-colors text-base"
                  >
                    {link.name}
                  </Link>
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
            <Link to="/" className="block">
              <img
                src="/logo-light.jpg"
                alt="PPTPRO Logo"
                className="h-10"
              />
            </Link>

            {/* Copyright */}
            <div className="text-yellow/50 text-xs">
              © {currentYear} PPTPRO
            </div>
          </div>

          {/* Navigation Grid - Main nav in 3 columns */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-x-4 gap-y-5">
              {/* Main nav links in a 3-column grid */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-yellow hover:text-yellow/70 transition-colors text-sm text-center"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer links - Centered */}
          <div className="flex justify-center space-x-4 border-t border-yellow/20 pt-5">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-yellow/70 hover:text-yellow transition-colors text-xs"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;