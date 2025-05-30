import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import StarBorder from "../../ui/StarBorder/StarBorder";
import * as LucideIcons from "lucide-react";

// Animation variants following the codebase pattern
const containerVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const circleVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      delay: 0.4,
    },
  },
};

const ContactMain = () => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const isContainerInView = useInView(containerRef, {
    once: true,
    amount: 0.2,
  });
  const isCircleInView = useInView(circleRef, {
    once: true,
    amount: 0.1,
  });

  return (
    <section className="py-16 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="initial"
          animate={isContainerInView ? "animate" : "initial"}
          className="rounded-2xl shadow-lg overflow-hidden"
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact Info Column - 1/3 width */}
            <div className="bg-black text-white p-6 md:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-800 relative overflow-hidden">
              {/* Decorative translucent white circle */}
              <motion.div
                ref={circleRef}
                variants={circleVariants}
                initial="initial"
                animate={isCircleInView ? "animate" : "initial"}
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none"
                style={{
                  willChange: "transform, opacity",
                  zIndex: 1,
                }}
              ></motion.div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-6">
                  Get in touch<span className="text-yellow-500">.</span>
                </h3>
                <div className="space-y-8">
                  <p className="text-white">
                    Have a question or interested in our services? We're here to
                    help. Contact us through any of these methods and we'll get
                    back to you as soon as possible.
                  </p>

                  {/* Contact Methods */}
                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-white/10 p-3 rounded-lg text-white">
                        <LucideIcons.Phone className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          Give us a call
                        </h4>
                        <div className="text-white mb-3">
                          <p>+1 (555) 123-4567</p>
                          <p>Mon-Fri from 9am to 6pm EST</p>
                        </div>
                        <a
                          href="tel:+15551234567"
                          className="inline-flex items-center text-white hover:text-white/80 font-medium"
                        >
                          Call now
                          <LucideIcons.ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-white/10 p-3 rounded-lg text-white">
                        <LucideIcons.Mail className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          Send us an email
                        </h4>
                        <div className="text-white mb-3">
                          <p>info@pptpro.com</p>
                          <p>We'll respond within 24 hours</p>
                        </div>
                        <a
                          href="mailto:info@pptpro.com"
                          className="inline-flex items-center text-white hover:text-white/80 font-medium"
                        >
                          Email us
                          <LucideIcons.ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-white/10 p-3 rounded-lg text-white">
                        <LucideIcons.MapPin className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          Visit our office
                        </h4>
                        <div className="text-white mb-3">
                          <p>123 Presentation Ave</p>
                          <p>Suite 500, New York, NY 10001</p>
                        </div>
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-white hover:text-white/80 font-medium"
                        >
                          Get directions
                          <LucideIcons.ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Connect with us<span className="text-yellow-500">.</span>
                    </h4>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="text-white hover:text-white/80 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect on Twitter"
                      >
                        <LucideIcons.Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="text-white hover:text-white/80 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect on LinkedIn"
                      >
                        <LucideIcons.Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="text-white hover:text-white/80 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect on Instagram"
                      >
                        <LucideIcons.Instagram className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="text-white hover:text-white/80 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect on Facebook"
                      >
                        <LucideIcons.Facebook className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column - 2/3 width */}
            <div className="bg-[#141313] text-white p-6 md:p-8 lg:p-10 col-span-1 lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-6">
                Send us a message<span className="text-yellow-500">.</span>
              </h3>

              <FormContent />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Separate component for the form content
const FormContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <>
      {submitSuccess && (
        <div className="mb-6 p-4 bg-white/10 text-white rounded-lg">
          Thank you! Your message has been sent successfully. We'll get back to
          you soon.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mb-2"
            >
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-white/40" : "border-white/20"
              } bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-white/80">{errors.name}</p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Your Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-white/40" : "border-white/20"
              } bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-white/80">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Subject field */}
        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-white mb-2"
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.subject ? "border-white/40" : "border-white/20"
            } bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30`}
            placeholder="How can we help you?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-white/80">{errors.subject}</p>
          )}
        </div>

        {/* Message field */}
        <div className="mb-8">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-white mb-2"
          >
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message ? "border-white/40" : "border-white/20"
            } bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-white/30`}
            placeholder="Please describe what you need help with..."
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-white/80">{errors.message}</p>
          )}
        </div>

        {/* Submit button using StarBorder */}
        <div>
          <StarBorder
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <LucideIcons.Loader2 className="animate-spin mr-2 h-5 w-5" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </StarBorder>
        </div>
      </form>
    </>
  );
};

export default ContactMain;
