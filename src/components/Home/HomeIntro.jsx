import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const HomeIntro = () => {
  const stats = [
    { name: "Projects", value: 2500, suffix: "+" },
    { name: "Clients", value: 750, suffix: "+" },
    { name: "Design Hours", value: 45000, suffix: "+" },
    { name: "Countries", value: 35, suffix: "+" },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Award pills aligned with line decoration */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-2xl flex items-center justify-center">
            {/* Left line */}
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>

            {/* Award 2024 Pill - now with border instead of fill */}
            <div className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full py-2 px-6 text-sm font-medium mx-4">
              Award 2024
            </div>

            {/* Center decoration */}
            <img
              src="/graphics/3circle.svg"
              alt="Decoration"
              className="h-6 mx-4"
            />

            {/* Award 2025 Pill - now with border instead of fill */}
            <div className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full py-2 px-6 text-sm font-medium mx-4">
              Award 2025
            </div>

            {/* Right line */}
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>

        {/* Stats Row - with horizontal separators instead of cards */}
        <div className="flex flex-wrap justify-center">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.name}>
              {/* Stat item */}
              <motion.div
                className="text-center px-6 py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    useEasing={true}
                  />
                  <span>{stat.suffix}</span>
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
                  {stat.name}
                </p>
              </motion.div>

              {/* Vertical separator line (except after the last item) */}
              {index < stats.length - 1 && (
                <div className="hidden md:block self-stretch w-px bg-gray-300 dark:bg-gray-700 mx-6"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
