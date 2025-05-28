import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../../../data/navigationLinks";
import MobileMenu from "./MobileMenu";
import StarBorder from "../../../ui/StarBorder/StarBorder";
import { ChevronDown } from "lucide-react";

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
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }),
  hidden: {
    transform: "translate3d(0px, -100%, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
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
      type: "spring",
      stiffness: 300,
      damping: 20,
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
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.1,
    },
  },
};

// Dropdown animation variants
const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transform: "translate3d(0px, -10px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const dropdownItemVariants = {
  hidden: {
    opacity: 0,
    transform: "translate3d(-10px, 0px, 0px)",
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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Check if we're on home page
  const isHomePage = location.pathname === "/" || location.pathname === "";

  // Reference to track if we're programmatically scrolling
  const scrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Services submenu items
  const servicesSubmenu = [
    {
      name: "Corporate Presentation",
      path: "/services/corporate-presentation",
    },
    { name: "Video Presentation", path: "/services/video-presentation" },
    { name: "Presentation Training", path: "/services/presentation-training" },
    { name: "Financial Modeling", path: "/services/financial-modeling" },
  ];

  // Handle services link click - navigate to main services page
  const handleServicesClick = (e) => {
    e.preventDefault();
    navigate("/services");
  };

  // Handle dropdown hover events
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 100);
  };

  // Clean up hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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
              // Close dropdown when scrolling down
              setServicesDropdownOpen(false);
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

  // Get dropdown background and text color based on page
  const getDropdownStyles = () => {
    if (isHomePage) {
      return {
        background: "bg-black/90",
        text: "text-white",
        hover: "hover:bg-black/70",
        border: "border-gray-800",
      };
    } else {
      return {
        background: "bg-white",
        text: "text-black",
        hover: "hover:bg-gray-100",
        border: "border-gray-200",
      };
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

  // Check if current page is a service page
  const isServicePage = location.pathname.includes("/services");

  // Style variables for dropdown
  const dropdownStyles = getDropdownStyles();

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
        
        .dropdown-link {
          position: relative;
        }
        
        .dropdown-link::before {
          content: "";
          position: absolute;
          width: 3px;
          height: 0;
          left: -10px;
          top: 50%;
          background-color: var(--color-yellow);
          transition: height 0.2s ease, top 0.2s ease;
        }
        
        .dropdown-link:hover::before {
          height: 80%;
          top: 10%;
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
                  <li key={link.name} className="relative">
                    {link.name === "Services" ? (
                      // Services with dropdown
                      <div
                        ref={dropdownRef}
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div
                          className={`nav-link text-base uppercase font-medium transition-colors flex items-center ${getTextColor()} ${
                            isServicePage ? "active" : ""
                          } cursor-pointer`}
                          style={{ transform: "translate3d(0, 0, 0)" }}
                          onClick={handleServicesClick}
                        >
                          {link.name}
                          <ChevronDown
                            size={16}
                            className="ml-1 mt-0.5"
                            style={{
                              transform: servicesDropdownOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s",
                              willChange: "transform",
                              transformOrigin: "center",
                            }}
                          />
                        </div>

                        {/* Services Dropdown Menu */}
                        <AnimatePresence>
                          {servicesDropdownOpen && (
                            <motion.div
                              className={`absolute top-full left-0 mt-2 w-64 rounded-md shadow-lg ${dropdownStyles.background} border ${dropdownStyles.border} overflow-hidden`}
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              style={{
                                willChange: "transform, opacity, height",
                                transformOrigin: "top",
                                zIndex: 50,
                                transform: "translate3d(0, 0, 0)",
                                backfaceVisibility: "hidden",
                              }}
                            >
                              <div className="py-2">
                                {servicesSubmenu.map((service) => (
                                  <motion.div
                                    key={service.name}
                                    variants={dropdownItemVariants}
                                    whileHover="hover"
                                    style={{
                                      willChange: "transform, opacity",
                                      transform: "translate3d(0, 0, 0)",
                                      backfaceVisibility: "hidden",
                                    }}
                                  >
                                    <Link
                                      to={service.path}
                                      className={`block px-4 py-3 ${dropdownStyles.text} ${dropdownStyles.hover} dropdown-link`}
                                    >
                                      {service.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      // Regular nav links
                      <Link
                        to={link.path}
                        className={`nav-link text-base uppercase font-medium transition-colors ${getTextColor()} ${
                          location.pathname === link.path ? "active" : ""
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
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
            serviceSubmenu={servicesSubmenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
