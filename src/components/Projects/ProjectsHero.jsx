import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ProjectsHero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  // Track if elements are in view
  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  const isTextInView = useInView(textRef, {
    once: true,
    amount: 0.5,
  });

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
            Our <span className="text-yellow-500">Portfolio</span>
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
            Explore our showcase of impactful presentation projects that have
            helped our clients communicate their vision and achieve their goals.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-8">
          {[
            { value: "125+", label: "Projects Completed" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "42", label: "Industries Served" },
            { value: "18", label: "Design Awards" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
              animate={
                isTextInView
                  ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
                  : {}
              }
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsHero;
