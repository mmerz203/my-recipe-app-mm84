// Complete Recipe List Page - Exact Winsome Designs Implementation
import React, { useState, useContext, useMemo } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { AuthContext } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./ui/Button";
import Modal from "./Modal";
// Dietary and cooking time filter options
const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"];
const cookingTimeOptions = [
  { label: "Any", value: "" },
  { label: "Under 30 min", value: "under-30" },
  { label: "30-60 min", value: "30-60" },
  { label: "Over 1 hour", value: "over-60" },
];

const getCookingTimeRange = (minutes) => {
  if (minutes <= 30) return "under-30";
  if (minutes <= 60) return "30-60";
  return "over-60";
};

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

const RecipeList = ({
  onSelectRecipe,
  onAddRecipe,
  onBackToHome,
  currentTheme,
}) => {
  const { recipes, loading, error, deleteRecipe } = useContext(RecipeContext);
  const { userId } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  // New filter states
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDietary, setFilterDietary] = useState([]); // array of strings
  const [filterCookingTime, setFilterCookingTime] = useState("");

  // Handle dietary checkbox toggle
  const handleDietaryChange = (option) => {
    setFilterDietary((prev) =>
      prev.includes(option)
        ? prev.filter((d) => d !== option)
        : [...prev, option]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilterCategory("");
    setSearchTerm("");
    setFilterDietary([]);
    setFilterCookingTime("");
  };

  // Ensure global theme variables are set when this component is rendered
  React.useEffect(() => {
    if (currentTheme) {
      // Dynamically import to avoid circular dependency if any
      import("../utils/themeSystem").then(({ setThemeCSSVariables }) => {
        setThemeCSSVariables(currentTheme);
      });
    }
  }, [currentTheme]);

  // Enhanced filtering logic
  const filteredRecipes = useMemo(() => {
    return (
      recipes?.filter((recipe) => {
        // Category filter
        if (filterCategory && recipe.category !== filterCategory) return false;
        // Dietary restrictions (all selected must be present)
        if (
          filterDietary.length > 0 &&
          !filterDietary.every((d) => (recipe.dietary || []).includes(d))
        )
          return false;
        // Cooking time
        if (
          filterCookingTime &&
          getCookingTimeRange(recipe.cookingTime || 0) !== filterCookingTime
        )
          return false;
        // Search term (name, main ingredient, or ingredients)
        if (
          searchTerm &&
          !(
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (recipe.mainIngredient &&
              recipe.mainIngredient
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (recipe.ingredients &&
              recipe.ingredients.some((ing) =>
                ing.toLowerCase().includes(searchTerm.toLowerCase())
              ))
          )
        )
          return false;
        return true;
      }) || []
    );
  }, [recipes, filterCategory, filterDietary, filterCookingTime, searchTerm]);

  console.log("RecipeList: currentTheme prop:", currentTheme);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-text-dark text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header - Exact Specifications */}
      <header className="bg-background border-b border-border py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onBackToHome}
              variant="ghost"
              size="md"
              className="p-3"
              type="button"
            >
              <BackIcon size={18} />
            </Button>
            <div className="w-8 h-8 bg-primary-brand rounded-lg flex items-center justify-center">
              <RecipeBookIcon size={20} color="var(--color-text)" />
            </div>
            <h1 className="text-3xl font-bold text-text-dark font-sans m-0">
              All Recipes
            </h1>
          </div>
          {/* Right Side */}
          <Button
            onClick={onAddRecipe}
            variant="primary"
            size="md"
            className="flex items-center gap-2"
            type="button"
          >
            <PlusIcon size={18} />
            Add Recipe
          </Button>
        </div>
      </header>

      {/* Search & Filter Section - Enhanced */}
      <section className="max-w-6xl mx-auto px-4 py-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Search Input Container */}
          <div className="relative flex-1 w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <SearchIcon size={20} />
            </div>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/50 border border-neutral-subtle rounded-lg pl-10 pr-3 py-2 text-sm text-text-dark w-full font-sans outline-none box-border focus:border-primary-brand transition"
            />
          </div>
          {/* Filter Button */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="md"
            className="flex items-center gap-2 w-fit"
            type="button"
          >
            <FilterIcon size={18} />
            Filter
          </Button>
        </div>
        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 w-full bg-card border border-neutral-subtle rounded-lg p-4 flex flex-col gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Category
              </label>
              <select
                className="w-full border border-neutral-subtle rounded px-3 py-2 bg-background text-text-dark"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All</option>
                {[...(recipes ? Array.from(new Set(recipes.map(r => r.category)).values()) : [])].filter(Boolean).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {/* Dietary Restrictions */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Dietary Restrictions
              </label>
              <div className="flex flex-wrap gap-3">
                {dietaryOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-text-dark"
                  >
                    <input
                      type="checkbox"
                      className="accent-primary-brand"
                      checked={filterDietary.includes(option)}
                      onChange={() => handleDietaryChange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            {/* Cooking Time Dropdown */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">
                Cooking Time
              </label>
              <select
                className="w-full border border-neutral-subtle rounded px-3 py-2 bg-background text-text-dark"
                value={filterCookingTime}
                onChange={(e) => setFilterCookingTime(e.target.value)}
              >
                {cookingTimeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Clear All Filters Button */}
            <div>
              <Button
                type="button"
                variant="secondary"
                className="btn-secondary mt-2"
                onClick={handleClearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {!recipes || recipes.length === 0 || filteredRecipes.length === 0 ? (
          // Empty State - Exact Specifications
          <div className="text-center py-16">
            {/* Large Icon Circle */}
            <div className="w-24 h-24 bg-primary-brand/20 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <RecipeBookIcon size={48} color="var(--color-primary)" />
            </div>
            {/* Empty State Title */}
            <h2 className="text-2xl font-semibold text-text-dark font-sans mb-4 m-0">
              {searchTerm ? "No Recipes Found" : "No Recipes Yet"}
            </h2>
            {/* Empty State Description */}
            <p className="text-base text-neutral-subtle font-sans mb-8 max-w-lg mx-auto leading-relaxed">
              {searchTerm
                ? `No recipes match "${searchTerm}". Try different search terms or browse all recipes.`
                : "Start building your digital cookbook by adding your first recipe. You can create from scratch or use our OCR feature."}
            </p>
            {/* Empty State CTA Button */}
            <Button
              onClick={onAddRecipe}
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2"
              type="button"
            >
              <PlusIcon size={18} />
              {searchTerm ? "Add New Recipe" : "Add Your First Recipe"}
            </Button>
          </div>
        ) : (
          // Recipe Grid
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
              padding: "0 16px",
            }}
          >
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-card backdrop-blur rounded-xl border border-border overflow-hidden transition-transform duration-200 ease-in-out cursor-pointer hover:-translate-y-0.5 hover:shadow-lg group relative"
                tabIndex={0}
                role="button"
                aria-label={`View recipe: ${recipe.name}`}
                onClick={(e) => {
                  // Prevent card click if delete button is clicked
                  if (e.target.closest('.delete-btn')) return;
                  onSelectRecipe(recipe.id);
                }}
              >
                {/* Delete Button (only for owner) */}
                {recipe.userId === userId && (
                  <button
                    className="delete-btn absolute top-3 right-3 z-10 bg-error/90 hover:bg-error text-white rounded-full p-2 shadow-lg transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                    title="Delete Recipe"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRecipeToDelete(recipe);
                      setShowDeleteModal(true);
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                {/* Recipe Image Placeholder */}
                <div className="h-[200px] bg-primary-brand/10 flex items-center justify-center">
                  {recipe.imageUrl ? (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <RecipeBookIcon size={48} color="rgba(16, 8, 43, 0.4)" />
                  )}
                </div>
                {/* Recipe Info */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-text-dark font-sans mb-1 m-0">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-neutral-subtle font-sans m-0">
                    {recipe.category || "Uncategorized"}
                    {recipe.servings && ` • Serves ${recipe.servings}`}
                  </p>
                </div>
              </div>
            ))}
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        title="Delete Recipe"
        message={
          <div>
            <p>Are you sure you want to delete <span className="font-semibold">{recipeToDelete?.name}</span>? This action cannot be undone.</p>
          </div>
        }
        onClose={() => {
          setShowDeleteModal(false);
          setRecipeToDelete(null);
        }}
        onConfirm={async () => {
          if (recipeToDelete) {
            await deleteRecipe(recipeToDelete.id, recipeToDelete.type === "public");
            setShowDeleteModal(false);
            setRecipeToDelete(null);
          }
        }}
        showConfirm={true}
      />
          </div>
        )}
      </main>
    </div>
  );
};

export default RecipeList;
