import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Animation variants following the codebase pattern
const titleVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
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

const ContactHero = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  return (
    <section className="pt-32 md:pt-40 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          className="text-center max-w-3xl mx-auto"
          variants={titleVariants}
          initial="initial"
          animate={isTitleInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight">
            Contact Us<span className="text-yellow-500">.</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Have questions or ready to elevate your presentations? We're here to
            help you create impactful visual stories.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
