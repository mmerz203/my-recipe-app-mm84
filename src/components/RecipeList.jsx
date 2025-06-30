// Complete Recipe List Page - Exact Winsome Designs Implementation
import React, { useState, useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { AuthContext } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

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

// Recipe Book Icon (Exact Custom SVG)
const RecipeBookIcon = ({ size = 20, color = "rgb(16, 8, 43)" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8M8 11h8M8 15h6" />
    <circle cx="7" cy="7" r="0.5" fill={color} />
    <circle cx="7" cy="11" r="0.5" fill={color} />
    <circle cx="7" cy="15" r="0.5" fill={color} />
  </svg>
);

// Plus Icon
const PlusIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// Search Icon
const SearchIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(16, 8, 43, 0.4)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// Filter Icon
const FilterIcon = ({ size = 18 }) => (
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
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
  </svg>
);

const RecipeList = ({ onSelectRecipe, onAddRecipe, onBackToHome }) => {
  const { recipes, loading, error } = useContext(RecipeContext);
  const { userId } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecipes =
    recipes?.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recipe.ingredients &&
          recipe.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchTerm.toLowerCase()),
          )),
    ) || [];

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "rgb(246, 220, 198)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fontFamily,
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "rgb(246, 220, 198)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fontFamily,
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "rgb(16, 8, 43)",
            fontSize: "18px",
          }}
        >
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgb(246, 220, 198)",
        fontFamily: fontFamily,
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "24px",
        color: "rgb(16, 8, 43)",
      }}
    >
      {/* Header - Exact Specifications */}
      <header
        style={{
          background: "rgb(246, 220, 198)",
          borderBottom: "1px solid rgba(230, 202, 179, 0.2)",
          padding: "24px 16px",
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
          {/* Left Side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={onBackToHome}
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
                background: "rgb(252, 161, 126)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RecipeBookIcon size={20} color="rgb(16, 8, 43)" />
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
              All Recipes
            </h1>
          </div>

          {/* Right Side */}
          <button
            onClick={onAddRecipe}
            style={{
              background: "rgb(252, 161, 126)",
              color: "rgb(16, 8, 43)",
              fontWeight: "600",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              fontFamily: fontFamily,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(252, 161, 126, 0.9)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgb(252, 161, 126)")
            }
          >
            <PlusIcon size={18} />
            Add Recipe
          </button>
        </div>
      </header>

      {/* Search & Filter Section - Exact Specifications */}
      <section
        style={{
          maxWidth: "1152px",
          margin: "auto",
          padding: "32px 16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Search Input Container */}
          <div style={{ position: "relative", flex: "1" }}>
            {/* Search Icon Inside Input */}
            <div
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: "1",
              }}
            >
              <SearchIcon size={20} />
            </div>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(230, 202, 179, 0.3)",
                borderRadius: "6px",
                padding: "8px 12px 8px 40px",
                fontSize: "14px",
                color: "rgb(16, 8, 43)",
                width: "100%",
                fontFamily: fontFamily,
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(252, 161, 126, 0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(230, 202, 179, 0.3)")
              }
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              border: "1px solid rgba(230, 202, 179, 0.3)",
              background: "transparent",
              color: "rgb(16, 8, 43)",
              padding: "8px 16px",
              borderRadius: "6px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              fontFamily: fontFamily,
              width: "fit-content",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(252, 161, 126, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            <FilterIcon size={18} />
            Filter
          </button>
        </div>

        {/* Responsive CSS for Desktop */}
        <style>{`
          @media (min-width: 640px) {
            .search-filter-responsive {
              flex-direction: row !important;
            }
          }
        `}</style>
      </section>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1152px",
          margin: "auto",
          padding: "0 16px 64px",
        }}
      >
        {!recipes || recipes.length === 0 || filteredRecipes.length === 0 ? (
          // Empty State - Exact Specifications
          <div
            style={{
              textAlign: "center",
              padding: "64px 16px",
            }}
          >
            {/* Large Icon Circle */}
            <div
              style={{
                width: "96px",
                height: "96px",
                background: "rgba(252, 161, 126, 0.2)",
                borderRadius: "24px",
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RecipeBookIcon size={48} color="rgb(252, 161, 126)" />
            </div>

            {/* Empty State Title */}
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "600",
                color: "rgb(16, 8, 43)",
                marginBottom: "16px",
                margin: "0 0 16px 0",
                fontFamily: fontFamily,
              }}
            >
              {searchTerm ? "No Recipes Found" : "No Recipes Yet"}
            </h2>

            {/* Empty State Description */}
            <p
              style={{
                color: "rgba(16, 8, 43, 0.6)",
                fontSize: "16px",
                marginBottom: "32px",
                maxWidth: "448px",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: "1.5",
                fontFamily: fontFamily,
                margin: "0 auto 32px auto",
              }}
            >
              {searchTerm
                ? `No recipes match "${searchTerm}". Try different search terms or browse all recipes.`
                : "Start building your digital cookbook by adding your first recipe. You can create from scratch or use our OCR feature."}
            </p>

            {/* Empty State CTA Button */}
            <button
              onClick={onAddRecipe}
              style={{
                background: "rgb(252, 161, 126)",
                color: "rgb(16, 8, 43)",
                fontWeight: "600",
                padding: "12px 24px",
                borderRadius: "12px",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                fontFamily: fontFamily,
                fontSize: "16px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(252, 161, 126, 0.9)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgb(252, 161, 126)")
              }
            >
              <PlusIcon size={18} />
              {searchTerm ? "Add New Recipe" : "Add Your First Recipe"}
            </button>
          </div>
        ) : (
          // Future Recipe Grid - Ready for Population
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
              padding: "0 16px",
            }}
          >
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe.id)}
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(4px)",
                  borderRadius: "12px",
                  border: "1px solid rgba(230, 202, 179, 0.2)",
                  overflow: "hidden",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Recipe Image Placeholder */}
                <div
                  style={{
                    height: "200px",
                    background: "rgba(252, 161, 126, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {recipe.imageUrl ? (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <RecipeBookIcon size={48} color="rgba(16, 8, 43, 0.4)" />
                  )}
                </div>

                {/* Recipe Info */}
                <div style={{ padding: "16px" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "rgb(16, 8, 43)",
                      margin: "0 0 8px 0",
                      fontFamily: fontFamily,
                    }}
                  >
                    {recipe.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "rgba(16, 8, 43, 0.6)",
                      margin: "0",
                      fontFamily: fontFamily,
                    }}
                  >
                    {recipe.category || "Uncategorized"}
                    {recipe.servings && ` • Serves ${recipe.servings}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RecipeList;
