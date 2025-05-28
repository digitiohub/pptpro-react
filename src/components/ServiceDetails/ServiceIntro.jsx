import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ServiceIntro = ({ heading, subheading, description }) => {
  const introRef = useRef(null);
  const isInView = useInView(introRef, { once: true, amount: 0.5 });

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 30px, 0px)",
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
  };

  const subheadingVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 20px, 0px)",
    },
    visible: {
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

  const textVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 20px, 0px)",
    },
    visible: {
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

  return (
    <section
      className="py-16 md:py-24 bg-white dark:bg-gray-950"
      ref={introRef}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <motion.div
        className="container mx-auto px-4 md:px-6 max-w-5xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          willChange: "opacity",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          variants={headingVariants}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {heading}
          <span className="text-yellow-500">.</span>
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-yellow-500 mb-6 font-medium"
          variants={subheadingVariants}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {subheading}
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          variants={textVariants}
          style={{
            textAlign: "justify",
            hyphens: "auto",
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ServiceIntro;
