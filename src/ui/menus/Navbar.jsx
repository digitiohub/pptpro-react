import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navLinks, socialLinks } from '../../data/navigationLinks';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Hamburger Button - Only visible on desktop and when menu is closed */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 p-2 hidden md:block md:visible"
        style={{ display: isMenuOpen ? 'none' : '' }}
        aria-label="Toggle desktop menu"
      >
        <div className="w-8 h-1 bg-yellow mb-1.5 rounded-full"></div>
        <div className="w-8 h-1 bg-yellow mb-1.5 rounded-full"></div>
        <div className="w-8 h-1 bg-yellow rounded-full"></div>
      </button>

      {/* Mobile Hamburger Button - Only visible on mobile and when menu is closed */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-6 right-6 z-50 p-2 block md:hidden"
        style={{ display: isMobileMenuOpen ? 'none' : '' }}
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-0.5 bg-yellow mb-1.5 rounded-full"></div>
        <div className="w-6 h-0.5 bg-yellow mb-1.5 rounded-full"></div>
        <div className="w-6 h-0.5 bg-yellow rounded-full"></div>
      </button>

      {/* Desktop Full Screen Menu */}
      <div className={`fixed inset-0 z-40 hidden md:flex transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Left Side - Yellow Background (60%) */}
        <div className="w-3/5 bg-yellow flex flex-col justify-between overflow-y-auto py-12 px-10">
          {/* Logo */}
          <div className="mb-16">
            <Link to="/" className="block">
              <img
                src="/logo-dark.jpg"
                alt="PPTPRO Logo"
                className="h-20"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow">
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-4xl font-medium text-black hover:opacity-70 transition-opacity"
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Links */}
          <div className="pt-16">
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    className="text-black hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Black Background (40%) */}
        <div className="w-2/5 bg-black flex flex-col justify-between overflow-y-auto py-12 px-16">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="p-2"
              aria-label="Close menu"
            >
              <div className="w-8 h-1 bg-yellow rotate-45 absolute rounded-full"></div>
              <div className="w-8 h-1 bg-yellow -rotate-45 rounded-full"></div>
            </button>
          </div>

          {/* Center Content */}
          <div className="text-left">
            <div className="mb-8">
              <h2 className="text-yellow leading-tight">
                <span className="text-xl block mb-2">Got an Idea?</span>
                <span className="text-5xl block mb-2">Let's Craft</span>
                <span className="text-5xl block">brilliant together!</span>
              </h2>
            </div>

            <button className="border border-yellow text-yellow hover:text-black px-14 py-3 rounded-full font-medium hover:bg-yellow-dark transition-colors">
              Get in Touch
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex gap-8">
            <Link to="/terms" className="text-yellow hover:underline">Terms and Conditions</Link>
            <Link to="/privacy" className="text-yellow hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 block md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-yellow h-full flex flex-col">
          {/* Mobile Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={toggleMobileMenu}
              className="p-2"
              aria-label="Close mobile menu"
            >
              <div className="w-6 h-0.5 bg-black rotate-45 absolute rounded-full"></div>
              <div className="w-6 h-0.5 bg-black -rotate-45 rounded-full"></div>
            </button>
          </div>

          {/* Mobile Logo */}
          <div className="px-6 mb-8">
            <Link to="/" className="block">
              <img
                src="/logo-dark.jpg"
                alt="PPTPRO Logo"
                className="h-10"
              />
            </Link>
          </div>

          {/* Mobile Nav Links */}
          <div className="flex-grow px-6 overflow-y-auto">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-2xl font-medium text-black hover:opacity-70 transition-opacity"
                    onClick={toggleMobileMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <div className="mt-10 bg-black p-6 rounded-lg text-center">
              <h3 className="text-yellow text-2xl font-bold mb-4">
                Got an Idea? Let's Craft brilliant together!
              </h3>
              <button className="bg-yellow text-black px-6 py-2 rounded-full font-medium">
                Get in Touch
              </button>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="p-6 border-t border-black/10">
            <div className="flex flex-wrap gap-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-sm text-black hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </div>
            <div className="flex justify-between text-xs text-black/70">
              <Link to="/terms">Terms and Conditions</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;