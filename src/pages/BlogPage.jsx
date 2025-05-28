// filepath: c:\Users\rupin\Desktop\Dev_Files\Git_Repos\Development\pptpro-react\src\pages\BlogPage.jsx
import React from "react";
import Navbar from "../components/ui/menus/Navbar";
import BlogHero from "../components/Blog/BlogHero";
import BlogGrid from "../components/Blog/BlogGrid";
import { blogPosts } from "../data/blogData";

const BlogPage = () => {
  return (
    <div className="blog-page">
      <Navbar />
      <BlogHero />
      <BlogGrid posts={blogPosts} />
    </div>
  );
};

export default BlogPage;
