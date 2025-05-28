import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, index }) => {
  const staggeredSpring = {
    type: "spring",
    stiffness: 80,
    damping: 14,
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-black cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 10 }}
      transition={{
        ...staggeredSpring,
        delay: 0.1 + index * 0.08,
      }}
      layout
      whileHover={{
        y: -8,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      }}
      style={{
        willChange: "transform, opacity",
        aspectRatio: "660/450",
      }}
    >
      <Link to={`/projects/${project.id}`} className="block w-full h-full">
        {/* Project image */}
        <div className="w-full h-full overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.08,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0],
              },
            }}
            style={{ willChange: "transform" }}
          />
        </div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70"
          whileHover={{
            opacity: 0.9,
            transition: { duration: 0.3 },
          }}
          style={{ willChange: "opacity" }}
        />

        {/* Project title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
          <div>
            <motion.h3
              className="text-white text-xl font-medium mb-1"
              initial={{ y: 10, opacity: 0.8 }}
              whileHover={{
                y: -3,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              style={{ willChange: "transform, opacity" }}
            >
              {project.title}
            </motion.h3>
            <motion.span
              className="inline-block text-yellow-400 text-sm"
              initial={{ y: 10, opacity: 0.6 }}
              whileHover={{
                y: -2,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.05,
                },
              }}
              style={{ willChange: "transform, opacity" }}
            >
              {project.category}
            </motion.span>
          </div>
          <motion.div
            className="bg-yellow-500 p-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            whileHover={{
              rotate: 45,
              scale: 1.2,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
              },
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <ArrowRight className="h-5 w-5 text-black" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
