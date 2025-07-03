import React, { useContext } from "react";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";
import { getThemeColors } from "../utils/themeSystem";

// The version will be replaced at build time
const version = import.meta.env.VITE_APP_VERSION || "1.0";

const Footer = ({ currentTheme: propTheme }) => {
  const { preferences } = useContext(UserPreferencesContext);
  const currentTheme = propTheme || getThemeColors(preferences);
  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",
        padding: "2rem 0",
        background: "var(--color-background)",
        borderTop: "1px solid var(--color-border)",
        color: "var(--color-text)",
      }}
    >
      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1rem" }}>
        <p
          style={{
            color: "var(--color-muted)",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          © 2024 {preferences.cookbookName || "Winsome Designs Cookbook"} •
          Version {version}
        </p>
        <p
          style={{
            color: "var(--color-accent)",
            fontSize: "0.8rem",
            marginTop: "0.5rem",
          }}
        >
          Built with love for preserving family recipes
        </p>
      </div>
    </footer>
  );
};

export default Footer;
