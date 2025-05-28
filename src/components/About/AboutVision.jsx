import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutVision = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  // Track if elements are in view
  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const isTextInView = useInView(textRef, {
    once: true,
    amount: 0.3,
  });

  const isImageInView = useInView(imageRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <section
      ref={sectionRef}
      className="pl-4 md:pl-12 py-4 md:py-8 overflow-hidden relative"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="relative container mx-auto pl-4">
        <div className="flex flex-col md:flex-row">
          {/* Text content on the left */}
          <motion.div
            ref={textRef}
            className="w-full md:w-1/2 pr-0 md:pr-12 lg:pr-20 mb-10 md:mb-0"
            initial={{ opacity: 0, transform: "translate3d(-30px, 0, 0)" }}
            animate={
              isTextInView
                ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Vision for <span className="text-yellow-500">Excellence</span>
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              We believe in the power of visual storytelling to transform ideas
              into actionable outcomes. Our mission is to elevate your
              presentations beyond the ordinary.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Strategic Design
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Every slide is thoughtfully crafted to maximize impact and
                    reinforce your key messages.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Audience-Centric Approach
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    We design with your audience in mind, ensuring your
                    presentation resonates and drives action.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Continuous Innovation
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    We stay ahead of design trends and presentation technologies
                    to deliver cutting-edge solutions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image container that extends to the edge */}
          <div className="w-full md:w-1/2 md:absolute md:right-0 md:top-0 md:bottom-0 md:pl-4 lg:pl-8">
            <motion.div
              ref={imageRef}
              className="h-full"
              initial={{ opacity: 0, transform: "translate3d(30px, 0, 0)" }}
              animate={
                isImageInView
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
              <div className="relative h-[400px] md:h-full w-full overflow-hidden">
                <div
                  className="absolute inset-0 rounded-tl-[250px] rounded-bl-[250px] overflow-hidden"
                  style={{
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    perspective: 1000,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1834&q=80"
                    alt="Team brainstorming presentation ideas"
                    className="w-full h-full object-cover"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-transparent mix-blend-multiply"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
