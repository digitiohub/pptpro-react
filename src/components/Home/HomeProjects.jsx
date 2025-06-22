import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Building,
  PieChart,
  BarChart4,
  GraduationCap,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import StarBorder from "../../ui/StarBorder/StarBorder";
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

const pillsVariants = {
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
      delay: 0.4,
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
      delay: 0.5,
    },
  },
};

const projectVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: (index) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2 + index * 0.1,
    },
  }),
};

const buttonVariants = {
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
      delay: 0.8,
    },
  },
};

const pillButtonVariants = {
  hover: {
    transform: "translate3d(0px, -2px, 0px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const HomeProjects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [playingVideos, setPlayingVideos] = useState(new Set());
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mutedVideos, setMutedVideos] = useState(new Set());
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const pillsRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);
  const videoRefs = useRef({});

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

  // Icon mapping for categories
  const iconMap = {
    Layers,
    Building,
    PieChart,
    BarChart4,
    GraduationCap,
  };

  const pills = projectCategories.map((category) => ({
    ...category,
    icon: iconMap[category.icon],
  }));

  // Get filtered projects and limit to 2 projects for all filters
  const getFilteredProjects = () => {
    if (activeFilter === "all") {
      return projects.slice(0, 2);
    } else {
      return projects
        .filter(
          (project) =>
            project.category.toLowerCase() === activeFilter.toLowerCase()
        )
        .slice(0, 2);
    }
  };

  const filteredProjects = getFilteredProjects();

  const handlePlayPause = (projectId, e) => {
    e.stopPropagation();
    const video = videoRefs.current[projectId];
    if (video) {
      const newPlayingState = new Set(playingVideos);

      if (playingVideos.has(projectId)) {
        // Pause video
        video.pause();
        newPlayingState.delete(projectId);
      } else {
        // Play video
        video.currentTime = 0; // Reset to beginning
        video.play().catch(console.error);
        newPlayingState.add(projectId);
      }

      setPlayingVideos(newPlayingState);
    }
  };

  const toggleMute = (projectId, e) => {
    e.stopPropagation();
    const video = videoRefs.current[projectId];
    if (video) {
      const newMutedState = new Set(mutedVideos);
      if (mutedVideos.has(projectId)) {
        newMutedState.delete(projectId);
        video.muted = false;
      } else {
        newMutedState.add(projectId);
        video.muted = true;
      }
      setMutedVideos(newMutedState);
    }
  };

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
              variants={titleVariants}
              initial="initial"
              animate={isTitleInView ? "animate" : "initial"}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              Our Featured Projects
              <span className="text-yellow-500">.</span>
            </motion.h2>

            {/* Pills with icons and outline style */}
            <motion.div
              ref={pillsRef}
              className="flex flex-wrap gap-3 mb-8 md:mb-0"
              variants={pillsVariants}
              initial="initial"
              animate={isPillsInView ? "animate" : "initial"}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              {pills.map((pill) => {
                const Icon = pill.icon;
                return (
                  <motion.button
                    key={pill.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 cursor-pointer ${
                      activeFilter === pill.id
                        ? "bg-yellow-500 text-black border border-transparent"
                        : "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-600"
                    } transition-all duration-200 transform`}
                    onClick={() => setActiveFilter(pill.id)}
                    variants={pillButtonVariants}
                    whileHover="hover"
                    style={{
                      willChange: "transform, box-shadow",
                      transform: "translate3d(0, 0, 0)",
                      backfaceVisibility: "hidden",
                      cursor: "pointer",
                    }}
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
              Explore our carefully crafted presentations that have helped
              businesses communicate their ideas effectively.
            </p>
          </motion.div>
        </div>

        {/* Project grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={gridVariants}
          initial="initial"
          animate={isGridInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
        >
          {filteredProjects.map((project, index) => {
            const hasVideo = project.video;
            const isPlaying = playingVideos.has(project.id);
            const isHovered = hoveredProject === project.id;
            const isMuted = mutedVideos.has(project.id);

            return (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-black"
                variants={projectVariants}
                custom={index}
                initial="initial"
                animate={isGridInView ? "animate" : "initial"}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  willChange: "transform, opacity",
                  aspectRatio: "660/450",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Media container - Video only */}
                <div
                  className="w-full h-full overflow-hidden relative"
                  style={{
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {hasVideo ? (
                    <>
                      {/* Video element */}
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[project.id] = el;
                        }}
                        className="w-full h-full object-cover"
                        loop
                        muted={!mutedVideos.has(project.id)}
                        playsInline
                        preload="metadata"
                        style={{
                          willChange: "transform",
                          transform: "translate3d(0, 0, 0)",
                        }}
                        onError={() => {
                          console.error(
                            `Failed to load video for project ${project.id}`
                          );
                        }}
                        onEnded={() => {
                          const newPlayingState = new Set(playingVideos);
                          newPlayingState.delete(project.id);
                          setPlayingVideos(newPlayingState);
                        }}
                      >
                        <source src={hasVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Video controls overlay (always visible in top-right) */}
                      <motion.div
                        className="absolute top-4 right-4 flex gap-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {/* Play/Pause button */}
                        <motion.button
                          className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors cursor-pointer"
                          onClick={(e) => handlePlayPause(project.id, e)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ cursor: "pointer" }}
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4" fill="currentColor" />
                          ) : (
                            <Play className="h-4 w-4" fill="currentColor" />
                          )}
                        </motion.button>

                        {/* Mute/Unmute button */}
                        <motion.button
                          className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors cursor-pointer"
                          onClick={(e) => toggleMute(project.id, e)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ cursor: "pointer" }}
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </motion.button>
                      </motion.div>
                    </>
                  ) : (
                    // Fallback for projects without video
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        No video available
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom shadow gradient for text visibility */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                {/* Project info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div>
                    <motion.h3
                      className="text-white text-xl font-medium mb-1 drop-shadow-lg"
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.span
                      className="inline-block text-yellow-400 text-sm drop-shadow-lg"
                      style={{
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {project.category}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all projects button with StarBorder */}
        <motion.div
          className="mt-16 flex justify-center"
          variants={buttonVariants}
          initial="initial"
          animate={isGridInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <StarBorder as="a" href="/projects" color="#000" speed="8s">
            <span className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="h-5 w-5 group-hover:transform group-hover:translate-x-1 transition-transform" />
            </span>
          </StarBorder>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProjects;
