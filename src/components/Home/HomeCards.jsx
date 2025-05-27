import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Optimized animations with transform3d for better performance
const introTextAnim = {
  hidden: { opacity: 0, transform: "translate3d(0, 30px, 0)" },
  visible: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
};

const marqueeTopAnim = {
  initial: { transform: "translate3d(0%, 0, 0)" },
  animate: {
    transform: "translate3d(-50%, 0, 0)",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 20,
      ease: "linear",
    },
  },
};

const marqueeBottomAnim = {
  initial: { transform: "translate3d(-50%, 0, 0)" },
  animate: {
    transform: "translate3d(0%, 0, 0)",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 20,
      ease: "linear",
    },
  },
};

// Shared transitions with explicit definitions for both directions
const hoverTransition = {
  y: {
    type: "tween",
    ease: [0.25, 0.1, 0.25, 1.0],
    duration: 0.3,
  },
  boxShadow: {
    type: "tween",
    ease: [0.25, 0.1, 0.25, 1.0],
    duration: 0.3,
  },
  default: {
    type: "tween",
    ease: [0.25, 0.1, 0.25, 1.0],
    duration: 0.3,
  },
};

// Refined card variants with explicit transitions for each state
const cardVariants = {
  // Initial hidden state (before section enters view)
  hidden: {
    opacity: 0,
    y: 70,
  },
  // Visible state (when section enters view)
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14,
      delay: 0.3 + index * 0.15,
    },
  }),
  // Hover state with improved transition
  hover: {
    y: -10,
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)",
    transition: hoverTransition,
  },
  // Non-hover state with the same transition properties for smooth exit
  nonHover: {
    y: 0,
    boxShadow:
      "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    transition: hoverTransition,
  },
};

// Improved glow effect variants with explicit transitions
const glowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0,
    scale: 1,
    transition: {
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
  hover: {
    opacity: 0.1,
    scale: 1.05,
    filter: "blur(15px)",
    transition: {
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
      filter: { duration: 0.3 },
    },
  },
  nonHover: {
    opacity: 0,
    scale: 1,
    filter: "blur(10px)",
    transition: {
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
      filter: { duration: 0.3 },
    },
  },
};

// Improved title color variants with explicit transitions
const titleVariants = {
  hidden: { color: "#ffffff" },
  visible: {
    color: "#ffffff",
    transition: { duration: 0.3 },
  },
  hover: {
    color: "#f4e04c",
    transition: { duration: 0.3 },
  },
  nonHover: {
    color: "#ffffff",
    transition: { duration: 0.3 },
  },
};

const HomeCards = () => {
  // Create refs for section parts
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  // Use inView to detect when elements enter viewport
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-100px 0px",
  });

  const cards = [
    {
      title: "Strategy",
      description:
        "We transform complex ideas into compelling visual narratives that resonate with your audience and drive results.",
    },
    {
      title: "Design",
      description:
        "Our expert designers create visually stunning presentations that elevate your brand and captivate your audience.",
    },
    {
      title: "Delivery",
      description:
        "From executive summaries to detailed pitch decks, we ensure your message is delivered with maximum impact.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-8 overflow-hidden relative">
      <div className="container mx-auto">
        {/* Intro paragraph with optimized animation */}
        <motion.div
          ref={textRef}
          className="max-w-4xl mx-auto text-center mb-16 mt-16"
          initial={{ opacity: 0, transform: "translate3d(0, 30px, 0)" }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                    delay: 0.1,
                  },
                }
              : {}
          }
        >
          <p className="text-gray-600 dark:text-gray-300 text-2xl text-justify tracking-wide">
            At PPT Pro, we believe that presentations are more than just slides
            – they're powerful tools for communication and persuasion. We help
            businesses and professionals craft compelling visual stories that
            engage audiences, inspire action, and drive results.
          </p>
        </motion.div>

        {/* Top Marquee - Absolute position */}
        <div
          className="absolute top-70 left-0 right-0 w-full overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <motion.div
            className="whitespace-nowrap will-change-transform"
            variants={marqueeTopAnim}
            initial="initial"
            animate="animate"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={`top-${i}`}
                className="inline-block z-30 mx-4 font-black text-8xl md:text-9xl tracking-wider"
                style={{ color: "rgba(50, 50, 50, 0.15)" }}
              >
                PPT PRO
              </span>
            ))}
          </motion.div>
        </div>

        {/* Cards section with separated overlay background */}
        <div className="relative" style={{ zIndex: 10 }}>
          {/* Cards container */}
          <div className="relative p-6 md:p-12 rounded-lg">
            {/* Cards grid with staggered animation */}
            <div className="flex flex-wrap justify-center gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  className="bg-black text-white rounded-xl p-8 shadow-lg relative overflow-hidden cursor-pointer"
                  style={{
                    width: "420px",
                    height: "475px",
                    display: "flex",
                    flexDirection: "column",
                    willChange: "transform, opacity, box-shadow",
                  }}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover="hover"
                  whileTap="hover"
                  whileInView="nonHover"
                  viewport={{ once: false, amount: 0.8 }}
                >
                  {/* Glow effect on hover - appears behind the card */}
                  <motion.div
                    className="absolute inset-0 bg-yellow-500 rounded-xl"
                    variants={glowVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="hover"
                    whileInView="nonHover"
                    viewport={{ once: false, amount: 0.8 }}
                    style={{ zIndex: -1 }}
                  />

                  {/* Card content */}
                  <div className="relative flex flex-col pt-16 h-full">
                    <motion.h3
                      className="md:text-6xl font-light mb-4"
                      variants={titleVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="hover"
                      whileInView="nonHover"
                      viewport={{ once: false, amount: 0.8 }}
                    >
                      {card.title}
                    </motion.h3>
                    <p className="text-gray-300 text-justify tracking-wide text-lg flex-grow">
                      {card.description}
                    </p>

                    {/* Arrow at bottom right of each card */}
                    <motion.div
                      className="absolute -bottom-5 right-0"
                      whileHover={{
                        x: 5,
                        transition: {
                          repeat: Infinity,
                          repeatType: "mirror",
                          duration: 0.7,
                        },
                      }}
                    >
                      <img
                        src="/graphics/halfArrowRight.svg"
                        alt="Arrow"
                        className="w-12 h-12"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SVG overlay - completely separate from cards container */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 20,
              mixBlendMode: "lighten",
            }}
          >
            <img
              src="/backgrounds/hexa2.svg"
              alt="Background Pattern"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none"
              style={{ opacity: 0.8 }}
            />
          </div>
        </div>

        {/* Bottom Marquee - Absolute position */}
        <div
          className="absolute bottom-5 left-0 right-0 w-full overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <motion.div
            className="whitespace-nowrap will-change-transform"
            variants={marqueeBottomAnim}
            initial="initial"
            animate="animate"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={`bottom-${i}`}
                className="inline-block mx-4 text-6xl md:text-9xl font-black tracking-wider"
                style={{ color: "rgba(50, 50, 50, 0.15)" }}
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
