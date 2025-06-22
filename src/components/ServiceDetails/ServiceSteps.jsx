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

  // Unsplash image URLs for different step types
  const getStepImage = (index, title) => {
    const imageUrls = [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", // Discovery/Research
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop", // Content Creation
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop", // Design/Visual
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", // Review/Final
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", // Additional step 1
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop", // Additional step 2
    ];

    return imageUrls[index] || imageUrls[0];
  };

  // Transform steps data for timeline
  const timelineData = steps.map((step, index) => ({
    title: `STEP ${(index + 1).toString().padStart(2, "0")}`,
    content: (
      <div className="w-full">
        {/* Content Section */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            {step.title}
          </h3>
          <p className="mb-6 text-base md:text-lg font-normal text-gray-300 leading-relaxed max-w-3xl">
            {step.description}
          </p>
        </div>

        {/* Image Section - Below Text */}
        <div className="w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <img
              src={getStepImage(index, step.title)}
              alt={step.title}
              className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
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
          className="relative max-w-7xl mx-auto mt-2"
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

      {/* Custom styles for much larger step numbers */}
      <style jsx>{`
        :global(.timeline-step-title) {
          font-size: 4rem !important;
          font-weight: 900 !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
          line-height: 0.9 !important;
        }

        @media (min-width: 640px) {
          :global(.timeline-step-title) {
            font-size: 5rem !important;
          }
        }

        @media (min-width: 768px) {
          :global(.timeline-step-title) {
            font-size: 6rem !important;
          }
        }

        @media (min-width: 1024px) {
          :global(.timeline-step-title) {
            font-size: 7rem !important;
          }
        }

        @media (min-width: 1280px) {
          :global(.timeline-step-title) {
            font-size: 8rem !important;
          }
        }

        /* Ensure step numbers have proper spacing */
        :global(.timeline-step-number) {
          margin-bottom: 2rem !important;
        }
      `}</style>
    </section>
  );
};

export default ServiceSteps;
