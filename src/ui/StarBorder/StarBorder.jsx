import { useState } from "react";

const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "white",
  speed = "6s",
  children,
  variant = "default",
  ...rest
}) => {
  // States to track interaction states
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Define button styles based on variant
  let buttonStyle =
    "relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white";

  if (variant === "yellow") {
    buttonStyle =
      "relative z-1 bg-yellow-700  text-white font-medium";
  }

  // Handle touch/mouse events for smooth scaling
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => {
    setIsPressed(false);
    setIsHovered(false);
  };
  const handleMouseEnter = () => setIsHovered(true);
  const handleTouchStart = () => setIsPressed(true);
  const handleTouchEnd = () => setIsPressed(false);

  // Simplified interaction style - just subtle scale
  const interactionStyle = {
    transform: isPressed
      ? "scale(0.96)"
      : isHovered
      ? "scale(1.02)"
      : "scale(1)",
    transition: "transform 0.2s ease-out",
  };

  return (
    <Component
      className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={interactionStyle}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className={`${buttonStyle} text-center text-[16px] py-[16px] px-[26px] rounded-[20px]`}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
