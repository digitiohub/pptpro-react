// filepath: c:\Users\rupin\Desktop\Dev_Files\Git_Repos\Development\pptpro-react\src\components\ui\timeline.tsx
"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data, title, description }: { 
  data: TimelineEntry[],
  title?: string,
  description?: string
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-[#141313]   text-white"
      ref={containerRef}
    >
      {title && (
        <div className=" mx-auto pt-2 pb-2 px-4 md:px-6 lg:px-8">
          <h2 className="text-lg md:text-3xl mb-3 text-white max-w-4xl">
            {title}<span className="text-yellow-500">.</span>
          </h2>
          {description && (
            <p className="text-gray-300 text-sm md:text-base max-w-sm mb-6">
              {description}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-8xl mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start min-h-[80vh] pt-24 md:pt-32 md:gap-12 lg:gap-16"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-md xl:max-w-lg md:w-full">
              <div className="h-12 absolute left-3 md:left-0 w-12 rounded-full bg-[#141313] flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-yellow-500 p-2"></div>
              </div>
              <h3 className="hidden md:block timeline-step-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl md:pl-16 lg:pl-20 xl:pl-24 font-black text-white uppercase tracking-wide leading-none">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full max-w-4xl lg:max-w-5xl">
              <h3 className="md:hidden block timeline-step-title text-3xl sm:text-4xl mb-6 text-left font-black text-white uppercase tracking-wide leading-none">
                {item.title}
              </h3>
              <div className="text-base md:text-lg lg:text-xl">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-6 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-yellow-500 via-yellow-500 to-transparent from-[0%] via-[10%] rounded-full"
          ></motion.div>
        </div>
      </div>
    </div>
  );
};