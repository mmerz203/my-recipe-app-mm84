// src/contexts/FirestoreContext.jsx

import React, { useState, useEffect, createContext, useContext } from 'react';
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { AuthContext } from './AuthContext';

// Firestore Context
// These are the ONLY declarations for FirestoreContext and FirestoreProvider
export const FirestoreContext = createContext(null);
export const FirestoreProvider = ({ children }) => {
    const { auth, authReady } = useContext(AuthContext);
    const [db, setDb] = useState(null);

    useEffect(() => {
        if (authReady && auth) {
            const firestoreInstance = getFirestore(auth.app);
            setDb(firestoreInstance);
        }
    }, [authReady, auth]);

    return (
        <FirestoreContext.Provider value={db}>
            {children}
        </FirestoreContext.Provider>
    );
};

// Export individual Firestore functions for direct use in other components if needed
export { doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs, addDoc };