import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Spring animation variants following the codebase pattern
const introTextVariants = {
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
    },
  },
};

const marqueeTopVariants = {
  initial: { transform: "translate3d(0%, 0, 0)" },
  animate: {
    transform: "translate3d(-1000%, 0, 0)",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 200,
      ease: "linear",
    },
  },
};

const marqueeBottomVariants = {
  initial: { transform: "translate3d(-600%, 0, 0)" },
  animate: {
    transform: "translate3d(400%, 0, 0)",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 200,
      ease: "linear",
    },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 70px, 0px)",
  },
  animate: (index) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.3 + index * 0.15,
    },
  }),
  hover: {
    transform: "translate3d(0px, -10px, 0px)",
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  nonHover: {
    transform: "translate3d(0px, 0px, 0px)",
    boxShadow:
      "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const glowVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    opacity: 0.1,
    scale: 1.05,
    filter: "blur(15px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  nonHover: {
    opacity: 0,
    scale: 1,
    filter: "blur(10px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const titleVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
  hover: {
    color: "#f4e04c",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  nonHover: {
    color: "#ffffff",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const descriptionVariants = {
  initial: {
    opacity: 0,
  },
  animate: (index) => ({
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.7 + index * 0.15,
    },
  }),
};

const arrowVariants = {
  initial: {
    opacity: 0,
  },
  animate: (index) => ({
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.9 + index * 0.15,
    },
  }),
  hover: {
    x: 5,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.7,
    },
  },
};

const HomeCards = () => {
  // Create refs for section parts
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use inView to detect when elements enter viewport
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-100px 0px",
  });

  const cards = [
    {
      title: "Research",
      description:
        "We begin every project with thorough research and understanding of your business goals, target audience, and market context to create presentations that truly resonate.",
    },
    {
      title: "Design",
      description:
        "Our team crafts visually compelling presentations using modern design principles, ensuring your message is delivered with clarity and professional impact.",
    },
    {
      title: "Refine",
      description:
        "Through collaborative feedback and iterative improvements, we perfect every slide until your presentation achieves maximum effectiveness and audience engagement.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="pt-8 md:pt-20 pb-12 overflow-hidden relative"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Intro text section */}
        <motion.div
          ref={textRef}
          className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
          variants={introTextVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <p
            className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl px-4"
            style={{
              textAlign: "justify",
              textAlignLast: "center",
              hyphens: "auto",
              wordSpacing: "-0.05em",
            }}
          >
            Our proven three-step methodology ensures every presentation we
            create delivers exceptional results. From initial research to final
            refinement, we work closely with you to transform your ideas into
            powerful visual narratives that engage, persuade, and inspire
            action.
          </p>
        </motion.div>

        {/* Top Marquee - Absolute position */}
        <div
          className="absolute top-70 left-0 right-0 w-full overflow-hidden hidden md:block"
          style={{
            zIndex: 0,
            transform: "translate3d(0, 0, 0)",
          }}
        >
          <motion.div
            className="whitespace-nowrap"
            variants={marqueeTopVariants}
            initial="initial"
            animate="animate"
            style={{
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={`top-${i}`}
                className="inline-block z-30 mx-4 font-black text-8xl md:text-9xl tracking-wider"
                style={{
                  color: "rgba(50, 50, 50, 0.15)",
                  transform: "translate3d(0, 0, 0)",
                }}
              >
                PPT PRO
              </span>
            ))}
          </motion.div>
        </div>

        {/* Cards section with separated overlay background */}
        <div
          ref={cardsRef}
          className="relative"
          style={{
            zIndex: 10,
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Cards container */}
          <div
            className="relative p-4 sm:p-6 md:p-12 rounded-lg"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {/* Cards grid with staggered animation */}
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 md:gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  className="bg-black text-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg relative overflow-hidden cursor-pointer mx-auto md:mx-0"
                  style={{
                    width: "100%",
                    maxWidth: "420px",
                    height: "auto",
                    minHeight: isMobile ? "280px" : "450px",
                    display: "flex",
                    flexDirection: "column",
                    willChange: "transform, opacity, box-shadow",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                    perspective: 1000,
                  }}
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  whileHover="hover"
                  whileTap="hover"
                  whileInView="nonHover"
                  viewport={{ once: false, amount: 0.8 }}
                >
                  {/* Glow effect on hover - appears behind the card */}
                  <motion.div
                    className="absolute inset-0 bg-yellow-500 rounded-xl"
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="hover"
                    whileInView="nonHover"
                    viewport={{ once: false, amount: 0.8 }}
                    style={{
                      zIndex: -1,
                      willChange: "opacity, transform, filter",
                      transform: "translate3d(0, 0, 0)",
                      backfaceVisibility: "hidden",
                    }}
                  />

                  {/* Individual SVG overlay for mobile - individual for each card */}
                  {isMobile && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        zIndex: 5,
                        mixBlendMode: "lighten",
                        transform: "translate3d(0, 0, 0)",
                      }}
                    >
                      <img
                        src="/backgrounds/hexa2.svg"
                        alt="Background Pattern"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none"
                        style={{
                          opacity: 0.9,
                        }}
                      />
                    </div>
                  )}

                  {/* Card content */}
                  <div
                    className="relative flex flex-col pt-4 sm:pt-8 md:pt-16 h-full z-10"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                  >
                    {/* Title - removed typewriter effect */}
                    <div className="mb-2 sm:mb-4 md:mb-6">
                      <motion.h3
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light"
                        variants={titleVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="hover"
                        whileInView="nonHover"
                        viewport={{ once: false, amount: 0.8 }}
                        custom={index}
                        style={{
                          lineHeight: "1.1",
                          paddingBottom: isMobile ? "5px" : "10px",
                          willChange: "color, opacity",
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        {card.title}
                      </motion.h3>
                    </div>

                    {/* Description with improved justification */}
                    <motion.p
                      className="text-gray-300 text-sm sm:text-base md:text-lg flex-grow"
                      style={{
                        textAlign: "justify",
                        hyphens: "auto",
                        wordBreak: "break-word",
                        wordSpacing: "-0.05em",
                        WebkitHyphens: "auto",
                        MozHyphens: "auto",
                        msHyphens: "auto",
                        willChange: "opacity",
                        transform: "translate3d(0, 0, 0)",
                      }}
                      variants={descriptionVariants}
                      initial="initial"
                      animate="animate"
                      custom={index}
                    >
                      {card.description}
                    </motion.p>

                    {/* Arrow at bottom right of each card */}
                    <motion.div
                      className="absolute -bottom-5 right-0"
                      variants={arrowVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      custom={index}
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <img
                        src="/graphics/halfArrowRight.svg"
                        alt="Arrow"
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                        style={{ transform: "translate3d(0, 0, 0)" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SVG overlay for desktop - shared across all cards */}
          {!isMobile && (
            <div
              className="absolute inset-0 pointer-events-none hidden md:block"
              style={{
                zIndex: 20,
                mixBlendMode: "lighten",
                transform: "translate3d(0, 0, 0)",
              }}
            >
              <img
                src="/backgrounds/hexa2.svg"
                alt="Background Pattern"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none"
                style={{
                  opacity: 1,
                }}
              />
            </div>
          )}
        </div>

        {/* Bottom Marquee - Absolute position */}
        <div
          className="absolute bottom-5 left-0 right-0 w-full overflow-hidden hidden md:block"
          style={{
            zIndex: 0,
            transform: "translate3d(0, 0, 0)",
          }}
        >
          <motion.div
            className="whitespace-nowrap"
            variants={marqueeBottomVariants}
            initial="initial"
            animate="animate"
            style={{
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={`bottom-${i}`}
                className="inline-block mx-4 text-6xl md:text-9xl font-black tracking-wider"
                style={{
                  color: "rgba(50, 50, 50, 0.15)",
                  transform: "translate3d(0, 0, 0)",
                }}
              >
                PPT PRO
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
