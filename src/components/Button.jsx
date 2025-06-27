import React, { useContext } from "react";
import { UserPreferencesContext } from '../contexts/UserPreferencesContext';

// You can adjust these Tailwind classes for your preferred style
const baseStyles =
  "px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150";

export default function Button({
  children,
  className = "",
  type = "button",
  style = {},
  ...props
}) {
  const { preferences } = useContext(UserPreferencesContext) || {};
  let themedStyle = { ...style };

  // If theme is a palette (roles), use palette roles for button
  if (preferences && preferences.theme && preferences.theme.type === 'roles' && Array.isArray(preferences.theme.value)) {
    const palette = preferences.theme.value;
    const primary = palette.find(c => c.role.toLowerCase().includes('primary accent'));
    const text = palette.find(c => c.role.toLowerCase().includes('primary text'));
    const border = palette.find(c => c.role.toLowerCase().includes('secondary accent'));
    if (primary) themedStyle.background = primary.hex;
    if (text) themedStyle.color = text.hex;
    if (border) themedStyle.border = `2px solid ${border.hex}`;
  }

  return (
    <button type={type} className={`${baseStyles} ${className}`} style={themedStyle} {...props}>
      {children}
    </button>
  );
}
