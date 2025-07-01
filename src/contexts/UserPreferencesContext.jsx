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
        theme: 'winsome',
        cookbookName: 'My Family Cookbook',
        userName: null
    });
    const [loadingPreferences, setLoadingPreferences] = useState(true);

    useEffect(() => {
        if (!db || !userId || !authReady) {
            setLoadingPreferences(true);
            return;
        }

        const userPreferencesRef = doc(db, 'artifacts', appId, 'users', userId, 'preferences', 'userSettings');

        const unsubscribe = onSnapshot(userPreferencesRef, (docSnap) => {
            if (docSnap.exists()) {
                setPreferences(prevDefaults => ({ ...prevDefaults, ...docSnap.data() }));
            } else {
                setPreferences({
                    theme: 'winsome',
                    cookbookName: 'My Family Cookbook',
                    userName: null
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

        // Merge new preferences with existing state
        const mergedPreferences = { ...preferences, ...newPreferences };

        try {
            const userPreferencesRef = doc(db, 'artifacts', appId, 'users', userId, 'preferences', 'userSettings');
            await setDoc(userPreferencesRef, mergedPreferences, { merge: true });
            setPreferences(mergedPreferences);
        } catch (e) {
            console.error("Error updating preferences: ", e);
        }
    }, [db, userId, preferences]);

    return (
        <UserPreferencesContext.Provider value={{ preferences, updatePreferences, loadingPreferences }}>
            {children}
        </UserPreferencesContext.Provider>
    );
};