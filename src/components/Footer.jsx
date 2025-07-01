import React, { useContext } from "react";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";

// The version will be replaced at build time
const version = import.meta.env.VITE_APP_VERSION || "1.0";

const Footer = ({ currentTheme: propTheme }) => {
  const { preferences } = useContext(UserPreferencesContext);
  const themePalettes = {
    winsome: {
      background: "rgb(246, 220, 198)",
      primary: "rgb(252, 161, 126)",
      secondary: "rgb(218, 98, 125)",
      accent: "rgb(154, 52, 142)",
      text: "rgb(16, 8, 43)",
    },
    emerald: {
      background: "#225560",
      primary: "#3ddc97",
      secondary: "#3d2b3d",
      accent: "#3ddc97",
      text: "#f0fdfa",
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
  // Use preferences.theme.id if available, else fallback to string or 'winsome'
  const themeKey = preferences.theme && typeof preferences.theme === 'object' && preferences.theme.id
    ? preferences.theme.id
    : (typeof preferences.theme === 'string' ? preferences.theme : 'winsome');
  const currentTheme = propTheme || themePalettes[themeKey] || themePalettes["winsome"];
  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",
        padding: "2rem 0",
        background: currentTheme.background,
        borderTop: `1px solid ${currentTheme.accent}33`,
        color: currentTheme.text,
      }}
    >
      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1rem" }}>
        <p style={{ color: currentTheme.text + "99", fontSize: "0.95rem", fontWeight: 500 }}>
          © 2024 {preferences.cookbookName || "Winsome Designs Cookbook"} • Version {version}
        </p>
        <p style={{ color: currentTheme.accent, fontSize: "0.8rem", marginTop: "0.5rem" }}>
          Built with love for preserving family recipes
        </p>
      </div>
    </footer>
  );
};

export default Footer;
