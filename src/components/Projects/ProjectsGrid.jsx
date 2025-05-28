import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ProjectFilter from "./ProjectFilter";
import ProjectCard from "./ProjectCard";
import { projects, projectCategories } from "../../data/projects";

// Animation variants following the codebase pattern
const titleVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(-30px, 0px, 0px)",
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
    transform: "translate3d(30px, 0px, 0px)",
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

const gridVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 40px, 0px)",
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

const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const pillsRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);

  // Use inView to detect when elements enter viewport
  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  const isPillsInView = useInView(pillsRef, {
    once: true,
    amount: 0.5,
  });

  const isSubtitleInView = useInView(subtitleRef, {
    once: true,
    amount: 0.5,
  });

  const isGridInView = useInView(gridRef, {
    once: true,
    amount: 0.1,
  });

  // Filtered projects based on active filter
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(
          (project) => project.category.toLowerCase() === activeFilter
        );

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-40 px-8 md:px-12 lg:px-16 dark:bg-gray-900 overflow-hidden"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div className="md:max-w-3xl">
            {/* Main title with yellow full stop */}
            <motion.h2
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-medium text-left mb-6 md:mb-8 tracking-tight text-gray-900 dark:text-white"
              variants={titleVariants}
              initial="initial"
              animate={isTitleInView ? "animate" : "initial"}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              Project Collection<span className="text-yellow-500">.</span>
            </motion.h2>

            {/* Pills with icons and outline style */}
            <div ref={pillsRef}>
              <ProjectFilter
                categories={projectCategories}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                inView={isPillsInView}
              />
            </div>
          </div>

          {/* Subtitle on right with justified text */}
          <motion.div
            ref={subtitleRef}
            className="mt-6 md:mt-0 max-w-md ml-0 md:ml-auto"
            variants={subtitleVariants}
            initial="initial"
            animate={isSubtitleInView ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            <p
              className="text-lg text-gray-600 dark:text-gray-400"
              style={{
                textAlign: "justify",
                hyphens: "manual",
                textAlignLast: "right",
              }}
            >
              Explore our complete portfolio of presentation projects that
              showcase our expertise in visual storytelling and strategic
              communication.
            </p>
          </motion.div>
        </div>

        {/* Project grid with AnimatePresence for smooth filtering */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={gridVariants}
          initial="initial"
          animate={isGridInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <AnimatePresence mode="sync">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
