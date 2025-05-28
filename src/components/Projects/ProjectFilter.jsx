import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

// Container animation variants
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

// Button animation variants
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

const ProjectFilter = ({
  categories,
  activeFilter,
  setActiveFilter,
  inView,
}) => {
  return (
    <motion.div
      className="flex flex-wrap gap-3 mb-8 md:mb-0"
      variants={containerVariants}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      style={{
        willChange: "transform, opacity",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      {categories.map((category, idx) => {
        // Dynamically import the icon from lucide-react
        const Icon = Icons[category.icon];

        return (
          <motion.button
            key={category.id}
            className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium flex items-center gap-1.5 ${
              activeFilter === category.id
                ? "bg-yellow-500 text-black border border-transparent"
                : "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveFilter(category.id)}
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
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {category.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default ProjectFilter;
