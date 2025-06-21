// src/contexts/UserPreferencesContext.jsx

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

import { FirestoreContext, doc, setDoc, onSnapshot } from './FirestoreContext';
import { AuthContext } from './AuthContext';

const appId = import.meta.env.VITE_APP_ID || 'default-app-id';

export const UserPreferencesContext = createContext(null);

export const UserPreferencesProvider = ({ children }) => {
    const db = useContext(FirestoreContext);
    const { userId, authReady } = useContext(AuthContext);
    const [preferences, setPreferences] = useState({
        theme: { type: 'color', value: '#f3f4f6' }, // Keep your existing theme default
        cookbookName: 'My Family Cookbook',
        userName: null // <--- THIS LINE MUST BE HERE FOR INITIAL DEFAULT
    });
    const [loadingPreferences, setLoadingPreferences] = useState(true);

    useEffect(() => {
        if (!db || !userId || !authReady) {
            setLoadingPreferences(true);
            return;
        }

        // Corrected: Pass each path segment as a separate argument to doc()
        const userPreferencesRef = doc(db, 'artifacts', appId, 'users', userId, 'preferences', 'userSettings');

        const unsubscribe = onSnapshot(userPreferencesRef, (docSnap) => {
            if (docSnap.exists()) {
                // Merge loaded data with our defaults to ensure new fields are present if not saved yet
                // This is key for backwards compatibility if a user saved preferences before 'userName' existed
                setPreferences(prevDefaults => ({ ...prevDefaults, ...docSnap.data() }));
            } else {
                // If no document exists (new user or no preferences saved), set all defaults
                setPreferences({
                    theme: { type: 'color', value: '#f3f4f6' }, // Ensure theme is explicitly set
                    cookbookName: 'My Family Cookbook',
                    userName: null // <--- AND THIS LINE MUST BE HERE FOR DEFAULT IF DOC DOESN'T EXIST
                });
            }
            setLoadingPreferences(false);
        }, (error) => {
            console.error("Error fetching user preferences:", error);
            setLoadingPreferences(false);
        });

        return () => unsubscribe();
    }, [db, userId, authReady]);

    const updatePreferences = useCallback(async (newPreferences) => {
        if (!db || !userId) return;
        try {
            // Corrected: Pass each path segment as a separate argument to doc()
            const userPreferencesRef = doc(db, 'artifacts', appId, 'users', userId, 'preferences', 'userSettings');
            await setDoc(userPreferencesRef, newPreferences, { merge: true });
            setPreferences(newPreferences); // Optimistic update
        } catch (e) {
            console.error("Error updating preferences: ", e);
        }
    }, [db, userId]);

    return (
        <UserPreferencesContext.Provider value={{ preferences, updatePreferences, loadingPreferences }}>
            {children}
        </UserPreferencesContext.Provider>
    );
};