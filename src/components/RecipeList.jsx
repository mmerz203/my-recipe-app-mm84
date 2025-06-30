// Sophisticated Recipe List for Winsome Designs
import React, { useState, useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { AuthContext } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./ui/Button";
import Card from "./ui/Card";
import {
  BackIcon,
  SearchIcon,
  FilterIcon,
  ViewAllRecipesIcon,
  AddRecipeIcon,
} from "./icons/WinsomeIcons";

const RecipeList = ({ onSelectRecipe, onAddRecipe, onBackToHome }) => {
  const { recipes, loading, error } = useContext(RecipeContext);
  const { userId } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = [
    "All",
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

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      filterCategory === "All" || recipe.category === filterCategory;
    const matchesSearch =
      searchTerm.trim() === "" ||
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.ingredients &&
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchTerm.toLowerCase()),
        ));
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-winsome-background-light flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-winsome-background-light flex items-center justify-center">
        <Card className="p-8 text-center border-2 border-winsome-error">
          <div className="text-winsome-error text-lg font-semibold">
            Error: {error}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-winsome-background-light">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <Button onClick={onBackToHome} variant="outline" size="sm">
                <BackIcon className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl lg:text-4xl font-bold text-winsome-text-dark">
                All Recipes
              </h1>
            </div>

            <Button onClick={onAddRecipe} variant="primary" size="md">
              <AddRecipeIcon className="w-5 h-5 mr-2" />
              Add Recipe
            </Button>
          </div>

          {/* Search and Filter */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-winsome-text-dark/40" />
                <input
                  type="text"
                  placeholder="Search recipes by name or ingredient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300"
                />
              </div>

              {/* Filter */}
              <div className="sm:w-48">
                <div className="relative">
                  <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-winsome-text-dark/40" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-winsome-neutral-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-winsome-primary-brand focus:border-winsome-primary-brand transition-all duration-300 appearance-none bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          {filteredRecipes.length === 0 ? (
            // Empty State
            <Card className="p-16 text-center">
              <div className="w-24 h-24 bg-winsome-neutral-subtle rounded-full flex items-center justify-center mx-auto mb-6">
                <ViewAllRecipesIcon className="w-12 h-12 text-winsome-text-dark/40" />
              </div>
              <h2 className="text-2xl font-bold text-winsome-text-dark mb-4">
                No Recipes Yet
              </h2>
              <p className="text-winsome-text-dark/70 mb-8 max-w-md mx-auto">
                {searchTerm || filterCategory !== "All"
                  ? "No recipes match your search criteria. Try adjusting your filters or search terms."
                  : "Start your culinary journey by adding your first recipe to the collection."}
              </p>
              {!searchTerm && filterCategory === "All" && (
                <Button onClick={onAddRecipe} variant="primary" size="lg">
                  Add Your First Recipe
                </Button>
              )}
            </Card>
          ) : (
            // Recipes Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden" hover>
                  {/* Recipe Image */}
                  <div
                    className="relative h-48 bg-winsome-neutral-subtle cursor-pointer overflow-hidden"
                    onClick={() => onSelectRecipe(recipe.id)}
                  >
                    <img
                      src={
                        recipe.imageUrl ||
                        `https://placehold.co/400x300/f9dbbd/0d0628?text=${encodeURIComponent(recipe.name)}`
                      }
                      alt={recipe.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x300/f9dbbd/0d0628?text=${encodeURIComponent(recipe.name)}`;
                      }}
                    />
                    {recipe.isPublic && (
                      <span className="absolute top-3 right-3 bg-winsome-tertiary-brand text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                        Public
                      </span>
                    )}
                    {recipe.userId === userId && (
                      <span className="absolute top-3 left-3 bg-winsome-primary-brand text-winsome-text-dark text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                        My Recipe
                      </span>
                    )}
                  </div>

                  {/* Recipe Info */}
                  <div className="p-6">
                    <h3
                      className="text-lg font-bold text-winsome-text-dark mb-2 cursor-pointer hover:text-winsome-primary-brand transition-colors line-clamp-2"
                      onClick={() => onSelectRecipe(recipe.id)}
                    >
                      {recipe.name}
                    </h3>
                    <p className="text-sm text-winsome-text-dark/60 mb-4">
                      <span className="font-medium text-winsome-secondary-brand">
                        {recipe.category}
                      </span>
                      {recipe.servings && (
                        <span className="ml-2">
                          • {recipe.servings} servings
                        </span>
                      )}
                    </p>

                    {/* Action Buttons for Own Recipes */}
                    {recipe.userId === userId && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => onSelectRecipe(recipe.id, true)}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            /* Handle delete */
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-winsome-error hover:bg-winsome-error/10 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecipeList;
