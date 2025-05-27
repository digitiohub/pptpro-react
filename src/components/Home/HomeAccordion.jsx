import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

const HomeAccordion = () => {
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

  const navigate = useNavigate();

  // Setup auto-cycling effect
  useEffect(() => {
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

    // Cleanup on component unmount
    return () => {
      clearInterval(cycleIntervalRef.current);
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, [autoCyclingPaused, accordionData.length]);

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

    // Resume auto-cycling after 20 seconds
    pauseTimerRef.current = setTimeout(() => {
      setAutoCyclingPaused(false);
    }, 20000);
  };

  // Navigate to service page
  const handleRedirect = (link) => {
    navigate(link);
  };

  // Animation variants
  const contentVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
        opacity: { duration: 0.2 },
      },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
        opacity: { duration: 0.4, delay: 0.1 },
      },
    },
  };

  // Format number with leading zero
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Common number styling class
  const numberStyleClass = "text-gray-400 mr-4 font-mono";

  // Marquee animation for the title
  const createMarqueeText = (item, index) => {
    const textArray = new Array(15).fill(
      <>
        <span className={numberStyleClass}>{formatNumber(index + 1)}</span>
        <span className="text-black tracking-tighter">
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

  // Get appropriate pills for each service
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
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            Design
          </span>,
        ];
      case 1:
        return [
          <span
            key="video"
            className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            Video
          </span>,
          <span
            key="animation"
            className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            Animation
          </span>,
        ];
      case 2:
        return [
          <span
            key="training"
            className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            Training
          </span>,
          <span
            key="skills"
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            Skills
          </span>,
        ];
      case 3:
        return [
          <span
            key="consult"
            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
          >
            Consultation
          </span>,
          <span
            key="strategy"
            className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            Strategy
          </span>,
        ];
      case 4:
        return [
          <span
            key="finance"
            className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
          >
            Financial
          </span>,
          <span
            key="data"
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
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
    <div className="py-12 md:py-20 bg-white w-full relative">
      {/* Decorative hexagon pattern on the right side */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full  pointer-events-none"
        style={{
          backgroundImage: "url('/backgrounds/hexa3.svg')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
         
        }}
      ></div>

      {/* Header section with constrained width */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-medium uppercase text-black mb-3 text-center">
          Our Services
        </h2>

        {/* Justified subtitle text */}
        <p className="text-lg text-gray-600 text-justify mb-8 max-w-2xl mx-auto"
        style={{ textAlignLast: "center" }}>
          We offer presentation solutions to elevate your message, engage your
          audience, and deliver results across various business contexts.
        </p>

        {/* Horizontal divider */}
        <div className="flex items-center mb-12">
          <div className="flex-grow h-px bg-gray-200"></div>
          <div className="flex-shrink-0 px-4 flex space-x-3 flex-wrap justify-center">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-4 py-1 rounded-full text-sm font-medium bg-gray-100 text-black border border-gray-200 mb-2"
              >
                {category}
              </span>
            ))}
          </div>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
      </div>

      {/* Full-width accordion section */}
      <div className="w-full relative z-10">
        <div className="space-y-0">
          {accordionData.map((item, index) => (
            <div key={item.id} className="border-b border-gray-200 w-full">
              {/* Accordion header - full width */}
              <motion.div
                className={`relative group cursor-pointer overflow-hidden w-full ${
                  activeIndex === index ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
                onClick={() => toggleAccordion(index)}
                initial={false}
              >
                {/* Normal state - full width with container for content */}
                <div className="max-w-6xl mx-auto w-full">
                  <div className="flex justify-between items-center py-6 md:py-8 px-4 md:px-6">
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-medium text-left flex items-center">
                      <span className={numberStyleClass}>
                        {formatNumber(index + 1)}
                      </span>
                      <span className="text-black">
                        {item.title.firstPart}{" "}
                      </span>
                      <span className="text-yellow-500">
                        {item.title.secondPart}
                      </span>
                    </h3>

                    {/* Pills based on service type */}
                    <div className="flex items-center space-x-2">
                      {getPillsForService(index)}
                    </div>
                  </div>
                </div>

                {/* Hover state with scrolling text - without hexagon pattern */}
                {activeIndex !== index && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                    {/* Background fill animation - plain background without pattern */}
                    <div className="absolute inset-0 bg-gray-50 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>

                    {/* Scrolling text animation */}
                    <motion.div
                      className="flex items-center text-lg md:text-3xl lg:text-4xl font-medium pl-6 relative z-10 whitespace-nowrap"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                    >
                      {createMarqueeText(item, index).map((text, i) => (
                        <div key={i} className="flex items-center mr-12">
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
                  >
                    <div className="max-w-6xl mx-auto relative z-10">
                      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                        <div>
                          <p className="text-black text-lg mb-6">
                            {item.description}
                          </p>
                          <button
                            onClick={() => handleRedirect(item.link)}
                            className="flex items-center text-yellow-500 hover:text-yellow-600 transition-colors group"
                          >
                            <span className="mr-2 font-medium">Learn more</span>
                            <motion.div
                              initial={{ x: 0 }}
                              animate={{ x: [0, 5, 0] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                              }}
                            >
                              <ExternalLink size={18} />
                            </motion.div>
                          </button>
                        </div>
                        <div className="border-l border-gray-200 pl-8">
                          <h4 className="text-black font-medium mb-4 text-lg">
                            Key features:
                          </h4>
                          <ul className="space-y-3">
                            {item.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start text-black"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                              >
                                <ArrowRight
                                  size={16}
                                  className="text-yellow-500 mt-1 mr-3 flex-shrink-0"
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
