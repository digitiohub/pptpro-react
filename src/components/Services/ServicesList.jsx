import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";

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
      delay: 0.1,
    },
  },
};

const contentVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transform: "translate3d(0px, -10px, 0px)",
    transition: {
      height: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
      opacity: { duration: 0.2 },
      transform: { duration: 0.2 },
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
      opacity: { duration: 0.4, delay: 0.1 },
      transform: { duration: 0.4, delay: 0.1 },
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
      delay: 0.1 + index * 0.1,
    },
  }),
};

const marqueeVariants = {
  animate: {
    transform: "translate3d(-50%, 0, 0)",
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const ServicesList = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoCyclingPaused, setAutoCyclingPaused] = useState(false);
  const cycleIntervalRef = useRef(null);
  const pauseTimerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if section is in view
  const isSectionInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    margin: "-100px 0px",
  });

  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  // Effect to check window size and set isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Setup auto-cycling effect - only on larger screens and when in view
  useEffect(() => {
    if (isMobile) {
      // Don't auto-cycle on mobile
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }
      return;
    }

    // Only start auto-cycling when component is in view
    if (isSectionInView && !autoCyclingPaused) {
      // Function to cycle to next accordion item
      const cycleToNextItem = () => {
        if (!autoCyclingPaused) {
          setActiveIndex((prevIndex) =>
            prevIndex === services.length - 1 ? 0 : prevIndex + 1
          );
        }
      };

      // Start the interval for auto-cycling (every 8 seconds)
      cycleIntervalRef.current = setInterval(cycleToNextItem, 8000);
    } else {
      // Clear interval when component is not in view
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }
    }

    // Cleanup on component unmount
    return () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, [autoCyclingPaused, isMobile, isSectionInView]);

  // Toggle accordion item with manual click handling
  const toggleAccordion = (index) => {
    // Set the clicked index as active
    setActiveIndex(index === activeIndex ? null : index);

    // Pause auto-cycling
    setAutoCyclingPaused(true);

    // Clear any existing pause timer
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }

    // Resume auto-cycling after 20 seconds (only on non-mobile)
    if (!isMobile) {
      pauseTimerRef.current = setTimeout(() => {
        setAutoCyclingPaused(false);
      }, 20000);
    }
  };

  // Format number with leading zero
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Common number styling class
  const numberStyleClass = "text-gray-400 mr-2 md:mr-4 font-mono";

  // Services data with your requested categories
  const services = [
    {
      id: 1,
      title: { firstPart: "Corporate", secondPart: "Presentations" },
      category: "Corporate",
      description:
        "Elevate your business communications with professionally designed corporate presentations that align with your brand and deliver your message with clarity and impact.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      features: [
        "Branded slide design with custom templates",
        "Executive presentations and board decks",
        "Sales and marketing presentations",
        "Investor relations materials",
      ],
      link: "/contact",
      cta: "Request Corporate Deck",
    },
    {
      id: 2,
      title: { firstPart: "Video", secondPart: "Presentations" },
      category: "Video",
      description:
        "Transform your static content into dynamic video presentations that capture attention and drive engagement in today's digital-first communication landscape.",
      image:
        "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      features: [
        "Animated explainer videos and motion graphics",
        "Video slide presentations with transitions",
        "Screen recordings with professional editing",
        "Promotional and social media video content",
      ],
      link: "/contact",
      cta: "Create Video Content",
    },
    {
      id: 3,
      title: { firstPart: "Presentation", secondPart: "Training" },
      category: "Training",
      description:
        "Master the art of creating and delivering impactful presentations with our comprehensive training programs tailored for individuals and teams at all skill levels.",
      image:
        "https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80",
      features: [
        "Presentation design principles and best practices",
        "Public speaking and delivery techniques",
        "Software mastery (PowerPoint, Keynote, etc.)",
        "Storytelling and narrative development",
      ],
      link: "/contact",
      cta: "Book Training Session",
    },
    {
      id: 4,
      title: { firstPart: "Financial", secondPart: "Modeling" },
      category: "Finance",
      description:
        "Communicate complex financial data effectively with custom-built models and visualizations that bring clarity to your numbers and support informed decision-making.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      features: [
        "Financial data visualization and dashboards",
        "Interactive financial models and projections",
        "Investor presentations with financial narratives",
        "Financial reporting templates and systems",
      ],
      link: "/contact",
      cta: "Discuss Financial Needs",
    },
  ];

  // Categories for pills - updated to match your service categories
  const categories = ["Corporate", "Video", "Training", "Finance"];

  // Create marquee text for each service
  const createMarqueeText = (item, index) => {
    const textArray = new Array(15).fill(
      <>
        <span className={numberStyleClass}>{formatNumber(index + 1)}</span>
        <span className="text-gray-900 tracking-tighter">
          {item.title.firstPart}{" "}
        </span>
        -
        <span className="text-yellow-500 tracking-tighter">
          {item.title.secondPart}
        </span>
        <span className="mx-6 w-[1.2em] h-[1.2em] border border-black rounded-full flex justify-center items-center">
          <ArrowRight size={12} className="text-yellow-500" />
        </span>
      </>
    );

    return textArray;
  };

  // Get pills for each service
  const getPillsForService = (index) => {
    switch (index) {
      case 0:
        return [
          <span
            key="corporate"
            className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            Corporate
          </span>,
          <span
            key="business"
            className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-2"
          >
            Business
          </span>,
        ];
      case 1:
        return [
          <span
            key="video"
            className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700"
          >
            Video
          </span>,
          <span
            key="animation"
            className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800 ml-2"
          >
            Animation
          </span>,
        ];
      case 2:
        return [
          <span
            key="training"
            className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-300 text-yellow-900"
          >
            Training
          </span>,
          <span
            key="skills"
            className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 ml-2"
          >
            Skills
          </span>,
        ];
      case 3:
        return [
          <span
            key="finance"
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            Finance
          </span>,
          <span
            key="data"
            className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 ml-2"
          >
            Data
          </span>,
        ];
      default:
        return [
          <span
            key="default"
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            Service
          </span>,
        ];
    }
  };

  return (
    <section
      ref={sectionRef}
      className="pb-12 md:pb-20 bg-white w-full relative overflow-hidden"
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      {/* Decorative pattern */}
      <div
        className="absolute right-0 top-10 w-1/3 h-full pointer-events-none "
        style={{
          backgroundImage: "url('/backgrounds/hexa3.svg')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          transform: "translate3d(0, 0, 0)", // Force GPU rendering
        }}
      ></div>

      {/* Header section */}
      <div
        className="mx-auto max-w-6xl px-4 md:px-6 mb-8 md:mb-12 relative z-10"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          ref={titleRef}
          className="text-center mb-3"
          variants={titleVariants}
          initial="initial"
          animate={isTitleInView ? "animate" : "initial"}
          style={{
            perspective: 1000,
            backfaceVisibility: "hidden",
          }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl mb-6 font-medium tracking-tight text-gray-900"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            Comprehensive Solutions<span className="text-yellow-500">.</span>
          </h2>
        </motion.div>

        {/* Category pills */}
        <motion.div
          className="flex flex-wrap items-center mb-8 md:mb-12"
          initial={{ opacity: 0, transform: "scale3d(0, 1, 1)" }}
          animate={
            isTitleInView ? { opacity: 1, transform: "scale3d(1, 1, 1)" } : {}
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
          style={{
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        >
          <div className="hidden md:block flex-grow h-px bg-gray-200"></div>

          <div className="w-full md:w-auto md:flex-shrink-0 px-0 md:px-4 flex flex-wrap justify-center gap-2 md:space-x-3">
            {categories.map((category, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-gray-100 text-gray-900 border border-gray-200 mb-2"
                initial={{
                  opacity: 0,
                  transform: "translate3d(0px, 20px, 0px)",
                }}
                animate={{
                  opacity: 1,
                  transform: "translate3d(0px, 0px, 0px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.3 + index * 0.1,
                }}
                style={{ willChange: "transform, opacity" }}
              >
                {category}
              </motion.span>
            ))}
          </div>

          <div className="hidden md:block flex-grow h-px bg-gray-200"></div>
        </motion.div>
      </div>

      {/* Accordion section */}
      <div
        className="w-full relative z-10"
        style={{
          perspective: 1000,
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <div className="space-y-0">
          {services.map((item, index) => (
            <div
              key={item.id}
              className="border-b border-gray-200 w-full"
              style={{ willChange: "auto" }}
            >
              {/* Accordion header */}
              <motion.div
                className={`relative group cursor-pointer overflow-hidden w-full ${
                  activeIndex === index ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
                onClick={() => toggleAccordion(index)}
                initial={false}
                style={{ willChange: "transform" }}
              >
                {/* Normal state */}
                <div className="max-w-6xl mx-auto w-full">
                  <div className="flex justify-between items-center py-4 md:py-6 lg:py-8 px-4 md:px-6">
                    <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-medium text-left flex items-center flex-wrap">
                      <span className={numberStyleClass}>
                        {formatNumber(index + 1)}
                      </span>
                      <span className="text-gray-900 mr-1">
                        {item.title.firstPart}{" "}
                      </span>
                      <span className="text-yellow-500">
                        {item.title.secondPart}
                      </span>
                    </h3>

                    <div className="flex items-center">
                      <div className="hidden sm:flex items-center space-x-0">
                        {getPillsForService(index)}
                      </div>

                      <motion.div
                        className="ml-3 sm:ml-4 text-gray-400"
                        animate={{
                          transform:
                            activeIndex === index
                              ? "rotate3d(0, 0, 1, 180deg)"
                              : "rotate3d(0, 0, 1, 0deg)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        style={{ transformOrigin: "center" }}
                      >
                        <ChevronDown size={isMobile ? 18 : 24} />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Hover state with scrolling text - desktop only */}
                {!isMobile && activeIndex !== index && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gray-50 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
                      style={{ willChange: "transform" }}
                    ></div>

                    <motion.div
                      className="flex items-center text-lg md:text-3xl lg:text-4xl font-medium pl-6 relative z-10 whitespace-nowrap"
                      variants={marqueeVariants}
                      initial={{ transform: "translate3d(0%, 0, 0)" }}
                      animate="animate"
                      style={{
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                        perspective: 1000,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {createMarqueeText(item, index).map((text, i) => (
                        <div
                          key={i}
                          className="flex items-center mr-12"
                          style={{ transform: "translate3d(0, 0, 0)" }}
                        >
                          {text}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>

              {/* Accordion content */}
              <AnimatePresence initial={index === 0}>
                {activeIndex === index && (
                  <motion.div
                    key={`content-${item.id}`}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={contentVariants}
                    className="overflow-hidden bg-gray-50 w-full relative"
                    style={{
                      willChange: "height, opacity, transform",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="max-w-6xl mx-auto relative z-10"
                      style={{ transform: "translate3d(0, 0, 0)" }}
                    >
                      <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Left column with image */}
                        <div className="flex flex-col">
                          <div
                            className="overflow-hidden rounded-xl shadow-lg h-64 md:h-full flex-grow"
                            style={{
                              transform: "translate3d(0,0,0)",
                              backfaceVisibility: "hidden",
                              perspective: 1000,
                            }}
                          >
                            <img
                              src={item.image}
                              alt={`${item.title.firstPart} ${item.title.secondPart}`}
                              className="w-full h-full object-cover"
                              style={{ transform: "translate3d(0, 0, 0)" }}
                            />
                          </div>
                        </div>

                        {/* Right column with content */}
                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="text-gray-900 text-base md:text-lg mb-6">
                              {item.description}
                            </p>

                            <h4 className="text-gray-900 font-medium mb-4 text-base md:text-lg">
                              Key features:
                            </h4>
                            <ul className="space-y-2 md:space-y-3 mb-6">
                              {item.features.map((feature, i) => (
                                <motion.li
                                  key={i}
                                  className="flex items-start text-gray-900 text-sm md:text-base"
                                  variants={listItemVariants}
                                  initial="initial"
                                  animate="animate"
                                  custom={i}
                                  style={{ willChange: "transform, opacity" }}
                                >
                                  <ArrowRight
                                    size={isMobile ? 14 : 16}
                                    className="text-yellow-500 mt-1 mr-2 md:mr-3 flex-shrink-0"
                                  />
                                  <span>{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4">
                            <a
                              href={item.link}
                              className="inline-flex items-center text-yellow-500 hover:text-yellow-600 transition-colors group"
                            >
                              <span className="mr-2 font-medium">
                                {item.cta}
                              </span>
                              <motion.div
                                initial={{ transform: "translate3d(0, 0, 0)" }}
                                animate={{
                                  transform: "translate3d(5px, 0, 0)",
                                }}
                                transition={{
                                  transform: {
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                  },
                                }}
                                style={{ willChange: "transform" }}
                              >
                                <ExternalLink size={isMobile ? 16 : 18} />
                              </motion.div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
