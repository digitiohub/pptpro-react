import React from "react";
import HomeHero from "../components/Home/HomeHero";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section with Navbar */}
      <HomeHero />

      {/* Rest of the homepage content */}
      <div className="container mx-auto px-4 py-20">
        <div className="w-full mx-auto bg-gray-100 rounded-lg p-12 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <p className="text-lg text-center text-gray-700 max-w-3xl">
            We provide top-notch presentation design and development services
            tailored to your specific needs. Our team of experts ensures that
            your presentations stand out and deliver your message effectively.
          </p>

          {/* More content can be added here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Custom Design</h3>
              <p>
                Uniquely crafted presentations that reflect your brand identity
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Content Creation</h3>
              <p>Compelling content that engages your audience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">
                Template Development
              </h3>
              <p>
                Professional templates for consistent and effective
                presentations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
