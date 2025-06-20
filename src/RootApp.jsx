// src/RootApp.jsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { FirestoreProvider } from './contexts/FirestoreContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';
import { RecipeProvider } from './contexts/RecipeContext';
import App from './App'; // Import your main App component

// Main App Wrapper with Context Providers
const RootApp = () => {
    return (
        <AuthProvider>
            <FirestoreProvider>
                <UserPreferencesProvider>
                    <RecipeProvider>
                        <App /> {/* The App component is correctly nested here */}
                    </RecipeProvider>
                </UserPreferencesProvider>
            </FirestoreProvider>
        </AuthProvider>
    );
};

export default RootApp;