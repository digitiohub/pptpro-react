import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Building,
  PieChart,
  BarChart4,
} from "lucide-react";

const HomeProjects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
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

  const pills = [
    { id: "All", label: "All Projects", icon: Layers },
    { id: "Corporate", label: "Corporate", icon: Building },
    { id: "Pitch", label: "Pitch Decks", icon: PieChart },
    { id: "Sales", label: "Sales Decks", icon: BarChart4 },
  ];

  const projects = [
    {
      id: 1,
      title: "Corporate Annual Report",
      type: "Corporate",
      image: "/images/projects/project1.jpg",
    },
    {
      id: 2,
      title: "Investor Pitch Deck",
      type: "Pitch",
      image: "/images/projects/project2.jpg",
    },
    {
      id: 3,
      title: "Sales Enablement Slides",
      type: "Sales",
      image: "/images/projects/project3.jpg",
    },
    {
      id: 4,
      title: "Company Overview",
      type: "Corporate",
      image: "/images/projects/project4.jpg",
    },
    {
      id: 5,
      title: "Startup Funding Deck",
      type: "Pitch",
      image: "/images/projects/project5.jpg",
    },
    {
      id: 6,
      title: "Product Sales Presentation",
      type: "Sales",
      image: "/images/projects/project6.jpg",
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.type === activeFilter);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-8 md:px-12 lg:px-16 bg-white dark:bg-gray-950 overflow-hidden"
      style={{
        transform: "translateZ(0)",
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-left mb-6 md:mb-8 tracking-tight text-gray-900 dark:text-white"
              initial={{ opacity: 0, transform: "translate3d(-30px, 0, 0)" }}
              animate={
                isTitleInView
                  ? {
                      opacity: 1,
                      transform: "translate3d(0, 0, 0)",
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              style={{ willChange: "transform, opacity" }}
            >
              Our Featured Projects
              <span className="text-yellow-500">.</span>
            </motion.h2>

            {/* Pills with icons and outline style */}
            <motion.div
              ref={pillsRef}
              className="flex flex-wrap gap-3 mb-8 md:mb-0"
              initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
              animate={
                isPillsInView
                  ? {
                      opacity: 1,
                      transform: "translate3d(0, 0, 0)",
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              style={{ willChange: "transform, opacity" }}
            >
              {pills.map((pill) => {
                const Icon = pill.icon;
                return (
                  <motion.button
                    key={pill.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 ${
                      activeFilter === pill.id
                        ? "bg-yellow-500 text-black border border-transparent"
                        : "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-600"
                    } transition-all duration-200 transform`}
                    onClick={() => setActiveFilter(pill.id)}
                    whileHover={{
                      transform: "translate3d(0, -2px, 0)",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [0.25, 0.1, 0.25, 1.0],
                    }}
                    style={{ willChange: "transform, box-shadow" }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {pill.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Subtitle on right with justified text */}
          <motion.div
            ref={subtitleRef}
            className="mt-6 md:mt-0 max-w-md ml-0 md:ml-auto"
            initial={{ opacity: 0, transform: "translate3d(30px, 0, 0)" }}
            animate={
              isSubtitleInView
                ? {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)",
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <p
              className="text-lg text-gray-600 dark:text-gray-400"
              style={{
                textAlign: "justify",
                hyphens: "manual",
                textAlignLast: "right",
              }}
            >
              Explore our carefully crafted presentations that have helped
              businesses communicate their ideas effectively.
            </p>
          </motion.div>
        </div>

        {/* Project grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          initial={{ opacity: 0, transform: "translate3d(0, 40px, 0)" }}
          animate={
            isGridInView
              ? {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                }
              : {}
          }
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-black cursor-pointer"
              initial={{ opacity: 0, transform: "translate3d(0, 30px, 0)" }}
              animate={
                isGridInView
                  ? {
                      opacity: 1,
                      transform: "translate3d(0, 0, 0)",
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              whileHover={{
                transform: "translate3d(0, -5px, 0)",
                transition: { duration: 0.3 },
              }}
              style={{
                willChange: "transform, opacity",
                aspectRatio: "660/450",
                transform: "translate3d(0, 0, 0)",
              }}
            >
              {/* Project image */}
              <div className="w-full h-full overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ willChange: "transform" }}
                />
              </div>

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                style={{ willChange: "opacity" }}
              />

              {/* Project title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                <div>
                  <motion.h3
                    className="text-white text-xl font-medium mb-1"
                    initial={{
                      transform: "translate3d(0, 10px, 0)",
                      opacity: 0.8,
                    }}
                    whileHover={{
                      transform: "translate3d(0, 0, 0)",
                      opacity: 1,
                      transition: { duration: 0.3 },
                    }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.span
                    className="inline-block text-yellow-400 text-sm"
                    initial={{
                      transform: "translate3d(0, 10px, 0)",
                      opacity: 0.6,
                    }}
                    whileHover={{
                      transform: "translate3d(0, 0, 0)",
                      opacity: 1,
                      transition: { duration: 0.3, delay: 0.05 },
                    }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {project.type}
                  </motion.span>
                </div>
                <motion.div
                  className="bg-yellow-500 p-2 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <ArrowRight className="h-5 w-5 text-black" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all projects button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
          animate={
            isGridInView
              ? {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                }
              : {}
          }
          transition={{
            duration: 0.5,
            delay: 0.8,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <motion.button
            className="px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-full font-medium flex items-center gap-2 group"
            whileHover={{
              transform: "translate3d(0, -2px, 0)",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            style={{ willChange: "transform, box-shadow" }}
          >
            View All Projects
            <motion.span
              className="inline-block"
              initial={{ transform: "translate3d(0, 0, 0)" }}
              whileHover={{
                transform: "translate3d(5px, 0, 0)",
                transition: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 0.7,
                },
              }}
              style={{ willChange: "transform" }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProjects;
