import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

// Animation variants following the codebase pattern
const titleVariants = {
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

const subtitleVariants = {
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
      delay: 0.2,
    },
  },
};

const imageVariants = {
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
      delay: 0.3,
    },
  },
};

const buttonVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 0px, 0px) scale(0.9)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px) scale(1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.5,
    },
  },
  hover: {
    transform: "translate3d(0px, 0px, 0px) scale(1.1)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const ServicesHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  // Track if elements are in view
  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  const isTextInView = useInView(textRef, {
    once: true,
    amount: 0.5,
  });

  const isImageInView = useInView(imageRef, {
    once: true,
    amount: 0.2,
  });

  // Mock video open function
  const handleOpenVideo = () => {
    console.log("Open video player");
    // Implementation would connect to your video player component
  };

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-white dark:bg-gray-900"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero title with black text and yellow full stop */}
        <motion.div
          ref={titleRef}
          className="text-center max-w-4xl mx-auto"
          variants={titleVariants}
          initial="initial"
          animate={isTitleInView ? "animate" : "initial"}
          style={{ willChange: "transform, opacity" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight">
            Our Services<span className="text-yellow-500">.</span>
          </h1>

          <motion.p
            ref={textRef}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 md:mb-16"
            variants={subtitleVariants}
            initial="initial"
            animate={isTextInView ? "animate" : "initial"}
            style={{ willChange: "transform, opacity" }}
          >
            Elevate your presentations with our comprehensive suite of services,
            designed to transform your ideas into impactful visual stories.
          </motion.p>
        </motion.div>

        {/* Featured image with play button */}
        <motion.div
          ref={imageRef}
          className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden aspect-video shadow-xl"
          variants={imageVariants}
          initial="initial"
          animate={isImageInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Our presentation services in action"
            className="w-full h-full object-cover"
            style={{ transform: "translate3d(0, 0, 0)" }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Play button */}
          <motion.button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white p-6 rounded-full shadow-lg z-10"
            variants={buttonVariants}
            initial="initial"
            animate={isImageInView ? "animate" : "initial"}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenVideo}
            style={{
              willChange: "transform, box-shadow",
              transform: "translate3d(-50%, -50%, 0)",
              backfaceVisibility: "hidden",
            }}
            aria-label="Play presentation services video"
          >
            <Play size={36} fill="white" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
