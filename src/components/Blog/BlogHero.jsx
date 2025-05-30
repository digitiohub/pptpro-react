import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as Icons from "lucide-react";

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

// Container animation variants - matching ProjectFilter
const containerVariants = {
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
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Button animation variants - matching ProjectFilter
const buttonVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 10px, 0px)",
  },
  animate: (idx) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.05 * idx,
    },
  }),
  hover: {
    transform: "translate3d(0px, -4px, 0px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
  tap: {
    transform: "translate3d(0px, 0px, 0px) scale(0.97)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
    },
  },
};

const decorationVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      delay: 0.3,
    },
  },
};

// Map category names to icons
const categoryIcons = {
  all: "LayoutGrid",
  tips: "Lightbulb",
  tutorials: "BookOpen",
  resources: "FileText",
  design: "Palette",
  strategy: "Target",
  tools: "Tool",
  trends: "TrendingUp",
  case: "Briefcase", // for "case studies"
};

const BlogHero = ({
  categories = [],
  activeCategory = "all",
  setActiveCategory,
}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const tabsRef = useRef(null);

  // Track if elements are in view
  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  const isTextInView = useInView(textRef, {
    once: true,
    amount: 0.5,
  });

  const isTabsInView = useInView(tabsRef, {
    once: true,
    amount: 0.5,
  });

  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  // Handle filter change
  const handleFilterChange = (category) => {
    if (setActiveCategory) {
      setActiveCategory(category);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-16 md:pt-40 md:pb-24 dark:bg-gray-900 overflow-hidden relative"
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
          className="w-40 lg:w-52 xl:w-64"
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
          className="w-40 lg:w-52 xl:w-64"
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
            className="text-xl text-gray-600 dark:text-gray-400 mb-12"
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

          {/* Category filter tabs with ProjectFilter styling and animations */}
          {Array.isArray(categories) && categories.length > 0 && (
            <motion.div
              ref={tabsRef}
              className="flex flex-wrap justify-center gap-3 mt-8"
              variants={containerVariants}
              initial="initial"
              animate={isTabsInView ? "animate" : "initial"}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              {categories.map((category, idx) => {
                // Get icon component or fallback to Bookmark
                const IconComponent =
                  Icons[categoryIcons[category] || "Bookmark"];

                return (
                  <motion.button
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium flex items-center gap-1.5 ${
                      activeCategory === category
                        ? "bg-yellow-500 text-black border border-transparent"
                        : "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                    variants={buttonVariants}
                    custom={idx}
                    whileHover="hover"
                    whileTap="tap"
                    style={{
                      willChange: "transform, box-shadow",
                      transform: "translate3d(0, 0, 0)",
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <IconComponent className="h-3.5 w-3.5" />
                    {category === "all"
                      ? "All Posts"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
