import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

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

const imageVariants = {
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
      delay: 0.3,
    },
  },
};

const controlsVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 10px, 0px)",
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
  exit: {
    opacity: 0,
    transform: "translate3d(0px, 10px, 0px)",
    transition: {
      duration: 0.2,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const ServicesHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  // Track if elements are in view
  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  const isTextInView = useInView(textRef, {
    once: true,
    amount: 0.5,
  });

  const isImageInView = useInView(imageRef, {
    once: true,
    amount: 0.2,
  });

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoError = () => {
    console.warn("Video failed to load, falling back to placeholder image");
  };

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-white dark:bg-gray-900"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero title with black text and yellow full stop */}
        <motion.div
          ref={titleRef}
          className="text-center max-w-4xl mx-auto"
          variants={titleVariants}
          initial="initial"
          animate={isTitleInView ? "animate" : "initial"}
          style={{ willChange: "transform, opacity" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight">
            Our Services<span className="text-yellow-500">.</span>
          </h1>

          <motion.p
            ref={textRef}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 md:mb-16"
            variants={subtitleVariants}
            initial="initial"
            animate={isTextInView ? "animate" : "initial"}
            style={{ willChange: "transform, opacity" }}
          >
            Elevate your presentations with our comprehensive suite of services,
            designed to transform your ideas into impactful visual stories.
          </motion.p>
        </motion.div>

        {/* Featured video with controls */}
        <motion.div
          ref={imageRef}
          className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden aspect-video shadow-xl group"
          variants={imageVariants}
          initial="initial"
          animate={isImageInView ? "animate" : "initial"}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onError={handleVideoError}
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <source src="/video/intro.mp4" type="video/mp4" />
            {/* Fallback image if video fails to load */}
            <img
              src="https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="Our presentation services in action"
              className="w-full h-full object-cover"
            />
          </video>

          {/* Subtle overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/0 pointer-events-none"></div>

          {/* Video controls - only show on hover */}
          {showControls && (
            <motion.div
              className="absolute top-4 right-4 flex space-x-3 z-10"
              variants={controlsVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Play/Pause button */}
              <motion.button
                className="bg-black/50 cursor-pointer backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-200"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>

              {/* Mute/Unmute button */}
              <motion.button
                className="bg-black/50 cursor-pointer  backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-200"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>
            </motion.div>
          )}

          {/* Video status indicator (optional) */}
      
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
