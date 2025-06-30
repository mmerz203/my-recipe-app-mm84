// Sophisticated Card component for Winsome Designs
import React from "react";

const Card = ({
  children,
  className = "",
  hover = false,
  blur = false,
  ...props
}) => {
  const baseClasses = "rounded-2xl shadow-lg transition-all duration-300";
  const hoverClasses = hover
    ? "hover:scale-105 hover:shadow-xl cursor-pointer"
    : "";
  const blurClasses = blur ? "bg-white/80 backdrop-blur-sm" : "bg-white";

  const classes = `${baseClasses} ${blurClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
