// src/contexts/UserPreferencesContext.jsx

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

// Import contexts and specific Firestore functions from your local context files:
import { FirestoreContext, doc, setDoc, onSnapshot } from './FirestoreContext';
import { AuthContext } from './AuthContext';

// Also include the appId declaration which uses an env variable
const appId = import.meta.env.VITE_APP_ID || 'default-app-id';

export const UserPreferencesContext = createContext(null);

export const UserPreferencesProvider = ({ children }) => {
    const db = useContext(FirestoreContext);
    const { userId, authReady } = useContext(AuthContext);
    const [preferences, setPreferences] = useState({ theme: { type: 'color', value: '#f3f4f6' } }); // Default theme: light gray
    const [loadingPreferences, setLoadingPreferences] = useState(true);

    useEffect(() => {
        if (!db || !userId || !authReady) {
            setLoadingPreferences(true);
            return;
        }

        const userPreferencesRef = doc(db, `artifacts/${appId}/users/${userId}/preferences`, 'userSettings');

        const unsubscribe = onSnapshot(userPreferencesRef, (docSnap) => {
            if (docSnap.exists()) {
                setPreferences(docSnap.data());
            } else {
                // Set default preferences if none exist
                setPreferences({ theme: { type: 'color', value: '#f3f4f6' } });
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
            const userPreferencesRef = doc(db, `artifacts/${appId}/users/${userId}/preferences`, 'userSettings');
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