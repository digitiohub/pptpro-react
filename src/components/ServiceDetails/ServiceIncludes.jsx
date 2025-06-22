import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ServiceIncludes = ({ items }) => {
  const includesRef = useRef(null);
  const isInView = useInView(includesRef, { once: true, amount: 0.2 });

  // Animation variants
  const titleVariants = {
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

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 20px, 0px)",
    },
    visible: (index) => ({
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.05 * index,
      },
    }),
  };

  return (
    <section
      ref={includesRef}
      className="py-16 md:py-24 dark:bg-gray-900"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          What's Included<span className="text-yellow-500">.</span>
        </motion.h2>

        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            willChange: "opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3"
              variants={itemVariants}
              custom={index}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              <CheckCircle className="flex-shrink-0 h-6 w-6 text-yellow-500 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceIncludes;
