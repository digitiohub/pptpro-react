import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ServicesHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  // Track if elements are in view
  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  const isTextInView = useInView(textRef, {
    once: true,
    amount: 0.5,
  });

  const areCardsInView = useInView(cardsRef, {
    once: true,
    amount: 0.2,
  });

  // Service cards data
  const serviceHighlights = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Custom Design",
      description:
        "Tailored presentations that align with your brand and captivate your audience.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      title: "Content Creation",
      description:
        "Compelling content that transforms complex ideas into clear, persuasive narratives.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
      title: "Template Systems",
      description:
        "Consistent, branded template systems for ongoing presentation needs.",
    },
  ];

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
        {/* Hero title */}
        <motion.div
          ref={titleRef}
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
          animate={
            isTitleInView
              ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
              : {}
          }
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Our <span className="text-yellow-500">Services</span>
          </h1>

          <motion.p
            ref={textRef}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 md:mb-16"
            initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
            animate={
              isTextInView
                ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            style={{ willChange: "transform, opacity" }}
          >
            Elevate your presentations with our comprehensive suite of services,
            designed to transform your ideas into impactful visual stories.
          </motion.p>
        </motion.div>

        {/* Service highlight cards */}
        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
          initial={{ opacity: 0, transform: "translate3d(0, 30px, 0)" }}
          animate={
            areCardsInView
              ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
              : {}
          }
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {serviceHighlights.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
              initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
              animate={
                areCardsInView
                  ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
                  : {}
              }
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              style={{
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                perspective: 1000,
              }}
            >
              <div className="text-yellow-500 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
