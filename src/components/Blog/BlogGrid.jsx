import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={cardRef}
      className="group"
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
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div
          className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl"
          style={{
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
        >
          {/* Image */}
          <div className="relative h-56 md:h-64 overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ transform: "translate3d(0, 0, 0)" }}
            />

            {/* Category tag */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded-full">
                {post.category}
              </span>
            </div>
          </div>

          {/* Text content */}
          <div className="p-5 bg-white dark:bg-gray-800">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>{formatDate(post.date)}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime} min read</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-500 transition-colors duration-200">
              {post.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
              {post.excerpt}
            </p>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {post.author.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogGrid = ({ posts }) => {
  const [activeCategory, setActiveCategory] = useState("all");
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

  // Get unique categories from posts
  const categories = [
    "all",
    ...new Set(posts.map((post) => post.category.toLowerCase())),
  ];

  // Filter posts based on active category
  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category.toLowerCase() === activeCategory);

  // Handle filter change
  const handleFilterChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gray-50 dark:bg-gray-900"
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
                activeCategory === category
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleFilterChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
