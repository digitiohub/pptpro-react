import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { projects } from "../../data/projects";
import Navbar from "../ui/menus/Navbar";

// Animation variants following the codebase pattern
const heroImageVariants = {
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

const categoryVariants = {
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
      delay: 0.1,
    },
  },
};

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
      delay: 0.2,
    },
  },
};

const descriptionVariants = {
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
      delay: 0.3,
    },
  },
};

const resultsVariants = {
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
      delay: 0.4,
    },
  },
};

const listItemVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(-10px, 0px, 0px)",
  },
  animate: (index) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.4 + index * 0.1,
    },
  }),
};

const galleryVariants = {
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
      delay: 0.5,
    },
  },
};

const galleryItemVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 0px, 0px) scale(0.95)",
  },
  animate: (index) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px) scale(1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.6 + index * 0.1,
    },
  }),
  hover: {
    transform: "translate3d(0px, 0px, 0px) scale(1.02)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const sidebarVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(20px, 0px, 0px)",
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

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id.toString() === id);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/projects" className="text-yellow-500 hover:underline">
            Back to all projects
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-white dark:bg-gray-900 py-20 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center mb-8 text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all projects
          </Link>

          {/* Hero image */}
          <motion.div
            className="w-full h-[50vh] md:h-[60vh] mb-10 rounded-xl overflow-hidden"
            variants={heroImageVariants}
            initial="initial"
            animate="animate"
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left column - main content */}
            <div className="lg:col-span-2">
              <motion.div
                variants={categoryVariants}
                initial="initial"
                animate="animate"
                style={{
                  willChange: "transform, opacity",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
              >
                <span className="px-3 py-1 text-xs font-medium bg-yellow-500 text-black rounded-full">
                  {project.category}
                </span>
              </motion.div>

              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6"
                variants={titleVariants}
                initial="initial"
                animate="animate"
                style={{
                  willChange: "transform, opacity",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
              >
                {project.title}
              </motion.h1>

              <motion.div
                className="prose prose-lg dark:prose-invert max-w-none mb-10"
                variants={descriptionVariants}
                initial="initial"
                animate="animate"
                style={{
                  willChange: "transform, opacity",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
              >
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {project.fullDescription || project.description}
                </p>
              </motion.div>

              {/* Results section */}
              {project.results && (
                <motion.div
                  className="mb-12"
                  variants={resultsVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    willChange: "transform, opacity",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Results
                  </h2>
                  <ul className="space-y-3">
                    {project.results.map((result, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        variants={listItemVariants}
                        initial="initial"
                        animate="animate"
                        custom={index}
                        style={{
                          willChange: "transform, opacity",
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <svg
                          className="w-5 h-5 text-yellow-500 mr-3 mt-1.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">
                          {result}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <motion.div
                  className="mt-12"
                  variants={galleryVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    willChange: "transform, opacity",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        className="rounded-lg overflow-hidden aspect-video"
                        variants={galleryItemVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        custom={index}
                        style={{
                          willChange: "transform, opacity",
                          transform: "translate3d(0, 0, 0)",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <img
                          src={image}
                          alt={`${project.title} gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right column - project details */}
            <motion.div
              className="lg:col-span-1"
              variants={sidebarVariants}
              initial="initial"
              animate="animate"
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Details
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Client
                    </h4>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {project.client}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Year
                    </h4>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {project.year}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Industry
                    </h4>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {project.industry}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Services
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
