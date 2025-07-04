// Exact Winsome Designs Settings Page - Complete Implementation
import React, { useState, useContext, useEffect, useRef } from "react";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";
import { getThemeColors } from "../utils/themeSystem";
import Button from "./ui/Button";

// Font family now handled by Tailwind classes

// Back Arrow Icon
const BackIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(16, 8, 43)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

// Settings Icon
const SettingsIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m6-9h-6m-6 0h6" />
    <path d="m21 12-4.35-4.35M3 12l4.35-4.35m0 8.7L3 12m14.65 4.35L21 12" />
  </svg>
);

const SettingsPage = ({ onBack }) => {
  // Status message state
  const [status, setStatus] = useState({ type: "", message: "" });
  const { preferences, updatePreferences } = useContext(UserPreferencesContext);
  const [cookbookName, setCookbookName] = useState(
    preferences.cookbookName || "Winsome Designs",
  );
  const [displayName, setDisplayName] = useState(
    preferences.userName || "Chef",
  );
  const [selectedTheme, setSelectedTheme] = useState(
    preferences.theme || "winsome",
  );

  // Debounce timeout ref
  const debounceTimeoutRef = useRef({});

  // Sync with preferences when user changes (not on every keystroke)
  useEffect(() => {
    setCookbookName(preferences.cookbookName || "Winsome Designs");
    setDisplayName(preferences.userName || "Chef");
    setSelectedTheme(preferences.theme || "winsome");
  }, [preferences.userName, preferences.cookbookName, preferences.theme]);

  // Debounce function
  const debounceUpdate = (key, value, delay = 500) => {
    if (debounceTimeoutRef.current[key]) {
      clearTimeout(debounceTimeoutRef.current[key]);
    }
    debounceTimeoutRef.current[key] = setTimeout(() => {
      updatePreferences({ [key]: value });
    }, delay);
  };

  const handleCookbookNameChange = (e) => {
    setCookbookName(e.target.value);
    debounceUpdate("cookbookName", e.target.value);
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    debounceUpdate("userName", e.target.value);
  };

  const handleSaveChanges = () => {
    try {
      updatePreferences({
        cookbookName: cookbookName,
        userName: displayName,
        theme: selectedTheme,
      });
      setStatus({ type: "success", message: "Changes saved successfully!" });
    } catch (err) {
      setStatus({ type: "error", message: "Failed to save changes." });
    }
    setTimeout(() => setStatus({ type: "", message: "" }), 2500);
  };

  const themeRoles = [
    "Background",
    "Primary",
    "Secondary",
    "Tertiary",
    "Text",
    "Muted",
    "Border",
    "Error",
  ];
  const themes = [
    {
      id: "winsome",
      name: "Winsome",
      palette: [
        "#f6dcca", // background
        "#fca17d", // primary-orange
        "#da627d", // secondary-rose
        "#9a348e", // tertiary-purple
        "#10082b", // text-dark
        "rgba(16, 8, 43, 0.7)", // text-muted
        "rgba(230, 202, 179, 0.2)", // border-subtle
        "#d36060", // error
      ],
      gradient:
        "linear-gradient(135deg, rgb(246, 220, 198) 0%, rgba(252, 161, 126, 0.2) 50%, rgba(218, 98, 125, 0.2) 100%)",
      selected: true,
    },
    {
      id: "azure-sunset",
      name: "Azure Sunset",
      palette: [
        "#f0f8ff", // background
        "#4682b4", // primary
        "#ff7f50", // secondary
        "#2f4f4f", // tertiary
        "#1a1a2e", // text
        "rgba(26, 26, 46, 0.7)", // muted
        "rgba(70, 130, 180, 0.2)", // border
        "#d36060", // error (fallback)
      ],
      gradient:
        "linear-gradient(135deg, #f0f8ff 0%, #4682b4 50%, #ff7f50 100%)",
      selected: false,
    },
    {
      id: "emerald-bloom",
      name: "Emerald Bloom",
      palette: [
        "#f5f5f5", // background
        "#3cb371", // primary
        "#8a2be2", // secondary
        "#4b0082", // tertiary
        "#191970", // text
        "rgba(25, 25, 112, 0.7)", // muted
        "rgba(60, 179, 113, 0.2)", // border
        "#d36060", // error (fallback)
      ],
      gradient:
        "linear-gradient(135deg, #f5f5f5 0%, #3cb371 50%, #8a2be2 100%)",
      selected: false,
    },
    {
      id: "golden-meadow",
      name: "Golden Meadow",
      palette: [
        "#fffacd", // background
        "#ffd700", // primary
        "#b8860b", // secondary
        "#556b2f", // tertiary
        "#36454F", // text
        "rgba(54, 69, 79, 0.7)", // muted
        "rgba(255, 215, 0, 0.2)", // border
        "#d36060", // error (fallback)
      ],
      gradient:
        "linear-gradient(135deg, #fffacd 0%, #ffd700 50%, #b8860b 100%)",
      selected: false,
    },
  ];

  // Use centralized theme system
  const currentTheme = getThemeColors({ theme: selectedTheme });
  return (
    <div className="min-h-screen bg-background text-text-dark font-sans text-base font-normal leading-6">
      {/* Status Message */}
      {status.message && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[1000] px-8 py-3 rounded-lg font-semibold text-lg shadow-lg backdrop-blur-sm transition-opacity ${status.type === "success" ? "bg-green-500/75 border-2 border-green-400/75" : "bg-secondary-rose/75 border-2 border-tertiary-purple/75"} text-white`}
          style={{ opacity: status.message ? 1 : 0 }}
        >
          {status.message}
        </div>
      )}
      {/* Header */}
      <header className="bg-background border-b border-neutral-subtle py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="ghost" size="md" className="p-3">
              <BackIcon size={18} />
            </Button>
            <div className="w-8 h-8 bg-tertiary-purple rounded-lg flex items-center justify-center">
              <SettingsIcon size={20} />
            </div>
            <h1 className="text-xl font-bold m-0 text-text-dark font-sans">
              Settings
            </h1>
          </div>

          {/* Right Side */}
          <Button onClick={handleSaveChanges} variant="primary" size="md">
            Save Changes
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-col gap-8">
          {/* Card 1: Personal Information */}
          <div className="bg-card backdrop-blur-sm border border-neutral-subtle rounded-xl">
            <div className="pt-6 px-6 pb-0">
              <h2 className="text-lg font-semibold m-0 text-text-dark font-sans">
                Personal Information
              </h2>
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-col gap-6">
                {/* Cookbook Name */}
                <div>
                  <label className="text-sm font-medium text-text-dark mb-2 block font-sans">
                    Cookbook Name
                  </label>
                  <input
                    type="text"
                    value={cookbookName}
                    onChange={handleCookbookNameChange}
                    className="w-full bg-white/50 border border-neutral-subtle rounded-md px-3 py-2 text-sm text-text-dark font-sans outline-none box-border"
                  />
                  <p className="text-xs text-text-dark/60 mt-1 font-sans">
                    This appears in your cookbook header and footer
                  </p>
                </div>

                {/* Display Name */}
                <div>
                  <label className="text-sm font-medium text-text-dark mb-2 block font-sans">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={handleDisplayNameChange}
                    className="w-full bg-white/50 border border-neutral-subtle rounded-md px-3 py-2 text-sm text-text-dark font-sans outline-none box-border"
                  />
                  <p className="text-xs text-text-dark/60 mt-1 font-sans">
                    How you'd like to be greeted on the homepage
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Theme Selection */}
          <div className="bg-white/50 backdrop-blur-sm border border-neutral-subtle rounded-xl">
            <div className="pt-6 px-6 pb-0">
              <h2 className="text-lg font-semibold m-0 text-text-dark font-sans">
                Theme Selection
              </h2>
            </div>
            <div className="px-6 pb-6">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
                {themes.map((theme) => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`w-full h-24 rounded-lg p-3 cursor-pointer relative transition-colors box-border flex flex-col justify-between ${isSelected ? "border-2 border-primary-brand" : "border border-neutral-subtle"}`}
                      style={{ background: theme.gradient }}
                    >
                      {/* Color Swatches for All Roles */}
                      <div className="flex gap-1 mb-2">
                        {theme.palette.map((color, index) => (
                          <div
                            key={index}
                            title={themeRoles[index]}
                            className="w-4 h-4 rounded bg-white inline-block border border-gray-200"
                            style={{ background: color }}
                          />
                        ))}
                      </div>
                      {/* Theme Name */}
                      <div className="text-xs font-medium text-text-dark font-sans">
                        {theme.name}
                      </div>
                      {/* Selected Indicator */}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-brand rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-text-dark rounded-full" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 3: App Preferences */}
          <div className="bg-white/50 backdrop-blur-sm border border-neutral-subtle rounded-xl">
            <div className="pt-6 px-6 pb-0">
              <h2 className="text-lg font-semibold m-0 text-text-dark font-sans">
                App Preferences
              </h2>
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-col gap-4">
                {/* Auto-save */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-text-dark font-sans">
                      Auto-save Changes
                    </div>
                    <div className="text-sm text-text-dark/60 font-sans">
                      Automatically save your preferences
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    disabled
                    className="opacity-50"
                  >
                    Enabled
                  </Button>
                </div>

                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-text-dark font-sans">
                      Dark Mode
                    </div>
                    <div className="text-sm text-text-dark/60 font-sans">
                      Switch to dark theme
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    disabled
                    className="opacity-50"
                  >
                    Coming Soon
                  </Button>
                </div>

                {/* Export Data */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-text-dark font-sans">
                      Export Recipes
                    </div>
                    <div className="text-sm text-text-dark/60 font-sans">
                      Download your recipes as PDF
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    disabled
                    className="opacity-50"
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
