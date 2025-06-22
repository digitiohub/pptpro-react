import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// Animation variants following the codebase pattern
const titleVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 50px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

const subtitleVariants = {
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
      delay: 0.4,
    },
  },
};

const buttonVariants = {
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
      delay: 0.6,
    },
  },
  hover: {
    transform: "translate3d(0px, -2px, 0px)",
    boxShadow: "0 10px 20px rgba(255, 107, 0, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const decorativeElementVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotate: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.8,
    },
  },
};

const progressVariants = {
  initial: {
    width: "0%",
  },
  animate: {
    width: "60%",
    transition: {
      duration: 2,
      delay: 1,
      ease: "easeOut",
    },
  },
};

const HomeHero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const isInView = useInView(heroRef, {
    once: true,
    amount: 0.3,
  });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-[#f8f9fa] relative overflow-hidden flex items-center justify-center"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top right decorative elements */}
        <motion.div
          className="absolute top-16 right-20"
          variants={decorativeElementVariants}
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
        >
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="text-xs text-gray-600 mb-2">125K+</div>
            <div className="text-xs text-gray-500">Projects Created</div>
            <div className="flex space-x-1 mt-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            {/* Progress bar */}
            <div className="mt-3 bg-gray-200 rounded-full h-1">
              <motion.div
                className="bg-purple-500 h-1 rounded-full"
                variants={progressVariants}
                initial="initial"
                animate={isVisible ? "animate" : "initial"}
              />
            </div>
          </div>
        </motion.div>

        {/* Tagline box top right */}
        <motion.div
          className="absolute top-20 right-12"
          variants={decorativeElementVariants}
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
          style={{ transform: "translateY(80px)" }}
        >
          <div className="bg-white rounded-lg p-3 shadow-lg text-right">
            <div className="text-sm font-semibold text-gray-800">
              Imagination
            </div>
            <div className="text-sm font-semibold text-gray-800">
              Meets Execution.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content - Centered Container with Left-Aligned Text */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Small text above */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-6 text-left"
            variants={subtitleVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            Your brand's journey to creativity begins with us
          </motion.p>

          {/* Main headline - left aligned within centered container */}
          <motion.div
            variants={titleVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6 text-left">
              Innovation
              <br />
              Starts{" "}
              <span className="relative inline-block">
                <span className="text-purple-600">Here</span>
                <span className="text-purple-600">.</span>
                {/* Bounding box decoration */}
                <div className="absolute inset-0 border-2 border-dashed border-purple-400 rounded -m-2 pointer-events-none">
                  {/* Corner handles */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
              </span>
            </h1>
          </motion.div>

          {/* Small text below */}
          <motion.p
            className="text-base md:text-lg text-gray-500 mb-8 max-w-2xl text-left"
            variants={subtitleVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            We transform your vision into compelling presentations that
            captivate audiences and drive results. From concept to completion,
            every project is crafted with precision and creativity.
          </motion.p>

          {/* CTA Button - Left aligned within centered container */}
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            whileHover="hover"
            className="flex items-center space-x-4"
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            <button className="bg-[#ff6b00] hover:bg-[#e55a00] text-white px-8 py-3 rounded-full font-medium text-lg shadow-lg transition-colors duration-200">
              Let's Collaborate!
            </button>
            <div className="w-12 h-12 bg-[#ff6b00] rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative curved line */}
      <div className="absolute bottom-10 right-20">
        <motion.div
          variants={decorativeElementVariants}
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
        >
          <svg viewBox="0 0 100 50" className="w-32 h-16">
            <path
              d="M10,40 Q50,10 90,30"
              stroke="url(#gradient2)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
