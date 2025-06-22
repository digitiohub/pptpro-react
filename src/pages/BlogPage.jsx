// filepath: c:\Users\rupin\Desktop\Dev_Files\Git_Repos\Development\pptpro-react\src\pages\BlogPage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/ui/menus/Navbar";
import BlogHero from "../components/Blog/BlogHero";
import BlogGrid from "../components/Blog/BlogGrid";
import { blogPosts } from "../data/blogData";

const BlogPage = () => {
  // State for active category and filtered posts
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Extract unique categories from blog posts
  const categories = [
    "all",
    ...Array.from(
      new Set(blogPosts.map((post) => post.category.toLowerCase()))
    ),
  ];

  // Filter posts when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(
        (post) => post.category.toLowerCase() === activeCategory
      );
      setFilteredPosts(filtered);
    }
  }, [activeCategory]);

  return (
    <div className="blog-page ">
      <Navbar />

      <BlogHero
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <BlogGrid filteredPosts={filteredPosts} />
    </div>
  );
};

export default BlogPage;
