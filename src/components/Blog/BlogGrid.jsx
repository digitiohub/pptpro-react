import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

// Animation variants following the codebase pattern
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
      delay: 0.1 * (index % 3),
    },
  }),
};

const gridVariants = {
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
      delay: 0.2,
    },
  },
};

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
      <Link to={`/blog/${post.slug}`} className="block">
        <div
          className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl"
          style={{
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
        >
          {/* Image with optimized transform properties */}
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

const BlogGrid = ({ filteredPosts = [] }) => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  const isGridInView = useInView(gridRef, {
    once: true,
    amount: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      className="py-16 dark:bg-gray-900"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
          <motion.div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={gridVariants}
            initial="initial"
            animate={isGridInView ? "animate" : "initial"}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
            }}
          >
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-gray-600 dark:text-gray-400">
              No posts found for this category.
            </h3>
            <p className="mt-4 text-gray-500 dark:text-gray-500">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
