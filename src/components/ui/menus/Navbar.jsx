import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../../../data/navigationLinks";
import MobileMenu from "./MobileMenu";
import StarBorder from "../../../ui/StarBorder/StarBorder";
import Button from "../../../ui/Buttons/Button";

// Animation variants defined outside component for better performance
const navbarVariants = {
  visible: (customProps) => ({
    transform: "translate3d(0px, 0px, 0px)",
    // Use different backgrounds based on page and scroll position
    background: customProps.isHomePage
      ? customProps.scrolled
        ? "rgba(0, 0, 0, 0.8)"
        : "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 55%, rgba(0, 0, 0, 0) 95%)"
      : customProps.scrolled
      ? "rgba(255, 255, 255, 1)"
      : "rgba(255, 255, 255, 1)",
    boxShadow: customProps.scrolled
      ? customProps.isHomePage
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
        : "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
      : "none",
    transition: {
      type: "tween",
      ease: [0.25, 0.1, 0.25, 1.0],
      duration: 0.4,
    },
  }),
  hidden: {
    transform: "translate3d(0px, -100%, 0px)",
    transition: {
      type: "tween",
      ease: [0.25, 0.1, 0.25, 1.0],
      duration: 0.4,
    },
  },
};

const logoVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, -10px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const navLinksVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, -10px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
      delay: 0.1,
    },
  },
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on home page
  const isHomePage = location.pathname === "/" || location.pathname === "";

  // Reference to track if we're programmatically scrolling
  const scrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Add effect to handle body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  // Control header visibility based on scroll direction
  useEffect(() => {
    let ticking = false;

    const controlNavbar = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always show navbar at the top of page
          if (currentScrollY < 100) {
            setVisible(true);
            setScrolled(currentScrollY > 50); // Apply shadow only after 50px
            setLastScrollY(currentScrollY);
            ticking = false;
            return;
          }

          // Add a threshold to prevent tiny movements from triggering changes
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);
          if (scrollDifference > 10) {
            // Handle scroll behavior - hide on down, show on up
            if (currentScrollY > lastScrollY) {
              // Scrolling DOWN - hide the navbar
              setVisible(false);
            } else if (currentScrollY < lastScrollY) {
              // Scrolling UP - show the navbar
              setVisible(true);
            }
          }

          // Always update scroll position and apply scrolled styles
          setScrolled(true);
          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });

    return () => {
      window.removeEventListener("scroll", controlNavbar);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Get text color based on page and scroll position
  const getTextColor = () => {
    if (isHomePage) {
      return "text-white"; // Home page always has white text
    } else {
      return scrolled ? "text-black" : "text-black"; // Non-home pages have black text
    }
  };

  // Get logo based on page and scroll position
  const getLogoSrc = () => {
    if (isHomePage) {
      return "/logos/logo-light.jpg"; // Home page always has light logo
    } else {
      return "/logos/logo-dark.jpg"; // Non-home pages have dark logo
    }
  };

  // Get hamburger color based on page and scroll position
  const getHamburgerColor = () => {
    if (isHomePage) {
      return "bg-yellow"; // Home page always has yellow hamburger
    } else {
      return "bg-black"; // Non-home pages have black hamburger
    }
  };

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: var(--color-yellow);
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .nav-link.active::after {
          transform: scaleX(1);
        }
        
        @keyframes star-movement-bottom {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(-100%, 0%); opacity: 0; }
        }
        
        @keyframes star-movement-top {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(100%, 0%); opacity: 0; }
        }
        
        .animate-star-movement-bottom {
          animation: star-movement-bottom linear infinite alternate;
        }
        
        .animate-star-movement-top {
          animation: star-movement-top linear infinite alternate;
        }

        /* Custom yellow button style */
        .custom-yellow-button > div:last-child {
          background: var(--color-yellow);
          background-image: none;
          border: none;
          color: black;
          font-weight: 500;
        }
        
        /* Add padding to ensure content doesn't peek through transparent gradient */
        .gradient-nav-padding {
          padding-bottom: 20px;
        }
      `}</style>

      <motion.header
        className="fixed top-0 left-0 w-full z-40"
        initial="hidden"
        animate={visible || isMobileMenuOpen ? "visible" : "hidden"}
        custom={{ scrolled, isHomePage }}
        variants={navbarVariants}
        style={{ willChange: "transform, background, box-shadow" }}
      >
        <div
          className={`container mx-auto px-4 lg:px-8 ${
            !scrolled && isHomePage ? "gradient-nav-padding" : ""
          }`}
        >
          <div className="flex items-center justify-between py-4">
            {/* Logo - Dynamic based on page */}
            <motion.div
              className="flex-shrink-0"
              initial="initial"
              animate="animate"
              variants={logoVariants}
              style={{ willChange: "transform, opacity" }}
            >
              <Link to="/" className="block">
                <img
                  src={getLogoSrc()}
                  alt="PPTPRO Logo"
                  className="h-10 md:h-12"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation - Dynamic text color */}
            <motion.nav
              className="hidden md:flex flex-grow mx-8"
              initial="initial"
              animate="animate"
              variants={navLinksVariants}
              style={{ willChange: "transform, opacity" }}
            >
              <ul className="flex items-center justify-center space-x-8 w-full">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`nav-link text-base uppercase font-medium transition-colors ${getTextColor()} ${
                        location.pathname === link.path ? "active" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* CTA Button - Same on all pages */}
            <div className="hidden md:block">
              <motion.div
                initial="initial"
                animate="animate"
                variants={logoVariants}
                style={{ willChange: "transform, opacity" }}
              >
                <StarBorder
                  as={Link}
                  to="/contact"
                  color="white"
                  speed="4s"
                  variant="yellow"
                >
                  Get in Touch
                </StarBorder>
              </motion.div>
            </div>

            {/* Mobile Hamburger Button - Dynamic color */}
            <motion.button
              className="md:hidden z-50 p-2 cursor-pointer"
              initial="initial"
              animate="animate"
              variants={logoVariants}
              onClick={toggleMobileMenu}
              style={{
                display: isMobileMenuOpen ? "none" : "",
                willChange: "transform, opacity",
              }}
            >
              <div
                className={`w-6 h-0.5 ${getHamburgerColor()} mb-1.5 rounded-full`}
              ></div>
              <div
                className={`w-6 h-0.5 ${getHamburgerColor()} mb-1.5 rounded-full`}
              ></div>
              <div
                className={`w-6 h-0.5 ${getHamburgerColor()} rounded-full`}
              ></div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Component */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <MobileMenu
            key="mobile-menu"
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
