import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

// Animation variants following the codebase pattern
const awardSectionVariants = {
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

const lineVariants = {
  initial: {
    transform: "scale3d(0, 1, 1)",
  },
  animate: (isLeft) => ({
    transform: "scale3d(1, 1, 1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: isLeft ? 0.3 : 1.1,
    },
  }),
};

const pillVariants = {
  initial: {
    opacity: 0,
    transform: "scale3d(0.8, 0.8, 1)",
  },
  animate: (delay) => ({
    opacity: 1,
    transform: "scale3d(1, 1, 1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: delay,
    },
  }),
};

const decorationVariants = {
  initial: {
    opacity: 0,
    transform: "rotate3d(0, 0, 1, -90deg)",
  },
  animate: {
    opacity: 1,
    transform: "rotate3d(0, 0, 1, 0deg)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.7,
    },
  },
};

const statItemVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: (index) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2 + index * 0.15,
    },
  }),
};

const statValueVariants = {
  initial: {
    opacity: 0.4,
  },
  animate: (index) => ({
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.4 + index * 0.15,
    },
  }),
};

const statNameVariants = {
  initial: {
    opacity: 0,
  },
  animate: (index) => ({
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.8 + index * 0.1,
    },
  }),
};

const separatorVariants = {
  initial: {
    transform: "scale3d(1, 0, 1)",
    opacity: 0,
  },
  animate: {
    transform: "scale3d(1, 1, 1)",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.6,
    },
  },
};

const horizontalSeparatorVariants = {
  initial: {
    transform: "scale3d(0, 1, 1)",
    opacity: 0,
  },
  animate: {
    transform: "scale3d(1, 1, 1)",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.6,
    },
  },
};

const HomeIntro = () => {
  // Create refs for animation sections
  const awardSectionRef = useRef(null);
  const statsSectionRef = useRef(null);

  // Use inView to detect when elements enter viewport
  const isAwardSectionInView = useInView(awardSectionRef, {
    once: true,
    amount: 0.3,
    margin: "-100px 0px",
  });

  const isStatsSectionInView = useInView(statsSectionRef, {
    once: true,
    amount: 0.3,
    margin: "-100px 0px",
  });

  const stats = [
    { name: "Projects", value: 2500, suffix: "+" },
    { name: "Clients", value: 750, suffix: "+" },
    { name: "Design Hours", value: 45000, suffix: "+" },
    { name: "Countries", value: 35, suffix: "+" },
  ];

  return (
    <section
      className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden"
      style={{
        transform: "translate3d(0, 0, 0)", // Force GPU rendering
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Award pills aligned with line decoration */}
        <motion.div
          ref={awardSectionRef}
          className="flex justify-center mb-10 md:mb-16"
          variants={awardSectionVariants}
          initial="initial"
          animate={isAwardSectionInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl flex items-center justify-center"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {/* Left line */}
            <motion.div
              className="flex-1 h-px bg-gray-300 dark:bg-gray-700 hidden sm:block"
              variants={lineVariants}
              initial="initial"
              animate={isAwardSectionInView ? "animate" : "initial"}
              custom={true} // true for left line
              style={{
                transformOrigin: "left center",
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
              }}
            ></motion.div>

            {/* Award 2024 Pill - now with border instead of fill */}
            <motion.div
              className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full py-1.5 sm:py-2 px-3 sm:px-6 text-xs sm:text-sm font-medium mx-2 sm:mx-4"
              variants={pillVariants}
              initial="initial"
              animate={isAwardSectionInView ? "animate" : "initial"}
              custom={0.5} // delay for first pill
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              Award 2024
            </motion.div>

            {/* Center decoration */}
            <motion.img
              src="/graphics/3circle.svg"
              alt="Decoration"
              className="h-4 sm:h-6 mx-2 sm:mx-4"
              variants={decorationVariants}
              initial="initial"
              animate={isAwardSectionInView ? "animate" : "initial"}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            />

            {/* Award 2025 Pill - now with border instead of fill */}
            <motion.div
              className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full py-1.5 sm:py-2 px-3 sm:px-6 text-xs sm:text-sm font-medium mx-2 sm:mx-4"
              variants={pillVariants}
              initial="initial"
              animate={isAwardSectionInView ? "animate" : "initial"}
              custom={0.9} // delay for second pill
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              Award 2025
            </motion.div>

            {/* Right line */}
            <motion.div
              className="flex-1 h-px bg-gray-300 dark:bg-gray-700 hidden sm:block"
              variants={lineVariants}
              initial="initial"
              animate={isAwardSectionInView ? "animate" : "initial"}
              custom={false} // false for right line
              style={{
                transformOrigin: "right center",
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
              }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Stats Row - with horizontal separators instead of cards */}
        <div
          ref={statsSectionRef}
          className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-y-8 md:gap-y-0"
          style={{
            transform: "translate3d(0, 0, 0)",
            perspective: 1000,
            backfaceVisibility: "hidden",
          }}
        >
          {stats.map((stat, index) => (
            <React.Fragment key={stat.name}>
              {/* Stat item */}
              <motion.div
                className="text-center px-2 sm:px-4 md:px-6 py-2 md:py-4"
                variants={statItemVariants}
                initial="initial"
                animate={isStatsSectionInView ? "animate" : "initial"}
                custom={index}
                style={{
                  willChange: "transform, opacity",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
              >
                <motion.h3
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 sm:mb-2"
                  variants={statValueVariants}
                  initial="initial"
                  animate={isStatsSectionInView ? "animate" : "initial"}
                  custom={index}
                  style={{
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {isStatsSectionInView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      useEasing={true}
                      delay={0.2}
                    />
                  ) : (
                    0
                  )}
                  <span>{stat.suffix}</span>
                </motion.h3>
                <motion.p
                  className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium"
                  variants={statNameVariants}
                  initial="initial"
                  animate={isStatsSectionInView ? "animate" : "initial"}
                  custom={index}
                  style={{
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {stat.name}
                </motion.p>
              </motion.div>

              {/* Vertical separator line (except after the last item) */}
              {index < stats.length - 1 && (
                <>
                  {/* Separator for medium screens and up */}
                  <motion.div
                    className="hidden md:block self-stretch w-px bg-gray-300 dark:bg-gray-700 mx-3 sm:mx-6"
                    variants={separatorVariants}
                    initial="initial"
                    animate={isStatsSectionInView ? "animate" : "initial"}
                    style={{
                      transformOrigin: "center bottom",
                      willChange: "transform, opacity",
                      transform: "translate3d(0, 0, 0)",
                    }}
                  ></motion.div>

                  {/* Horizontal separator for small screens (every 2 items) */}
                  {index % 2 === 1 && (
                    <motion.div
                      className="md:hidden col-span-2 h-px w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 my-4"
                      variants={horizontalSeparatorVariants}
                      initial="initial"
                      animate={isStatsSectionInView ? "animate" : "initial"}
                      style={{
                        transformOrigin: "center",
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                      }}
                    ></motion.div>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
