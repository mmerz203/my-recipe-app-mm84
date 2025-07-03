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
  // Use theme card background and border
  const blurClasses = blur
    ? "backdrop-blur-sm"
    : "";

  const style = {
    background: 'var(--color-card)',
    border: '1px solid var(--color-border)',
    borderRadius: '16px',
    ...props.style,
  };

  const classes = `${baseClasses} ${blurClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
