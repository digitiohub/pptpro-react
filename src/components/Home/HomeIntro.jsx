import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

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
        transform: "translateZ(0)", // Force GPU rendering
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Award pills aligned with line decoration */}
        <motion.div
          ref={awardSectionRef}
          className="flex justify-center mb-10 md:mb-16"
          initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
          animate={
            isAwardSectionInView
              ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
              : {}
          }
          transition={{ duration: 0.5 }}
          style={{
            willChange: "transform, opacity",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl flex items-center justify-center"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {/* Left line */}
            <motion.div
              className="flex-1 h-px bg-gray-300 dark:bg-gray-700 hidden sm:block"
              initial={{ transform: "scale3d(0, 1, 1)" }}
              animate={
                isAwardSectionInView ? { transform: "scale3d(1, 1, 1)" } : {}
              }
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                transformOrigin: "left center",
                willChange: "transform",
              }}
            ></motion.div>

            {/* Award 2024 Pill - now with border instead of fill */}
            <motion.div
              className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full py-1.5 sm:py-2 px-3 sm:px-6 text-xs sm:text-sm font-medium mx-2 sm:mx-4"
              initial={{ opacity: 0, transform: "scale3d(0.8, 0.8, 1)" }}
              animate={
                isAwardSectionInView
                  ? { opacity: 1, transform: "scale3d(1, 1, 1)" }
                  : {}
              }
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                willChange: "transform, opacity",
                transformStyle: "preserve-3d",
              }}
            >
              Award 2024
            </motion.div>

            {/* Center decoration */}
            <motion.img
              src="/graphics/3circle.svg"
              alt="Decoration"
              className="h-4 sm:h-6 mx-2 sm:mx-4"
              initial={{
                opacity: 0,
                transform: "rotate3d(0, 0, 1, -90deg)",
              }}
              animate={
                isAwardSectionInView
                  ? { opacity: 1, transform: "rotate3d(0, 0, 1, 0deg)" }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.7,
                type: "spring",
                stiffness: 100,
              }}
              style={{
                willChange: "transform, opacity",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Award 2025 Pill - now with border instead of fill */}
            <motion.div
              className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full py-1.5 sm:py-2 px-3 sm:px-6 text-xs sm:text-sm font-medium mx-2 sm:mx-4"
              initial={{ opacity: 0, transform: "scale3d(0.8, 0.8, 1)" }}
              animate={
                isAwardSectionInView
                  ? { opacity: 1, transform: "scale3d(1, 1, 1)" }
                  : {}
              }
              transition={{ duration: 0.5, delay: 0.9 }}
              style={{
                willChange: "transform, opacity",
                transformStyle: "preserve-3d",
              }}
            >
              Award 2025
            </motion.div>

            {/* Right line */}
            <motion.div
              className="flex-1 h-px bg-gray-300 dark:bg-gray-700 hidden sm:block"
              initial={{ transform: "scale3d(0, 1, 1)" }}
              animate={
                isAwardSectionInView ? { transform: "scale3d(1, 1, 1)" } : {}
              }
              transition={{ duration: 0.8, delay: 1.1 }}
              style={{
                transformOrigin: "right center",
                willChange: "transform",
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
          }}
        >
          {stats.map((stat, index) => (
            <React.Fragment key={stat.name}>
              {/* Stat item */}
              <motion.div
                className="text-center px-2 sm:px-4 md:px-6 py-2 md:py-4"
                initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
                animate={
                  isStatsSectionInView
                    ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.15,
                  type: "spring",
                  stiffness: 50,
                  damping: 12,
                }}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.h3
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-1 sm:mb-2"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  initial={{ opacity: 0.4 }}
                  animate={isStatsSectionInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.15 }}
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
                  initial={{ opacity: 0 }}
                  animate={isStatsSectionInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  style={{ transform: "translate3d(0, 0, 0)" }}
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
                    initial={{ transform: "scale3d(1, 0, 1)", opacity: 0 }}
                    animate={
                      isStatsSectionInView
                        ? { transform: "scale3d(1, 1, 1)", opacity: 1 }
                        : {}
                    }
                    transition={{ duration: 0.6, delay: 0.6 }}
                    style={{
                      transformOrigin: "center bottom",
                      willChange: "transform, opacity",
                    }}
                  ></motion.div>

                  {/* Horizontal separator for small screens (every 2 items) */}
                  {index % 2 === 1 && (
                    <motion.div
                      className="md:hidden col-span-2 h-px w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 my-4"
                      initial={{ transform: "scale3d(0, 1, 1)", opacity: 0 }}
                      animate={
                        isStatsSectionInView
                          ? { transform: "scale3d(1, 1, 1)", opacity: 1 }
                          : {}
                      }
                      transition={{ duration: 0.6, delay: 0.6 }}
                      style={{
                        transformOrigin: "center",
                        willChange: "transform, opacity",
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
