import React from "react";

// You can adjust these Tailwind classes for your preferred style
const baseStyles =
  "px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150";

export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button type={type} className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
