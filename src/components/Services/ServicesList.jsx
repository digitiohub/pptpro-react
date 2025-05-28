import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
  });

  // Alternate layout direction based on index
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } 
        gap-8 md:gap-12 py-12 md:py-20 border-b border-gray-200 dark:border-gray-800
        ${index === 0 ? "border-t" : ""}`}
      initial={{ opacity: 0, transform: "translate3d(0, 30px, 0)" }}
      animate={
        isCardInView ? { opacity: 1, transform: "translate3d(0, 0, 0)" } : {}
      }
      transition={{
        duration: 0.7,
        delay: 0.1,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Image */}
      <div className="w-full md:w-5/12">
        <div
          className="overflow-hidden rounded-xl shadow-lg h-64 md:h-80"
          style={{
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            style={{ transform: "translate3d(0, 0, 0)" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-7/12 flex flex-col justify-center">
        <div className="inline-block mb-3">
          <span className="px-3 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
            {service.category}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {service.description}
        </p>

        {/* Features list */}
        <ul className="space-y-3 mb-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <svg
                className="w-5 h-5 text-yellow-500 mr-3 mt-0.5"
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
              <span className="text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
          >
            {service.cta}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesList = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  // Services data
  const services = [
    {
      title: "Presentation Design",
      category: "Design",
      description:
        "Transform your content into visually stunning presentations that engage and inspire your audience. Our designers blend aesthetics with strategic communication to create impactful slides.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      features: [
        "Custom slide designs aligned with your brand",
        "Data visualization and infographics",
        "Image selection and enhancement",
        "Typography and color scheme optimization",
      ],
      cta: "Get a Custom Design",
    },
    {
      title: "Content Development",
      category: "Strategy",
      description:
        "Craft compelling narratives that resonate with your audience. Our content specialists help distill complex information into clear, persuasive stories that drive your message home.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      features: [
        "Messaging strategy and narrative development",
        "Script writing and speech preparation",
        "Content organization and flow optimization",
        "Audience analysis and tailored messaging",
      ],
      cta: "Develop Your Content",
    },
    {
      title: "Template Systems",
      category: "Solutions",
      description:
        "Create consistent, branded presentation systems that empower your team. Our template solutions ensure brand consistency while providing flexibility for various presentation needs.",
      image:
        "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      features: [
        "Custom master templates and layouts",
        "Style guides and usage documentation",
        "Training for your team",
        "Ongoing template maintenance and updates",
      ],
      cta: "Create Your Template",
    },
    {
      title: "Presentation Training",
      category: "Education",
      description:
        "Develop the skills to deliver presentations with confidence and impact. Our training programs help you master both the art of presentation design and delivery.",
      image:
        "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      features: [
        "Presentation design principles and best practices",
        "Delivery techniques and public speaking skills",
        "Visual storytelling methods",
        "Software mastery (PowerPoint, Keynote, etc.)",
      ],
      cta: "Start Training",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-white dark:bg-gray-900"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
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
          className="max-w-3xl mx-auto text-center mb-16"
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Presentation Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore our range of specialized services designed to meet all your
            presentation needs
          </p>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
