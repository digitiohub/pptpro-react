import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, socialLinks, footerLinks } from "../../data/navigationLinks";

const MobileMenu = ({ isOpen, onClose }) => {
  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.7,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 block md:hidden"
          variants={mobileMenuVariants}
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
                  src="/logos/logo-dark.jpg"
                  alt="PPTPRO Logo"
                  className="h-12"
                />
              </Link>

              {/* Mobile Close Button */}
              <motion.button
                onClick={onClose}
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
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        to={link.path}
                        className="text-3xl font-medium text-black hover:opacity-70 transition-opacity block"
                        onClick={onClose}
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
                  className="flex flex-col justify-between items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-center">
                    Got an Idea? <br />
                    Let's Craft brilliant together!
                  </h3>
                  <motion.button
                    className="bg-yellow text-black px-6 py-3 rounded-full font-medium whitespace-nowrap w-full"
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
                      transition={{ delay: 0.8 + i * 0.1 }}
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
                      <Link to={link.path} className="hover:text-yellow">
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
  );
};

export default MobileMenu;
