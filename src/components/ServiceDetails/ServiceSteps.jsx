import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";

const ServiceSteps = ({ steps }) => {
  const stepsRef = useRef(null);
  const isInView = useInView(stepsRef, { once: true, amount: 0.2 });

  // Animation variants
  const titleVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 30px, 0px)",
    },
    visible: {
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const decorativeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 0.15,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: 0.5,
      },
    },
  };

  const stepContainerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Transform steps data for timeline
  const timelineData = steps.map((step, index) => ({
    title: `Step ${index + 1}`,
    content: (
      <div>
        <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
        <p className="mb-6 text-base font-normal text-gray-300 leading-relaxed">
          {step.description}
        </p>
        {step.image && (
          <div className="mt-8">
            <img
              src={step.image}
              alt={step.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    ),
  }));

  return (
    <section
      ref={stepsRef}
      className="py-16 md:py-24 bg-[#141313] relative overflow-hidden"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Decorative elements */}
      <motion.img
        src="/backgrounds/hexa1.svg"
        alt=""
        className="absolute top-10 -left-20 w-64 h-64 pointer-events-none z-0"
        style={{ opacity: 0 }}
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      <motion.img
        src="/backgrounds/hexa2.svg"
        alt=""
        className="absolute bottom-20 -right-20 w-80 h-80 pointer-events-none z-0"
        style={{ opacity: 0 }}
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-0 text-center text-white"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          Our Process<span className="text-yellow-500">.</span>
        </motion.h2>

        <motion.div
          className="relative max-w-5xl mx-auto mt-2"
          variants={stepContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            willChange: "opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="relative w-full overflow-clip">
            <Timeline
              data={timelineData}
              title="" // Pass empty title to ensure Timeline doesn't add its own spacing
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSteps;
