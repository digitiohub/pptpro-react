import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ServiceFAQ = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const faqRef = useRef(null);
  const isInView = useInView(faqRef, { once: true, amount: 0.2 });

  // Set hasAnimated flag when section comes into view
  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Split FAQs into two columns for larger screens
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFAQs = faqs.slice(0, midPoint);
  const rightColumnFAQs = faqs.slice(midPoint);

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

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      transform: "translate3d(0px, 20px, 0px)",
    },
    visible: (index) => ({
      opacity: 1,
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.03 * index,
      },
    }),
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transform: "translate3d(0px, -10px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transform: "translate3d(0px, 0px, 0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      },
    },
  };

  const iconVariants = {
    closed: {
      transform: "rotate3d(0, 0, 1, 0deg)",
    },
    open: {
      transform: "rotate3d(0, 0, 1, 180deg)",
    },
  };

  // FAQ Item Component
  const FAQItem = ({ faq, index, originalIndex }) => (
    <div
      key={originalIndex}
      className="mb-4 border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0"
    >
      <button
        className="flex justify-between items-center w-full text-left py-2 focus:outline-none group hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg px-2 transition-colors duration-200 cursor-pointer"
        onClick={() => toggleFAQ(originalIndex)}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
          {faq.question}
        </h3>
        <motion.div
          variants={iconVariants}
          animate={activeIndex === originalIndex ? "open" : "closed"}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          style={{
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200" />
        </motion.div>
      </button>

      <AnimatePresence mode="wait">
        {activeIndex === originalIndex && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-2 overflow-hidden"
            style={{
              willChange: "height, transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            <p className="text-gray-600 dark:text-gray-300 py-2 px-2 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section
      ref={faqRef}
      className="py-16 md:py-24 bg-white dark:bg-gray-950"
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          variants={titleVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          Frequently Asked Questions<span className="text-yellow-500">.</span>
        </motion.h2>

        {/* Single Column for Mobile and Tablet */}
        <motion.div
          className="max-w-3xl mx-auto lg:hidden"
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          style={{
            willChange: "opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              <FAQItem faq={faq} index={index} originalIndex={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Two Columns for Large Devices */}
        <motion.div
          className="hidden lg:block max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          style={{
            willChange: "opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
            {/* Left Column */}
            <div className="space-y-0">
              {leftColumnFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  style={{
                    willChange: "transform, opacity",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <FAQItem faq={faq} index={index} originalIndex={index} />
                </motion.div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-0">
              {rightColumnFAQs.map((faq, index) => (
                <motion.div
                  key={index + midPoint}
                  variants={itemVariants}
                  custom={index + midPoint}
                  style={{
                    willChange: "transform, opacity",
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <FAQItem
                    faq={faq}
                    index={index + midPoint}
                    originalIndex={index + midPoint}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceFAQ;
