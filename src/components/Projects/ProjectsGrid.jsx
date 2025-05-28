import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ProjectCard = ({ project, index, openModal }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer"
      initial={{ opacity: 0, transform: "translate3d(0, 30px, 0)" }}
      animate={
        isCardInView ? { opacity: 1, transform: "translate3d(0, 0, 0)" } : {}
      }
      transition={{
        duration: 0.6,
        delay: 0.1 * (index % 3),
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      style={{ willChange: "transform, opacity" }}
      onClick={() => openModal(project)}
    >
      <div
        className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl"
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        {/* Image */}
        <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ transform: "translate3d(0, 0, 0)" }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded-full">
              {project.category}
            </span>
          </div>

          {/* View project button */}
          <div className="absolute bottom-4 left-0 right-0 text-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="inline-block px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium">
              View Project
            </span>
          </div>
        </div>

        {/* Text content */}
        <div className="p-5 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-yellow-500 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, closeModal }) => {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
    >
      <motion.div
        className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-900 shadow-md hover:bg-gray-100 transition-colors duration-200"
          onClick={closeModal}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header image */}
        <div className="w-full h-64 md:h-80">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded-full">
              {project.category}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {project.fullDescription || project.description}
          </p>

          {/* Project details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Client
              </h4>
              <p className="text-gray-900 dark:text-white">{project.client}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Year
              </h4>
              <p className="text-gray-900 dark:text-white">{project.year}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Services
              </h4>
              <p className="text-gray-900 dark:text-white">
                {project.services.join(", ")}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Industry
              </h4>
              <p className="text-gray-900 dark:text-white">
                {project.industry}
              </p>
            </div>
          </div>

          {/* Results section */}
          {project.results && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Results
              </h3>
              <ul className="space-y-2">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start">
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
                      {result}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Project Gallery
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const filtersRef = useRef(null);

  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  const areFiltersInView = useInView(filtersRef, {
    once: true,
    amount: 0.8,
  });

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Annual Report Redesign",
      description:
        "A complete overhaul of a financial institution's annual report, transforming complex data into an engaging visual narrative.",
      fullDescription:
        "This project involved a comprehensive redesign of a leading financial institution's annual report. We transformed dense financial data and corporate messaging into a visually compelling narrative that engaged shareholders and highlighted key business achievements. The new design system established a visual language that could be applied across all investor relations materials.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Corporate",
      client: "Global Financial Group",
      year: "2023",
      services: ["Design", "Data Visualization", "Content Strategy"],
      industry: "Finance",
      results: [
        "58% increase in shareholder engagement with digital report",
        "Featured in Design Annual as 'Best Financial Report Design'",
        "Adopted as template for all future corporate communications",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
        "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
    },
    {
      id: 2,
      title: "Product Launch Keynote",
      description:
        "A dynamic presentation designed for the launch of a revolutionary tech product at a major industry conference.",
      fullDescription:
        "We developed a visually stunning keynote presentation for the launch of our client's flagship tech product. The presentation needed to communicate complex technical features while generating excitement and emphasizing the product's unique value proposition. We created custom animations, seamless transitions, and compelling visuals that helped make the launch a standout success at the industry's largest conference.",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Sales",
      client: "TechVision Inc.",
      year: "2022",
      services: ["Presentation Design", "Animation", "Script Development"],
      industry: "Technology",
      results: [
        "Product sold out within 48 hours of launch",
        "Presentation viewed over 2 million times online",
        "Featured in 'Best of Conference' highlights",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
    },
    {
      id: 3,
      title: "Investor Pitch Deck",
      description:
        "A compelling pitch deck that helped a startup secure $10M in Series A funding from top venture capital firms.",
      fullDescription:
        "Our team created a strategic pitch deck for an emerging tech startup seeking Series A funding. We worked closely with the founder team to refine their business narrative, visualize their market opportunity, and present their growth metrics in the most compelling way. The resulting presentation struck the perfect balance between ambition and credibility, helping the startup secure $10M in funding.",
      image:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Pitch Deck",
      client: "NeoHealth Startup",
      year: "2023",
      services: [
        "Presentation Design",
        "Storytelling",
        "Financial Visualization",
      ],
      industry: "Healthcare Technology",
      results: [
        "Secured $10M in Series A funding",
        "Praised by investors for clarity and vision",
        "Completed funding round in record time of 6 weeks",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      ],
    },
    {
      id: 4,
      title: "Educational Course Slides",
      description:
        "A comprehensive slide deck for a professional training program on digital marketing strategies.",
      fullDescription:
        "We designed a modular educational presentation system for a leading online learning platform. The project included over 200 uniquely designed slides across 12 course modules, complete with exercises, case studies, and assessment materials. The design balanced information density with visual appeal, creating an engaging learning experience that maintained consistent branding while adapting to different subject matters.",
      image:
        "https://images.unsplash.com/photo-1594629156542-104de65d3d91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Education",
      client: "LearnEverything Platform",
      year: "2022",
      services: [
        "Instructional Design",
        "Template System",
        "Visual Learning Aids",
      ],
      industry: "Education",
      results: [
        "Course completion rate increased by 32%",
        "Student satisfaction scores improved from 7.6 to 9.2/10",
        "Template adopted for 15 additional courses",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1593073862407-a3ce22748763?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
    },
    {
      id: 5,
      title: "Conference Presentation",
      description:
        "A thought leadership presentation for a keynote speech at an international industry conference.",
      fullDescription:
        "We created a visually distinctive keynote presentation for the CEO of a leading sustainability company to deliver at an international climate conference. The presentation needed to communicate complex environmental data while inspiring action and positioning the company as an industry thought leader. We developed a unique visual style that reinforced key messages through powerful imagery, clear data visualization, and memorable infographics.",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Corporate",
      client: "EcoSolutions Global",
      year: "2023",
      services: [
        "Presentation Design",
        "Data Visualization",
        "Speaker Coaching",
      ],
      industry: "Environmental",
      results: [
        "Presentation received standing ovation",
        "Generated 75+ media mentions",
        "Led to 3 major partnership opportunities",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
    },
    {
      id: 6,
      title: "Sales Team Training Deck",
      description:
        "A comprehensive training presentation for a global sales team launching a new product line.",
      fullDescription:
        "We developed an interactive training presentation system for a company's global sales force. The presentation needed to communicate product details, competitive positioning, and sales strategies in a consistent way across 12 international markets. We created a modular system that maintained brand consistency while allowing for regional customization, along with interactive elements that facilitated hands-on learning.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Sales",
      client: "ConsumerBrands International",
      year: "2022",
      services: ["Training Materials", "Template System", "Interactive Design"],
      industry: "Consumer Goods",
      results: [
        "Sales team knowledge scores increased by 47%",
        "New product line exceeded sales targets by 28%",
        "Training time reduced by 35%",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
    },
  ];

  // Filter categories
  const categories = [
    "all",
    ...new Set(projects.map((project) => project.category.toLowerCase())),
  ];

  // Filtered projects based on active filter
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(
          (project) => project.category.toLowerCase() === activeFilter
        );

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Modal functions
  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = ""; // Restore scrolling
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter buttons */}
        <motion.div
          ref={filtersRef}
          className="flex flex-wrap justify-center mb-12 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={areFiltersInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === category
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleFilterChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              openModal={openModal}
            />
          ))}
        </div>

        {/* Project modal */}
        {selectedProject && (
          <ProjectModal project={selectedProject} closeModal={closeModal} />
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;
