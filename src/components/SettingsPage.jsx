// Exact Winsome Designs Settings Page - Complete Implementation
import React, { useState, useContext, useEffect, useRef } from "react";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";

// Exact font family from specifications
const fontFamily =
  'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

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
  const [status, setStatus] = useState({ type: '', message: '' });
  const { preferences, updatePreferences } = useContext(UserPreferencesContext);
  const [cookbookName, setCookbookName] = useState(
    preferences.cookbookName || "Winsome Designs",
  );
  const [displayName, setDisplayName] = useState(
    preferences.userName || "Chef",
  );
  const [selectedTheme, setSelectedTheme] = useState(preferences.theme || "winsome");

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
      setStatus({ type: 'success', message: 'Changes saved successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to save changes.' });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 2500);
  };

  const themes = [
    {
      id: "winsome",
      name: "Winsome",
      colors: ["rgb(252, 161, 126)", "rgb(218, 98, 125)", "rgb(154, 52, 142)"],
      gradient:
        "linear-gradient(135deg, rgb(246, 220, 198) 0%, rgba(252, 161, 126, 0.2) 50%, rgba(218, 98, 125, 0.2) 100%)",
      selected: true,
    },
    {
      id: "emerald",
      name: "Emerald Glow",
      colors: ["#225560", "#3ddc97", "#3d2b3d"],
      gradient: "linear-gradient(135deg, #225560 0%, #3ddc97 50%, #3d2b3d 100%)",
      selected: false,
    },
    {
      id: "rustic",
      name: "Rustic Garden",
      colors: ["#a57f60", "#f2e791", "#c880b7"],
      gradient: "linear-gradient(135deg, #f2e791 0%, #a57f60 50%, #c880b7 100%)",
      selected: false,
    },
    {
      id: "ocean",
      name: "Ocean",
      colors: ["#4F8EF7", "#235390", "#38B6FF"],
      gradient: "linear-gradient(135deg, #E0F1FF 0%, #4F8EF7 50%, #235390 100%)",
      selected: false,
    },
  ];

  // Theme palette for preview
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
  const currentTheme = themePalettes[selectedTheme] || themePalettes["winsome"];
  return (
    <div
      style={{
        minHeight: "100vh",
        background: currentTheme.background,
        fontFamily: fontFamily,
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "24px",
        color: currentTheme.text,
      }}
    >
      {/* Status Message */}
      {status.message && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: status.type === 'success'
              ? 'rgba(34,197,94,0.75)'
              : 'rgba(218,98,125,0.75)',
            color: 'white',
            padding: '12px 32px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '18px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: status.type === 'success'
              ? '2px solid rgba(16,185,129,0.75)'
              : '2px solid rgba(154,52,142,0.75)',
            transition: 'opacity 0.3s',
            opacity: status.message ? 1 : 0,
            fontFamily: fontFamily,
            backdropFilter: 'blur(2px)',
          }}
        >
          {status.message}
        </div>
      )}
      {/* Header */}
      <header
        style={{
          background: "rgb(246, 220, 198)",
          borderBottom: "1px solid rgba(230, 202, 179, 0.2)",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            maxWidth: "1024px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left Side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={onBack}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "6px",
                transition: "background-color 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(252, 161, 126, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              <BackIcon size={18} />
            </button>

            <div
              style={{
                width: "32px",
                height: "32px",
                background: "rgb(154, 52, 142)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SettingsIcon size={20} />
            </div>

            <h1
              style={{
                fontSize: "20px",
                fontWeight: "700",
                margin: "0",
                color: "rgb(16, 8, 43)",
                fontFamily: fontFamily,
              }}
            >
              Settings
            </h1>
          </div>

          {/* Right Side */}
          <button
            onClick={handleSaveChanges}
            style={{
              background: "rgb(154, 52, 142)",
              color: "white",
              fontWeight: "600",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              fontFamily: fontFamily,
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(154, 52, 142, 0.9)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgb(154, 52, 142)")
            }
          >
            Save Changes
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1024px",
          margin: "auto",
          padding: "32px 16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Card 1: Personal Information */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(230, 202, 179, 0.2)",
              borderRadius: "12px",
            }}
          >
            <div style={{ padding: "24px 24px 0" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0",
                  color: "rgb(16, 8, 43)",
                  fontFamily: fontFamily,
                }}
              >
                Personal Information
              </h2>
            </div>

            <div style={{ padding: "0 24px 24px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {/* Cookbook Name */}
                <div>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "rgb(16, 8, 43)",
                      marginBottom: "8px",
                      display: "block",
                      fontFamily: fontFamily,
                    }}
                  >
                    Cookbook Name
                  </label>
                  <input
                    type="text"
                    value={cookbookName}
                    onChange={handleCookbookNameChange}
                    style={{
                      width: "100%",
                      background: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid rgba(230, 202, 179, 0.3)",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      fontSize: "14px",
                      color: "rgb(16, 8, 43)",
                      fontFamily: fontFamily,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(16, 8, 43, 0.6)",
                      marginTop: "4px",
                      margin: "4px 0 0 0",
                      fontFamily: fontFamily,
                    }}
                  >
                    This appears in your cookbook header and footer
                  </p>
                </div>

                {/* Display Name */}
                <div>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "rgb(16, 8, 43)",
                      marginBottom: "8px",
                      display: "block",
                      fontFamily: fontFamily,
                    }}
                  >
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={handleDisplayNameChange}
                    style={{
                      width: "100%",
                      background: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid rgba(230, 202, 179, 0.3)",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      fontSize: "14px",
                      color: "rgb(16, 8, 43)",
                      fontFamily: fontFamily,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(16, 8, 43, 0.6)",
                      marginTop: "4px",
                      margin: "4px 0 0 0",
                      fontFamily: fontFamily,
                    }}
                  >
                    How you'd like to be greeted on the homepage
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Theme Selection */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(230, 202, 179, 0.2)",
              borderRadius: "12px",
            }}
          >
            <div style={{ padding: "24px 24px 0" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0",
                  color: "rgb(16, 8, 43)",
                  fontFamily: fontFamily,
                }}
              >
                Theme Selection
              </h2>
            </div>

            <div style={{ padding: "0 24px 24px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "16px",
                }}
              >
                {themes.map((theme) => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      style={{
                        width: "100%",
                        height: "96px",
                        borderRadius: "8px",
                        border: isSelected
                          ? "2px solid rgb(252, 161, 126)"
                          : "1px solid rgba(230, 202, 179, 0.3)",
                        background: theme.gradient,
                        padding: "12px",
                        cursor: "pointer",
                        position: "relative",
                        transition: "border-color 0.2s ease",
                        boxSizing: "border-box",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.target.style.borderColor = "rgba(230, 202, 179, 0.6)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.target.style.borderColor = "rgba(230, 202, 179, 0.3)";
                        }
                      }}
                    >
                      {/* Color Dots */}
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          marginBottom: "8px",
                        }}
                      >
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: color,
                            }}
                          />
                        ))}
                      </div>

                      {/* Theme Name */}
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "rgb(16, 8, 43)",
                          fontFamily: fontFamily,
                        }}
                      >
                        {theme.name}
                      </div>

                      {/* Selected Indicator */}
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "24px",
                            height: "24px",
                            background: "rgb(252, 161, 126)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "12px",
                              height: "12px",
                              background: "rgb(16, 8, 43)",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 3: App Preferences */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(230, 202, 179, 0.2)",
              borderRadius: "12px",
            }}
          >
            <div style={{ padding: "24px 24px 0" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0",
                  color: "rgb(16, 8, 43)",
                  fontFamily: fontFamily,
                }}
              >
                App Preferences
              </h2>
            </div>

            <div style={{ padding: "0 24px 24px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Auto-save */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "500",
                        color: "rgb(16, 8, 43)",
                        fontFamily: fontFamily,
                      }}
                    >
                      Auto-save Changes
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgba(16, 8, 43, 0.6)",
                        fontFamily: fontFamily,
                      }}
                    >
                      Automatically save your preferences
                    </div>
                  </div>
                  <button
                    style={{
                      border: "1px solid rgba(230, 202, 179, 0.3)",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "12px",
                      opacity: "0.5",
                      cursor: "not-allowed",
                      background: "transparent",
                      color: "rgb(16, 8, 43)",
                      fontFamily: fontFamily,
                    }}
                  >
                    Enabled
                  </button>
                </div>

                {/* Dark Mode */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "500",
                        color: "rgb(16, 8, 43)",
                        fontFamily: fontFamily,
                      }}
                    >
                      Dark Mode
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgba(16, 8, 43, 0.6)",
                        fontFamily: fontFamily,
                      }}
                    >
                      Switch to dark theme
                    </div>
                  </div>
                  <button
                    style={{
                      border: "1px solid rgba(230, 202, 179, 0.3)",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "12px",
                      opacity: "0.5",
                      cursor: "not-allowed",
                      background: "transparent",
                      color: "rgb(16, 8, 43)",
                      fontFamily: fontFamily,
                    }}
                  >
                    Coming Soon
                  </button>
                </div>

                {/* Export Data */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "500",
                        color: "rgb(16, 8, 43)",
                        fontFamily: fontFamily,
                      }}
                    >
                      Export Recipes
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgba(16, 8, 43, 0.6)",
                        fontFamily: fontFamily,
                      }}
                    >
                      Download your recipes as PDF
                    </div>
                  </div>
                  <button
                    style={{
                      border: "1px solid rgba(230, 202, 179, 0.3)",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "12px",
                      opacity: "0.5",
                      cursor: "not-allowed",
                      background: "transparent",
                      color: "rgb(16, 8, 43)",
                      fontFamily: fontFamily,
                    }}
                  >
                    Coming Soon
                  </button>
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
