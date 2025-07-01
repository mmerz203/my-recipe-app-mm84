// Header component for Winsome Designs
import React, { useContext } from "react";
import { CookbookLogoIcon, SettingsIcon } from "./icons/WinsomeIcons";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";

const fontFamily =
  'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

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

const Header = ({ onSettings, currentTheme: propTheme }) => {
  const { preferences } = useContext(UserPreferencesContext);
  // Use preferences.theme.id if available, else fallback to string or 'winsome'
  const themeKey = preferences.theme && typeof preferences.theme === 'object' && preferences.theme.id
    ? preferences.theme.id
    : (typeof preferences.theme === 'string' ? preferences.theme : 'winsome');
  const currentTheme = propTheme || themePalettes[themeKey] || themePalettes["winsome"];
  const cookbookName = preferences.cookbookName || "Winsome Designs";
  return (
    <header
      style={{
        width: "100%",
        background: currentTheme.background,
        borderBottom: `1px solid ${currentTheme.accent}33`,
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
        fontFamily,
      }}
    >
      <div style={{ maxWidth: "1152px", margin: "auto", padding: "0 16px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: currentTheme.primary,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
            }}
          >
            <CookbookLogoIcon style={{ width: 24, height: 24 }} color={currentTheme.text} />
          </div>
          <div style={{ marginLeft: "12px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: currentTheme.text, margin: 0, fontFamily }}>{cookbookName}</h1>
            <p style={{ fontSize: "14px", color: currentTheme.text + "99", margin: 0, fontFamily }}>Digital Cookbook</p>
          </div>
        </div>

        {/* Settings Button */}
        <button
          onClick={onSettings}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: currentTheme.accent + "1A", // 10% opacity
            color: currentTheme.accent,
            border: "none",
            borderRadius: "12px",
            fontWeight: 500,
            fontSize: "15px",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.2s",
            fontFamily,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = currentTheme.accent + "33"; // 20% opacity
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = currentTheme.accent + "1A";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <SettingsIcon style={{ width: 20, height: 20 }} color={currentTheme.accent} />
          <span className="hidden sm:inline" style={{ fontWeight: 500 }}>Settings</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
