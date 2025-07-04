// Header component for Winsome Designs
import React, { useContext } from "react";
import { CookbookLogoIcon, SettingsIcon } from "./icons/WinsomeIcons";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";

import Button from "./ui/Button";
import KebabMenu from "./KebabMenu";
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
          <div className="relative flex items-center">
            {/* KebabMenu temporarily disabled for main branch polish */}
            {/*
            <KebabMenu
              items={[
                { label: "Profile", key: "profile" },
                { label: "My Recipes", key: "my-recipes" },
                { type: "separator" },
                { label: "Logout", key: "logout", destructive: true },
              ]}
              onSelect={(item) => {
                // TODO: handle menu actions
                if (item.key === "logout") {
                  // You can trigger your logout logic here
                }
              }}
              className="z-20"
            />
            */}
            <span className="absolute left-0 top-0 w-10 h-10 bg-primary-brand rounded-xl flex items-center justify-center shadow-md pointer-events-none">
              <CookbookLogoIcon className="w-6 h-6 text-white" />
            </span>
            <div style={{ marginLeft: "52px" }}>
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
        </div>

        {/* Settings Button */}
        <Button
          onClick={onSettings}
          variant="tertiary"
          size="md"
          className="flex items-center gap-2"
        >
          <SettingsIcon style={{ width: 20, height: 20 }} color="#fff" />
          <span className="hidden sm:inline font-medium">Settings</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
