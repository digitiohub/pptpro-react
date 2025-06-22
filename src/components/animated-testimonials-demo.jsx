import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

const AnimatedTestimonialsDemo = () => {
  const testimonials = [
    {
      quote:
        "PPTPRO was the best choice for our product launch! Their video presentation and service made a huge impact— highly recommend!",
      name: "Taher Golwalaa",
      designation: "Founder - ZOTAG",
      src: "https://pptpro.netlify.app/assets/testimonials/taher.jpg",
    },
    {
      quote:
        "The design was sleek, personalized, and delivered on time. The team's support made all the difference—truly worth it!",
      name: "Shamshaad",
      designation: "Founder - ACE HR SOLUTION",
      src: "https://pptpro.netlify.app/assets/testimonials/shamshaad.jpg",
    },
    {
      quote:
        "The presentation was professional, and their promptness made the process smooth. Highly recommend for effective solutions!",
      name: "Dhwani",
      designation: "Founder - O' MIND YOUR BODY",
      src: "https://pptpro.netlify.app/assets/testimonials/dhwani.jpg",
    },
    {
      quote:
        "PPTPRO exceeded our expectations for an important investor pitch! Their expertise and quick delivery truly impressed us.",
      name: "Amit",
      designation: "Founder - TASTHY",
      src: "https://pptpro.netlify.app/assets/testimonials/amit.png",
    },
    {
      quote:
        "They delivered a polished and professional presentation within just 10 hours, making everything smooth at the last moment.",
      name: "Mitesh Jain",
      designation: "Founder - PICASO PERI",
      src: "https://pptpro.netlify.app/assets/testimonials/mitesh.jpg",
    },
    {
      quote:
        "Their quick turnaround on the e-card, attention to detail, and dedication to quality were truly impressive.",
      name: "Vijaya Chandak",
      designation: "Founder - NATURES ALM",
      src: "https://pptpro.netlify.app/assets/testimonials/vijaya.jpg",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
};

export default AnimatedTestimonialsDemo;
