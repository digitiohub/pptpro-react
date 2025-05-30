import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";

const ServiceInfoGrid = ({ items }) => {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 30px, 0px)",
    },
    visible: (index) => ({
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1 * index,
      },
    }),
  };

  // Make sure we have exactly 7 items or fill with placeholders
  const gridItems =
    items.length >= 7
      ? items.slice(0, 7)
      : [
          ...items,
          ...Array(7 - items.length).fill({
            title: "Feature",
            description: "Our service provides exceptional quality and value.",
          }),
        ];

  return (
    <section
      className="h-screen py-8 md:py-12 px-4 md:px-20 dark:bg-gray-900 flex items-center"
      ref={gridRef}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="container mx-auto h-full flex items-center">
        <div className="w-full h-[85vh] grid grid-cols-3 gap-4 relative">
          {/* Column 1: 1 tall card */}
          <motion.div
            className="col-span-1 h-full bg-[#FFC559] dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col relative overflow-hidden"
            variants={itemVariants}
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
              transform: "translate3d(0px, -5px, 0px)",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
              },
            }}
            style={{
              willChange: "transform, opacity, box-shadow",
              zIndex: 1,
            }}
          >
            {/* MetalPoly.png shown in full at the bottom of the card */}
            <div
              className="absolute pointer-events-none z-0"
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="/graphics/metalPoly.png"
                alt="Metal Polygon Pattern"
                style={{
                  width: "auto",
                  height: "25%",
                  maxHeight: "200px",
                  objectFit: "contain",
                  objectPosition: "bottom",
                }}
              />
            </div>

            {/* Title and Description */}
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white relative z-10">
              {gridItems[0].title}
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 md:mb-6 relative z-10">
              {gridItems[0].description}
            </p>

            {/* Optional Image */}
            {gridItems[0].image && (
              <div className="mt-auto mb-4 md:mb-6 rounded-xl overflow-hidden aspect-video relative z-10">
                <img
                  src={gridItems[0].image}
                  alt={gridItems[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Optional Feature List */}
            {gridItems[0].features && (
              <ul className="mt-auto space-y-2 md:space-y-3 mb-4 md:mb-6 relative z-10">
                {gridItems[0].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Optional CTA Button */}
            {gridItems[0].cta && (
              <button className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white px-5 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors duration-300 relative z-10">
                {gridItems[0].cta}
              </button>
            )}
          </motion.div>

          {/* Column 2: 4 smaller cards stacked */}
          <div className="col-span-1 h-full flex flex-col gap-4 relative">
            {/* First two cards without overlay */}
            <motion.div
              key="col2-1"
              className="h-1/4 bg-[#FFC559] dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center relative overflow-hidden"
              variants={itemVariants}
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                transform: "translate3d(0px, -5px, 0px)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                },
              }}
              style={{
                willChange: "transform, opacity, box-shadow",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                zIndex: 1,
              }}
            >
              {/* Title and Description */}
              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-bold mb-1 text-gray-900 dark:text-white">
                  {gridItems[1].title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {gridItems[1].description}
                </p>
              </div>
            </motion.div>

            <motion.div
              key="col2-2"
              className="h-1/4 bg-[#FFC559] dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center relative overflow-hidden"
              variants={itemVariants}
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                transform: "translate3d(0px, -5px, 0px)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                },
              }}
              style={{
                willChange: "transform, opacity, box-shadow",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                zIndex: 1,
              }}
            >
              {/* Title and Description */}
              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-bold mb-1 text-gray-900 dark:text-white">
                  {gridItems[2].title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {gridItems[2].description}
                </p>
              </div>
            </motion.div>

            {/* Card wrapper for bottom two cards with isolated overlay */}
            <div className="h-1/2 flex flex-col gap-4 relative">
              {/* Card 3 */}
              <motion.div
                key="col2-3"
                className="h-1/2 bg-[#FFC559] dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center relative overflow-hidden"
                variants={itemVariants}
                custom={3}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  transform: "translate3d(0px, -5px, 0px)",
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  },
                }}
                style={{
                  willChange: "transform, opacity, box-shadow",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  zIndex: 15,
                }}
              >
                {/* Card 3 overlay (individual) */}
                {!isMobile && (
                  <div
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
                    style={{
                      zIndex: 5,
                      mixBlendMode: "soft-light",
                    }}
                  >
                    <img
                      src="/graphics/metalPills.png"
                      alt="Metal Pills Pattern"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 1,
                      }}
                    />
                  </div>
                )}

                {/* Title and Description */}
                <div className="relative z-10">
                  <h3 className="text-base md:text-lg font-bold mb-1 text-gray-900 dark:text-white">
                    {gridItems[3].title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {gridItems[3].description}
                  </p>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                key="col2-4"
                className="h-1/2 bg-[#FFC559] dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center relative overflow-hidden"
                variants={itemVariants}
                custom={4}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  transform: "translate3d(0px, -5px, 0px)",
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  },
                }}
                style={{
                  willChange: "transform, opacity, box-shadow",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  zIndex: 15,
                }}
              >
                {/* Card 4 overlay (individual) */}
                {!isMobile && (
                  <div
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
                    style={{
                      zIndex: 5,
                      mixBlendMode: "soft-light",
                    }}
                  >
                    <img
                      src="/graphics/metalPills.png"
                      alt="Metal Pills Pattern"
                      className="w-full h-full object-cover"
                      style={{
                        opacity: 1,
                      }}
                    />
                  </div>
                )}

                {/* Title and Description */}
                <div className="relative z-10">
                  <h3 className="text-base md:text-lg font-bold mb-1 text-gray-900 dark:text-white">
                    {gridItems[4].title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {gridItems[4].description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Column 3: 2 medium cards */}
          <div className="col-span-1 h-full flex flex-col gap-4">
            <motion.div
              key="col3-1"
              className="h-1/2 bg-[#FFC559] dark:bg-gray-800 p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              variants={itemVariants}
              custom={5}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                transform: "translate3d(0px, -5px, 0px)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                },
              }}
              style={{
                willChange: "transform, opacity, box-shadow",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                zIndex: 1,
              }}
            >
              {/* Title and Description */}
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white">
                {gridItems[5].title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 md:mb-4">
                {gridItems[5].description}
              </p>

              {/* Optional Image */}
              {gridItems[5].image && (
                <div className="mt-auto rounded-xl overflow-hidden aspect-video">
                  <img
                    src={gridItems[5].image}
                    alt={gridItems[5].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>

            <motion.div
              key="col3-2"
              className="h-1/2 bg-[#FFC559] dark:bg-gray-800 p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              variants={itemVariants}
              custom={6}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                transform: "translate3d(0px, -5px, 0px)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                },
              }}
              style={{
                willChange: "transform, opacity, box-shadow",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                zIndex: 1,
              }}
            >
              {/* Title and Description */}
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white">
                {gridItems[6].title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 md:mb-4">
                {gridItems[6].description}
              </p>

              {/* Optional Image */}
              {gridItems[6].image && (
                <div className="mt-auto rounded-xl overflow-hidden aspect-video">
                  <img
                    src={gridItems[6].image}
                    alt={gridItems[6].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Mobile-specific SVG overlay - Only renders on mobile */}
          {isMobile && (
            <div
              className="absolute inset-0 pointer-events-none md:hidden"
              style={{
                zIndex: 20,
                mixBlendMode: "lighten",
                transform: "translate3d(0, 0, 0)",
              }}
            >
              <img
                src="/graphics/metalPills.png"
                alt="Metal Pills Pattern"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none"
                style={{
                  opacity: 0.7,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceInfoGrid;
