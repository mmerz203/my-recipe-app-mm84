// Exact Winsome Designs Homepage - Pixel Perfect Implementation
import React, { useContext } from "react";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";
import {
  getThemeColors,
  withAlpha,
  setThemeCSSVariables,
} from "../utils/themeSystem";

// Exact font family from specifications
const fontFamily =
  'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

// Exact Custom Icons with DOM specifications
const CookbookIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(16, 8, 43)"
    strokeWidth="2"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8M8 11h8M8 15h6" />
    <circle cx="7" cy="7" r="0.5" fill="rgb(16, 8, 43)" />
    <circle cx="7" cy="11" r="0.5" fill="rgb(16, 8, 43)" />
    <circle cx="7" cy="15" r="0.5" fill="rgb(16, 8, 43)" />
  </svg>
);

const PlusIcon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SettingsIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(16, 8, 43)"
    strokeWidth="2"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 0 2l.15.25a2 2 0 0 1 0 2l-.15.25a2 2 0 0 0 0 2l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0 0-2l-.15-.25a2 2 0 0 1 0-2l.15-.25a2 2 0 0 0 0-2l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Recipe Book Icon for View All Recipes (Dark color as specified)
const ViewIcon = ({ size = 32 }) => (
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
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8M8 11h8M8 15h6" />
    <circle cx="7" cy="7" r="0.5" fill="rgb(16, 8, 43)" />
    <circle cx="7" cy="11" r="0.5" fill="rgb(16, 8, 43)" />
    <circle cx="7" cy="15" r="0.5" fill="rgb(16, 8, 43)" />
  </svg>
);

const CustomizeIcon = ({ size = 32 }) => (
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
    <path d="m12 1 2.09 4.26L18 6.27l-1.81 3.37L20 12l-3.81 2.36L18 17.73l-3.91 1.01L12 23l-2.09-4.26L6 17.73l1.81-3.37L4 12l3.81-2.36L6 6.27l3.91-1.01L12 1z" />
  </svg>
);

const ExactHomepage = ({ onAddRecipe, onViewAllRecipes, onCustomize }) => {
  const { preferences } = useContext(UserPreferencesContext);
  const cookbookName =
    preferences.cookbookName && preferences.cookbookName.trim() !== ""
      ? preferences.cookbookName
      : "Winsome Designs";
  const userName =
    preferences.userName && preferences.userName.trim() !== ""
      ? preferences.userName
      : "Chef";

  // Use centralized theme system
  const currentTheme = getThemeColors(preferences);

  // Set CSS variables globally for the current theme
  React.useEffect(() => {
    setThemeCSSVariables(currentTheme);
  }, [currentTheme]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-background)",
        fontFamily: fontFamily,
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "24px",
        color: "var(--color-text)",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "24px 16px",
          background: "var(--color-background)",
          borderBottom: `1px solid ${withAlpha(getComputedStyle(document.documentElement).getPropertyValue("--color-accent") || currentTheme.accent, 0.2)}`,
        }}
      >
        <div
          style={{
            maxWidth: "1152px",
            margin: "auto",
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
              }}
            >
              <CookbookIcon size={24} />
            </div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "32px",
                marginLeft: "12px",
                color: "var(--color-text)",
                margin: "0 0 0 12px",
                fontFamily: fontFamily,
              }}
            >
              {cookbookName}
            </h1>
          </div>

          {/* Settings Button */}
          <button
            onClick={onCustomize}
            style={{
              height: "36px",
              padding: "12px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text)",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = withAlpha(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--color-primary",
                ) || currentTheme.primary,
                0.2,
              ))
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            <SettingsIcon size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1152px",
          margin: "auto",
          padding: "0 16px",
        }}
      >
        {/* Welcome Section */}
        <section
          style={{
            textAlign: "center",
            marginBottom: "64px",
            paddingTop: "48px",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "700",
              lineHeight: "40px",
              marginBottom: "16px",
              color: currentTheme.text,
              margin: "0 0 16px 0",
              fontFamily: fontFamily,
            }}
          >
            Welcome, {userName}!
          </h2>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "29.25px",
              color: "rgba(16, 8, 43, 0.7)",
              maxWidth: "672px",
              margin: "0 auto",
              fontFamily: fontFamily,
            }}
          >
            Your digital cookbook is ready to help you organize, create, and
            share your culinary masterpieces. Start building your recipe
            collection today.
          </p>
        </section>

        {/* Action Cards Grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            marginBottom: "64px",
          }}
        >
          {/* View All Recipes Card - Exact Specifications */}
          <div
            style={{
              background: withAlpha(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--color-background",
                ) || currentTheme.background,
                0.5,
              ),
              backdropFilter: "blur(4px)",
              borderRadius: "12px",
              border: "2px solid transparent",
              padding: "32px",
              textAlign: "center",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow:
                withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) || currentTheme.text,
                  0.05,
                ) + " 0px 1px 2px 0px",
              cursor: "pointer",
            }}
            onClick={onViewAllRecipes}
            aria-label="View All Recipes"
            data-testid="view-all-recipes-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.borderColor = withAlpha(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--color-primary",
                ) || currentTheme.primary,
                0.3,
              );
              e.currentTarget.style.boxShadow =
                "0 25px 50px -12px " +
                withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) || currentTheme.text,
                  0.25,
                );
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.boxShadow =
                withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) || currentTheme.text,
                  0.05,
                ) + " 0px 1px 2px 0px";
            }}
          >
            {/* Icon Circle */}
            <div
              style={{
                width: "64px",
                height: "64px",
                background: currentTheme.primary,
                borderRadius: "16px",
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              <ViewIcon size={32} />
            </div>

            {/* Card Title */}
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: currentTheme.text,
                marginBottom: "16px",
                margin: "0 0 16px 0",
                fontFamily: fontFamily,
              }}
            >
              View All Recipes
            </h3>

            {/* Card Description */}
            <p
              style={{
                color: withAlpha(currentTheme.text, 0.6),
                fontWeight: "400",
                flexGrow: "1",
                lineHeight: "1.5",
                fontSize: "16px",
                margin: "0",
                fontFamily: fontFamily,
              }}
            >
              Browse through your entire recipe collection, search for specific
              dishes, and organize by categories.
            </p>

            {/* Action Button */}
            <button
              onClick={onViewAllRecipes}
              aria-label="Browse Recipes"
              data-testid="browse-recipes-btn"
              style={{
                width: "100%",
                marginTop: "24px",
                background: "var(--color-primary)",
                color: "var(--color-text)",
                fontWeight: "600",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                fontFamily: fontFamily,
                fontSize: "14px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-primary",
                  ) || currentTheme.primary,
                  0.9,
                ))
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-primary",
                  ) || currentTheme.primary)
              }
            >
              Browse Recipes
            </button>
          </div>

          {/* Add New Recipe Card */}
          <div
            style={{
              background: withAlpha(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--color-background",
                ) || currentTheme.background,
                0.5,
              ),
              backdropFilter: "blur(4px)",
              borderRadius: "12px",
              border: "2px solid transparent",
              padding: "32px",
              textAlign: "center",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow:
                withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) || currentTheme.text,
                  0.05,
                ) + " 0px 1px 2px 0px",
              cursor: "pointer",
            }}
            onClick={onAddRecipe}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.borderColor = withAlpha(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--color-secondary",
                ) || currentTheme.secondary,
                0.3,
              );
              e.currentTarget.style.boxShadow =
                "0 25px 50px -12px " +
                withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) || currentTheme.text,
                  0.25,
                );
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.boxShadow =
                withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) || currentTheme.text,
                  0.05,
                ) + " 0px 1px 2px 0px";
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: currentTheme.secondary,
                borderRadius: "16px",
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              <PlusIcon size={32} />
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "16px",
                color: currentTheme.text,
                margin: "0 0 16px 0",
                fontFamily: fontFamily,
              }}
            >
              Add New Recipe
            </h3>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "400",
                color: withAlpha(currentTheme.text, 0.6),
                flexGrow: "1",
                margin: "0",
                lineHeight: "1.5",
                fontFamily: fontFamily,
              }}
            >
              Create a new recipe from scratch or use our OCR feature to
              digitize existing recipes.
            </p>
            <button
              onClick={onAddRecipe}
              style={{
                width: "100%",
                marginTop: "24px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                padding: "12px 16px",
                background: "var(--color-secondary)",
                color:
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) === "#f0fdfa"
                    ? "#222"
                    : "white",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                fontFamily: fontFamily,
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-secondary",
                  ) || currentTheme.secondary,
                  0.9,
                ))
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-secondary",
                  ) || currentTheme.secondary)
              }
            >
              Create Recipe
            </button>
          </div>

          {/* Customize Card */}
          <div
            style={{
              background: withAlpha(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--color-background",
                ) || currentTheme.background,
                0.5,
              ),
              backdropFilter: "blur(4px)",
              borderRadius: "12px",
              border: "2px solid transparent",
              padding: "32px",
              textAlign: "center",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow:
                withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) || currentTheme.text,
                  0.05,
                ) + " 0px 1px 2px 0px",
              cursor: "pointer",
            }}
            onClick={onCustomize}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.borderColor = withAlpha(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--color-accent",
                ) || currentTheme.accent,
                0.3,
              );
              e.currentTarget.style.boxShadow =
                "0 25px 50px -12px " +
                withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) || currentTheme.text,
                  0.25,
                );
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.boxShadow =
                withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-text",
                  ) || currentTheme.text,
                  0.05,
                ) + " 0px 1px 2px 0px";
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: currentTheme.accent,
                borderRadius: "16px",
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              <CustomizeIcon size={32} />
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "16px",
                color: currentTheme.text,
                margin: "0 0 16px 0",
                fontFamily: fontFamily,
              }}
            >
              Customize
            </h3>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "400",
                color: withAlpha(currentTheme.text, 0.6),
                flexGrow: "1",
                margin: "0",
                lineHeight: "1.5",
                fontFamily: fontFamily,
              }}
            >
              Personalize your cookbook name, display settings, and choose your
              preferred theme.
            </p>
            <button
              onClick={onCustomize}
              aria-label="Customize Settings"
              data-testid="customize-settings-btn"
              style={{
                width: "100%",
                marginTop: "24px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                padding: "12px 16px",
                background: "var(--color-accent)",
                color: "white",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                fontFamily: fontFamily,
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = withAlpha(
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-accent",
                  ) || currentTheme.accent,
                  0.9,
                ))
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor =
                  getComputedStyle(document.documentElement).getPropertyValue(
                    "--color-accent",
                  ) || currentTheme.accent)
              }
            >
              Settings
            </button>
          </div>
        </section>

        {/* Stats Dashboard */}
        <section
          style={{
            background: withAlpha(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--color-background",
              ) || currentTheme.background,
              0.3,
            ),
            backdropFilter: "blur(4px)",
            borderRadius: "24px",
            padding: "32px",
            border: `1px solid ${withAlpha(getComputedStyle(document.documentElement).getPropertyValue("--color-text") || currentTheme.text, 0.2)}`,
            marginBottom: "64px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "24px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  color: "var(--color-primary)",
                  fontFamily: fontFamily,
                }}
              >
                12
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: withAlpha(
                    getComputedStyle(document.documentElement).getPropertyValue(
                      "--color-text",
                    ) || currentTheme.text,
                    0.6,
                  ),
                  fontFamily: fontFamily,
                }}
              >
                Total Recipes
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  color: "var(--color-secondary)",
                  fontFamily: fontFamily,
                }}
              >
                6
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: withAlpha(
                    getComputedStyle(document.documentElement).getPropertyValue(
                      "--color-text",
                    ) || currentTheme.text,
                    0.6,
                  ),
                  fontFamily: fontFamily,
                }}
              >
                Categories
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  color: "var(--color-accent)",
                  fontFamily: fontFamily,
                }}
              >
                8
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: withAlpha(
                    getComputedStyle(document.documentElement).getPropertyValue(
                      "--color-text",
                    ) || currentTheme.text,
                    0.6,
                  ),
                  fontFamily: fontFamily,
                }}
              >
                Favorites
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  color: "var(--color-primary)",
                  fontFamily: fontFamily,
                }}
              >
                3
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: withAlpha(
                    getComputedStyle(document.documentElement).getPropertyValue(
                      "--color-text",
                    ) || currentTheme.text,
                    0.6,
                  ),
                  fontFamily: fontFamily,
                }}
              >
                This Week
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          h2 {
            font-size: 29px !important;
            line-height: 33px !important;
          }
          .subtitle {
            font-size: 16px !important;
            line-height: 26px !important;
          }
          h3 {
            font-size: 18px !important;
          }
          .card-description {
            font-size: 14px !important;
            line-height: 21px !important;
          }
          .stats-number {
            font-size: 20px !important;
          }
          .stats-label {
            font-size: 12px !important;
          }
          .card-button {
            font-size: 13px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ExactHomepage;
