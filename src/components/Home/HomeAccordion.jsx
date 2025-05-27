import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink, ChevronDown } from "lucide-react";

const HomeAccordion = () => {
  // Create ref for animation section
  const sectionRef = useRef(null);

  // Use inView to detect when section enters viewport
  // Changed 'once' to false so we can detect when the component enters/leaves viewport
  const isInView = useInView(sectionRef, {
    once: false, // Changed from true to false to detect every time it enters viewport
    amount: 0.2,
    margin: "-100px 0px",
  });

  // Data for accordion items with updated titles
  const accordionData = [
    {
      id: 1,
      title: { firstPart: "Corporate", secondPart: "Presentation" },
      description:
        "Transform your corporate communications with professionally designed presentations that align with your brand and effectively communicate your message to stakeholders, clients, and teams.",
      link: "/services#corporate-presentation",
      details: [
        "Brand-consistent slide designs",
        "Executive-level presentations",
        "Internal communication decks",
        "Client-facing materials",
      ],
    },
    {
      id: 2,
      title: { firstPart: "Video", secondPart: "Presentation" },
      description:
        "Elevate your digital presence with dynamic video presentations that combine professional visuals, animations, and narration to create engaging content for various platforms and audiences.",
      link: "/services#video-presentation",
      details: [
        "Animated explainer videos",
        "Product demonstrations",
        "Promotional content",
        "Social media video presentations",
      ],
    },
    {
      id: 3,
      title: { firstPart: "Presentation", secondPart: "Training" },
      description:
        "Develop your team's presentation skills with our specialized training programs designed to enhance delivery techniques, slide creation, and audience engagement strategies.",
      link: "/services#presentation-training",
      details: [
        "Public speaking techniques",
        "Slide design workshops",
        "Presentation structure guidance",
        "Q&A handling strategies",
      ],
    },
    {
      id: 4,
      title: { firstPart: "Presentation", secondPart: "Consultation" },
      description:
        "Get expert advice on your presentation strategy and execution through our consultation services, tailored to your specific needs and audience requirements.",
      link: "/services#presentation-consultation",
      details: [
        "Presentation audits and feedback",
        "Content strategy development",
        "Visual narrative refinement",
        "Audience analysis and targeting",
      ],
    },
    {
      id: 5,
      title: { firstPart: "Financial", secondPart: "Modeling" },
      description:
        "Communicate complex financial data effectively through expert financial modeling presentations that clarify projections, valuations, and business metrics for investors and stakeholders.",
      link: "/services#financial-modeling",
      details: [
        "Financial data visualization",
        "Investment deck creation",
        "Forecasting and projections slides",
        "KPI dashboards and reports",
      ],
    },
  ];

  // Categories for pills
  const categories = ["Corporate", "Video", "Training", "Consultation"];

  // State to track which accordion item is open - starting with first item (index 0)
  const [activeIndex, setActiveIndex] = useState(0);
  // State to track if auto-cycling is paused
  const [autoCyclingPaused, setAutoCyclingPaused] = useState(false);
  // Ref to store the auto-cycling interval
  const cycleIntervalRef = useRef(null);
  // Ref to store the pause timer
  const pauseTimerRef = useRef(null);
  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

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
    if (isInView && !autoCyclingPaused) {
      // Function to cycle to next accordion item
      const cycleToNextItem = () => {
        if (!autoCyclingPaused) {
          setActiveIndex((prevIndex) =>
            prevIndex === accordionData.length - 1 ? 0 : prevIndex + 1
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
  }, [autoCyclingPaused, accordionData.length, isMobile, isInView]); // Added isInView to dependencies

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

  // Navigate to service page
  const handleRedirect = (link) => {
    navigate(link);
  };

  // Optimized animation variants using transform3d
  const contentVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transform: "translate3d(0, -10px, 0)",
      transition: {
        height: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
        opacity: { duration: 0.2 },
        transform: { duration: 0.2 },
      },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
      transition: {
        height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
        opacity: { duration: 0.4, delay: 0.1 },
        transform: { duration: 0.4, delay: 0.1 },
      },
    },
  };

  // Optimized title animation variants with transform3d
  const titleVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0, 30px, 0)",
      transformStyle: "preserve-3d",
      willChange: "transform, opacity",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
      transformStyle: "preserve-3d",
      willChange: "transform, opacity",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 18,
      },
    },
  };

  // Optimized marquee animation with transform3d
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

  // Format number with leading zero
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Common number styling class
  const numberStyleClass = "text-gray-400 mr-2 md:mr-4 font-mono";

  // Marquee animation for the title (desktop only)
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

  // Get appropriate pills for each service (only using yellow, gray, and shades of yellow)
  const getPillsForService = (index) => {
    switch (index) {
      case 0:
        return [
          <span
            key="design"
            className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            Corporate
          </span>,
          <span
            key="dev"
            className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-2"
          >
            Design
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
            key="consult"
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            Consult
          </span>,
          <span
            key="strategy"
            className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 ml-2"
          >
            Strategy
          </span>,
        ];
      case 4:
        return [
          <span
            key="finance"
            className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900"
          >
            Finance
          </span>,
          <span
            key="data"
            className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-2"
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
    <div
      ref={sectionRef}
      className="py-12 md:pt-20 bg-white w-full relative overflow-hidden"
      style={{
        transform: "translateZ(0)", // Force GPU rendering
        backfaceVisibility: "hidden",
      }}
    >
      {/* Decorative hexagon pattern on the right side - hidden on small screens */}
      <div
        className="absolute right-0 top-10 w-1/2 h-full pointer-events-none "
        style={{
          backgroundImage: "url('/backgrounds/hexa3.svg')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          transform: "translate3d(0, 0, 0)", // Force GPU rendering
        }}
      ></div>

      {/* Header section with constrained width */}
      <div
        className="mx-auto max-w-6xl px-4 md:px-6 mb-8 md:mb-12 relative z-10"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Regular title without typewriter effect */}
        <motion.div
          className="text-center mb-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          style={{
            perspective: 1000,
            backfaceVisibility: "hidden",
          }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900"
            style={{ transform: "translate3d(0, 0, 0)" }} // Force GPU rendering
          >
            Our Services
          </h2>
        </motion.div>

        {/* Justified subtitle text */}
        <motion.p
          className="text-base md:text-lg text-gray-600 text-center md:text-justify mb-6 md:mb-8 max-w-2xl mx-auto px-4"
          style={{
            textAlignLast: "center",
            transform: "translate3d(0, 0, 0)", // Force GPU rendering
            willChange: "opacity",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          We offer presentation solutions to elevate your message, engage your
          audience, and deliver results across various business contexts.
        </motion.p>

        {/* Horizontal divider - optimized for mobile */}
        <motion.div
          className="flex flex-wrap items-center mb-8 md:mb-12"
          initial={{ opacity: 0, transform: "scale3d(0, 1, 1)" }}
          animate={
            isInView ? { opacity: 1, transform: "scale3d(1, 1, 1)" } : {}
          }
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        >
          {/* Line visible only on larger screens */}
          <div className="hidden md:block flex-grow h-px bg-gray-200"></div>

          {/* Category pills - centered on mobile, in line on desktop */}
          <div className="w-full md:w-auto md:flex-shrink-0 px-0 md:px-4 flex flex-wrap justify-center gap-2 md:space-x-3">
            {categories.map((category, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-gray-100 text-gray-900 border border-gray-200 mb-2"
                initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
                animate={
                  isInView
                    ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
                    : {}
                }
                transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                style={{ willChange: "transform, opacity" }}
              >
                {category}
              </motion.span>
            ))}
          </div>

          {/* Line visible only on larger screens */}
          <div className="hidden md:block flex-grow h-px bg-gray-200"></div>
        </motion.div>
      </div>

      {/* Full-width accordion section */}
      <div
        className="w-full relative z-10"
        style={{
          perspective: 1000,
          transform: "translate3d(0, 0, 0)", // Force GPU rendering
        }}
      >
        <div className="space-y-0">
          {accordionData.map((item, index) => (
            <div
              key={item.id}
              className="border-b border-gray-200 w-full"
              style={{ willChange: "auto" }}
            >
              {/* Accordion header - full width */}
              <motion.div
                className={`relative group cursor-pointer overflow-hidden w-full ${
                  activeIndex === index ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
                onClick={() => toggleAccordion(index)}
                initial={false}
                style={{ willChange: "transform" }}
              >
                {/* Normal state - full width with container for content */}
                <div className="max-w-6xl mx-auto w-full">
                  <div className="flex justify-between items-center py-4 md:py-6 lg:py-8 px-4 md:px-6">
                    {/* Title with responsive sizing */}
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

                    {/* Right side: Pills on larger screens, Chevron on mobile */}
                    <div className="flex items-center">
                      {/* Pills based on service type */}
                      <div className="hidden sm:flex items-center space-x-0">
                        {getPillsForService(index)}
                      </div>

                      {/* Chevron indicator for mobile - rotates when active */}
                      <motion.div
                        className="ml-3 sm:ml-4 text-gray-400"
                        animate={{
                          transform:
                            activeIndex === index
                              ? "rotate3d(0, 0, 1, 180deg)"
                              : "rotate3d(0, 0, 1, 0deg)",
                        }}
                        transition={{ duration: 0.3 }}
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
                    {/* Background fill animation */}
                    <div
                      className="absolute inset-0 bg-gray-50 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
                      style={{ willChange: "transform" }}
                    ></div>

                    {/* Scrolling text animation - optimized with transform3d */}
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

              {/* Accordion content - full width with constrained content */}
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
                      {/* Responsive grid: single column on mobile, two columns on desktop */}
                      <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div>
                          <p className="text-gray-900 text-base md:text-lg mb-6">
                            {item.description}
                          </p>
                          <button
                            onClick={() => handleRedirect(item.link)}
                            className="flex items-center text-yellow-500 hover:text-yellow-600 transition-colors group"
                          >
                            <span className="mr-2 font-medium">Learn more</span>
                            <motion.div
                              initial={{ transform: "translate3d(0, 0, 0)" }}
                              animate={{ transform: "translate3d(5px, 0, 0)" }}
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
                          </button>
                        </div>

                        {/* Features section with responsive styling */}
                        <div className="md:border-l border-gray-200 md:pl-8 mt-8 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0">
                          <h4 className="text-gray-900 font-medium mb-4 text-base md:text-lg">
                            Key features:
                          </h4>
                          <ul className="space-y-2 md:space-y-3">
                            {item.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start text-gray-900 text-sm md:text-base"
                                initial={{
                                  opacity: 0,
                                  transform: "translate3d(-10px, 0, 0)",
                                }}
                                animate={{
                                  opacity: 1,
                                  transform: "translate3d(0, 0, 0)",
                                }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                style={{ willChange: "transform, opacity" }}
                              >
                                <ArrowRight
                                  size={isMobile ? 14 : 16}
                                  className="text-yellow-500 mt-1 mr-2 md:mr-3 flex-shrink-0"
                                />
                                <span>{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
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
    </div>
  );
};

export default HomeAccordion;
