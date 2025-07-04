// Centralized Theme System for Winsome Designs
// This file contains all theme-related logic to ensure consistency

export const THEME_PALETTES = {
  winsome: {
    background: "rgb(246, 220, 198)",
    primary: "rgb(252, 161, 126)",
    secondary: "rgb(218, 98, 125)",
    accent: "rgb(154, 52, 142)",
    text: "rgb(16, 8, 43)",
  },
  "azure-sunset": {
    background: "#f0f8ff", // Alice Blue
    primary: "#4682b4", // Steel Blue
    secondary: "#ff7f50", // Coral
    accent: "#ff7f50", // Use Coral for accent as well
    text: "#1a1a2e", // Deep Indigo
    border: "#2f4f4f", // Dark Slate Gray
    card: "#f0f8ff", // Use background for cards
    error: "#d36060", // Error Red (existing definition)
  },
  "emerald-bloom": {
    background: "#f5f5f5",
    primary: "#3cb371",
    secondary: "#8a2be2",
    tertiary: "#4b0082",
    accent: "#3cb371",
    text: "#191970",
    border: "#4b0082",
    card: "#f5f5f5",
    error: "#d36060",
  },
  "golden-meadow": {
    background: "#fffacd",
    primary: "#ffd700",
    secondary: "#b8860b",
    tertiary: "#556b2f",
    accent: "#ffd700",
    text: "#36454F",
    border: "#b8860b",
    card: "#fffacd",
    error: "#d36060",
  },
  rustic: {
    background: "#f2e791",
    primary: "#a57f60",
    secondary: "#c880b7",
    accent: "#a57f60",
    text: "#3d2b1f",
  },
  ocean: {
    background: "#E0F1FF",
    primary: "#4F8EF7",
    secondary: "#235390",
    accent: "#38B6FF",
    text: "#10243B",
  },
};

export const getThemeColors = (preferences) => {
  const themeKey =
    preferences?.theme &&
    typeof preferences.theme === "object" &&
    preferences.theme.id
      ? preferences.theme.id
      : typeof preferences?.theme === "string"
        ? preferences.theme
        : "winsome";

  return THEME_PALETTES[themeKey] || THEME_PALETTES.winsome;
};

export const withAlpha = (color, alpha) => {
  if (!color) return "";
  if (color.startsWith("#")) {
    let hex = color.replace("#", "");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((x) => x + x)
        .join("");
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }
  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", `,${alpha})`);
  }
  if (color.startsWith("rgba(")) {
    return color;
  }
  return color;
};

// Helper function to convert color to RGB values
const getRGBValues = (color) => {
  if (!color) return "0, 0, 0";

  if (color.startsWith("#")) {
    let hex = color.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((x) => x + x)
        .join("");
    }
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `${r}, ${g}, ${b}`;
  }

  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "").replace(")", "");
  }

  if (color.startsWith("rgba(")) {
    const values = color.replace("rgba(", "").replace(")", "").split(",");
    return `${values[0]}, ${values[1]}, ${values[2]}`;
  }

  return "0, 0, 0";
};

export const setThemeCSSVariables = (theme) => {
  if (!theme) return;
  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    // Set the color variable
    root.style.setProperty(`--color-${key}`, value);

    // Set the RGB variable for rgba() usage
    const rgbValues = getRGBValues(value);
    root.style.setProperty(`--color-${key}-rgb`, rgbValues);
  });
};
