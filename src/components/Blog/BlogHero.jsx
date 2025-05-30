import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const decorationVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1, // Full opacity now
    scale: 1, 
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      delay: 0.3,
    },
  },
};

const BlogHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  // Track if elements are in view
  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  const isTextInView = useInView(textRef, {
    once: true,
    amount: 0.5,
  });

  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-16 md:pt-40 md:pb-24  dark:bg-gray-900 overflow-hidden relative"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      {/* Left zigzag decorative element */}
      <motion.div
        className="absolute left-0 top-1/3 hidden md:block pointer-events-none"
        variants={decorationVariants}
        initial="initial"
        animate={isSectionInView ? "animate" : "initial"}
        style={{
          willChange: "transform, opacity",
          transform: "translate3d(0, 0, 0)",
          zIndex: 0,
        }}
      >
        <img
          src="/graphics/zigzag.png"
          alt="Decorative zigzag pattern"
          className="w-40 lg:w-52 xl:w-64" // Significantly increased size
          style={{
            transform: "rotate(-10deg)",
          }}
        />
      </motion.div>

      {/* Right zigzag decorative element */}
      <motion.div
        className="absolute right-0 top-1/5 hidden md:block pointer-events-none"
        variants={decorationVariants}
        initial="initial"
        animate={isSectionInView ? "animate" : "initial"}
        style={{
          willChange: "transform, opacity",
          transform: "translate3d(0, 0, 0)",
          zIndex: 0,
        }}
      >
        <img
          src="/graphics/zigzag.png"
          alt="Decorative zigzag pattern"
          className="w-40 lg:w-52 xl:w-64" // Significantly increased size
          style={{
            transform: "rotate(10deg)",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero title with yellow full stop and medium font weight */}
        <motion.div
          ref={titleRef}
          className="text-center max-w-4xl mx-auto"
          variants={titleVariants}
          initial="initial"
          animate={isTitleInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight">
            Presentation Insights
            <span className="text-yellow-500">.</span>
          </h1>

          <motion.p
            ref={textRef}
            className="text-xl text-gray-600 dark:text-gray-400"
            variants={subtitleVariants}
            initial="initial"
            animate={isTextInView ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            Expert advice, tips, and strategies to elevate your presentation
            skills and create compelling visual stories.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
