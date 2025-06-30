import React, { useContext } from "react";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";

// Modern Winsome Designs button styles
const baseStyles =
  "px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md";

export default function Button({
  children,
  className = "",
  type = "button",
  style = {},
  variant = "primary",
  ...props
}) {
  const { preferences } = useContext(UserPreferencesContext) || {};
  let themedStyle = { ...style };
  let variantClasses = "";

  // Default Winsome Designs variants
  switch (variant) {
    case "primary":
      variantClasses =
        "bg-winsome-primary-brand text-winsome-text-dark hover:bg-winsome-secondary-brand focus:ring-winsome-primary-brand";
      break;
    case "secondary":
      variantClasses =
        "bg-winsome-secondary-brand text-white hover:bg-winsome-tertiary-brand focus:ring-winsome-secondary-brand";
      break;
    case "tertiary":
      variantClasses =
        "bg-winsome-tertiary-brand text-white hover:bg-winsome-primary-brand focus:ring-winsome-tertiary-brand";
      break;
    case "outline":
      variantClasses =
        "bg-transparent border-2 border-winsome-primary-brand text-winsome-primary-brand hover:bg-winsome-primary-brand hover:text-winsome-text-dark focus:ring-winsome-primary-brand";
      break;
    case "danger":
      variantClasses =
        "bg-winsome-error text-white hover:bg-red-700 focus:ring-winsome-error";
      break;
    default:
      variantClasses =
        "bg-winsome-primary-brand text-winsome-text-dark hover:bg-winsome-secondary-brand focus:ring-winsome-primary-brand";
  }

  // If theme is a palette (roles), use palette roles for button
  if (
    preferences &&
    preferences.theme &&
    preferences.theme.type === "roles" &&
    Array.isArray(preferences.theme.value)
  ) {
    const palette = preferences.theme.value;
    const primary = palette.find((c) =>
      c.role.toLowerCase().includes("primary accent"),
    );
    const text = palette.find((c) =>
      c.role.toLowerCase().includes("primary text"),
    );
    const border = palette.find((c) =>
      c.role.toLowerCase().includes("secondary accent"),
    );

    if (primary) themedStyle.backgroundColor = primary.hex;
    if (text) themedStyle.color = text.hex;
    if (border && variant === "outline") themedStyle.borderColor = border.hex;
  }

  const finalClassName =
    className.includes("bg-") ||
    className.includes("text-") ||
    className.includes("hover:")
      ? `${baseStyles} ${className}`
      : `${baseStyles} ${variantClasses} ${className}`;

  return (
    <button
      type={type}
      className={finalClassName}
      style={themedStyle}
      {...props}
    >
      {children}
    </button>
  );
}
