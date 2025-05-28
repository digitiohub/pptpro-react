import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ServiceSteps = ({ steps }) => {
  const stepsRef = useRef(null);
  const isInView = useInView(stepsRef, { once: true, amount: 0.2 });

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

  const stepContainerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const stepItemVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(-20px, 0px, 0px)",
    },
    visible: (index) => ({
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1 * index,
      },
    }),
  };

  const lineVariants = {
    hidden: {
      transform: "scale3d(0, 1, 1)",
    },
    visible: {
      transform: "scale3d(1, 1, 1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  return (
    <section
      ref={stepsRef}
      className="py-16 md:py-24 bg-white dark:bg-gray-950"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-900 dark:text-white"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          Our Process<span className="text-yellow-500">.</span>
        </motion.h2>

        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={stepContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            willChange: "opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Vertical line connecting steps */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 ml-0.5 hidden md:block"
            variants={lineVariants}
            style={{
              transformOrigin: "top",
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          ></motion.div>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="flex flex-col md:flex-row items-start mb-12 last:mb-0 relative"
              variants={stepItemVariants}
              custom={index}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Step number */}
              <div className="flex-shrink-0 bg-yellow-500 text-black font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl z-10 mb-4 md:mb-0">
                {index + 1}
              </div>

              {/* Step content */}
              <div className="md:ml-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSteps;
