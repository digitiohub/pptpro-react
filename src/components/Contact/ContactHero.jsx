import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ContactHero = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
          style={{ willChange: "transform, opacity" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Contact <span className="text-yellow-500">Us</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Have questions or ready to elevate your presentations? We're here to
            help you create impactful visual stories.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
