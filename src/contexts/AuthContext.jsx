// src/contexts/AuthContext.jsx

import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';

// Ensure environment variables are loaded for Firebase configuration from the .env file
const appId = import.meta.env.VITE_APP_ID || 'default-app-id';
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG || '{}');
const initialAuthToken = import.meta.env.VITE_INITIAL_AUTH_TOKEN || null;

// Auth Context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [authReady, setAuthReady] = useState(false);
    const authRef = useRef(null); // Ref to store auth instance

    useEffect(() => {
        // --- Core Authentication Initialization Log (always visible for debugging setup) ---
        console.log("Firebase Config being used:", firebaseConfig);

        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        authRef.current = authInstance; // Store auth instance in ref

        // --- Log for AuthProvider mount (Dev Mode Only) ---
        if (import.meta.env.DEV) {
            console.log('AuthProvider: Initializing Firebase Auth listener...');
        }

        // Extracted authentication logic for clarity
        const handleAuthStateChanged = async (user) => {
            if (user) {
                setCurrentUser(user);
                setUserId(user.uid);
                if (import.meta.env.DEV) {
                    console.log(`AuthProvider: User logged in. UID: ${user.uid}`);
                }
            } else {
                if (import.meta.env.DEV) {
                    console.log('AuthProvider: No user found. Attempting anonymous sign-in.');
                }
                try {
                    // Temporarily force anonymous sign-in to bypass persistent custom token issue
                    await signInAnonymously(authInstance);
                    if (import.meta.env.DEV) {
                        console.log('AuthProvider: Successfully signed in anonymously.');
                    }

                    /*
                    // ORIGINAL CODE (COMMENTED OUT FOR DEBUGGING)
                    if (initialAuthToken) {
                        await signInWithCustomToken(authInstance, initialAuthToken);
                    } else {
                        await signInAnonymously(authInstance);
                    }
                    */
                } catch (error) {
                    // This console.error is always kept, as it's a critical error log
                    console.error("Firebase authentication error during sign-in:", error);
                    if (import.meta.env.DEV) {
                        console.error("Full auth error details:", error);
                    }
                }
            }
            setAuthReady(true); // Auth state determined
            if (import.meta.env.DEV) {
                console.log('AuthProvider: Auth state ready. (authReady set to true)');
            }
        };

        const unsubscribe = onAuthStateChanged(authInstance, handleAuthStateChanged);

        // --- Log for AuthProvider unmount/cleanup (Dev Mode Only) ---
        return () => {
            unsubscribe();
            if (import.meta.env.DEV) {
                console.log('AuthProvider: Cleaning up auth listener.');
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount

    // --- Log for AuthProvider render (Dev Mode Only) ---
    if (import.meta.env.DEV) {
        console.log(`AuthProvider: Rendering. Current User: ${currentUser ? currentUser.uid : 'None'}, Auth Ready: ${authReady}`);
    }

    return (
        <AuthContext.Provider value={{ currentUser, userId, authReady, auth: authRef.current }}>
            {children}
        </AuthContext.Provider>
    );
};