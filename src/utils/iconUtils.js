// Icon utilities for consistent styling and accessibility across the Winsome Designs app
import React from "react";

/**
 * Get consistent icon classes based on size and purpose
 * @param {string} size - Icon size (xs, sm, md, lg, xl)
 * @param {string} purpose - Icon purpose (menu, button, inline, decorative)
 * @param {string} additionalClasses - Additional custom classes
 * @returns {string} Combined CSS classes
 */
export const getIconClasses = (
  size = "md",
  purpose = "inline",
  additionalClasses = "",
) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
    "2xl": "w-10 h-10",
  };

  const purposeClasses = {
    menu: "transition-colors duration-200 hover:scale-105",
    button: "transition-all duration-200",
    inline: "transition-colors duration-200",
    decorative: "transition-colors duration-200 opacity-60",
  };

  const baseClasses = "flex-shrink-0";

  return [
    baseClasses,
    sizeClasses[size] || sizeClasses.md,
    purposeClasses[purpose] || purposeClasses.inline,
    additionalClasses,
  ]
    .filter(Boolean)
    .join(" ");
};

/**
 * Get consistent icon props for accessibility
 * @param {string} label - Accessible label for the icon
 * @param {boolean} decorative - Whether the icon is decorative only
 * @returns {object} Icon props
 */
export const getIconProps = (label = "", decorative = false) => {
  if (decorative) {
    return {
      "aria-hidden": "true",
      role: "presentation",
    };
  }

  return {
    "aria-label": label,
    role: "img",
  };
};

/**
 * Get theme-aware icon color
 * @param {string} variant - Color variant (primary, secondary, muted, etc.)
 * @param {object} theme - Current theme object
 * @returns {string} Color value
 */
export const getIconColor = (variant = "primary", theme = null) => {
  // If no theme provided, use CSS custom properties
  const colorMap = {
    primary: "var(--color-primary, currentColor)",
    secondary: "var(--color-secondary, currentColor)",
    text: "var(--color-text, currentColor)",
    muted: "var(--color-muted, currentColor)",
    white: "#ffffff",
    current: "currentColor",
  };

  if (theme && theme[variant]) {
    return theme[variant];
  }

  return colorMap[variant] || colorMap.current;
};

/**
 * Create consistent icon component wrapper
 * @param {React.Component} IconComponent - The icon component to wrap
 * @param {string} defaultLabel - Default accessibility label
 * @returns {React.Component} Wrapped icon component
 */
export const createConsistentIcon = (IconComponent, defaultLabel = "") => {
  return function ConsistentIcon({
    size = "md",
    purpose = "inline",
    label = defaultLabel,
    decorative = false,
    color = "currentColor",
    className = "",
    ...props
  }) {
    const iconClasses = getIconClasses(size, purpose, className);
    const iconProps = getIconProps(label, decorative);
    return React.createElement(IconComponent, {
      className: iconClasses,
      color,
      ...iconProps,
      ...props
    });
  };
}

/**
 * Standard icon sizes for consistent usage
 */
export const ICON_SIZES = {
  XS: "xs", // 12px - Small inline icons
  SM: "sm", // 16px - Button icons, small UI elements
  MD: "md", // 20px - Default size, most common usage
  LG: "lg", // 24px - Header icons, prominent buttons
  XL: "xl", // 32px - Logo, large interactive elements
  XXL: "2xl", // 40px - Hero icons, large visual elements
};

/**
 * Standard icon purposes for accessibility and styling
 */
export const ICON_PURPOSES = {
  MENU: "menu", // Navigation and menu icons
  BUTTON: "button", // Icons within buttons
  INLINE: "inline", // Icons within text or inline elements
  DECORATIVE: "decorative", // Purely decorative icons
};
