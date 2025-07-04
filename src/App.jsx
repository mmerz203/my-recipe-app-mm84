// src/App.jsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { RecipeContext } from "./contexts/RecipeContext";
import { UserPreferencesContext } from "./contexts/UserPreferencesContext";
import { getThemeColors } from "./utils/themeSystem";

import LoadingSpinner from "./components/LoadingSpinner";
import Header from "./components/Header";
import ExactHomepage from "./components/ExactHomepage";
import RecipeList from "./components/RecipeList";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import RecipeDetail from "./components/RecipeDetail";
import SettingsPage from "./components/SettingsPage";
import Footer from "./components/Footer";
import DuplicateRecipeModal from "./components/DuplicateRecipeModal";

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
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [pendingRecipe, setPendingRecipe] = useState(null);
  const [pendingAction, setPendingAction] = useState(null); // 'add' or 'edit'

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
    // Case-insensitive duplicate check for current user's recipes
    const duplicate = recipes.find(
      (r) =>
        r.name.trim().toLowerCase() === newRecipe.name.trim().toLowerCase(),
    );
    if (duplicate) {
      setPendingRecipe(newRecipe);
      setPendingAction("add");
      setShowDuplicateModal(true);
      return;
    }
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
      // Case-insensitive duplicate check, excluding the current recipe
      const duplicate = recipes.find(
        (r) =>
          r.id !== selectedRecipeId &&
          r.name.trim().toLowerCase() ===
            updatedRecipeData.name.trim().toLowerCase(),
      );
      if (duplicate) {
        setPendingRecipe(updatedRecipeData);
        setPendingAction("edit");
        setShowDuplicateModal(true);
        return;
      }
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
  // Duplicate Modal Handlers
  const handleDuplicateRename = () => {
    setShowDuplicateModal(false);
    // Let user edit the name in the form (do not save yet)
    // The AddEditRecipeForm will still have the pendingRecipe as its state
  };

  const handleDuplicateOverwrite = async () => {
    setShowDuplicateModal(false);
    if (!pendingRecipe) return;
    if (pendingAction === "add") {
      // Overwrite: delete the old recipe, then add the new one
      const duplicate = recipes.find(
        (r) =>
          r.name.trim().toLowerCase() ===
          pendingRecipe.name.trim().toLowerCase(),
      );
      if (duplicate) {
        // Remove the duplicate, then add
        try {
          await updateRecipe(
            duplicate.id,
            pendingRecipe,
            pendingRecipe.isPublic,
          );
          setView("viewRecipes");
        } catch (e) {
          setAppError("Failed to overwrite existing recipe.");
        }
      }
    } else if (pendingAction === "edit" && selectedRecipeId) {
      // Overwrite: update the current recipe (already in edit mode)
      try {
        await updateRecipe(
          selectedRecipeId,
          pendingRecipe,
          pendingRecipe.isPublic,
        );
        setRecipeToEdit(null);
        setSelectedRecipeId(null);
        setView("viewRecipes");
      } catch (e) {
        setAppError("Failed to overwrite existing recipe.");
      }
    }
    setPendingRecipe(null);
    setPendingAction(null);
  };

  const handleDuplicateCancel = () => {
    setShowDuplicateModal(false);
    setPendingRecipe(null);
    setPendingAction(null);
  };

  const handleCancelForm = () => {
    setView("viewRecipes");
    setRecipeToEdit(null);
    setSelectedRecipeId(null);
    setAppError(null);
  };

  // Use centralized theme system
  const currentTheme = getThemeColors(preferences);
  // Set CSS variables globally for the current theme
  useEffect(() => {
    // setThemeCSSVariables will set all --color-* variables on :root
    // This ensures global theming for all components
    if (currentTheme) {
      // Dynamically import to avoid circular dependency if any
      import("./utils/themeSystem").then(({ setThemeCSSVariables }) => {
        setThemeCSSVariables(currentTheme);
      });
    }
  }, [currentTheme]);
  const backgroundStyle = {
    minHeight: "100vh",
    background: "var(--color-background)",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    color: "var(--color-text)",
  };

  if (!authReady || loadingPreferences) {
    return (
      <div style={backgroundStyle}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <LoadingSpinner />
          <p
            style={{
              marginTop: "16px",
              color: "var(--color-text)",
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

  return (
    <div style={backgroundStyle}>
      {/* Header - only show on non-home views */}
      {view !== "home" && (
        <Header
          onSettings={() => setView("settings")}
          currentTheme={currentTheme}
        />
      )}

      {/* Global Error Display */}
      {appError && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className="bg-card border-2 border-error text-error px-4 py-3 rounded-xl shadow-lg animate-scale-in">
            <div className="flex items-start justify-between">
              <div>
                <strong className="font-bold">Error:</strong>
                <span className="block mt-1">{appError}</span>
              </div>
              <button
                onClick={() => setAppError(null)}
                className="ml-4 text-error hover:text-error/70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-error/50 rounded p-1"
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
        {/* Duplicate Recipe Modal */}
        <DuplicateRecipeModal
          show={showDuplicateModal}
          recipeName={pendingRecipe?.name || ""}
          onClose={handleDuplicateCancel}
          onRename={handleDuplicateRename}
          onOverwrite={handleDuplicateOverwrite}
        />
        {view === "home" && (
          <ExactHomepage
            onAddRecipe={() => setView("addRecipe")}
            onViewAllRecipes={() => setView("viewRecipes")}
            onCustomize={() => setView("settings")}
            currentTheme={currentTheme}
          />
        )}
        {view === "viewRecipes" && (
          <RecipeList
            onSelectRecipe={handleSelectRecipe}
            onAddRecipe={() => setView("addRecipe")}
            onBackToHome={() => setView("home")}
            currentTheme={currentTheme}
          />
        )}
        {view === "addRecipe" && (
          <AddEditRecipeForm
            initialRecipe={null}
            onSave={handleAddRecipe}
            onCancel={() => setView("viewRecipes")}
            currentTheme={currentTheme}
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
            currentTheme={currentTheme}
          />
        )}
        {view === "editRecipe" && recipeToEdit && (
          <AddEditRecipeForm
            initialRecipe={recipeToEdit}
            onSave={handleUpdateRecipe}
            onCancel={() => setView("viewRecipes")}
            currentTheme={currentTheme}
          />
        )}
        {view === "settings" && (
          <SettingsPage
            onBack={() => setView("home")}
            currentTheme={currentTheme}
          />
        )}
      </main>

      {/* Footer is rendered by ExactHomepage on home view; removed from here to prevent duplicate footers */}
    </div>
  );
};

export default App;
