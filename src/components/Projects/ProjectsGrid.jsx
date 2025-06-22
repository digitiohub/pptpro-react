import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import ProjectFilter from "./ProjectFilter";
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

// Project Card Component with Video Controls
const ProjectCard = ({ project, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.currentTime = 0;
        video.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const hasVideo = project.video;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-black"
      variants={projectVariants}
      custom={index}
      initial="initial"
      animate="animate"
      onMouseEnter={() => setHoveredProject(true)}
      onMouseLeave={() => setHoveredProject(false)}
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
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              style={{
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
              }}
              onError={() => {
                console.error(`Failed to load video for project ${project.id}`);
              }}
              onEnded={() => {
                setIsPlaying(false);
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
                onClick={handlePlayPause}
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
                onClick={toggleMute}
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
