import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, socialLinks, footerLinks } from '../../data/navigationLinks';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add effect to handle body scrolling when menu is open
  useEffect(() => {
    // Add a CSS class to the body when any menu is open
    if (isMenuOpen || isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup function to ensure we remove the class when component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen, isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animation variants
  const menuVariants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9] // Make sure all values are positive
      }
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9] // Make sure all values are positive
      }
    }
  };

  const linkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.7,
        staggerChildren: 0.1
      }
    }
  };

  const socialItemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      backgroundColor: "rgba(255, 197, 89, 0.9)",
      color: "#000",
      transition: { duration: 0.15 } // Faster transition on hover
    }
  };

  return (
    <>
      {/* Desktop Hamburger Button - Only visible on desktop and when menu is closed */}
      <motion.button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 p-2 hidden md:block md:visible cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ display: isMenuOpen ? 'none' : '' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle desktop menu"
      >
        <div className="w-8 h-1 bg-yellow mb-1.5 rounded-full"></div>
        <div className="w-8 h-1 bg-yellow mb-1.5 rounded-full"></div>
        <div className="w-8 h-1 bg-yellow rounded-full"></div>
      </motion.button>

      {/* Mobile Hamburger Button - Only visible on mobile and when menu is closed */}
      <motion.button
        onClick={toggleMobileMenu}
        className="fixed top-6 right-6 z-50 p-2 block md:hidden cursor-pointer"
        style={{ display: isMobileMenuOpen ? 'none' : '' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-0.5 bg-yellow mb-1.5 rounded-full"></div>
        <div className="w-6 h-0.5 bg-yellow mb-1.5 rounded-full"></div>
        <div className="w-6 h-0.5 bg-yellow rounded-full"></div>
      </motion.button>

      {/* Desktop Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 hidden md:flex"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Left Side - Yellow Background (60%) */}
            <motion.div
              className="w-3/5 bg-yellow flex flex-col justify-between overflow-hidden py-12 px-10"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Logo */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Link to="/" className="block">
                  <img
                    src="/logo-dark.jpg"
                    alt="PPTPRO Logo"
                    className="h-20"
                  />
                </Link>
              </motion.div>

              {/* Navigation Links - Vertically centered but left aligned */}
              <nav className="flex-grow flex flex-col justify-center">
                <ul className="space-y-14">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <Link
                        to={link.path}
                        className="text-6xl font-medium text-black hover:opacity-70 transition-opacity block"
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Social Media Links */}
              <motion.div
                className="pt-16"
                variants={socialVariants}
                initial="hidden"
                animate="visible"
              >
                <ul className="flex flex-wrap gap-x-8 gap-y-4">
                  {socialLinks.map((social) => (
                    <motion.li
                      key={social.name}
                      variants={socialItemVariants}
                      whileHover="hover"
                    >
                      <a
                        href={social.url}
                        className="text-black hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Side - Black Background (40%) */}
            <motion.div
              className="w-2/5 bg-black flex flex-col justify-between overflow-y-auto py-12 px-16"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Close Button */}
              <div className="flex justify-end">
                <motion.button
                  onClick={toggleMenu}
                  className="p-3 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <div className="w-8 h-1 bg-yellow absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-45 rounded-full"></div>
                  <div className="w-8 h-1 bg-yellow absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -rotate-45 rounded-full"></div>
                </motion.button>
              </div>

              {/* Center Content */}
              <motion.div
                className="text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="mb-8">
                  <motion.h2
                    className="text-yellow leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <motion.span
                      className="text-2xl block mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      Got an Idea?
                    </motion.span>
                    <motion.span
                      className="text-5xl block mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      Let's Craft
                    </motion.span>
                    <motion.span
                      className="text-5xl block"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      Brilliant Together!
                    </motion.span>
                  </motion.h2>
                </div>

                <motion.button
                  className="border border-yellow text-yellow px-14 py-3 rounded-full font-medium"
                  variants={ctaVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  Get in Touch
                </motion.button>
              </motion.div>

              {/* Footer Links */}
              <motion.div
                className="flex gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                {footerLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + (i * 0.1) }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-yellow hover:underline"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 block md:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-yellow h-full flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-black/10"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {/* Mobile Logo */}
                <Link to="/" className="block">
                  <img
                    src="/logo-dark.jpg"
                    alt="PPTPRO Logo"
                    className="h-12"
                  />
                </Link>

                {/* Mobile Close Button */}
                <motion.button
                  onClick={toggleMobileMenu}
                  className="p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close mobile menu"
                >
                  <div className="w-6 h-0.5 bg-black rotate-45 absolute rounded-full"></div>
                  <div className="w-6 h-0.5 bg-black -rotate-45 rounded-full"></div>
                </motion.button>
              </motion.div>

              {/* Mobile Content Area */}
              <div className="flex-grow overflow-y-auto py-8">
                {/* Mobile Nav Links - Centered vertically */}
                <nav className="flex-grow flex flex-col justify-center h-full">
                  <ul className="space-y-8 px-8">
                    {navLinks.map((link, i) => (
                      <motion.li
                        key={link.name}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                        whileHover={{ x: 5 }}
                      >
                        <Link
                          to={link.path}
                          className="text-4xl font-medium text-black hover:opacity-70 transition-opacity block"
                          onClick={toggleMobileMenu}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Mobile Footer with CTA */}
              <motion.div
                className="p-6 border-t border-black/10 bg-black text-yellow"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex flex-col space-y-6">
                  {/* CTA */}
                  <motion.div
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold text-center md:text-left">
                      Got an Idea? <br />
                      Let's Craft brilliant together!
                    </h3>
                    <motion.button
                      className="bg-yellow text-black px-6 py-3 rounded-full font-medium whitespace-nowrap w-full md:w-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get in Touch
                    </motion.button>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    className="flex flex-wrap justify-center gap-5"
                    variants={socialVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {socialLinks.map((social, i) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        className="text-sm text-yellow/80 hover:text-yellow"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + (i * 0.1) }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {social.name}
                      </motion.a>
                    ))}
                  </motion.div>

                  {/* Footer Links */}
                  <motion.div
                    className="flex justify-around text-xs text-yellow/70"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    {footerLinks.map((link) => (
                      <motion.div
                        key={link.name}
                        whileHover={{ scale: 1.1, color: "#ffc559" }}
                      >
                        <Link
                          to={link.path}
                          className="hover:text-yellow"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;