// Header component for Winsome Designs
import React, { useContext } from "react";
import { CookbookLogoIcon, SettingsIcon } from "./icons/WinsomeIcons";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";

import Button from "./ui/Button";
import IconButton from "./ui/IconButton";
import KebabMenu from "./KebabMenu";
import { getThemeColors } from "../utils/themeSystem";
import { ICON_SIZES } from "../utils/iconUtils";

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
            {/* KebabMenu enabled for all pages, using static CookbookLogoIcon as trigger */}
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
              triggerIcon={
                <CookbookLogoIcon
                  className="w-8 h-8 text-white"
                  color="white"
                />
              }
            />
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
          <SettingsIcon
            className="w-5 h-5"
            color="currentColor"
            aria-hidden="true"
          />
          <span className="hidden sm:inline font-medium">Settings</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
