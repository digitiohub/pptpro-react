import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LogoMarquee = ({ logos, direction = "left", speed = 25 }) => {
  // Calculate duration based on speed (lower number = faster)
  const duration = 300 / speed;

  // Animation variants using transform3d for better performance
  const marqueeVariants = {
    initial: {
      transform:
        direction === "left"
          ? "translate3d(0%, 0, 0)"
          : "translate3d(-100%, 0, 0)",
    },
    animate: {
      transform:
        direction === "left"
          ? "translate3d(-100%, 0, 0)"
          : "translate3d(0%, 0, 0)",
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        // Hardware acceleration hints
        willChange: "transform",
      },
    },
  };

  return (
    <div
      className="overflow-hidden py-10"
      style={{
        // Force GPU acceleration
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        variants={marqueeVariants}
        initial="initial"
        animate="animate"
        style={{
          // Additional hardware acceleration hints
          backfaceVisibility: "hidden",
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center mx-8 md:mx-12"
            style={{
              // Optimization for children elements
              transform: "translate3d(0, 0, 0)",
            }}
          >
            <img
              src={logo.logo}
              alt={logo.name}
              className="h-12 md:h-16 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              style={{
                transform: "translate3d(0, 0, 0)", // Force GPU rendering
                backfaceVisibility: "hidden",
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AboutClients = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // Track if elements are in view with appropriate thresholds
  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  // Combined client logos in a single array
  const clientLogos = [
    {
      name: "Microsoft",
      logo: "https://cdn.worldvectorlogo.com/logos/microsoft-3.svg",
    },
    {
      name: "Google",
      logo: "https://cdn.worldvectorlogo.com/logos/google-2015.svg",
    },
    {
      name: "Apple",
      logo: "https://cdn.worldvectorlogo.com/logos/apple-14.svg",
    },
    {
      name: "Amazon",
      logo: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
    },
    {
      name: "Netflix",
      logo: "https://cdn.worldvectorlogo.com/logos/netflix-4.svg",
    },
    {
      name: "Meta",
      logo: "https://cdn.worldvectorlogo.com/logos/meta-1.svg",
    },
    {
      name: "Tesla",
      logo: "https://cdn.worldvectorlogo.com/logos/tesla-9.svg",
    },
    {
      name: "IBM",
      logo: "https://cdn.worldvectorlogo.com/logos/ibm.svg",
    },
    {
      name: "Spotify",
      logo: "https://cdn.worldvectorlogo.com/logos/spotify-2.svg",
    },
    {
      name: "Adobe",
      logo: "https://cdn.worldvectorlogo.com/logos/adobe-2.svg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          ref={titleRef}
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
          animate={
            isTitleInView
              ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
              : {}
          }
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            From Startups to Big Companies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Trusted by innovative businesses around the world
          </p>
        </motion.div>
      </div>

      {/* Single Logo Marquee */}
      <div className="relative w-full">
        <LogoMarquee logos={clientLogos} direction="left" speed={18} />
      </div>

      {/* Fade gradient effect on edges */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 pointer-events-none z-10"></div>
    </section>
  );
};

export default AboutClients;
