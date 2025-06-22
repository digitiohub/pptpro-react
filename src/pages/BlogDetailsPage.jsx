import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/ui/menus/Navbar";
import BlogDetails from "../components/Blog/BlogDetails";
import { blogPosts } from "../data/blogData";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching post data
    const foundPost = blogPosts.find((p) => p.slug === slug);
    setPost(foundPost);
    setLoading(false);
  }, [slug]);

  // If post not found after loading, redirect to blog list
  if (!loading && !post) {
    return <Navigate to="/blog" />;
  }

  return (
    <div className="blog-details-page pt-20">
      <Navbar />
      {loading ? (
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading article...
          </p>
        </div>
      ) : (
        <BlogDetails post={post} />
      )}
    </div>
  );
};

export default BlogDetailsPage;
