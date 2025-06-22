import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Buttons/Button";

// Animation variants following the codebase pattern
const titleVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 50px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

const buttonsVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.5,
    },
  },
};

const ellipseVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    transform: "translate3d(-100px, 0px, 0px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      delay: 0.1,
    },
  },
};

const squareVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    transform: "translate3d(-50px, 0px, 0px) rotate3d(0, 0, 1, -8deg)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    transform: "translate3d(0px, 0px, 0px) rotate3d(0, 0, 1, -8deg)",
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 20,
      delay: 0.3,
    },
  },
};

// Mobile square variants without rotation - swapped dimensions
const mobileSquareVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    transform: "translate3d(0px, 50px, 0px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 20,
      delay: 0.3,
    },
  },
};

// Floating animation for the desktop square
const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Mobile floating animation (more pronounced)
const mobileFloatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const HomeHero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const isInView = useInView(heroRef, {
    once: true,
    amount: 0.3,
  });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle scroll to next section
  const scrollToNextSection = () => {
    const nextSection = document.querySelector(
      "#next-section, .next-section, section:nth-of-type(2)"
    );
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  // Handle navigation to contact page
  const handleCollaborate = () => {
    navigate("/contact");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={heroRef}
      className="h-screen pt-20 md:pt-22 px-2 md:px-0 relative overflow-hidden flex items-center justify-center md:justify-center"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Decorative Ellipse Element - Different images for mobile/desktop */}
      <motion.div
        className="absolute -bottom-16 left-0 right-0 md:inset-0 md:mt-12 z-0"
        variants={ellipseVariants}
        initial="initial"
        animate={isVisible ? "animate" : "initial"}
        style={{
          willChange: "transform, opacity, scale",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      >
        <img
          src={
            isMobile ? "/graphics/mobileellipse.svg" : "/graphics/ellipse.svg"
          }
          alt="Decorative element"
          className="w-[1800px] h-auto md:w-auto md:h-[90vh] object-cover md:object-contain"
          style={{
            transformOrigin: "center",
          }}
        />
      </motion.div>

      {/* Animated Gray Square Element - Different for mobile/desktop */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-32 lg:left-42 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-auto md:translate-x-0 z-5"
        variants={isMobile ? mobileSquareVariants : squareVariants}
        initial="initial"
        animate={isVisible ? "animate" : "initial"}
        style={{
          willChange: "transform, opacity, scale",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      >
        <motion.div
          className={
            isMobile
              ? "w-32 h-24 rounded-lg bg-gray-300" // Mobile: smaller dimensions (128px x 96px)
              : "w-40 h-52 rounded-lg bg-gray-300" // Desktop: original dimensions (160px x 208px)
          }
          animate={
            isVisible
              ? isMobile
                ? mobileFloatingAnimation
                : floatingAnimation
              : {}
          }
          style={{
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            transformOrigin: "center",
          }}
        />
      </motion.div>

      {/* Main content - Responsive positioning with right adjustment for lg */}
      <div className="relative z-10 -mt-8 md:-mt-16 mx-auto md:mx-0 md:mr-8 lg:mr-12 xl:-mr-24 px-6 md:px-1 w-full md:w-auto">
        <div className="max-w-full">
          {/* Main headline */}
          <motion.div
            variants={titleVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] font-normal text-black leading-tight tracking-tight mb-8 text-left">
              TURN YOUR IDEA
              <br className="hidden md:block" /> INTO
              <br className="md:hidden" />
              <span className="md:ml-2">A DECK</span>
              <span className="text-yellow-500">.</span>
            </h1>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-row gap-3 md:gap-6 mb-20 md:mb-0 justify-center md:justify-start items-center md:items-start"
            variants={buttonsVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Collaborate Button */}
            <Button
              variant="hero-primary"
              size="md"
              onClick={handleCollaborate}
              className="flex-1 md:flex-none md:w-auto text-sm md:text-base"
              motionProps={{
                initial: { opacity: 1, scale: 1 }, // Skip entrance animation
                animate: { opacity: 1, scale: 1 }, // Skip entrance animation
              }}
            >
              Let's Collaborate
            </Button>

            {/* Explore Button */}
            <Button
              variant="hero-outline"
              size="md"
              onClick={scrollToNextSection}
              className="flex-1 md:flex-none md:w-auto text-sm md:text-base"
              motionProps={{
                initial: { opacity: 1, scale: 1 }, // Skip entrance animation
                animate: { opacity: 1, scale: 1 }, // Skip entrance animation
              }}
            >
              Explore Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
