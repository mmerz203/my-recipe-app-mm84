// src/contexts/AuthContext.jsx

import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';

// Ensure environment variables are loaded for Firebase configuration from the .env file
const appId = import.meta.env.VITE_APP_ID || 'default-app-id';
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG || '{}');

// --- DEBUGGING LOGS FOR initialAuthToken ---
console.log("Raw VITE_INITIAL_AUTH_TOKEN from env:", import.meta.env.VITE_INITIAL_AUTH_TOKEN);
const initialAuthToken = import.meta.env.VITE_INITIAL_AUTH_TOKEN || null;
console.log("Processed initialAuthToken variable:", initialAuthToken);
// --- END NEW DEBUGGING LOGS ---


// Auth Context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [authReady, setAuthReady] = useState(false);
    const authRef = useRef(null); // Ref to store auth instance

    useEffect(() => {
        console.log("Firebase Config being used:", firebaseConfig);

        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        authRef.current = authInstance; // Store auth instance in ref

        // Extracted authentication logic for clarity
        const handleAuthStateChanged = async (user) => {
            if (user) {
                setCurrentUser(user);
                setUserId(user.uid);
            } else {
                try {
                    // Temporarily force anonymous sign-in to bypass persistent custom token issue
                    await signInAnonymously(authInstance);

                    /*
                    // ORIGINAL CODE (COMMENTED OUT FOR DEBUGGING)
                    if (initialAuthToken) {
                        await signInWithCustomToken(authInstance, initialAuthToken);
                    } else {
                        await signInAnonymously(authInstance);
                    }
                    */
                } catch (error) {
                    console.error("Firebase authentication error:", error);
                }
            }
            setAuthReady(true); // Auth state determined
        };

        const unsubscribe = onAuthStateChanged(authInstance, handleAuthStateChanged);

        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <AuthContext.Provider value={{ currentUser, userId, authReady, auth: authRef.current }}>
            {children}
        </AuthContext.Provider>
    );
};