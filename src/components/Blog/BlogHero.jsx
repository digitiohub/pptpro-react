import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BlogHero = () => {
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
      className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white dark:bg-gray-900 overflow-hidden"
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
            Presentation <span className="text-yellow-500">Insights</span>
          </h1>

          <motion.p
            ref={textRef}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12"
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
            Expert advice, tips, and strategies to elevate your presentation
            skills and create compelling visual stories.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
