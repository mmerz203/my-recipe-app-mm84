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
  const userName = preferences.userName && preferences.userName.trim() !== "" ? preferences.userName : "Chef";
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
    <div className="min-h-screen bg-winsome-background-light">
      {/* Welcome Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-winsome-text-dark mb-6 animate-fade-in">
            Welcome, <span className="text-winsome-primary-brand">{userName}</span>!
          </h1>
          <p className="text-lg sm:text-xl text-winsome-text-dark/80 max-w-3xl mx-auto leading-relaxed">
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
              className="p-8 text-center border-2 border-winsome-primary-brand"
              hover
            >
              <div className="w-20 h-20 bg-winsome-primary-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ViewAllRecipesIcon className="w-12 h-12" color="white" />
              </div>
              <h3 className="text-2xl font-bold text-winsome-text-dark mb-4">
                View All Recipes
              </h3>
              <p className="text-winsome-text-dark/70 mb-6 leading-relaxed">
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

            {/* Add New Recipe Card - Winsome Designs Spec */}
            <button
              type="button"
              onClick={onAddRecipe}
              tabIndex={0}
              className={`
                group relative p-8 w-full h-full flex flex-col items-center justify-start
                bg-white/50 backdrop-blur-[4px] rounded-[12px] border-2 border-transparent
                text-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                focus:outline-none focus:ring-2 focus:ring-[rgb(218,98,125)]
                hover:scale-[1.02] hover:border-[rgba(218,98,125,0.3)] hover:shadow-2xl
                cursor-pointer
              `}
              style={{
                WebkitBackdropFilter: 'blur(4px)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span
                className={`
                  flex items-center justify-center
                  w-16 h-16 mb-6
                  bg-[rgb(218,98,125)] rounded-[16px]
                  transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                  group-hover:scale-110
                `}
              >
                {/* Plus Icon SVG */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <line x1="16" y1="8" x2="16" y2="24" />
                  <line x1="8" y1="16" x2="24" y2="16" />
                </svg>
              </span>
              <h3 className="text-[20px] font-semibold text-[rgb(16,8,43)] mb-4">
                Add New Recipe
              </h3>
              <p className="text-[rgba(16,8,43,0.6)] font-normal flex-grow leading-[1.5]">
                Create a new recipe from scratch or use our OCR feature to digitize existing recipes.
              </p>
              <span
                className={`
                  w-full mt-6
                  bg-[rgb(218,98,125)] text-white font-semibold
                  py-3 px-4 rounded-[12px] border-none
                  transition-colors duration-200
                  group-hover:bg-[rgba(218,98,125,0.9)]
                  focus:bg-[rgba(218,98,125,0.9)]
                  text-base
                `}
                style={{ display: 'block' }}
              >
                Create Recipe
              </span>
              <span className="sr-only">Add New Recipe</span>
            </button>

            {/* Customize Card */}
            <Card
              className="p-8 text-center border-2 border-winsome-tertiary-brand md:col-span-2 lg:col-span-1"
              hover
            >
              <div className="w-20 h-20 bg-winsome-tertiary-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CustomizeIcon className="w-12 h-12" color="white" />
              </div>
              <h3 className="text-2xl font-bold text-winsome-text-dark mb-4">
                Customize
              </h3>
              <p className="text-winsome-text-dark/70 mb-6 leading-relaxed">
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
            <h2 className="text-2xl font-bold text-winsome-text-dark text-center mb-8">
              Your Cookbook at a Glance
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Recipes */}
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-winsome-primary-brand mb-2">
                  {totalRecipes}
                </div>
                <div className="text-sm lg:text-base text-winsome-text-dark/70 font-medium">
                  Total Recipes
                </div>
              </div>

              {/* Categories */}
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-winsome-secondary-brand mb-2">
                  {categories.length}
                </div>
                <div className="text-sm lg:text-base text-winsome-text-dark/70 font-medium">
                  Categories
                </div>
              </div>

              {/* Favorites */}
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-winsome-tertiary-brand mb-2">
                  {favorites}
                </div>
                <div className="text-sm lg:text-base text-winsome-text-dark/70 font-medium">
                  Favorites
                </div>
              </div>

              {/* This Week */}
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-winsome-primary-brand mb-2">
                  {thisWeek}
                </div>
                <div className="text-sm lg:text-base text-winsome-text-dark/70 font-medium">
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
