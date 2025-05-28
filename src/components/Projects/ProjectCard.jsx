import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Define animation variants following the pattern
const cardVariants = {
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
    },
  },
  hover: {
    transform: "translate3d(0px, -8px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const imageVariants = {
  initial: {
    transform: "translate3d(0px, 0px, 0px) scale(1)",
  },
  hover: {
    transform: "translate3d(0px, 0px, 0px) scale(1.08)",
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 30,
      mass: 2.5,
    },
  },
};

const overlayVariants = {
  initial: {
    opacity: 0.7,
  },
  hover: {
    opacity: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

const titleVariants = {
  initial: {
    opacity: 0.8,
    transform: "translate3d(0px, 10px, 0px)",
  },
  hover: {
    opacity: 1,
    transform: "translate3d(0px, -3px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const categoryVariants = {
  initial: {
    opacity: 0.6,
    transform: "translate3d(0px, 10px, 0px)",
  },
  hover: {
    opacity: 1,
    transform: "translate3d(0px, -2px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.05,
    },
  },
};

const arrowVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 16px, 0px) rotate(0deg) scale(1)",
  },
  hover: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px) rotate(0deg) scale(1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hoverButton: {
    transform: "translate3d(0px, 0px, 0px) rotate(45deg) scale(1.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-black cursor-pointer"
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, amount: 0.1 }}
      custom={index}
      style={{
        willChange: "transform, opacity",
        aspectRatio: "660/450",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <Link to={`/projects/${project.id}`} className="block w-full h-full">
        {/* Project image with optimized transform */}
        <div
          className="w-full h-full overflow-hidden"
          style={{
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <motion.div
            className="w-full h-full"
            variants={imageVariants}
            style={{
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{
                transform: "translate3d(0, 0, 0)",
              }}
            />
          </motion.div>
        </div>

        {/* Optimized overlay with hardware acceleration */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          variants={overlayVariants}
          style={{
            willChange: "opacity",
            transform: "translate3d(0, 0, 0)",
          }}
        />

        {/* Project title with hardware-accelerated animations */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end"
          style={{
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div>
            <motion.h3
              className="text-white text-xl font-medium mb-1"
              variants={titleVariants}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              {project.title}
            </motion.h3>
            <motion.span
              className="inline-block text-yellow-400 text-sm"
              variants={categoryVariants}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              {project.category}
            </motion.span>
          </div>

          {/* Arrow button with optimized 3D transform */}
          <motion.div
            className="bg-yellow-500 p-2 rounded-full"
            variants={arrowVariants}
            whileHover="hoverButton"
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            <ArrowRight className="h-5 w-5 text-black" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
