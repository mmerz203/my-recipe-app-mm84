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
import Footer from './components/Footer';


const App = () => {
    const { userId, authReady } = useContext(AuthContext);
    const { recipes, addRecipe, updateRecipe, loading: recipesLoading, error: recipeError } = useContext(RecipeContext);
    const { preferences, loadingPreferences } = useContext(UserPreferencesContext);
    const [view, setView] = useState('home');
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
    // --- THEME PALETTE SUPPORT ---
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
        } else if (preferences.theme.type === 'roles' && Array.isArray(preferences.theme.value)) {
            // Find the background color from the palette roles
            const bgRole = preferences.theme.value.find(c => c.role.toLowerCase().includes('background'));
            if (bgRole) {
                backgroundStyle.backgroundColor = bgRole.hex;
            } else {
                backgroundStyle.backgroundColor = '#f3f4f6';
            }
        }
    } else {
        backgroundStyle.backgroundColor = '#f3f4f6';
    }


    return (
        <div className="min-h-full w-full py-8 px-4 font-inter flex flex-col" style={backgroundStyle}>
            {/* --- USER WELCOME / UID DISPLAY (RESTORED STYLING) --- */}
            <div className="bg-blue-100 bg-opacity-80 p-3 rounded-lg shadow-md mb-6 mx-auto max-w-sm text-center border border-blue-200">
                <p className="text-blue-800 text-base font-semibold">
                    Welcome, {preferences.userName || 'Guest'}!
                </p>
            </div>
            {/* --- END USER WELCOME / UID DISPLAY --- */}

            <div className="max-w-7xl mx-auto flex-grow">
                {/* Global Error Display */}
                {appError && (
                    <div className="bg-red-100 bg-opacity-80 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6 mx-auto max-w-xl" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline ml-2">{appError}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => setAppError(null)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 2.65a1.2 1.2 0 1 1-1.697-1.697L8.303 10l-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-2.651a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 010 1.698z"/></svg>
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
            <Footer />
        </div>
    );
};

export default App;