import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";

const BlogDetails = ({ post }) => {
  const contentRef = useRef(null);
  const authorRef = useRef(null);

  const isContentInView = useInView(contentRef, {
    once: true,
    amount: 0.1,
  });

  const isAuthorInView = useInView(authorRef, {
    once: true,
    amount: 0.5,
  });

  if (!post)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        Post not found
      </div>
    );

  return (
    <article className="bg-white dark:bg-gray-900 pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Image */}
        <div className="w-full max-w-4xl mx-auto mb-10">
          <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] shadow-lg">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Post Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {post.author.name}
              </span>
            </div>
            <span className="mx-3">•</span>
            <span>{formatDate(post.date)}</span>
            <span className="mx-3">•</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Post Content */}
        <motion.div
          ref={contentRef}
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Tags */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <motion.div
          ref={authorRef}
          className="max-w-3xl mx-auto border-t border-gray-200 dark:border-gray-800 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isAuthorInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {post.author.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.author.bio}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to Blog */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to all articles
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogDetails;
