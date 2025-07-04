// Exact Winsome Designs Homepage - Pixel Perfect Implementation
import React, { useContext } from "react";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";
import {
  getThemeColors,
  withAlpha,
  setThemeCSSVariables,
} from "../utils/themeSystem";
import Button from "./ui/Button";

import { CookbookLogoIcon } from "./icons/WinsomeIcons";
import { AddRecipeIcon, ViewAllRecipesIcon, SettingsIcon } from "./icons/WinsomeIcons";

// Exact font family from specifications
const fontFamily =
  'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

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
            <SettingsIcon className="w-5 h-5" color="var(--color-text)" />
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
              <ViewAllRecipesIcon className="w-8 h-8" color="white" />
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
            <Button
              onClick={onViewAllRecipes}
              variant="primary"
              size="md"
              className="w-full mt-6"
              aria-label="Browse Recipes"
              data-testid="browse-recipes-btn"
            >
              Browse Recipes
            </Button>
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
              <AddRecipeIcon className="w-8 h-8" color="white" />
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
            <Button
              onClick={onAddRecipe}
              variant="secondary"
              size="md"
              className="w-full mt-6"
            >
              Create Recipe
            </Button>
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
              <SettingsIcon className="w-8 h-8" color="white" />
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
            <Button
              onClick={onCustomize}
              variant="tertiary"
              size="md"
              className="w-full mt-6"
              aria-label="Customize Settings"
              data-testid="customize-settings-btn"
            >
              Settings
            </Button>
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
