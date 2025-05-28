import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ContactMap = () => {
  const mapRef = useRef(null);
  const isMapInView = useInView(mapRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isMapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="overflow-hidden rounded-2xl shadow-lg h-[400px] md:h-[500px]"
          style={{
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
        >
          {/* Replace with your actual Google Maps embed code */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2185501636363!2d-73.98777872385456!3d40.75737657138395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855a96da09d%3A0x860bf5a5e1a00a68!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1676403440136!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="PPT Pro Office Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMap;
