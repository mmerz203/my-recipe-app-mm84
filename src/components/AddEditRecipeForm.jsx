import OCRInput from "./OCRInput";
import Button from "./ui/Button";
// Add New Recipe Form Page - Complete Recreation for Winsome Designs
import React, { useState, useEffect, useRef } from "react";

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

const AddEditRecipeForm = ({
  initialRecipe,
  onSave,
  onCancel,
  currentTheme,
}) => {
  console.log("AddEditRecipeForm: currentTheme prop:", currentTheme);

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

  // Handler to update recipe fields from OCR (must be after setRecipe is defined)
  const handleRecipeParsedFromOCR = (parsed) => {
    setRecipe((prev) => ({
      ...prev,
      name: parsed.name || prev.name,
      description: parsed.description || prev.description,
      prepTime: parsed.prepTime || prev.prepTime,
      cookTime: parsed.cookTime || prev.cookTime,
      servings: parsed.servings || prev.servings,
      ingredients: Array.isArray(parsed.ingredients)
        ? parsed.ingredients.join("\n")
        : prev.ingredients,
      instructions: Array.isArray(parsed.instructions)
        ? parsed.instructions.join("\n")
        : prev.instructions,
    }));
  };

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
    <div className="min-h-screen bg-background text-text font-sans">
      {/* Header Section - Mobile Optimized */}
      <header className="bg-background border-b border-border py-4 px-3 sm:py-6 sm:px-4 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            {/* Title Row */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={onCancel}
                variant="ghost"
                size="sm"
                className="p-2 sm:p-3 shrink-0"
                type="button"
              >
                <BackIcon size={16} />
              </Button>

              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-brand rounded-lg flex items-center justify-center shrink-0">
                <PlusIcon
                  size={16}
                  color="var(--color-primary-contrast, #fff)"
                />
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-dark font-sans truncate">
                {initialRecipe ? "Edit Recipe" : "Add New Recipe"}
              </h1>
            </div>

            {/* Action Buttons - Mobile: Full width, Desktop: Inline */}
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                onClick={onCancel}
                variant="ghost"
                size="md"
                className="flex-1 sm:flex-none"
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="primary"
                size="md"
                className="flex-1 sm:flex-none"
                type="submit"
              >
                {initialRecipe ? "Update" : "Save Recipe"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 sm:pb-8">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Recipe Details Section */}
          <div className="bg-card backdrop-blur border border-neutral-subtle/20 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-text-dark mb-4 sm:mb-6">
              Recipe Details
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Recipe Title */}
              <div>
                <label className="text-sm font-medium text-text-dark mb-2 block">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  name="name"
                  value={recipe.name}
                  onChange={handleChange}
                  placeholder="Enter recipe name..."
                  className={`bg-white/50 border ${
                    errors.name ? "border-error" : "border-neutral-subtle/30"
                  } rounded-lg px-4 py-3 text-base text-text-dark w-full outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-colors min-h-[48px]`}
                />
                {errors.name && (
                  <p className="text-xs text-error mt-1">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-text-dark mb-2 block">
                  Description
                </label>
                <textarea
                  name="description"
                  value={recipe.description}
                  onChange={handleChange}
                  placeholder="Brief description of the recipe..."
                  rows="3"
                  className="bg-white/50 border border-neutral-subtle/30 rounded-lg px-4 py-3 text-base text-text-dark w-full min-h-[96px] resize-y outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-colors"
                />
              </div>

              {/* Time and Servings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-dark mb-2 block">
                    Prep Time
                  </label>
                  <input
                    type="text"
                    name="prepTime"
                    value={recipe.prepTime}
                    onChange={handleChange}
                    placeholder="15 min"
                    className="bg-white/50 border border-neutral-subtle/30 rounded-lg px-4 py-3 text-base text-text-dark w-full outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-colors min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-text-dark mb-2 block">
                    Cook Time
                  </label>
                  <input
                    type="text"
                    name="cookTime"
                    value={recipe.cookTime}
                    onChange={handleChange}
                    placeholder="30 min"
                    className="bg-white/50 border border-neutral-subtle/30 rounded-lg px-4 py-3 text-base text-text-dark w-full outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-colors min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-text-dark mb-2 block">
                    Servings
                  </label>
                  <input
                    type="number"
                    name="servings"
                    value={recipe.servings}
                    onChange={handleChange}
                    placeholder="4"
                    min="1"
                    className="bg-white/50 border border-neutral-subtle/30 rounded-lg px-4 py-3 text-base text-text-dark w-full outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-colors min-h-[48px]"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-text-dark mb-2 block">
                  Category
                </label>
                <select
                  name="category"
                  value={recipe.category}
                  onChange={handleChange}
                  className="bg-white/50 border border-neutral-subtle/30 rounded-lg px-4 py-3 text-base text-text-dark w-full outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-colors min-h-[48px]"
                >
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Snack">Snack</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
            </div>
          </div>

          {/* OCR Import Section */}
          <div className="bg-card backdrop-blur border border-neutral-subtle/20 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-text-dark mb-4">
              Import from Image
            </h2>
            <OCRInput onRecipeParsed={handleRecipeParsedFromOCR} />
          </div>

          {/* Ingredients Section */}
          <div className="bg-card backdrop-blur border border-neutral-subtle/20 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-text-dark mb-4">
              Ingredients *
            </h2>
            <textarea
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              placeholder="List ingredients, one per line:&#10;• 2 cups flour&#10;• 1 tsp salt&#10;• 3 eggs"
              rows={window.innerWidth < 640 ? "8" : "12"}
              className={`bg-white/50 border ${
                errors.ingredients ? "border-error" : "border-neutral-subtle/30"
              } rounded-lg px-4 py-3 text-base text-text-dark w-full min-h-[200px] sm:min-h-[280px] resize-y font-mono outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-colors`}
            />
            {errors.ingredients && (
              <p className="text-xs text-error mt-1">{errors.ingredients}</p>
            )}
          </div>

          {/* Instructions Section */}
          <div className="bg-card backdrop-blur border border-neutral-subtle/20 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-text-dark mb-4">
              Instructions *
            </h2>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              placeholder="Write step-by-step instructions:&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients in a bowl&#10;3. Add wet ingredients and stir"
              rows={window.innerWidth < 640 ? "10" : "15"}
              className={`bg-white/50 border ${
                errors.instructions
                  ? "border-error"
                  : "border-neutral-subtle/30"
              } rounded-lg px-4 py-3 text-base text-text-dark w-full min-h-[250px] sm:min-h-[350px] resize-y outline-none focus:ring-2 focus:ring-primary-brand/50 focus:border-primary-brand transition-colors`}
            />
            {errors.instructions && (
              <p className="text-xs text-error mt-1">{errors.instructions}</p>
            )}
          </div>

          {/* Privacy Settings */}
          <div className="bg-card backdrop-blur border border-neutral-subtle/20 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-text-dark">
                  Make Recipe Public
                </h3>
                <p className="text-sm text-neutral-subtle mt-1">
                  Allow others to discover and view this recipe
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={recipe.isPublic}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-subtle/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-brand/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-brand"></div>
              </label>
            </div>
          </div>
        </form>

        {/* Responsive CSS removed: all layout is now Tailwind-based */}
      </main>
    </div>
  );
};

export default AddEditRecipeForm;
