// Add New Recipe Form Page - Complete Recreation for Winsome Designs
import React, { useState, useEffect, useRef } from "react";

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

// Plus Icon for Header
const PlusIcon = ({ size = 20, color = "rgba(255, 255, 255, 1)" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// Large Plus Icon for OCR Upload
const LargePlusIcon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgb(154, 52, 142)"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const AddEditRecipeForm = ({ initialRecipe, onSave, onCancel }) => {
  const [recipe, setRecipe] = useState(
    initialRecipe || {
      name: "",
      description: "",
      prepTime: "",
      cookTime: "",
      ingredients: "",
      instructions: "",
      category: "Main Course",
      servings: "",
      imageUrl: "",
      isPublic: false,
    },
  );

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Update state when initialRecipe changes (for editing)
  useEffect(() => {
    if (initialRecipe) {
      setRecipe({
        ...initialRecipe,
        ingredients: Array.isArray(initialRecipe.ingredients)
          ? initialRecipe.ingredients.join("\n")
          : initialRecipe.ingredients || "",
        instructions: Array.isArray(initialRecipe.instructions)
          ? initialRecipe.instructions.join("\n")
          : initialRecipe.instructions || "",
      });
    }
  }, [initialRecipe]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (files) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!recipe.name.trim()) newErrors.name = "Recipe title is required";
    if (!recipe.ingredients.trim())
      newErrors.ingredients = "Ingredients are required";
    if (!recipe.instructions.trim())
      newErrors.instructions = "Instructions are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const recipeToSave = {
      ...recipe,
      ingredients: recipe.ingredients
        .split("\n")
        .filter((line) => line.trim() !== ""),
      instructions: recipe.instructions
        .split("\n")
        .filter((line) => line.trim() !== ""),
      servings: parseFloat(recipe.servings) || 1,
    };

    onSave(recipeToSave);
  };

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
      {/* Header Section - Exact Specifications */}
      <header
        style={{
          backgroundColor: "rgb(246, 220, 198)",
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
              onClick={onCancel}
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
                background: "rgb(218, 98, 125)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlusIcon size={20} color="rgba(255, 255, 255, 1)" />
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
              {initialRecipe ? "Edit Recipe" : "Add New Recipe"}
            </h1>
          </div>

          {/* Button Group (Right) */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={onCancel}
              style={{
                border: "1px solid rgba(230, 202, 179, 0.3)",
                background: "transparent",
                color: "rgb(16, 8, 43)",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                fontFamily: fontFamily,
                fontWeight: "500",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(230, 202, 179, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              style={{
                background: "rgb(218, 98, 125)",
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
                (e.target.style.backgroundColor = "rgba(218, 98, 125, 0.9)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgb(218, 98, 125)")
              }
            >
              {initialRecipe ? "Update Recipe" : "Save Recipe"}
            </button>
          </div>
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
        <form onSubmit={handleSubmit}>
          {/* Top Section - 2 Column Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
              marginBottom: "32px",
            }}
          >
            {/* Card 1: Recipe Details (Left Column) */}
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
                    color: "rgb(16, 8, 43)",
                    margin: "0",
                    fontFamily: fontFamily,
                  }}
                >
                  Recipe Details
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
                  {/* Recipe Title Field */}
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
                      Recipe Title
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={recipe.name}
                      onChange={handleChange}
                      placeholder="Enter recipe name..."
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        border: `1px solid ${errors.name ? "rgb(211, 96, 96)" : "rgba(230, 202, 179, 0.3)"}`,
                        borderRadius: "6px",
                        padding: "8px 12px",
                        fontSize: "14px",
                        color: "rgb(16, 8, 43)",
                        width: "100%",
                        fontFamily: fontFamily,
                        outline: "none",
                        boxSizing: "border-box",
                        backgroundColor: errors.name
                          ? "rgba(211, 96, 96, 0.05)"
                          : "rgba(255, 255, 255, 0.5)",
                      }}
                      onFocus={(e) => {
                        e.target.style.outline = "2px solid rgb(218, 98, 125)";
                        e.target.style.outlineOffset = "2px";
                        e.target.style.borderColor = "rgb(218, 98, 125)";
                      }}
                      onBlur={(e) => {
                        e.target.style.outline = "none";
                        e.target.style.borderColor = errors.name
                          ? "rgb(211, 96, 96)"
                          : "rgba(230, 202, 179, 0.3)";
                      }}
                    />
                    {errors.name && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgb(211, 96, 96)",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Description Field */}
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
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={recipe.description}
                      onChange={handleChange}
                      placeholder="Brief description of the recipe..."
                      rows="3"
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        border: "1px solid rgba(230, 202, 179, 0.3)",
                        borderRadius: "6px",
                        padding: "8px 12px",
                        fontSize: "14px",
                        color: "rgb(16, 8, 43)",
                        width: "100%",
                        minHeight: "72px",
                        resize: "vertical",
                        fontFamily: fontFamily,
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.target.style.outline = "2px solid rgb(218, 98, 125)";
                        e.target.style.outlineOffset = "2px";
                        e.target.style.borderColor = "rgb(218, 98, 125)";
                      }}
                      onBlur={(e) => {
                        e.target.style.outline = "none";
                        e.target.style.borderColor = "rgba(230, 202, 179, 0.3)";
                      }}
                    />
                  </div>

                  {/* Time Fields (2-column sub-grid) */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
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
                        Prep Time
                      </label>
                      <input
                        type="text"
                        name="prepTime"
                        value={recipe.prepTime}
                        onChange={handleChange}
                        placeholder="15 minutes"
                        style={{
                          background: "rgba(255, 255, 255, 0.5)",
                          border: "1px solid rgba(230, 202, 179, 0.3)",
                          borderRadius: "6px",
                          padding: "8px 12px",
                          fontSize: "14px",
                          color: "rgb(16, 8, 43)",
                          width: "100%",
                          fontFamily: fontFamily,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                          e.target.style.outline =
                            "2px solid rgb(218, 98, 125)";
                          e.target.style.outlineOffset = "2px";
                          e.target.style.borderColor = "rgb(218, 98, 125)";
                        }}
                        onBlur={(e) => {
                          e.target.style.outline = "none";
                          e.target.style.borderColor =
                            "rgba(230, 202, 179, 0.3)";
                        }}
                      />
                    </div>

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
                        Cook Time
                      </label>
                      <input
                        type="text"
                        name="cookTime"
                        value={recipe.cookTime}
                        onChange={handleChange}
                        placeholder="30 minutes"
                        style={{
                          background: "rgba(255, 255, 255, 0.5)",
                          border: "1px solid rgba(230, 202, 179, 0.3)",
                          borderRadius: "6px",
                          padding: "8px 12px",
                          fontSize: "14px",
                          color: "rgb(16, 8, 43)",
                          width: "100%",
                          fontFamily: fontFamily,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                          e.target.style.outline =
                            "2px solid rgb(218, 98, 125)";
                          e.target.style.outlineOffset = "2px";
                          e.target.style.borderColor = "rgb(218, 98, 125)";
                        }}
                        onBlur={(e) => {
                          e.target.style.outline = "none";
                          e.target.style.borderColor =
                            "rgba(230, 202, 179, 0.3)";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: OCR Recipe Import (Right Column) */}
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
                    color: "rgb(16, 8, 43)",
                    margin: "0",
                    fontFamily: fontFamily,
                  }}
                >
                  OCR Recipe Import
                </h2>
              </div>

              <div style={{ padding: "0 24px 24px" }}>
                {/* OCR Upload Section */}
                <div
                  style={{
                    border: `2px dashed ${isDragging ? "rgb(154, 52, 142)" : "rgba(230, 202, 179, 0.4)"}`,
                    borderRadius: "8px",
                    padding: "32px",
                    textAlign: "center",
                    background: isDragging
                      ? "rgba(154, 52, 142, 0.05)"
                      : "transparent",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {/* Purple Icon Circle */}
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      background: "rgba(154, 52, 142, 0.2)",
                      borderRadius: "16px",
                      margin: "0 auto 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LargePlusIcon size={32} />
                  </div>

                  {/* Upload Text */}
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "rgb(16, 8, 43)",
                      margin: "0 0 8px 0",
                      fontFamily: fontFamily,
                    }}
                  >
                    Upload Recipe Image
                  </h3>

                  <p
                    style={{
                      color: "rgba(16, 8, 43, 0.6)",
                      marginBottom: "16px",
                      margin: "0 0 16px 0",
                      fontFamily: fontFamily,
                      fontSize: "14px",
                      lineHeight: "1.4",
                    }}
                  >
                    Take a photo or upload an image of your recipe, and we'll
                    extract the text for you.
                  </p>

                  {/* Upload Button */}
                  <button
                    type="button"
                    style={{
                      border: "1px solid rgba(154, 52, 142, 0.3)",
                      color: "rgb(154, 52, 142)",
                      background: "transparent",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                      fontFamily: fontFamily,
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor =
                        "rgba(154, 52, 142, 0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Choose File
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Large Text Areas */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
            }}
          >
            {/* Card 3: Ingredients (Left) */}
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
                    color: "rgb(16, 8, 43)",
                    margin: "0",
                    fontFamily: fontFamily,
                  }}
                >
                  Ingredients
                </h2>
              </div>

              <div style={{ padding: "0 24px 24px" }}>
                <textarea
                  name="ingredients"
                  value={recipe.ingredients}
                  onChange={handleChange}
                  placeholder="List your ingredients here..."
                  rows="10"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    border: `1px solid ${errors.ingredients ? "rgb(211, 96, 96)" : "rgba(230, 202, 179, 0.3)"}`,
                    borderRadius: "6px",
                    padding: "12px",
                    fontSize: "14px",
                    color: "rgb(16, 8, 43)",
                    width: "100%",
                    minHeight: "240px",
                    resize: "vertical",
                    fontFamily: '"Courier New", monospace',
                    outline: "none",
                    boxSizing: "border-box",
                    backgroundColor: errors.ingredients
                      ? "rgba(211, 96, 96, 0.05)"
                      : "rgba(255, 255, 255, 0.5)",
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = "2px solid rgb(218, 98, 125)";
                    e.target.style.outlineOffset = "2px";
                    e.target.style.borderColor = "rgb(218, 98, 125)";
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = "none";
                    e.target.style.borderColor = errors.ingredients
                      ? "rgb(211, 96, 96)"
                      : "rgba(230, 202, 179, 0.3)";
                  }}
                />
                {errors.ingredients && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgb(211, 96, 96)",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {errors.ingredients}
                  </p>
                )}
              </div>
            </div>

            {/* Card 4: Instructions (Right) */}
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
                    color: "rgb(16, 8, 43)",
                    margin: "0",
                    fontFamily: fontFamily,
                  }}
                >
                  Instructions
                </h2>
              </div>

              <div style={{ padding: "0 24px 24px" }}>
                <textarea
                  name="instructions"
                  value={recipe.instructions}
                  onChange={handleChange}
                  placeholder="Step-by-step cooking instructions..."
                  rows="10"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    border: `1px solid ${errors.instructions ? "rgb(211, 96, 96)" : "rgba(230, 202, 179, 0.3)"}`,
                    borderRadius: "6px",
                    padding: "12px",
                    fontSize: "14px",
                    color: "rgb(16, 8, 43)",
                    width: "100%",
                    minHeight: "240px",
                    resize: "vertical",
                    fontFamily: fontFamily,
                    outline: "none",
                    boxSizing: "border-box",
                    backgroundColor: errors.instructions
                      ? "rgba(211, 96, 96, 0.05)"
                      : "rgba(255, 255, 255, 0.5)",
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = "2px solid rgb(218, 98, 125)";
                    e.target.style.outlineOffset = "2px";
                    e.target.style.borderColor = "rgb(218, 98, 125)";
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = "none";
                    e.target.style.borderColor = errors.instructions
                      ? "rgb(211, 96, 96)"
                      : "rgba(230, 202, 179, 0.3)";
                  }}
                />
                {errors.instructions && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgb(211, 96, 96)",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {errors.instructions}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Responsive CSS */}
        <style>{`
          @media (max-width: 1024px) {
            .recipe-form-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
    </div>
  );
};

export default AddEditRecipeForm;
