// src/App.jsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { RecipeContext } from "./contexts/RecipeContext";
import { UserPreferencesContext } from "./contexts/UserPreferencesContext";

import LoadingSpinner from "./components/LoadingSpinner";
import Header from "./components/Header";
import ExactHomepage from "./components/ExactHomepage";
import RecipeList from "./components/RecipeList";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import RecipeDetail from "./components/RecipeDetail";
import SettingsPage from "./components/SettingsPage";
import Footer from "./components/Footer";

const App = () => {
  const { userId, authReady } = useContext(AuthContext);
  const {
    recipes,
    addRecipe,
    updateRecipe,
    loading: recipesLoading,
    error: recipeError,
  } = useContext(RecipeContext);
  const { preferences, loadingPreferences } = useContext(
    UserPreferencesContext,
  );
  const [view, setView] = useState("home");
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [appError, setAppError] = useState(null);

  // Debugging log for preferences.userName (before return) - KEEP THIS ONE
  if (import.meta.env.DEV) {
    console.log("App: preferences.userName value:", preferences.userName);
  }

  // Effect to catch errors from RecipeContext
  useEffect(() => {
    if (recipeError) {
      setAppError(recipeError);
    } else {
      setAppError(null);
    }
  }, [recipeError]);

  const handleSelectRecipe = (id, editMode = false) => {
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) {
      setSelectedRecipeId(id);
      if (editMode) {
        setRecipeToEdit(recipe);
        setView("editRecipe");
      } else {
        setView("viewDetail");
      }
    }
  };

  const handleAddRecipe = async (newRecipe) => {
    setAppError(null);
    try {
      await addRecipe(newRecipe);
      setView("viewRecipes");
    } catch (e) {
      console.error("Error from handleAddRecipe in App.js:", e);
    }
  };

  const handleUpdateRecipe = async (updatedRecipeData) => {
    setAppError(null);
    if (selectedRecipeId) {
      try {
        await updateRecipe(
          selectedRecipeId,
          updatedRecipeData,
          updatedRecipeData.isPublic,
        );
        setRecipeToEdit(null);
        setSelectedRecipeId(null);
        setView("viewRecipes");
      } catch (e) {
        console.error("Error from handleUpdateRecipe in App.js:", e);
      }
    }
  };

  const handleCancelForm = () => {
    setView("viewRecipes");
    setRecipeToEdit(null);
    setSelectedRecipeId(null);
    setAppError(null);
  };

  if (!authReady || loadingPreferences) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgb(246, 220, 198)",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <LoadingSpinner />
          <p
            style={{
              marginTop: "16px",
              color: "rgb(16, 8, 43)",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Initializing Winsome Designs...
          </p>
        </div>
      </div>
    );
  }

  const currentRecipe = selectedRecipeId
    ? recipes.find((r) => r.id === selectedRecipeId)
    : null;

  // --- THEME PALETTE SUPPORT ---
  // Define palettes for all themes
  const themePalettes = {
    winsome: {
      background: "rgb(246, 220, 198)",
      primary: "rgb(252, 161, 126)",
      secondary: "rgb(218, 98, 125)",
      accent: "rgb(154, 52, 142)",
      text: "rgb(16, 8, 43)",
    },
    emerald: {
      background: "#225560",
      primary: "#3ddc97",
      secondary: "#3d2b3d",
      accent: "#3ddc97",
      text: "#f0fdfa",
    },
    rustic: {
      background: "#f2e791",
      primary: "#a57f60",
      secondary: "#c880b7",
      accent: "#a57f60",
      text: "#3d2b1f",
    },
    ocean: {
      background: "#E0F1FF",
      primary: "#4F8EF7",
      secondary: "#235390",
      accent: "#38B6FF",
      text: "#10243B",
    },
  };


  // Use preferences.theme.id if available, else fallback to string or 'winsome'
  const themeKey = preferences.theme && typeof preferences.theme === 'object' && preferences.theme.id
    ? preferences.theme.id
    : (typeof preferences.theme === 'string' ? preferences.theme : 'winsome');
  const currentTheme = themePalettes[themeKey] || themePalettes["winsome"];
  // Remove debug logging after confirming fix
  const backgroundStyle = {
    minHeight: "100vh",
    background: currentTheme.background,
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    color: currentTheme.text,
  };

  return (
    <div style={backgroundStyle}>
      {/* Header - only show on non-home views */}
      {view !== "home" && <Header onSettings={() => setView("settings")} currentTheme={currentTheme} />}

      {/* Global Error Display */}
      {appError && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="bg-white border-2 border-winsome-error text-winsome-error px-4 py-3 rounded-xl shadow-lg animate-scale-in">
            <div className="flex items-start justify-between">
              <div>
                <strong className="font-bold">Error:</strong>
                <span className="block mt-1">{appError}</span>
              </div>
              <button
                onClick={() => setAppError(null)}
                className="ml-4 text-winsome-error hover:text-winsome-error/70 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen">
        {view === "home" && (
          <ExactHomepage
            onAddRecipe={() => setView("addRecipe")}
            onViewAllRecipes={() => setView("viewRecipes")}
            onCustomize={() => setView("settings")}
          />
        )}
        {view === "viewRecipes" && (
          <RecipeList
            onSelectRecipe={handleSelectRecipe}
            onAddRecipe={() => setView("addRecipe")}
            onBackToHome={() => setView("home")}
          />
        )}
        {view === "addRecipe" && (
          <AddEditRecipeForm
            initialRecipe={null}
            onSave={handleAddRecipe}
            onCancel={() => setView("viewRecipes")}
          />
        )}
        {view === "viewDetail" && currentRecipe && (
          <RecipeDetail
            recipe={currentRecipe}
            onBack={() => {
              setView("viewRecipes");
              setSelectedRecipeId(null);
            }}
            onEdit={() => {
              setView("editRecipe");
              setRecipeToEdit(currentRecipe);
            }}
          />
        )}
        {view === "editRecipe" && recipeToEdit && (
          <AddEditRecipeForm
            initialRecipe={recipeToEdit}
            onSave={handleUpdateRecipe}
            onCancel={() => setView("viewRecipes")}
          />
        )}
        {view === "settings" && <SettingsPage onBack={() => setView("home")} />}
      </main>

      {/* Footer - only show on home view */}
      {view === "home" && <Footer currentTheme={currentTheme} />}
    </div>
  );
};

export default App;
