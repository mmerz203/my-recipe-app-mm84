// Sophisticated Add/Edit Recipe Form for Winsome Designs
import React, { useState, useEffect } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { BackIcon } from "./icons/WinsomeIcons";

const AddEditRecipeForm = ({ initialRecipe, onSave, onCancel }) => {
  const [recipe, setRecipe] = useState(
    initialRecipe || {
      name: "",
      category: "Main Course",
      servings: "",
      prepTime: "",
      cookTime: "",
      description: "",
      ingredients: [],
      instructions: [],
      imageUrl: "",
      isPublic: false,
    },
  );

  const [ingredientInput, setIngredientInput] = useState("");
  const [instructionInput, setInstructionInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialRecipe?.imageUrl || "",
  );

  // Update state when initialRecipe changes (for editing)
  useEffect(() => {
    if (initialRecipe) {
      setRecipe({
        ...initialRecipe,
        ingredients: initialRecipe.ingredients || [],
        instructions: initialRecipe.instructions || [],
      });
      setIngredientInput(
        initialRecipe.ingredients ? initialRecipe.ingredients.join("\n") : "",
      );
      setInstructionInput(
        initialRecipe.instructions ? initialRecipe.instructions.join("\n") : "",
      );
      setImagePreview(initialRecipe.imageUrl || "");
      setImageFile(null);
    }
  }, [initialRecipe]);

  const categories = [
    "Appetizer",
    "Main Course",
    "Side Dish",
    "Dessert",
    "Breakfast",
    "Soup",
    "Salad",
    "Drink",
    "Baking",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(recipe.imageUrl || "");
    }
  };

  const handleIngredientInput = (e) => {
    setIngredientInput(e.target.value);
    setRecipe((prev) => ({
      ...prev,
      ingredients: e.target.value
        .split("\n")
        .filter((line) => line.trim() !== ""),
    }));
  };

  const handleInstructionInput = (e) => {
    setInstructionInput(e.target.value);
    setRecipe((prev) => ({
      ...prev,
      instructions: e.target.value
        .split("\n")
        .filter((line) => line.trim() !== ""),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalImageUrl = recipe.imageUrl;
    if (imageFile) {
      finalImageUrl = imagePreview; // In production, upload to storage
    }

    const recipeToSave = {
      ...recipe,
      servings: parseFloat(recipe.servings) || 1,
      imageUrl: finalImageUrl,
      ingredients: ingredientInput
        .split("\n")
        .filter((line) => line.trim() !== ""),
      instructions: instructionInput
        .split("\n")
        .filter((line) => line.trim() !== ""),
    };

    onSave(recipeToSave);
  };

  return (
    <div className="min-h-screen bg-winsome-background-light py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button onClick={onCancel} variant="ghost" size="sm" className="mb-4">
            <BackIcon className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl lg:text-4xl font-bold text-winsome-text-dark">
            {initialRecipe ? "Edit Recipe" : "Add New Recipe"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* OCR Upload Section */}
          <Card className="p-6 border-2 border-winsome-primary-brand/30 bg-winsome-primary-brand/5">
            <h3 className="text-xl font-bold text-winsome-text-dark mb-4">
              📷 OCR Recipe Scanner
            </h3>
            <p className="text-winsome-text-dark/70 mb-4">
              Upload a photo of a recipe to automatically extract ingredients
              and instructions.
            </p>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-winsome-text-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-winsome-primary-brand file:text-white hover:file:bg-winsome-secondary-brand"
            />
          </Card>

          {/* Recipe Details */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-winsome-text-dark mb-6">
              Recipe Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recipe Title */}
              <div className="lg:col-span-2">
                <label className="block text-winsome-text-dark text-sm font-bold mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  name="name"
                  value={recipe.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300"
                  placeholder="e.g., Grandma's Chocolate Chip Cookies"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-winsome-text-dark text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={recipe.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Servings */}
              <div>
                <label className="block text-winsome-text-dark text-sm font-bold mb-2">
                  Servings
                </label>
                <input
                  type="text"
                  name="servings"
                  value={recipe.servings}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300"
                  placeholder="e.g., 4-6 people"
                />
              </div>

              {/* Prep Time */}
              <div>
                <label className="block text-winsome-text-dark text-sm font-bold mb-2">
                  Prep Time
                </label>
                <input
                  type="text"
                  name="prepTime"
                  value={recipe.prepTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300"
                  placeholder="e.g., 15 minutes"
                />
              </div>

              {/* Cook Time */}
              <div>
                <label className="block text-winsome-text-dark text-sm font-bold mb-2">
                  Cook Time
                </label>
                <input
                  type="text"
                  name="cookTime"
                  value={recipe.cookTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300"
                  placeholder="e.g., 25 minutes"
                />
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="block text-winsome-text-dark text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={recipe.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300 resize-none"
                  placeholder="Brief description of the recipe..."
                />
              </div>
            </div>
          </Card>

          {/* Ingredients */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-winsome-text-dark mb-6">
              Ingredients
            </h2>
            <label className="block text-winsome-text-dark text-sm font-bold mb-2">
              List ingredients (one per line)
            </label>
            <textarea
              value={ingredientInput}
              onChange={handleIngredientInput}
              rows="8"
              required
              className="w-full px-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300 resize-y"
              placeholder="1 cup all-purpose flour&#10;2 large eggs&#10;1/2 teaspoon salt&#10;..."
            />
          </Card>

          {/* Instructions */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-winsome-text-dark mb-6">
              Instructions
            </h2>
            <label className="block text-winsome-text-dark text-sm font-bold mb-2">
              Step-by-step instructions (one step per line)
            </label>
            <textarea
              value={instructionInput}
              onChange={handleInstructionInput}
              rows="8"
              required
              className="w-full px-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300 resize-y"
              placeholder="Preheat oven to 375°F (190°C)&#10;In a large bowl, whisk together flour and sugar&#10;..."
            />
          </Card>

          {/* Recipe Image */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-winsome-text-dark mb-6">
              Recipe Image
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-winsome-text-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-winsome-primary-brand file:text-white hover:file:bg-winsome-secondary-brand mb-4"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Recipe Preview"
                  className="max-w-full h-64 object-cover rounded-xl border-2 border-winsome-neutral-subtle"
                />
              </div>
            )}
          </Card>

          {/* Visibility Setting */}
          <Card className="p-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isPublic"
                checked={recipe.isPublic}
                onChange={handleChange}
                className="w-5 h-5 text-winsome-primary-brand rounded focus:ring-winsome-primary-brand border-winsome-neutral-subtle"
              />
              <span className="text-winsome-text-dark font-medium">
                Make this recipe public (visible to other users)
              </span>
            </label>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              size="lg"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="lg">
              {initialRecipe ? "Update Recipe" : "Save Recipe"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditRecipeForm;
