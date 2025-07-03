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
    <div style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
      {/* Welcome Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            Welcome, <span style={{ color: 'var(--color-primary)' }}>{userName}</span>!
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
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
            <Card style={{ padding: 32, textAlign: 'center', border: '2px solid var(--color-primary)' }} hover>
              <div style={{ width: 80, height: 80, background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}>
                <ViewAllRecipesIcon className="w-12 h-12" color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
                View All Recipes
              </h3>
              <p style={{ color: 'var(--color-muted)', marginBottom: 24, lineHeight: 1.6 }}>
                Browse through your entire recipe collection, search for
                specific dishes, and organize by categories.
              </p>
              <Button
                onClick={onViewAllRecipes}
                variant="primary"
                size="lg"
                style={{ width: '100%' }}
              >
                Browse Recipes
              </Button>
            </Card>

            {/* Add New Recipe Card - Winsome Designs Spec */}
            <button
              type="button"
              onClick={onAddRecipe}
              tabIndex={0}
              style={{
                position: 'relative',
                padding: 32,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background: 'var(--color-card)',
                backdropFilter: 'blur(4px)',
                borderRadius: 12,
                border: '2px solid transparent',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'pointer',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(218,98,125,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                  marginBottom: 24,
                  background: 'var(--color-secondary)',
                  borderRadius: 16,
                  transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
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
              <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text)', marginBottom: 16 }}>
                Add New Recipe
              </h3>
              <p style={{ color: 'var(--color-muted)', fontWeight: 400, flexGrow: 1, lineHeight: 1.5 }}>
                Create a new recipe from scratch or use our OCR feature to digitize existing recipes.
              </p>
              <span
                style={{
                  width: '100%',
                  marginTop: 24,
                  background: 'var(--color-secondary)',
                  color: 'white',
                  fontWeight: 600,
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: 'none',
                  display: 'block',
                  fontSize: 16,
                  transition: 'background 0.2s',
                }}
              >
                Create Recipe
              </span>
              <span className="sr-only">Add New Recipe</span>
            </button>

            {/* Customize Card */}
            <Card style={{ padding: 32, textAlign: 'center', border: '2px solid var(--color-tertiary)' }} hover>
              <div style={{ width: 80, height: 80, background: 'var(--color-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}>
                <CustomizeIcon className="w-12 h-12" color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
                Customize
              </h3>
              <p style={{ color: 'var(--color-muted)', marginBottom: 24, lineHeight: 1.6 }}>
                Personalize your cookbook name, display settings, and choose
                your preferred theme.
              </p>
              <Button
                onClick={onCustomize}
                variant="tertiary"
                size="lg"
                style={{ width: '100%' }}
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', textAlign: 'center', marginBottom: 32 }}>
              Your Cookbook at a Glance
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Recipes */}
              <div className="text-center">
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 8 }}>
                  {totalRecipes}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                  Total Recipes
                </div>
              </div>

              {/* Categories */}
              <div className="text-center">
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: 8 }}>
                  {categories.length}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                  Categories
                </div>
              </div>

              {/* Favorites */}
              <div className="text-center">
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-tertiary)', marginBottom: 8 }}>
                  {favorites}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                  Favorites
                </div>
              </div>

              {/* This Week */}
              <div className="text-center">
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 8 }}>
                  {thisWeek}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--color-muted)', fontWeight: 500 }}>
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
