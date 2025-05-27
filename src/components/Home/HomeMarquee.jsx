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
  const duration = 500 / speed;

  // Wrap component for easier reuse
  const StarSeparator = () => (
    <img
      src="/graphics/star1.svg"
      alt="★"
      className="inline-block mx-10 h-4 md:h-10" // Increased margin from mx-4 to mx-8
    />
  );

  return (
    <div className="overflow-hidden py-3 md:py-4" style={{ backgroundColor }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? "-100%" : "100%",
        }}
        initial={{
          x: direction === "left" ? "0%" : "-100%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "loop", 
          ease: "linear",
        }}
      >
        {repeatedText.map((_, index) => (
          <div key={index} className="flex items-center">
            <span
              className={`text-sm md:text-4xl py-2 font-bold tracking-wider px-6`} // Added px-4 for spacing
              style={{ color: textColor }}
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
