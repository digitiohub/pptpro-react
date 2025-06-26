import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Animation variants
const containerVariants = {
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
      staggerChildren: 0.1,
    },
  },
};

const textVariants = {
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

const circleVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    transform: "translate3d(0px, 0px, 0px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
};

const CTA = () => {
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  const isInView = useInView(ctaRef, {
    once: true,
    amount: 0.3,
  });

  // Handle navigation to contact page
  const handleGetStarted = () => {
    navigate("/contact");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={ctaRef}
      className="py-8 md:py-12 lg:py-12 px-4 md:px-12 bg-white relative overflow-hidden"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
          variants={containerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Main heading with yellow period */}
            <motion.h2
              className="font-normal text-black tracking-tight leading-tight text-center lg:text-left"
              style={{
                fontSize: "clamp(1.75rem, 6vw, 4.5rem)", // scales nicely from small to large screens
                lineHeight: "1.15",
                maxWidth: "32ch", // optimal character width per line
                margin: "0 auto", // centers it on small devices
                wordBreak: "break-word",
              }}
              variants={textVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
            >
              LET'S START YOUR NEXT
              <br />
              DREAM PROJECT<span className="text-yellow-500">.</span>
            </motion.h2>
          </div>

          {/* Right side - CTA Circle */}
          <div className="flex-shrink-0">
            <motion.button
              className="w-20 h-20 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 border-2 border-yellow-500 rounded-full flex items-center justify-center cursor-pointer group hover:bg-yellow-500 hover:border-yellow-500 transition-colors duration-300"
              variants={circleVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              whileHover="hover"
              whileTap="tap"
              onClick={handleGetStarted}
              style={{
                willChange: "transform, opacity, scale",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                transformOrigin: "center",
              }}
            >
              <ArrowUpRight
                size={32}
                className="text-yellow-500 group-hover:text-black group-hover:rotate-45 transition-all duration-300 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
