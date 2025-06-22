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
                  Let's working together<span className="text-yellow-500">.</span>
                </h3>
                <div className="space-y-8">
                  <p className="text-white">
                    Thank you for your interest in PPTPRO. We're excited to hear from you and discuss
                    how we can help transform your presentations and achieve your business goals.
                  </p>

                  {/* Hours of Operation Banner */}
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-yellow-500/30 p-2 rounded-lg text-yellow-500 mr-3">
                        <LucideIcons.Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Hours of Operation</h4>
                        <p className="text-yellow-300 font-medium">We are available 24/7</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Methods */}
                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-yellow-500/20 p-3 rounded-lg text-yellow-500">
                        <LucideIcons.Phone className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          Phone Number
                        </h4>
                        <div className="text-white mb-3">
                          <p>+91 98333 22118</p>
                          <p>zaib@pptpro.in</p>
                        </div>
                        <a
                          href="tel:+919833322118"
                          className="inline-flex items-center text-yellow-500 hover:text-yellow-400 font-medium transition-colors duration-200"
                        >
                          Call now
                          <LucideIcons.ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-yellow-500/20 p-3 rounded-lg text-yellow-500">
                        <LucideIcons.Mail className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          Send us an email
                        </h4>
                        <div className="text-white mb-3">
                          <p>zaib@pptpro.in</p>
                          <p>We'll respond within 24 hours</p>
                        </div>
                        <a
                          href="mailto:zaib@pptpro.in"
                          className="inline-flex items-center text-yellow-500 hover:text-yellow-400 font-medium transition-colors duration-200"
                        >
                          Email us
                          <LucideIcons.ArrowRight className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-yellow-500/20 p-3 rounded-lg text-yellow-500">
                        <LucideIcons.MapPin className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          Our Address
                        </h4>
                        <div className="text-white mb-3">
                          <p>Riidl Headquarters 520 Bhaskaracharya Building</p>
                          <p>Somaiya Vidyavihar, Mumbai</p>
                        </div>
                        <a
                          href="https://maps.google.com/maps?q=Riidl+Headquarters+520+Bhaskaracharya+Building+Somaiya+Vidyavihar+Mumbai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-yellow-500 hover:text-yellow-400 font-medium transition-colors duration-200"
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
                        href="https://twitter.com/pptpro"
                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect on Twitter"
                      >
                        <LucideIcons.Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href="https://linkedin.com/company/pptpro"
                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect on LinkedIn"
                      >
                        <LucideIcons.Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="https://instagram.com/pptpro"
                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect on Instagram"
                      >
                        <LucideIcons.Instagram className="w-5 h-5" />
                      </a>
                      <a
                        href="https://facebook.com/pptpro"
                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
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
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
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

    if (!formData.service.trim()) {
      newErrors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please provide project details";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more details (minimum 10 characters)";
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
          phone: "",
          company: "",
          service: "",
          budget: "",
          timeline: "",
          message: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  const serviceOptions = [
    { value: "", label: "Select a service..." },
    { value: "corporate-presentation", label: "Corporate Presentation" },
    { value: "video-presentation", label: "Video Presentation" },
    { value: "presentation-training", label: "Presentation Training" },
    { value: "financial-modeling", label: "Financial Modeling" },
    { value: "consultation", label: "Presentation Consultation" },
    { value: "other", label: "Other Services" }
  ];

  const budgetOptions = [
    { value: "", label: "Select budget range..." },
    { value: "under-5k", label: "Under ₹5,000" },
    { value: "5k-15k", label: "₹5,000 - ₹15,000" },
    { value: "15k-50k", label: "₹15,000 - ₹50,000" },
    { value: "50k-1l", label: "₹50,000 - ₹1,00,000" },
    { value: "above-1l", label: "Above ₹1,00,000" },
    { value: "discuss", label: "Let's discuss" }
  ];

  const timelineOptions = [
    { value: "", label: "When do you need this completed?" },
    { value: "urgent", label: "ASAP (Rush job)" },
    { value: "1-week", label: "Within 1 week" },
    { value: "2-weeks", label: "Within 2 weeks" },
    { value: "1-month", label: "Within 1 month" },
    { value: "flexible", label: "Flexible timeline" }
  ];

  return (
    <>
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg">
          Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
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
                errors.name ? "border-red-400/50" : "border-white/20"
              } bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
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
                errors.email ? "border-red-400/50" : "border-white/20"
              } bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone and Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
              placeholder="Your Company Name"
            />
          </div>
        </div>

        {/* Service and Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-white mb-2">
              Service Interest *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.service ? "border-red-400/50" : "border-white/20"
              } bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent`}
            >
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1 text-sm text-red-400">{errors.service}</p>
            )}
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
              Project Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
            >
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <label htmlFor="timeline" className="block text-sm font-medium text-white mb-2">
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
          >
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message field */}
        <div className="mb-8">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-white mb-2"
          >
            Project Details *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message ? "border-red-400/50" : "border-white/20"
            } bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent resize-none`}
            placeholder="Please describe your project requirements, goals, and any specific needs..."
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message}</p>
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