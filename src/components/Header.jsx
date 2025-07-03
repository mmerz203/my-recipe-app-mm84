// Header component for Winsome Designs
import React, { useContext } from "react";
import { CookbookLogoIcon, SettingsIcon } from "./icons/WinsomeIcons";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";
import { getThemeColors } from "../utils/themeSystem";

const fontFamily =
  'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const Header = ({ onSettings, currentTheme: propTheme }) => {
  const { preferences } = useContext(UserPreferencesContext);
  const currentTheme = propTheme || getThemeColors(preferences);
  const cookbookName = preferences.cookbookName || "Winsome Designs";
  return (
    <header
      style={{
        width: "100%",
        background: "var(--color-background)",
        borderBottom: "1px solid var(--color-border)",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
        fontFamily,
      }}
    >
      <div
        style={{
          maxWidth: "1152px",
          margin: "auto",
          padding: "0 16px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "var(--color-primary)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
            }}
          >
            <CookbookLogoIcon
              style={{ width: 24, height: 24 }}
              color={currentTheme.text}
            />
          </div>
          <div style={{ marginLeft: "12px" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "var(--color-text)",
                margin: 0,
                fontFamily,
              }}
            >
              {cookbookName}
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-muted)",
                margin: 0,
                fontFamily,
              }}
            >
              Digital Cookbook
            </p>
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
            background: "var(--color-accent)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: 500,
            fontSize: "15px",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.2s",
            fontFamily,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--color-accent)";
            e.currentTarget.style.opacity = 0.85;
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "var(--color-accent)";
            e.currentTarget.style.opacity = 1;
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <SettingsIcon
            style={{ width: 20, height: 20 }}
            color="#fff"
          />
          <span className="hidden sm:inline" style={{ fontWeight: 500 }}>
            Settings
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
