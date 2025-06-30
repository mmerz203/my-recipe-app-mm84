// Sophisticated Button component for Winsome Designs
import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-winsome-primary-brand text-winsome-text-dark hover:bg-winsome-secondary-brand hover:scale-105 focus:ring-winsome-primary-brand shadow-lg hover:shadow-xl",
    secondary:
      "bg-winsome-secondary-brand text-white hover:bg-winsome-tertiary-brand hover:scale-105 focus:ring-winsome-secondary-brand shadow-lg hover:shadow-xl",
    tertiary:
      "bg-winsome-tertiary-brand text-white hover:bg-winsome-primary-brand hover:text-winsome-text-dark hover:scale-105 focus:ring-winsome-tertiary-brand shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-winsome-primary-brand text-winsome-primary-brand bg-white hover:bg-winsome-primary-brand hover:text-winsome-text-dark hover:scale-105 focus:ring-winsome-primary-brand",
    ghost:
      "text-winsome-text-dark hover:bg-winsome-neutral-subtle hover:scale-105",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
