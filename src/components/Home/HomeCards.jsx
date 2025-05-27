import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Optimized animations with transform3d for better performance
const introTextAnim = {
  initial: { opacity: 0, transform: "translate3d(0, 30px, 0)" },
  animate: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    transition: { type: "spring", stiffness: 200, damping: 18, delay: 0.1 },
  },
};

const cardAnim = {
  initial: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
  animate: (index) => ({
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
      delay: 0.2 + index * 0.1,
    },
  }),
};

const marqueeTopAnim = {
  initial: { transform: "translate3d(0%, 0, 0)" },
  animate: {
    transform: "translate3d(-50%, 0, 0)",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 20,
      ease: "linear",
    },
  },
};

const marqueeBottomAnim = {
  initial: { transform: "translate3d(-50%, 0, 0)" },
  animate: {
    transform: "translate3d(0%, 0, 0)",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 20,
      ease: "linear",
    },
  },
};

const HomeCards = () => {
  const [animationState, setAnimationState] = useState("initial");

  // Trigger animations after component mounts
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setAnimationState("animate");
    }, 100);

    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  const cards = [
    {
      title: "Strategy",
      description:
        "We transform complex ideas into compelling visual narratives that resonate with your audience and drive results.",
    },
    {
      title: "Design",
      description:
        "Our expert designers create visually stunning presentations that elevate your brand and captivate your audience.",
    },
    {
      title: "Delivery",
      description:
        "From executive summaries to detailed pitch decks, we ensure your message is delivered with maximum impact.",
    },
  ];

  return (
    <section className="py-8 overflow-hidden relative">
      <div className="container mx-auto">
        {/* Intro paragraph with optimized animation */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16 mt-16" // Increased margin for marquee space
          initial="initial"
          animate={animationState}
          variants={introTextAnim}
        >
          <p className="text-gray-600 dark:text-gray-300 text-2xl text-justify tracking-wide">
            At PPT Pro, we believe that presentations are more than just slides
            – they're powerful tools for communication and persuasion. We help
            businesses and professionals craft compelling visual stories that
            engage audiences, inspire action, and drive results.
          </p>
        </motion.div>

        {/* Top Marquee - Absolute position */}
        <div
          className="absolute top-70 left-0 right-0 w-full overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <motion.div
            className="whitespace-nowrap will-change-transform"
            variants={marqueeTopAnim}
            initial="initial"
            animate="animate"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={`top-${i}`}
                className="inline-block z-30 mx-4 font-black text-8xl md:text-9xl tracking-wider"
                style={{ color: "rgba(50, 50, 50, 0.15)" }}
              >
                PPT PRO
              </span>
            ))}
          </motion.div>
        </div>

        {/* Cards section with separated overlay background */}
        <div className="relative" style={{ zIndex: 10 }}>
          {/* Cards container */}
          <div className="relative p-6  md:p-12 rounded-lg">
            {/* Cards grid - adjusted to center fixed-size cards */}
            <div className="flex flex-wrap justify-center gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  className="bg-black text-white rounded-xl p-8 shadow-lg relative overflow-hidden"
                  style={{
                    width: "420px",
                    height: "475px",
                    display: "flex",
                    flexDirection: "column",
                    willChange: "transform, opacity", // Optimize for animations
                  }}
                  custom={index}
                  initial="initial"
                  animate={animationState}
                  variants={cardAnim}
                  viewport={{ once: true }}
                >
                  {/* Card content */}
                  <div className="relative flex flex-col pt-16 h-full">
                    <h3 className="md:text-6xl font-light mb-4">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-justify tracking-wide text-lg flex-grow">
                      {card.description}
                    </p>

                    {/* Arrow at bottom right of each card */}
                    <div className="absolute -bottom-5 right-0">
                      <img
                        src="/graphics/halfArrowRight.svg"
                        alt="Arrow"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SVG overlay - completely separate from cards container */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 20,
              mixBlendMode: "lighten",
            }}
          >
            <img
              src="/backgrounds/hexa2.svg"
              alt="Background Pattern"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none"
              style={{ opacity: 0.8 }}
            />
          </div>
        </div>

        {/* Bottom Marquee - Absolute position */}
        <div
          className="absolute bottom-5 left-0 right-0 w-full overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <motion.div
            className="whitespace-nowrap will-change-transform"
            variants={marqueeBottomAnim}
            initial="initial"
            animate="animate"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={`bottom-${i}`}
                className="inline-block mx-4 text-6xl md:text-9xl font-black tracking-wider"
                style={{ color: "rgba(50, 50, 50, 0.15)" }}
              >
                PPT PRO
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
