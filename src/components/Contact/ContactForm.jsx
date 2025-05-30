import React, { useState } from "react";

const ContactForm = ({ isEmbedded = false }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Error and success state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
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

  // Handle form submission
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

        {/* Submit button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-3 bg-white hover:bg-white/90 text-black font-medium rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
