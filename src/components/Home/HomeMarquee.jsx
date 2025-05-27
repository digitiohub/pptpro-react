import React from "react";
import { motion } from "framer-motion";

const HomeMarquee = ({
  text = "PRESENTING IDEAS THAT MATTER",
  direction = "left",
  speed = 30,
  backgroundColor = "black",
  textColor = "white",
}) => {
  // Create an array of the text repeated multiple times
  const repeatedText = Array.from({ length: 60 }, (_, i) => i);

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

  // Wrap component for easier reuse
  const StarSeparator = () => (
    <img
      src="/graphics/star1.svg"
      alt="★"
      className="inline-block mx-10 h-4 md:h-10"
      style={{ willChange: "transform" }} // Hardware acceleration hint
    />
  );

  return (
    <div
      className="overflow-hidden py-3 md:py-4"
      style={{
        backgroundColor,
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
        {repeatedText.map((_, index) => (
          <div
            key={index}
            className="flex items-center"
            style={{
              // Optimization for children elements
              transform: "translate3d(0, 0, 0)",
            }}
          >
            <span
              className={`text-sm md:text-4xl py-2 font-bold tracking-wider px-6`}
              style={{
                color: textColor,
                transform: "translate3d(0, 0, 0)", // Force GPU rendering
                backfaceVisibility: "hidden",
              }}
            >
              {text}
            </span>
            <StarSeparator />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeMarquee;
