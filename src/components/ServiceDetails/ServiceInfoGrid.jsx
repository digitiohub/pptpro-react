import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";

const ServiceInfoGrid = ({ items = [] }) => {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.2 });
  const [screenSize, setScreenSize] = useState("desktop");

  // Check for screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
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
  const safeItems = Array.isArray(items) ? items : [];
  const gridItems =
    safeItems.length >= 7
      ? safeItems.slice(0, 7)
      : [
          ...safeItems,
          ...Array(7 - safeItems.length).fill({
            title: "Feature",
            description: "Our service provides exceptional quality and value.",
          }),
        ];

  // Render card content
  const renderCard = (item, index, customClass = "", showOverlay = false) => (
    <motion.div
      key={`card-${index}`}
      className={`bg-[#FFC559] dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col relative overflow-hidden ${customClass}`}
      variants={itemVariants}
      custom={index}
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
        zIndex: showOverlay ? 15 : 1,
      }}
    >
      {/* Individual card overlay for specific cards */}
      {showOverlay && screenSize === "desktop" && (
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

      {/* MetalPoly.png shown in full at the bottom of the first card only */}
      {index === 0 && (
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
              height: screenSize === "mobile" ? "20%" : "25%",
              maxHeight: screenSize === "mobile" ? "150px" : "200px",
              objectFit: "contain",
              objectPosition: "bottom",
            }}
          />
        </div>
      )}

      {/* Title and Description */}
      <div className="relative z-10 flex-grow">
        <h3
          className={`font-bold mb-2 text-gray-900 dark:text-white ${
            index === 0
              ? "text-lg sm:text-xl lg:text-2xl mb-3 lg:mb-4"
              : index === 5 || index === 6
              ? "text-base sm:text-lg lg:text-xl mb-2 lg:mb-3"
              : "text-sm sm:text-base lg:text-lg mb-1"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`text-gray-600 dark:text-gray-300 ${
            index === 0
              ? "text-sm sm:text-base lg:text-lg mb-4 lg:mb-6"
              : index === 5 || index === 6
              ? "text-xs sm:text-sm lg:text-base mb-3 lg:mb-4"
              : "text-xs sm:text-sm line-clamp-2"
          }`}
        >
          {item.description}
        </p>
      </div>

      {/* Optional Image */}
      {item.image && (
        <div className="mt-auto mb-4 lg:mb-6 rounded-xl overflow-hidden aspect-video relative z-10">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Optional Feature List */}
      {item.features && (
        <ul className="mt-auto space-y-2 lg:space-y-3 mb-4 lg:mb-6 relative z-10">
          {item.features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <LucideIcons.CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 mr-2 lg:mr-3 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Optional CTA Button */}
      {item.cta && (
        <button className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white px-4 sm:px-5 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors duration-300 relative z-10 text-sm sm:text-base">
          {item.cta}
        </button>
      )}
    </motion.div>
  );

  // Desktop Layout (3 columns - original)
  const renderDesktopLayout = () => (
    <div className="w-full h-[85vh] grid grid-cols-3 gap-4 relative">
      {/* Column 1: 1 tall card */}
      <div className="col-span-1 h-full">
        {renderCard(gridItems[0], 0, "h-full")}
      </div>

      {/* Column 2: 4 smaller cards stacked */}
      <div className="col-span-1 h-full flex flex-col gap-4 relative">
        {renderCard(gridItems[1], 1, "h-1/4")}
        {renderCard(gridItems[2], 2, "h-1/4")}
        <div className="h-1/2 flex flex-col gap-4">
          {renderCard(gridItems[3], 3, "h-1/2", true)}
          {renderCard(gridItems[4], 4, "h-1/2", true)}
        </div>
      </div>

      {/* Column 3: 2 medium cards */}
      <div className="col-span-1 h-full flex flex-col gap-4">
        {renderCard(gridItems[5], 5, "h-1/2")}
        {renderCard(gridItems[6], 6, "h-1/2")}
      </div>

      {/* Mobile-specific SVG overlay - Only renders on mobile */}
      {screenSize === "mobile" && (
        <div
          className="absolute inset-0 pointer-events-none"
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
  );

  // Tablet Layout (2 columns)
  const renderTabletLayout = () => (
    <div className="w-full min-h-[85vh] grid grid-cols-2 grid-rows-3 gap-4 relative">
      {/* Row 1 */}
      {renderCard(gridItems[0], 0)}
      {renderCard(gridItems[1], 1)}

      {/* Row 2 */}
      {renderCard(gridItems[2], 2)}
      {renderCard(gridItems[3], 3, "", true)}

      {/* Row 3 - spans full width as 3 columns inside a 2-column grid */}
      <div className="col-span-2 grid grid-cols-3 gap-4">
        {renderCard(gridItems[4], 4, "", true)}
        {renderCard(gridItems[5], 5)}
        {renderCard(gridItems[6], 6)}
      </div>
    </div>
  );

  // Mobile Layout (1 column)
  const renderMobileLayout = () => (
    <div className="w-full flex flex-col gap-4 relative">
      {gridItems.map((item, index) =>
        renderCard(item, index, "h-[220px]", false)
      )}
    </div>
  );

  return (
    <section
      className={`py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-20 dark:bg-gray-900 flex items-center ${
        screenSize === "desktop" ? "h-screen" : "min-h-screen"
      }`}
      ref={gridRef}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="container mx-auto h-full flex items-center">
        {screenSize === "desktop" && renderDesktopLayout()}
        {screenSize === "tablet" && renderTabletLayout()}
        {screenSize === "mobile" && renderMobileLayout()}
      </div>
    </section>
  );
};

export default ServiceInfoGrid;
