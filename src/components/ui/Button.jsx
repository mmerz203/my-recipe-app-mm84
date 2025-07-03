// Modern Button component for Winsome Designs with glass morphism and CSS variables
import React, { useState } from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  style = {},
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fontFamily = "ui-sans-serif, system-ui, sans-serif";

  // Size configurations
  const sizes = {
    xs: { padding: "6px 12px", fontSize: "12px", borderRadius: "8px" },
    sm: { padding: "8px 16px", fontSize: "14px", borderRadius: "10px" },
    md: { padding: "12px 20px", fontSize: "15px", borderRadius: "12px" },
    lg: { padding: "16px 24px", fontSize: "16px", borderRadius: "14px" },
    xl: { padding: "20px 32px", fontSize: "18px", borderRadius: "16px" },
  };

  // Base styles that apply to all variants
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontFamily,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    userSelect: "none",
    outline: "none",
    transform: isHovered && !disabled ? "translateY(-1px)" : "translateY(0)",
    ...sizes[size],
  };

  // Variant-specific styles using CSS variables
  const getVariantStyles = () => {
    const opacity = disabled ? 0.5 : 1;

    switch (variant) {
      case "primary":
        return {
          background: "var(--color-primary)",
          color: "var(--color-text)",
          boxShadow:
            isHovered && !disabled
              ? "0 8px 25px -8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)"
              : "0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(8px)",
          opacity,
        };

      case "secondary":
        return {
          background: "var(--color-secondary)",
          color: "white",
          boxShadow:
            isHovered && !disabled
              ? "0 8px 25px -8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              : "0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          opacity,
        };

      case "outline":
        return {
          background:
            isHovered && !disabled
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.05)",
          color: "var(--color-primary)",
          border: "1.5px solid var(--color-primary)",
          boxShadow:
            isHovered && !disabled
              ? "0 8px 25px -8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 2px 8px -2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(8px)",
          opacity,
        };

      case "ghost":
        return {
          background:
            isHovered && !disabled ? "rgba(255, 255, 255, 0.1)" : "transparent",
          color: "var(--color-text)",
          boxShadow:
            isHovered && !disabled
              ? "0 4px 12px -4px rgba(0, 0, 0, 0.1)"
              : "none",
          opacity,
        };

      case "accent":
        return {
          background: "var(--color-accent)",
          color: "white",
          boxShadow:
            isHovered && !disabled
              ? "0 8px 25px -8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              : "0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          opacity,
        };

      default:
        return {};
    }
  };

  // Focus ring styles
  const focusStyles =
    isFocused && !disabled
      ? {
          boxShadow: `${getVariantStyles().boxShadow}, 0 0 0 3px rgba(var(--color-primary-rgb, 252, 161, 126), 0.3)`,
        }
      : {};

  const finalStyles = {
    ...baseStyles,
    ...getVariantStyles(),
    ...focusStyles,
    ...style,
  };

  return (
    <button
      style={finalStyles}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
