import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  navLinks,
  socialLinks,
  footerLinks,
} from "../../../data/navigationLinks";
import StarBorder from "../../../ui/StarBorder/StarBorder";
import { ChevronDown } from "lucide-react";

const MobileMenu = ({ isOpen, onClose, serviceSubmenu }) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();

  // Animation variants for mobile menu using transform3d for better performance
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, -100%, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0%, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      transform: "translate3d(0px, -100%, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(-30px, 0px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      transform: "translate3d(5px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const serviceItemVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transform: "translate3d(-10px, 0px, 0px)",
    },
    visible: {
      opacity: 1,
      height: "auto",
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transform: "translate3d(-10px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, -20px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const footerVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 50px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const ctaVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.7,
        type: "spring",
        stiffness: 300,
        damping: 20,
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

  const socialItemVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 10px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const footerLinksVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 10px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        delay: 1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const chevronVariants = {
    closed: {
      transform: "rotate3d(0, 0, 1, 0deg)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    open: {
      transform: "rotate3d(0, 0, 1, 180deg)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const toggleServicesDropdown = () => {
    setServicesOpen(!servicesOpen);
  };

  // Handle Services link click in mobile menu
  const handleServicesClick = (e) => {
    e.stopPropagation(); // Stop propagation to prevent dropdown toggle
    navigate("/services");
    onClose(); // Close mobile menu after navigation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 block md:hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={mobileMenuVariants}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <motion.div
            className="bg-yellow h-full flex flex-col"
            variants={contentVariants}
            style={{
              willChange: "opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Mobile Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-black/10"
              variants={headerVariants}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
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
                style={{
                  willChange: "transform",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
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
                      variants={navItemVariants}
                      whileHover={
                        link.name !== "Services" ? "hover" : undefined
                      }
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {link.name === "Services" ? (
                        <div>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-3xl font-medium text-black cursor-pointer"
                              onClick={handleServicesClick}
                            >
                              {link.name}
                            </span>
                            <motion.div
                              className="cursor-pointer"
                              onClick={toggleServicesDropdown}
                              variants={chevronVariants}
                              animate={servicesOpen ? "open" : "closed"}
                              style={{
                                willChange: "transform",
                                transform: "translate3d(0, 0, 0)",
                                backfaceVisibility: "hidden",
                              }}
                            >
                              <ChevronDown size={24} className="text-black" />
                            </motion.div>
                          </div>

                          {/* Services dropdown content */}
                          <AnimatePresence>
                            {servicesOpen && (
                              <motion.div
                                className="ml-4 mt-4 space-y-4 overflow-hidden"
                                variants={serviceItemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                style={{
                                  willChange: "height, transform, opacity",
                                  transform: "translate3d(0, 0, 0)",
                                  backfaceVisibility: "hidden",
                                }}
                              >
                                {serviceSubmenu.map((service) => (
                                  <motion.div
                                    key={service.name}
                                    className="border-l-2 border-black/20 pl-4"
                                    whileHover={{
                                      x: 5,
                                      borderColor: "rgba(0, 0, 0, 0.6)",
                                      transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10,
                                      },
                                    }}
                                    style={{
                                      willChange: "transform, border-color",
                                      transform: "translate3d(0, 0, 0)",
                                      backfaceVisibility: "hidden",
                                    }}
                                  >
                                    <Link
                                      to={service.path}
                                      className="text-xl font-medium text-black hover:opacity-70 transition-opacity block"
                                      onClick={onClose}
                                    >
                                      {service.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          className="text-3xl font-medium text-black hover:opacity-70 transition-opacity block"
                          onClick={onClose}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Mobile Footer with CTA */}
            <motion.div
              className="p-6 border-t border-black/10 bg-black text-yellow"
              variants={footerVariants}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="flex flex-col space-y-6">
                {/* CTA */}
                <motion.div
                  className="flex flex-col justify-between items-center gap-4"
                  variants={ctaVariants}
                  style={{
                    willChange: "opacity",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <h3 className="text-xl font-bold text-center">
                    Got an Idea? <br />
                    Let's Craft brilliant together!
                  </h3>

                  <StarBorder
                    as={Link}
                    to="/contact"
                    color="#FFC559"
                    speed="4s"
                    className="w-full"
                    onClick={onClose}
                  >
                    Get in Touch
                  </StarBorder>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="flex flex-wrap justify-center gap-5"
                  variants={socialVariants}
                  style={{
                    willChange: "opacity",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="text-sm text-yellow/80 hover:text-yellow"
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={socialItemVariants}
                      whileHover="hover"
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </motion.div>

                {/* Footer Links */}
                <motion.div
                  className="flex justify-around text-xs text-yellow/70"
                  variants={footerLinksVariants}
                  style={{
                    willChange: "transform, opacity",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {footerLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      whileHover={{
                        scale: 1.1,
                        color: "#ffc559",
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        },
                      }}
                      style={{
                        willChange: "transform, color",
                        transform: "translate3d(0, 0, 0)",
                        backfaceVisibility: "hidden",
                      }}
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
