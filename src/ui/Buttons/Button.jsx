import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const buttonVariants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, -10px, 0px)",
    scale: 1,
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    scale: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
      duration: 0.1,
    },
  },
};

/**
 * Reusable Button component with animations
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, outline, hero-primary, hero-outline)
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.fullWidth=false] - Whether the button should take full width
 * @param {boolean} [props.animate=true] - Whether to animate the button
 * @param {string|Object} [props.to] - Link destination (if button should act as a link)
 * @param {boolean} [props.external=false] - Whether the link is external
 * @param {Function} [props.onClick] - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {Object} [props.motionProps] - Additional motion props
 * @param {string} [props.type='button'] - Button type attribute
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 */
const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  animate = true,
  to,
  external = false,
  onClick,
  children,
  motionProps = {},
  type = "button",
  disabled = false,
  ...rest
}) => {
  // Base classes shared by all button variants
  const baseClasses = `
    font-medium transition-colors duration-300 ease-in-out text-center
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
  `;

  // Size classes
  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-yellow text-black hover:bg-white focus:ring-2 focus:ring-yellow/50 focus:ring-offset-2 rounded-full",
    secondary:
      "bg-black text-yellow hover:bg-yellow hover:text-black focus:ring-2 focus:ring-black/50 focus:ring-offset-2 rounded-full",
    outline:
      "bg-transparent border-2 border-yellow text-yellow hover:bg-yellow hover:text-black focus:ring-2 focus:ring-yellow/50 rounded-full",
    text: "bg-transparent text-yellow hover:underline px-0 py-0",
    "hero-primary": "bg-yellow-400 text-black hover:bg-yellow-500 rounded-lg",
    "hero-outline":
      "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white rounded-lg",
  };

  // Override size for hero buttons to match the original styling
  const heroSizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Determine if this is a hero variant
  const isHeroVariant = variant.startsWith("hero-");
  const currentSizeClasses = isHeroVariant ? heroSizeClasses : sizeClasses;

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${currentSizeClasses[size] || currentSizeClasses.md}
    ${variantClasses[variant] || variantClasses.primary}
    ${className}
  `;

  // Define animation variants to use
  const animationVariants = animate ? buttonVariants : {};

  // If it's a link (internal or external)
  if (to) {
    // External link
    if (external) {
      return (
        <motion.a
          href={to}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
          initial={animate ? "initial" : undefined}
          animate={animate ? "animate" : undefined}
          whileHover={!disabled && animate ? "hover" : undefined}
          whileTap={!disabled && animate ? "tap" : undefined}
          variants={animationVariants}
          {...motionProps}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
          style={{
            willChange: animate ? "transform, opacity, scale" : "auto",
            transformOrigin: "center",
          }}
          {...rest}
        >
          {children}
        </motion.a>
      );
    }

    // Internal link (React Router)
    return (
      <motion.div
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        whileHover={!disabled && animate ? "hover" : undefined}
        whileTap={!disabled && animate ? "tap" : undefined}
        variants={animationVariants}
        style={{
          willChange: animate ? "transform, opacity, scale" : "auto",
          display: "inline-block",
          transformOrigin: "center",
        }}
        {...motionProps}
      >
        <Link
          to={to}
          className={buttonClasses}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
          {...rest}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  // Regular button
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      initial={animate ? "initial" : undefined}
      animate={animate ? "animate" : undefined}
      whileHover={!disabled && animate ? "hover" : undefined}
      whileTap={!disabled && animate ? "tap" : undefined}
      variants={animationVariants}
      style={{
        willChange: animate ? "transform, opacity, scale" : "auto",
        transformOrigin: "center",
      }}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
