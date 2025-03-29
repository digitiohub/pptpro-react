import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navLinks, socialLinks, footerLinks } from '../../data/navigationLinks';

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

          {/* Navigation Links - Vertically centered but left aligned */}
          <nav className="flex-grow flex flex-col justify-center">
            <ul className="space-y-14">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-6xl font-medium text-black hover:opacity-70 transition-opacity block"
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
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-yellow hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 block md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-yellow h-full flex flex-col">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-black/10">
            {/* Mobile Logo */}
            <Link to="/" className="block">
              <img
                src="/logo-dark.jpg"
                alt="PPTPRO Logo"
                className="h-12"
              />
            </Link>
            
            {/* Mobile Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2"
              aria-label="Close mobile menu"
            >
              <div className="w-6 h-0.5 bg-black rotate-45 absolute rounded-full"></div>
              <div className="w-6 h-0.5 bg-black -rotate-45 rounded-full"></div>
            </button>
          </div>

          {/* Mobile Content Area */}
          <div className="flex-grow overflow-y-auto py-8">
            {/* Mobile Nav Links - Centered vertically */}
            <nav className="flex-grow flex flex-col justify-center h-full">
              <ul className="space-y-6 px-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-3xl font-medium text-black hover:opacity-70 transition-opacity block"
                      onClick={toggleMobileMenu}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Mobile Footer with CTA */}
          <div className="p-6 border-t border-black/10 bg-black text-yellow">
            <div className="flex flex-col space-y-6">
              {/* CTA */}
              <div className="flex justify-between items-center">
                <h3 className="text-md font-bold">
                  Got an Idea? <br />
                  Let's Craft Brilliant Together!
                </h3>
                <button className="bg-yellow text-black px-4 py-2 rounded-full font-medium whitespace-nowrap">
                  Get in Touch
                </button>
              </div>
              
              {/* Social Links */}
              <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-sm text-yellow/80 hover:text-yellow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
              
              {/* Footer Links */}
              <div className="flex justify-between text-xs text-yellow/70">
                {footerLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="hover:text-yellow"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;