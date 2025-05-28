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
            {/* Fixed image URL and added fallback options */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Generic_Logo.svg/240px-Generic_Logo.svg.png"
              alt={logo.name}
              className="h-12 md:h-16 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              style={{
                transform: "translate3d(0, 0, 0)", // Force GPU rendering
                filter: "grayscale(100%)",
                minWidth: "80px", // Ensure minimum width
                objectFit: "contain",
              }}
              onError={(e) => {
                // Fallback if the image fails to load
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150x50?text=Logo";
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

  // Client logos data (keeping names for alt text, but using generic logo for all)
  const clientLogos = [
    { name: "Microsoft" },
    { name: "Google" },
    { name: "Apple" },
    { name: "Amazon" },
    { name: "Netflix" },
    { name: "Meta" },
    { name: "Tesla" },
    { name: "IBM" },
    { name: "Spotify" },
    { name: "Adobe" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-4 md:py-8 dark:bg-gray-900 overflow-hidden"
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
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white mb-4">
            From Startups to Big Companies
            <span className="text-yellow-500">.</span>
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

      {/* Make sure fade gradients are positioned correctly */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 pointer-events-none z-10"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 pointer-events-none z-10"></div>
    </section>
  );
};

export default AboutClients;
