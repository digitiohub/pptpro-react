import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Animation variants following the codebase pattern
const imageVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(-30px, 0px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.3,
    },
  },
};

const textVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(30px, 0px, 0px)",
  },
  animate: {
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

const listItemVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(20px, 0px, 0px)",
  },
  animate: (index) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.4 + index * 0.1,
    },
  }),
};

const AboutMission = () => {
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

  // Mission list items
  const missionItems = [
    {
      title: "Empower Communicators",
      description:
        "We equip our clients with the tools and designs they need to communicate with clarity and confidence.",
    },
    {
      title: "Elevate Standards",
      description:
        "We're raising the bar for what presentations can achieve, transforming them from mundane to memorable.",
    },
    {
      title: "Drive Results",
      description:
        "Our presentations are designed to inspire action and deliver measurable outcomes for our clients.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="pr-4 md:pr-12 py-16 md:py-24 overflow-hidden relative"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="relative container mx-auto pr-4">
        <div className="flex flex-col-reverse md:flex-row">
          {/* Image container that extends to the left edge */}
          <div className="w-full md:w-1/2 md:absolute md:left-0 md:top-0 md:bottom-0 md:pr-4 lg:pr-8 mt-10 md:mt-0">
            <motion.div
              ref={imageRef}
              className="h-full"
              variants={imageVariants}
              initial="initial"
              animate={isImageInView ? "animate" : "initial"}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="relative h-[400px] md:h-full w-full overflow-hidden">
                <div
                  className="absolute inset-0 rounded-tr-[250px] rounded-br-[250px] overflow-hidden"
                  style={{
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    perspective: 1000,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                    alt="Team working on a presentation"
                    className="w-full h-full object-cover"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-yellow-500/20 to-transparent mix-blend-multiply"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text content on the right */}
          <motion.div
            ref={textRef}
            className="w-full md:w-1/2 md:ml-auto pl-0 md:pl-12 lg:pl-20"
            variants={textVariants}
            initial="initial"
            animate={isTextInView ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-6"
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              Our Mission to Inspire
              <span className="text-yellow-500">.</span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 mb-6"
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              We're on a mission to revolutionize how ideas are presented and
              shared. Through exceptional design and strategic thinking, we help
              our clients make lasting impressions.
            </motion.p>

            <div className="space-y-6">
              {missionItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start"
                  variants={listItemVariants}
                  initial="initial"
                  animate={isTextInView ? "animate" : "initial"}
                  custom={index}
                  style={{
                    willChange: "transform, opacity",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
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
                      {item.title}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
