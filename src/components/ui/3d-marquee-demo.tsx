// src/components/3d-marquee-demo.tsx
"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
// @ts-ignore
import Navbar from "@/components/ui/menus/Navbar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThreeDMarqueeDemo() {
  const [showIntro, setShowIntro] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);
  const [typedTextWelcome, setTypedTextWelcome] = useState("");
  const [typedTextPPTPro, setTypedTextPPTPro] = useState("");
  const [showTagline, setShowTagline] = useState(false);
  const [fadeBackground, setFadeBackground] = useState(false);
  const [hideWelcome, setHideWelcome] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const welcomeText = "Welcome to:";
  const pptProText = "PPT PRO";
  const taglineText = "The Language of Business";

  // Animation sequence control
  useEffect(() => {
    // Step 0: Type out "Welcome to:"
    if (animationStep === 0) {
      if (typedTextWelcome.length < welcomeText.length) {
        const timeout = setTimeout(() => {
          setTypedTextWelcome(welcomeText.slice(0, typedTextWelcome.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        // Move to next step - fade out the background and welcome text
        const timeout = setTimeout(() => {
          setFadeBackground(true);
          setHideWelcome(true);
          setAnimationStep(1);
        }, 800);
        return () => clearTimeout(timeout);
      }
    }
    
    // Step 1: Show content after background fade
    else if (animationStep === 1) {
      const timeout = setTimeout(() => {
        setShowContent(true);
        setAnimationStep(2);
      }, 1000); // Wait for background fade
      return () => clearTimeout(timeout);
    }
    
    // Step 2: Wait a moment to appreciate the 3D Marquee, then start typing PPTPro
    else if (animationStep === 2) {
      const timeout = setTimeout(() => {
        setAnimationStep(3);
      }, 800);
      return () => clearTimeout(timeout);
    }
    
    // Step 3: Type out "PPTPro" over the visible content
    else if (animationStep === 3) {
      if (typedTextPPTPro.length < pptProText.length) {
        const timeout = setTimeout(() => {
          setTypedTextPPTPro(pptProText.slice(0, typedTextPPTPro.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        // Move to next step after a short pause
        const timeout = setTimeout(() => setAnimationStep(4), 700);
        return () => clearTimeout(timeout);
      }
    }
    
    // Step 4: Fade in tagline
    else if (animationStep === 4) {
      setShowTagline(true);
      
      // Final step - end the intro animation but keep the overlay visible
      const timeout = setTimeout(() => {
        setShowIntro(false);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [showIntro, animationStep, typedTextWelcome, typedTextPPTPro, welcomeText, pptProText]);

  // Array of presentation/business themed Unsplash images
  const images = [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1616587896595-23534f42cd9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1553484771-0a615f264d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1524749292158-7540c2494485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=970&h=700&q=80"
  ];
  
  return (
    <div className="relative">
      {/* Main Content - Always rendered but initially invisible */}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navbar at the top */}
        <Navbar />
        
        <div className="">
          <div className="rounded-3xl bg-gray-950/5 ring-1 ring-neutral-700/10 dark:bg-neutral-800 relative">
            <ThreeDMarquee images={images} />
            
            {/* Only show the typed text overlay after the background fades
                but the intro is still active - no additional persistent overlay */}
            {showContent && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {/* "PPTPro" text - appears over the visible content */}
                <motion.h1 
                  className="text-5xl md:text-9xl font-bold text-white mb-4 drop-shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationStep >= 3 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {typedTextPPTPro}
                  {animationStep === 3 && <span className="animate-pulse text-white">|</span>}
                </motion.h1>
                
                {/* "The Language of Business" tagline - always rendered but initially invisible */}
                <motion.p
                  className="text-xl md:text-2xl text-white italic drop-shadow-lg h-8 md:h-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showTagline ? 1 : 0 }}
                  transition={{ duration: 1 }}
                >
                  {taglineText}
                </motion.p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cinematic Intro Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            initial={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
            animate={{ 
              backgroundColor: fadeBackground 
                ? "rgba(0, 0, 0, 0)" 
                : "rgba(0, 0, 0, 1)" 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: fadeBackground ? 1.5 : 0,
              ease: "easeOut"
            }}
          >
            {/* "Welcome to:" text - fades out with background */}
            <motion.h2 
              className="text-2xl md:text-3xl font-medium text-gray-200 mb-2"
              initial={{ opacity: 1 }}
              animate={{ opacity: hideWelcome ? 0 : 1 }}
              transition={{ duration: 0.8 }}
            >
              {typedTextWelcome}
              {animationStep === 0 && <span className="animate-pulse">|</span>}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}