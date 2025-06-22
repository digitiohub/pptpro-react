import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Animation variants following the codebase pattern
const titleVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const subtitleVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 20px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.1,
    },
  },
};

const LogoMarquee = ({ logos, direction = "left", speed = 25 }) => {
  // Calculate duration based on speed (lower number = faster)
  const duration = 300 / speed;

  // Animation variants using transform3d for better performance
  const marqueeVariants = {
    initial: {
      transform:
        direction === "left"
          ? "translate3d(0%, 0, 0)"
          : "translate3d(-100%, 0, 0)",
    },
    animate: {
      transform:
        direction === "left"
          ? "translate3d(-100%, 0, 0)"
          : "translate3d(0%, 0, 0)",
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        // Hardware acceleration hints
        willChange: "transform",
      },
    },
  };

  return (
    <div
      className="overflow-hidden py-10"
      style={{
        // Force GPU acceleration
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        variants={marqueeVariants}
        initial="initial"
        animate="animate"
        style={{
          // Additional hardware acceleration hints
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center mx-8 md:mx-12"
            style={{
              // Optimization for children elements
              transform: "translate3d(0, 0, 0)",
            }}
          >
            <motion.img
              src={logo.url}
              alt={logo.name}
              className="h-16 md:h-20 lg:h-24 w-auto opacity-70"
              whileHover={{
                opacity: 1,
                filter: "grayscale(0%)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              style={{
                transform: "translate3d(0, 0, 0)", // Force GPU rendering
                filter: "grayscale(100%)",
                minWidth: "100px", // Increased minimum width
                objectFit: "contain",
                willChange: "opacity, filter",
              }}
              onError={(e) => {
                // Fallback if the image fails to load
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/150x50?text=" +
                  encodeURIComponent(logo.name);
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AboutClients = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // Track if elements are in view with appropriate thresholds
  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  // Real client logos data
  const clientLogos = [
    {
      name: "Company 1",
      url: "https://media.licdn.com/dms/image/v2/D4D0BAQHzxZLD1dcI7A/company-logo_200_200/company-logo_200_200/0/1715068380091?e=2147483647&v=beta&t=zd4rOSDrTkTwlZSh9L6uTdvn0yBOM9MviKBpfj7jZw4",
    },
    {
      name: "Creative Finserve",
      url: "https://pptpro.netlify.app/assets/logo/Creative%20Finserve.jfif.jpg",
    },
    {
      name: "Tata Consultancy Services",
      url: "https://brandlogos.net/wp-content/uploads/2022/04/tata_consultancy_services-logo-brandlogos.net_.png",
    },
    {
      name: "Carrier",
      url: "https://brandlogos.net/wp-content/uploads/2014/12/carrier-logo_brandlogos.net_mqpac.png",
    },
    {
      name: "Cricket",
      url: "https://pptpro.netlify.app/assets/logo/cricket.png",
    },
    {
      name: "Mamta Milk",
      url: "https://5.imimg.com/data5/UT/EN/MY-26104965/mamta-milk-120x120.jpeg",
    },
    {
      name: "Tata AIA Life",
      url: "https://images.seeklogo.com/logo-png/30/2/tata-aia-life-logo-png_seeklogo-304926.png",
    },
    {
      name: "Prakash Steel Age",
      url: "https://www.prakashsteelage.com/Backend/images/footer_setting/Logo1699158363.png",
    },
    {
      name: "10x Task",
      url: "https://pptpro.netlify.app/assets/logo/10x_task%20(1).png",
    },
    {
      name: "AB24",
      url: "https://pptpro.netlify.app/assets/logo/ab24_logo_font-1.png",
    },
    {
      name: "Advocate Suverna Govil",
      url: "https://pptpro.netlify.app/assets/logo/Advocate%20suverna%20govil.png",
    },
    {
      name: "Aquamax",
      url: "https://pptpro.netlify.app/assets/logo/Aquamax.jpg",
    },
    {
      name: "Company Logo",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRypgbbLg0opvp0UdhhY3Megt_-amSQO7FJQg&s",
    },
    {
      name: "Balanced Chemistry",
      url: "https://pptpro.netlify.app/assets/logo/balanced-chemistry-logo-full-color-rgb-1280px@72ppi.png",
    },
    {
      name: "CIS",
      url: "https://pptpro.netlify.app/assets/logo/cis_transparent%20(1).png",
    },
    {
      name: "DTC",
      url: "https://pptpro.netlify.app/assets/logo/dtclogo.png",
    },
    {
      name: "Cyphersol",
      url: "https://pptpro.netlify.app/assets/logo/final%20logo%20cyphersol.png",
    },
    {
      name: "Hitech",
      url: "https://pptpro.netlify.app/assets/logo/Hitech.png",
    },
    {
      name: "HM Travels",
      url: "https://pptpro.netlify.app/assets/logo/Hm%20Travels%20.png",
    },
    {
      name: "Inofinity",
      url: "https://pptpro.netlify.app/assets/logo/Inofinity.png",
    },
    {
      name: "Jai Sai Jeweller",
      url: "https://pptpro.netlify.app/assets/logo/Jai%20sai%20jeweller.jpeg",
    },
    {
      name: "Januss Real Estate",
      url: "https://pptpro.netlify.app/assets/logo/Januss%20real%20estate.png",
    },
    {
      name: "Mantro",
      url: "https://pptpro.netlify.app/assets/logo/Mantro_logo_240x120px.png",
    },
    {
      name: "Natures Alm",
      url: "https://pptpro.netlify.app/assets/logo/Natures%20alm.png",
    },
    {
      name: "NFN",
      url: "https://pptpro.netlify.app/assets/logo/nfn-logo.jpg",
    },
    {
      name: "Propvenue",
      url: "https://pptpro.netlify.app/assets/logo/Propvenue.jpeg",
    },
    {
      name: "RA",
      url: "https://pptpro.netlify.app/assets/logo/ra.png",
    },
    {
      name: "Royal Computers",
      url: "https://pptpro.netlify.app/assets/logo/Royal%20Computers.jpg",
    },
    {
      name: "Tumble Dry",
      url: "https://pptpro.netlify.app/assets/logo/tumble%20dry.png",
    },
    {
      name: "Vigours",
      url: "https://pptpro.netlify.app/assets/logo/Vigours.png",
    },
    {
      name: "VUB",
      url: "https://pptpro.netlify.app/assets/logo/VUB.png",
    },
    {
      name: "West India Company",
      url: "https://pptpro.netlify.app/assets/logo/West%20India%20company%20.png",
    },
    {
      name: "ACE HR",
      url: "https://pptpro.netlify.app/assets/logo/ACE%20HR.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-4 md:py-8 bg-white dark:bg-gray-900 overflow-hidden relative"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white mb-4"
            variants={titleVariants}
            initial="initial"
            animate={isTitleInView ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            From Startups to Big Companies
            <span className="text-yellow-500">.</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400"
            variants={subtitleVariants}
            initial="initial"
            animate={isTitleInView ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            Trusted by innovative businesses around the world
          </motion.p>
        </div>
      </div>

      {/* Single Logo Marquee */}
      <div className="relative w-full">
        <LogoMarquee logos={clientLogos} direction="left" speed={18} />

        {/* Fade gradients */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent dark:from-gray-900 pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent dark:from-gray-900 pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export default AboutClients;
