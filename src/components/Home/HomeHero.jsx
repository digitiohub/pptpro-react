import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "../../ui/menus/Navbar";

const HomeHero = () => {
  // Animation variants
  const heroContentVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 30px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const chevronVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, -20px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        duration: 0.5,
        delay: 1.2,
        ease: "easeOut",
      },
    },
    bounce: {
      transform: [
        "translate3d(0px, 0px, 0px)",
        "translate3d(0px, 10px, 0px)",
        "translate3d(0px, 0px, 0px)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/hero-bg.jpg")',
          willChange: "transform",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content - Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={heroContentVariants}
          style={{ willChange: "transform, opacity" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Presentation Excellence
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-yellow/90 max-w-3xl mx-auto">
            Crafting powerful presentations that captivate audiences and deliver
            results
          </p>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={handleScrollDown}
        initial="hidden"
        animate={["visible", "bounce"]}
        variants={chevronVariants}
        style={{ willChange: "transform, opacity" }}
        whileHover={{ scale: 1.2 }}
      >
        <ChevronDown size={36} className="text-yellow animate-pulse" />
      </motion.div>
    </div>
  );
};

export default HomeHero;
