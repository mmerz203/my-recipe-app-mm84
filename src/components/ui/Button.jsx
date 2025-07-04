// Sophisticated Button component for Winsome Designs with dynamic theme inheritance
import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  style = {},
  ...props
}) => {
  // Base classes for sophisticated design (no theme colors here)
  const baseClasses = [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-semibold",
    "border-none",
    "transition-all",
    "duration-300",
    "cursor-pointer",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "font-sans",
    "backdrop-blur-sm",
    "relative",
    "overflow-hidden",
    "shadow-lg",
    "hover:shadow-xl",
    "hover:-translate-y-1",
    "hover:scale-105",
    "active:scale-95",
    "active:translate-y-0",
  ];

  // Size configurations (no colors)
  const sizeClasses = {
    xs: ["px-4", "py-2", "text-xs", "rounded-xl", "min-h-[32px]"],
    sm: ["px-5", "py-2.5", "text-sm", "rounded-xl", "min-h-[36px]"],
    md: ["px-6", "py-3", "text-base", "rounded-xl", "min-h-[44px]"],
    lg: ["px-8", "py-4", "text-lg", "rounded-2xl", "min-h-[52px]"],
    xl: ["px-10", "py-5", "text-xl", "rounded-2xl", "min-h-[60px]"],
  };

  // Dynamic theme-based styles using CSS variables
  const getVariantStyles = () => {
    const commonStyles = {
      position: "relative",
      overflow: "hidden",
    };

    // Before pseudo-element for gradient overlay (common to all solid variants)
    const gradientOverlay = {
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to right, rgba(255,255,255,0.1), transparent)",
        opacity: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        zIndex: 1,
      },
      "&:hover::before": {
        opacity: 1,
      },
    };

    switch (variant) {
      case "primary":
        return {
          ...commonStyles,
          background: "rgba(var(--color-primary-rgb, 252, 161, 126), 0.9)",
          color: "#ffffff",
          border:
            "1px solid rgba(var(--color-primary-rgb, 252, 161, 126), 0.2)",
          boxShadow:
            "0 4px 16px rgba(var(--color-primary-rgb, 252, 161, 126), 0.25)",
          "&:hover": {
            background: "var(--color-primary)",
            boxShadow:
              "0 8px 32px rgba(var(--color-primary-rgb, 252, 161, 126), 0.4)",
          },
          "&:focus": {
            outline: "none",
            boxShadow:
              "0 0 0 4px rgba(var(--color-primary-rgb, 252, 161, 126), 0.3)",
          },
        };

      case "secondary":
        return {
          ...commonStyles,
          background: "rgba(var(--color-secondary-rgb, 218, 98, 125), 0.9)",
          color: "#ffffff",
          border:
            "1px solid rgba(var(--color-secondary-rgb, 218, 98, 125), 0.2)",
          boxShadow:
            "0 4px 16px rgba(var(--color-secondary-rgb, 218, 98, 125), 0.25)",
          "&:hover": {
            background: "var(--color-secondary)",
            boxShadow:
              "0 8px 32px rgba(var(--color-secondary-rgb, 218, 98, 125), 0.4)",
          },
          "&:focus": {
            outline: "none",
            boxShadow:
              "0 0 0 4px rgba(var(--color-secondary-rgb, 218, 98, 125), 0.3)",
          },
        };

      case "tertiary":
        return {
          ...commonStyles,
          background: "rgba(var(--color-accent-rgb, 154, 52, 142), 0.9)",
          color: "#ffffff",
          border: "1px solid rgba(var(--color-accent-rgb, 154, 52, 142), 0.2)",
          boxShadow:
            "0 4px 16px rgba(var(--color-accent-rgb, 154, 52, 142), 0.25)",
          "&:hover": {
            background: "var(--color-accent)",
            boxShadow:
              "0 8px 32px rgba(var(--color-accent-rgb, 154, 52, 142), 0.4)",
          },
          "&:focus": {
            outline: "none",
            boxShadow:
              "0 0 0 4px rgba(var(--color-accent-rgb, 154, 52, 142), 0.3)",
          },
        };

      case "outline":
        return {
          ...commonStyles,
          background: "rgba(var(--color-card-rgb, 255, 255, 255), 0.6)",
          color: "var(--color-primary)",
          border: "2px solid var(--color-primary)",
          backdropFilter: "blur(16px)",
          "&:hover": {
            background: "rgba(var(--color-primary-rgb, 252, 161, 126), 0.1)",
            boxShadow:
              "0 8px 32px rgba(var(--color-primary-rgb, 252, 161, 126), 0.2)",
          },
          "&:focus": {
            outline: "none",
            boxShadow:
              "0 0 0 4px rgba(var(--color-primary-rgb, 252, 161, 126), 0.3)",
          },
        };

      case "ghost":
        return {
          ...commonStyles,
          background: "rgba(var(--color-card-rgb, 255, 255, 255), 0.4)",
          color: "var(--color-text)",
          border: "1px solid rgba(var(--color-text-rgb, 16, 8, 43), 0.1)",
          backdropFilter: "blur(16px)",
          "&:hover": {
            background: "rgba(var(--color-card-rgb, 255, 255, 255), 0.6)",
            border:
              "1px solid rgba(var(--color-primary-rgb, 252, 161, 126), 0.5)",
          },
          "&:focus": {
            outline: "none",
            boxShadow:
              "0 0 0 4px rgba(var(--color-primary-rgb, 252, 161, 126), 0.3)",
          },
        };

      case "accent":
        return {
          ...commonStyles,
          background: "rgba(var(--color-accent-rgb, 154, 52, 142), 0.9)",
          color: "#ffffff",
          border: "1px solid rgba(var(--color-accent-rgb, 154, 52, 142), 0.2)",
          boxShadow:
            "0 4px 16px rgba(var(--color-accent-rgb, 154, 52, 142), 0.25)",
          "&:hover": {
            background: "var(--color-accent)",
            boxShadow:
              "0 8px 32px rgba(var(--color-accent-rgb, 154, 52, 142), 0.4)",
          },
          "&:focus": {
            outline: "none",
            boxShadow:
              "0 0 0 4px rgba(var(--color-accent-rgb, 154, 52, 142), 0.3)",
          },
        };

      case "destructive":
        return {
          ...commonStyles,
          background: "rgba(var(--color-error-rgb, 211, 96, 96), 0.9)",
          color: "#ffffff",
          border: "1px solid rgba(var(--color-error-rgb, 211, 96, 96), 0.2)",
          boxShadow:
            "0 4px 16px rgba(var(--color-error-rgb, 211, 96, 96), 0.25)",
          "&:hover": {
            background: "var(--color-error)",
            boxShadow:
              "0 8px 32px rgba(var(--color-error-rgb, 211, 96, 96), 0.4)",
          },
          "&:focus": {
            outline: "none",
            boxShadow:
              "0 0 0 4px rgba(var(--color-error-rgb, 211, 96, 96), 0.3)",
          },
        };

      default:
        return commonStyles;
    }
  };

  // Combine classes
  const allClasses = [...baseClasses, ...sizeClasses[size], className].join(
    " ",
  );

  // Merge styles
  const variantStyles = getVariantStyles();
  const finalStyle = {
    ...variantStyles,
    ...style,
  };

  return (
    <button
      className={allClasses}
      style={finalStyle}
      disabled={disabled}
      {...props}
    >
      <span
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {children}
      </span>
      {/* Gradient overlay for hover effect */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(255,255,255,0.1), transparent)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
        className="button-gradient-overlay"
      />
    </button>
  );
};

export default Button;
