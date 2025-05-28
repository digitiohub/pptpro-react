import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const AboutHero = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Track if elements are in view with appropriate thresholds
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  const isSubtitleInView = useInView(subtitleRef, {
    once: true,
    amount: 0.5,
  });

  const isContentInView = useInView(contentRef, {
    once: true,
    amount: 0.3,
  });

  const areStatsInView = useInView(statsRef, {
    once: true,
    amount: 0.6,
  });

  // Stats data
  const stats = [
    {
      value: 520,
      label: "Projects Completed",
      prefix: "",
      suffix: "+",
    },
    {
      value: 96,
      label: "Client Satisfaction",
      prefix: "",
      suffix: "%",
    },
    {
      value: 12,
      label: "Years Experience",
      prefix: "",
      suffix: "+",
    },
    {
      value: 48,
      label: "Industry Awards",
      prefix: "",
      suffix: "",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white dark:bg-gray-950 overflow-hidden"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered title and subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 dark:text-white mb-4 tracking-tight"
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
            About PPT Pro<span className="text-yellow-500">.</span>
          </motion.h1>

          <motion.p
            ref={subtitleRef}
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
            animate={
              isSubtitleInView
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
            Creating impactful presentations since 2012
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
          {/* Left side - Image with 3D optimizations */}
          <motion.div
            className="w-full md:w-5/12 h-auto"
            initial={{ opacity: 0, transform: "translate3d(-30px, 0, 0)" }}
            animate={
              isInView ? { opacity: 1, transform: "translate3d(0, 0, 0)" } : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl h-[340px] md:h-[360px]"
              style={{
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                perspective: 1000,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Creative team collaborating on presentation"
                className="w-full h-full object-cover"
                style={{ transform: "translate3d(0, 0, 0)" }}
              />

              {/* Decorative elements with optimized transform */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500 rounded-full opacity-20 blur-xl"
                initial={{ transform: "translate3d(20px, 20px, 0)" }}
                animate={isInView ? { transform: "translate3d(0, 0, 0)" } : {}}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                style={{ willChange: "transform" }}
              />
              <motion.div
                className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-xl"
                initial={{ transform: "translate3d(-20px, -20px, 0)" }}
                animate={isInView ? { transform: "translate3d(0, 0, 0)" } : {}}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                style={{ willChange: "transform" }}
              />
            </div>
          </motion.div>

          {/* Right side - Text and Stats */}
          <motion.div
            ref={contentRef}
            className="w-full md:w-7/12 flex flex-col justify-between"
            initial={{ opacity: 0, transform: "translate3d(30px, 0, 0)" }}
            animate={
              isContentInView
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
            {/* Text content - Simplified */}
            <div className="mb-8 md:mb-10">
              <motion.p
                className="text-gray-600 dark:text-gray-400"
                style={{
                  textAlign: "justify",
                  willChange: "transform, opacity",
                }}
                initial={{ opacity: 0, transform: "translate3d(0, 15px, 0)" }}
                animate={
                  isContentInView
                    ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
              >
                At PPT Pro, we transform ideas into compelling visual stories.
                Our team of experts combines design excellence with strategic
                thinking to create presentations that captivate audiences and
                drive results. We're dedicated to helping businesses communicate
                their message effectively through powerful visuals and clear
                narratives.
              </motion.p>
            </div>

            {/* Stats with react-countup */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-6 md:gap-8"
              style={{
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                perspective: 1000,
              }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col"
                  initial={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
                  animate={
                    areStatsInView
                      ? { opacity: 1, transform: "translate3d(0, 0, 0)" }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <span className="text-3xl md:text-4xl lg:text-5xl font-medium text-yellow-500 dark:text-yellow-400">
                    {areStatsInView && (
                      <>
                        {stat.prefix}
                        <CountUp
                          start={0}
                          end={stat.value}
                          duration={2.5}
                          useEasing={true}
                          separator=","
                        />
                        {stat.suffix}
                      </>
                    )}
                  </span>
                  <span className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
