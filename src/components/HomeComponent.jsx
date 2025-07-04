// Sophisticated Homepage for Winsome Designs
import React, { useContext } from "react";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";
import { RecipeContext } from "../contexts/RecipeContext";
import Button from "./ui/Button";
import Card from "./ui/Card";
import {
  ViewAllRecipesIcon,
  AddRecipeIcon,
  CustomizeIcon,
} from "./icons/WinsomeIcons";

const HomeComponent = ({ onAddRecipe, onViewAllRecipes, onCustomize }) => {
  const { preferences } = useContext(UserPreferencesContext);
  const { recipes } = useContext(RecipeContext) || { recipes: [] };

  // Use dynamic userName from preferences, fallback to "Chef" if not set
  const userName =
    preferences.userName && preferences.userName.trim() !== ""
      ? preferences.userName
      : "Chef";
  const totalRecipes = recipes ? recipes.length : 0;
  const categories = Array.from(
    new Set((recipes || []).map((r) => r.category)),
  ).filter(Boolean);
  const favorites = (recipes || []).filter((r) => r.isFavorite).length;
  const thisWeek = (recipes || []).filter((r) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(r.createdAt) > oneWeekAgo;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-text-dark mb-6 font-sans">
            Welcome, <span className="text-primary-brand">{userName}</span>!
          </h1>
          <p className="text-lg text-neutral-subtle max-w-2xl mx-auto leading-relaxed font-sans">
            Your digital cookbook is ready to help you organize, create, and
            share your culinary masterpieces. Start building your recipe
            collection today.
          </p>
        </div>
      </section>

      {/* Three Action Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* View All Recipes Card */}
            <Card
              className="p-8 text-center border-2 border-primary-brand"
              hover
            >
              <div className="w-20 h-20 bg-primary-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ViewAllRecipesIcon className="w-12 h-12" color="white" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4 font-sans">
                View All Recipes
              </h3>
              <p className="text-neutral-subtle mb-6 leading-relaxed font-sans">
                Browse through your entire recipe collection, search for
                specific dishes, and organize by categories.
              </p>
              <Button
                onClick={onViewAllRecipes}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Browse Recipes
              </Button>
            </Card>

            {/* Add New Recipe Card */}
            <Card
              className="p-8 text-center border-2 border-secondary-brand"
              hover
            >
              <div className="w-20 h-20 bg-secondary-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <AddRecipeIcon className="w-12 h-12" color="white" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4 font-sans">
                Add New Recipe
              </h3>
              <p className="text-neutral-subtle mb-6 leading-relaxed font-sans">
                Create a new recipe from scratch or use our OCR feature to
                digitize existing recipes.
              </p>
              <Button
                onClick={onAddRecipe}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Create Recipe
              </Button>
            </Card>

            {/* Customize Card */}
            <Card
              className="p-8 text-center border-2 border-tertiary-purple"
              hover
            >
              <div className="w-20 h-20 bg-tertiary-purple rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CustomizeIcon className="w-12 h-12" color="white" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-4 font-sans">
                Customize
              </h3>
              <p className="text-neutral-subtle mb-6 leading-relaxed font-sans">
                Personalize your cookbook name, display settings, and choose
                your preferred theme.
              </p>
              <Button
                onClick={onCustomize}
                variant="tertiary"
                size="lg"
                className="w-full"
              >
                Settings
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8" blur>
            <h2 className="text-2xl font-bold text-text-dark text-center mb-8 font-sans">
              Your Cookbook at a Glance
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Recipes */}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-brand mb-2 font-sans">
                  {totalRecipes}
                </div>
                <div className="text-base text-neutral-subtle font-medium font-sans">
                  Total Recipes
                </div>
              </div>
              {/* Categories */}
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-brand mb-2 font-sans">
                  {categories.length}
                </div>
                <div className="text-base text-neutral-subtle font-medium font-sans">
                  Categories
                </div>
              </div>
              {/* Favorites */}
              <div className="text-center">
                <div className="text-3xl font-bold text-tertiary-purple mb-2 font-sans">
                  {favorites}
                </div>
                <div className="text-base text-neutral-subtle font-medium font-sans">
                  Favorites
                </div>
              </div>
              {/* This Week */}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-brand mb-2 font-sans">
                  {thisWeek}
                </div>
                <div className="text-base text-neutral-subtle font-medium font-sans">
                  This Week
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;
