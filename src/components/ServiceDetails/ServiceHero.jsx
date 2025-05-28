import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const ServiceHero = ({ title, subtitle, image }) => {
  const location = useLocation();
  const heroRef = useRef(null);

  // Force remount with a unique key on every route change
  const [mountKey, setMountKey] = useState(Date.now());

  // Reset key when route changes to force complete remount
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    // Force remount with new key
    setMountKey(Date.now());
  }, [location.pathname]);

  // Split title into words for one-word-per-line styling
  const titleWords = title.split(" ");

  // Use Unsplash images with appropriate search terms for each service
  const getUnsplashImage = () => {
    // If specific service image is provided, use it
    if (image) return image;

    // Otherwise generate appropriate Unsplash query based on service title
    let query = title.toLowerCase();

    // Enhance queries for better image results
    if (query.includes("corporate")) {
      query = "business presentation conference";
    } else if (query.includes("video")) {
      query = "video production filming";
    } else if (query.includes("training")) {
      query = "presentation workshop training";
    } else if (query.includes("financial")) {
      query = "financial business chart data";
    }

    return `https://source.unsplash.com/random/1600x900/?${encodeURIComponent(
      query
    )}`;
  };

  const imageUrl = getUnsplashImage();

  // Animation variants
  const cardVariants = {
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
    exit: {
      opacity: 0,
      transform: "translate3d(0px, -30px, 0px)",
      transition: {
        duration: 0.2,
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
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const titleWordVariants = {
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
      },
    },
    exit: {
      opacity: 0,
      transform: "translate3d(0px, -20px, 0px)",
      transition: {
        duration: 0.15,
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 10px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.4 + titleWords.length * 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden pt-32 pb-16 md:pt-32 md:pb-24 px-4 md:px-12 bg-white dark:bg-gray-950"
        style={{
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
        key={mountKey} // Force remount on route change with unique key
      >
        <div className="container mx-auto">
          {/* Card-style hero image with title overlay */}
          <motion.div
            className="relative w-full rounded-3xl overflow-hidden shadow-2xl"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              height: "min(75vh, 700px)",
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Image */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover object-center"
                style={{ transform: "translate3d(0, 0, 0)" }}
              />
              {/* Full black overlay with opacity for text visibility */}
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </motion.div>

            {/* Title and subtitle positioned in bottom left */}
            <div
              className="absolute bottom-0 left-0 p-6 md:p-10 w-full"
              style={{ transform: "translate3d(0, 0, 0)" }}
            >
              {/* Title with one word per line */}
              <motion.div
                className="flex flex-col mb-4"
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  willChange: "opacity",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
              >
                {titleWords.map((word, index) => (
                  <motion.div
                    key={index}
                    className="overflow-hidden"
                    variants={titleWordVariants}
                    style={{
                      willChange: "transform, opacity",
                      transform: "translate3d(0, 0, 0)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <h1 className="text-5xl md:text-6xl lg:text-8xl tracking-tight font-semibold text-white leading-tight">
                      {word}
                      {index === titleWords.length - 1 && (
                        <span className="text-yellow-500">.</span>
                      )}
                    </h1>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-gray-200 max-w-2xl"
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  willChange: "transform, opacity",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
              >
                {subtitle}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatePresence>
  );
};

export default ServiceHero;
