import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../../../data/navigationLinks";
import MobileMenu from "./MobileMenu";
import StarBorder from "../../../ui/StarBorder/StarBorder";

// Animation variants defined outside component for better performance
const navbarVariants = {
  visible: (scrolled) => ({
    transform: "translate3d(0px, 0px, 0px)",
    // Use gradient when at top of page, solid when scrolled
    background: scrolled
      ? "rgba(0, 0, 0, 0.8)"
      : "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%)",
    boxShadow: scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)" : "none",
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
        custom={scrolled}
        variants={navbarVariants}
        style={{ willChange: "transform, background, box-shadow" }}
      >
        <div
          className={`container mx-auto px-4 lg:px-8 ${
            !scrolled ? "gradient-nav-padding" : ""
          }`}
        >
          <div className="flex items-center justify-between py-4">
            {/* Logo - Always use light logo at the top */}
            <motion.div
              className="flex-shrink-0"
              initial="initial"
              animate="animate"
              variants={logoVariants}
              style={{ willChange: "transform, opacity" }}
            >
              <Link to="/" className="block">
                <img
                  src="/logos/logo-light.jpg"
                  alt="PPTPRO Logo"
                  className="h-10 md:h-12"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation - Always yellow text since we have black background */}
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
                      className={`nav-link text-base uppercase font-medium transition-colors text-white ${
                        location.pathname === link.path ? "active" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* CTA Button - Yellow with white star effect */}
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

            {/* Mobile Hamburger Button - Always yellow since we have black background */}
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
              <div className="w-6 h-0.5 bg-yellow mb-1.5 rounded-full"></div>
              <div className="w-6 h-0.5 bg-yellow mb-1.5 rounded-full"></div>
              <div className="w-6 h-0.5 bg-yellow rounded-full"></div>
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
