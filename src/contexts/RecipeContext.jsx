// src/contexts/RecipeContext.jsx

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

// Import contexts and specific Firestore functions from your local context files:
import { FirestoreContext, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from './FirestoreContext';
import { AuthContext } from './AuthContext';

// Also include the appId declaration which uses an env variable
const appId = import.meta.env.VITE_APP_ID || 'default-app-id';

export const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
    const db = useContext(FirestoreContext);
    const { userId, authReady } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch recipes from both public and private collections
    useEffect(() => {
        if (!db || !userId || !authReady) {
            return;
        }

        setLoading(true);
        setError(null);

        const fetchRecipes = async () => {
            try {
                // Corrected collection calls for public recipes
                const publicRecipesRef = collection(db, 'artifacts', appId, 'public', 'data', 'recipes');
                // Corrected collection calls for private recipes
                const privateRecipesRef = collection(db, 'artifacts', appId, 'users', userId, 'recipes');

                const unsubscribePublic = onSnapshot(publicRecipesRef, (snapshot) => {
                    const publicRecipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'public' }));
                    setRecipes(prevRecipes => {
                        const newRecipes = publicRecipes.filter(pr => !prevRecipes.some(r => r.id === pr.id));
                        const updatedRecipes = prevRecipes.map(r => {
                            const updatedPublic = publicRecipes.find(pr => pr.id === r.id);
                            return updatedPublic ? { ...r, ...updatedPublic } : r;
                        }).filter(r => publicRecipes.some(pr => pr.id === r.id) || r.type === 'private');
                        return [...updatedRecipes, ...newRecipes];
                    });
                }, (err) => {
                    console.error("Error fetching public recipes:", err);
                    setError("Failed to load public recipes.");
                });

                const unsubscribePrivate = onSnapshot(privateRecipesRef, (snapshot) => {
                    const privateRecipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'private' }));
                    setRecipes(prevRecipes => {
                        const newRecipes = privateRecipes.filter(pr => !prevRecipes.some(r => r.id === pr.id));
                        const updatedRecipes = prevRecipes.map(r => {
                            const updatedPrivate = privateRecipes.find(pr => pr.id === r.id);
                            return updatedPrivate ? { ...r, ...updatedPrivate } : r;
                        }).filter(r => privateRecipes.some(pr => pr.id === r.id) || r.type === 'public');
                        return [...updatedRecipes, ...newRecipes];
                    });
                }, (err) => {
                    console.error("Error fetching private recipes:", err);
                    setError("Failed to load private recipes.");
                });

                setLoading(false);
                return () => {
                    unsubscribePublic();
                    unsubscribePrivate();
                };

            } catch (err) {
                console.error("Error setting up recipe listeners:", err);
                setError("Failed to initialize recipe data.");
                setLoading(false);
            }
        };

        fetchRecipes();

    }, [db, userId, authReady]);

    const addRecipe = useCallback(async (recipeData) => {
        if (!db || !userId) {
            console.error("Firestore DB or userId not available for addRecipe.");
            setError("Failed to add recipe: Authentication or database not ready.");
            return;
        }
        setLoading(true);
        try {
            // Corrected collection call for addDoc
            const collectionRef = recipeData.isPublic ?
                collection(db, 'artifacts', appId, 'public', 'data', 'recipes') :
                collection(db, 'artifacts', appId, 'users', userId, 'recipes');

            await addDoc(collectionRef, {
                ...recipeData,
                createdAt: Date.now(),
                userId: userId
            });
            setError(null);
        } catch (e) {
            console.error("Error adding document: ", e);
            setError(`Failed to add recipe: ${e.message || 'An unknown error occurred.'}`);
        } finally {
            setLoading(false);
        }
    }, [db, userId]);

    const updateRecipe = useCallback(async (recipeId, updatedData, isPublic) => {
        if (!db || !userId) {
            console.error("Firestore DB or userId not available for updateRecipe.");
            setError("Failed to update recipe: Authentication or database not ready.");
            return;
        }
        setLoading(true);
        try {
            // Corrected doc call for updateDoc
            const recipeRef = isPublic ?
                doc(db, 'artifacts', appId, 'public', 'data', 'recipes', recipeId) :
                doc(db, 'artifacts', appId, 'users', userId, 'recipes', recipeId);

            await updateDoc(recipeRef, updatedData);
            setError(null);
        } catch (e) {
            console.error("Error updating document: ", e);
            setError(`Failed to update recipe: ${e.message || 'An unknown error occurred.'}`);
        } finally {
            setLoading(false);
        }
    }, [db, userId]);

    const deleteRecipe = useCallback(async (recipeId, isPublic) => {
        if (!db || !userId) {
            console.error("Firestore DB or userId not available for deleteRecipe.");
            setError("Failed to delete recipe: Authentication or database not ready.");
            return;
        }
        setLoading(true);
        try {
            // Corrected doc call for deleteDoc
            const docRefToDelete = isPublic ?
                doc(db, 'artifacts', appId, 'public', 'data', 'recipes', recipeId) :
                doc(db, 'artifacts', appId, 'users', userId, 'recipes', recipeId);

            await deleteDoc(docRefToDelete);
            setRecipes(prevRecipes => prevRecipes.filter(r => r.id !== recipeId));
            setError(null);
        } catch (e) {
            console.error("Error removing document: ", e);
            setError(`Failed to delete recipe: ${e.message || 'An unknown error occurred.'}`);
        } finally {
            setLoading(false);
        }
    }, [db, userId]);


    return (
        <RecipeContext.Provider value={{ recipes, loading, error, addRecipe, updateRecipe, deleteRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};