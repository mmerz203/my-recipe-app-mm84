// src/App.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { RecipeContext } from './contexts/RecipeContext';
import { UserPreferencesContext } from './contexts/UserPreferencesContext';

import LoadingSpinner from './components/LoadingSpinner';
import HomeComponent from './components/HomeComponent';
import RecipeList from './components/RecipeList';
import AddEditRecipeForm from './components/AddEditRecipeForm';
import RecipeDetail from './components/RecipeDetail';
import SettingsPage from './components/SettingsPage';


const App = () => {
    const { userId, authReady } = useContext(AuthContext);
    const { recipes, addRecipe, updateRecipe, loading: recipesLoading, error: recipeError } = useContext(RecipeContext);
    const { preferences, loadingPreferences } = useContext(UserPreferencesContext);
    const [view, setView] = useState('home');
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [recipeToEdit, setRecipeToEdit] = useState(null);
    const [appError, setAppError] = useState(null);

    // Effect to catch errors from RecipeContext
    useEffect(() => {
        if (recipeError) {
            setAppError(recipeError);
        } else {
            setAppError(null);
        }
    }, [recipeError]);


    const handleSelectRecipe = (id, editMode = false) => {
        const recipe = recipes.find(r => r.id === id);
        if (recipe) {
            setSelectedRecipeId(id);
            if (editMode) {
                setRecipeToEdit(recipe);
                setView('editRecipe');
            } else {
                setView('viewDetail');
            }
        }
    };

    const handleAddRecipe = async (newRecipe) => {
        setAppError(null);
        try {
            await addRecipe(newRecipe);
            setView('viewRecipes');
        } catch (e) {
            console.error("Error from handleAddRecipe in App.js:", e);
        }
    };

    const handleUpdateRecipe = async (updatedRecipeData) => {
        setAppError(null);
        if (selectedRecipeId) {
            try {
                await updateRecipe(selectedRecipeId, updatedRecipeData, updatedRecipeData.isPublic);
                setRecipeToEdit(null);
                setSelectedRecipeId(null);
                setView('viewRecipes');
            } catch (e) {
                console.error("Error from handleUpdateRecipe in App.js:", e);
            }
        }
    };

    const handleCancelForm = () => {
        setView('viewRecipes');
        setRecipeToEdit(null);
        setSelectedRecipeId(null);
        setAppError(null);
    };

    if (!authReady || loadingPreferences) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <LoadingSpinner />
                <p className="ml-4 text-gray-700 text-lg">Initializing app and authenticating...</p>
            </div>
        );
    }

    const currentRecipe = selectedRecipeId ? recipes.find(r => r.id === selectedRecipeId) : null;

    const backgroundStyle = {};
    if (preferences.theme) {
        if (preferences.theme.type === 'color') {
            backgroundStyle.backgroundColor = preferences.theme.value;
        } else if (preferences.theme.type === 'image') {
            backgroundStyle.backgroundImage = `url(${preferences.theme.value})`;
            backgroundStyle.backgroundSize = 'cover';
            backgroundStyle.backgroundPosition = 'center';
            backgroundStyle.backgroundAttachment = 'fixed';
        } else if (preferences.theme.type === 'gradient') {
            backgroundStyle.backgroundImage = preferences.theme.value;
        }
    } else {
        backgroundStyle.backgroundColor = '#f3f4f6';
    }


    return (
        <div className="min-h-screen py-8 px-4 font-inter flex flex-col" style={backgroundStyle}>
            {/* The <style> block and <script src="https://cdn.tailwindcss.com"></script>
                were removed from here. Global styles and Tailwind setup are handled
                by src/index.css and your build process (Phase 3).
            */}

            <div className="max-w-7xl mx-auto flex-grow">
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8 text-center border border-gray-200">
                    <p className="text-gray-600 text-lg">
                        Logged in as User ID: <span className="font-mono text-green-700 break-all font-semibold">{userId}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        (This ID is unique to your session in this environment and helps manage your private recipes. Share it with family members if you want them to contribute to your private recipes, or make recipes public for anyone using the app instance.)
                    </p>
                </div>

                {/* Global Error Display */}
                {appError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6 mx-auto max-w-xl" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline ml-2">{appError}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => setAppError(null)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 2.65a1.2 1.2 0 1 1-1.697-1.697L8.303 10l-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-2.651a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>
                )}

                {view === 'home' && (
                    <HomeComponent
                        onAddRecipe={() => setView('addRecipe')}
                        onViewAllRecipes={() => setView('viewRecipes')}
                        onCustomize={() => setView('settings')}
                    />
                )}
                {view === 'viewRecipes' && (
                    <RecipeList onSelectRecipe={handleSelectRecipe} onAddRecipe={() => setView('addRecipe')} onBackToHome={() => setView('home')} />
                )}
                {view === 'addRecipe' && (
                    <AddEditRecipeForm initialRecipe={null} onSave={handleAddRecipe} onCancel={handleCancelForm} />
                )}
                {view === 'viewDetail' && currentRecipe && (
                    <RecipeDetail
                        recipe={currentRecipe}
                        onBack={() => { setView('viewRecipes'); setSelectedRecipeId(null); }}
                        onEdit={() => { setView('editRecipe'); setRecipeToEdit(currentRecipe); }}
                    />
                )}
                {view === 'editRecipe' && recipeToEdit && (
                    <AddEditRecipeForm initialRecipe={recipeToEdit} onSave={handleUpdateRecipe} onCancel={handleCancelForm} />
                )}
                {view === 'settings' && (
                    <SettingsPage onBack={() => setView('home')} />
                )}
            </div>
        </div>
    );
};

export default App;