import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TeamCard = ({ member, index }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, transform: "translate3d(0, 30px, 0)" }}
      animate={
        isCardInView ? { opacity: 1, transform: "translate3d(0, 0, 0)" } : {}
      }
      transition={{
        duration: 0.6,
        delay: 0.1 * index,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl"
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        {/* Image container with hover effect */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ transform: "translate3d(0, 0, 0)" }}
          />

          {/* Color overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300"></div>

          {/* Social icons - appear on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {member.social.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-800 hover:bg-yellow-500 hover:text-white transition-colors duration-200"
                aria-label={`${member.name}'s ${social.platform}`}
              >
                <i className={`fab fa-${social.platform.toLowerCase()}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="bg-white dark:bg-gray-800 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {member.name}
          </h3>
          <p className="text-yellow-500 font-medium mb-2">{member.role}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {member.bio}
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-yellow-500 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"></div>
      <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-500 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"></div>
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
        { platform: "Behance", url: "#" },
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
        { platform: "Codepen", url: "#" },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden"
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our <span className="text-yellow-500">Team</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Talented professionals dedicated to transforming your ideas into
            impactful presentations
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
