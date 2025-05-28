import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

const ProjectFilter = ({
  categories,
  activeFilter,
  setActiveFilter,
  inView,
}) => {
  // Spring animation settings
  const springTransition = {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 1,
  };

  const lightSpringTransition = {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 0.8,
  };

  return (
    <motion.div
      className="flex flex-wrap gap-3 mb-8 md:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        ...springTransition,
        delay: 0.2,
        staggerChildren: 0.05,
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {categories.map((category, idx) => {
        // Dynamically import the icon from lucide-react
        const Icon = Icons[category.icon];

        return (
          <motion.button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 ${
              activeFilter === category.id
                ? "bg-yellow-500 text-black border border-transparent"
                : "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-600"
            } transition-colors duration-200`}
            onClick={() => setActiveFilter(category.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...lightSpringTransition,
              delay: 0.2 + idx * 0.05,
            }}
            whileHover={{
              y: -4,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
            }}
            whileTap={{ scale: 0.97 }}
            style={{ willChange: "transform, box-shadow" }}
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
