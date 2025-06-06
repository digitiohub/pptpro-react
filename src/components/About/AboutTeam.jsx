import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaDribbble,
  FaMediumM,
} from "react-icons/fa";

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

const cardVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: (index) => ({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.1 * index,
    },
  }),
};

// Icon mapping for social platforms
const getSocialIcon = (platform) => {
  switch (platform.toLowerCase()) {
    case "linkedin":
      return <FaLinkedinIn />;
    case "twitter":
      return <FaTwitter />;
    case "instagram":
      return <FaInstagram />;
    case "github":
      return <FaGithub />;
    case "dribbble":
      return <FaDribbble />;
    case "medium":
      return <FaMediumM />;
    default:
      return <FaLinkedinIn />;
  }
};

const TeamCard = ({ member, index }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={cardRef}
      className="group"
      variants={cardVariants}
      initial="initial"
      animate={isCardInView ? "animate" : "initial"}
      custom={index}
      style={{
        willChange: "transform, opacity",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Image with rounded corners */}
      <div
        className="overflow-hidden rounded-lg mb-5 aspect-[3/4]"
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          whileHover={{
            transform: "translate3d(0px, 0px, 0px) scale(1.05)",
            transition: {
              type: "spring",
              stiffness: 150,
              damping: 30,
            },
          }}
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
      </div>

      {/* Content below image */}
      <div className="text-center">
        {/* Name and role */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {member.name}
        </h3>
        <p className="text-yellow-500 font-medium mb-3">{member.role}</p>

        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 px-2">
          {member.bio}
        </p>

        {/* Social links */}
        <div className="flex justify-center space-x-3">
          {member.social.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-yellow-500 hover:text-white"
              aria-label={`${member.name}'s ${social.platform}`}
              whileHover={{
                scale: 1.15,
                backgroundColor: "#EAB308",
                color: "#FFFFFF",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                },
              }}
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
              }}
            >
              {getSocialIcon(social.platform)}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AboutTeam = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // Track if elements are in view
  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  // Team member data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      bio: "With over 15 years of experience in presentation design, Sarah leads our creative team with vision and expertise.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
      social: [
        { platform: "LinkedIn", url: "#" },
        { platform: "Twitter", url: "#" },
        { platform: "Instagram", url: "#" },
      ],
    },
    {
      name: "David Chen",
      role: "Lead Designer",
      bio: "David combines aesthetic sensibility with strategic thinking to create presentations that captivate and persuade.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      social: [
        { platform: "LinkedIn", url: "#" },
        { platform: "Dribbble", url: "#" },
        { platform: "Github", url: "#" },
      ],
    },
    {
      name: "Maya Rodriguez",
      role: "Content Strategist",
      bio: "Maya helps clients transform complex information into clear, compelling narratives that resonate with audiences.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80",
      social: [
        { platform: "LinkedIn", url: "#" },
        { platform: "Twitter", url: "#" },
        { platform: "Medium", url: "#" },
      ],
    },
    {
      name: "James Wilson",
      role: "Technical Director",
      bio: "James ensures our presentations function flawlessly across platforms, incorporating interactive elements and animations.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      social: [
        { platform: "LinkedIn", url: "#" },
        { platform: "Github", url: "#" },
        { platform: "Twitter", url: "#" },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="pb-16 md:pb-24 pt-4 dark:bg-gray-900 overflow-hidden"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          className="text-center max-w-3xl mx-auto mb-16"
          variants={titleVariants}
          initial="initial"
          animate={isTitleInView ? "animate" : "initial"}
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 dark:text-white mb-4">
            Meet Our Team<span className="text-yellow-500">.</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Talented professionals dedicated to transforming your ideas into
            impactful presentations
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
