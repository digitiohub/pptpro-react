import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ServiceHero = ({ title, subtitle, image }) => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.3 });

  // Animation variants
  const contentVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 30px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 30px, 0px)",
    },
    visible: {
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

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 20px, 0px)",
    },
    visible: {
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

  const imageVariants = {
    hidden: {
      opacity: 0,
      transform: "scale3d(1.1, 1.1, 1)",
    },
    visible: {
      opacity: 1,
      transform: "scale3d(1, 1, 1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1,
      },
    },
  };

  const breadcrumbVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, -10px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative bg-black text-white w-full overflow-hidden"
      style={{
        height: "min(90vh, 800px)",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Background image with overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          willChange: "transform, opacity",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
      </motion.div>

      {/* Content */}
      <div
        className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {/* Breadcrumb navigation */}
        <motion.div
          className="absolute top-32 left-4 md:left-8"
          variants={breadcrumbVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <Link
                    to="/services"
                    className="ml-1 text-sm font-medium text-gray-300 hover:text-white md:ml-2"
                  >
                    Services
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 text-sm font-medium text-gray-100 md:ml-2">
                    {title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </motion.div>

        <motion.div
          className="max-w-3xl"
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            variants={titleVariants}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            {title}
            <span className="text-yellow-500">.</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-2xl"
            variants={subtitleVariants}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10"
        style={{ transform: "translate3d(0, 0, 0)" }}
      ></div>
    </section>
  );
};

export default ServiceHero;
