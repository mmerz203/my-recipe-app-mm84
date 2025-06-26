// src/components/SettingsPage.jsx
import React, { useContext, useState, useEffect, useRef } from 'react'; // <--- CRITICAL: useState, useEffect, useRef MUST BE IMPORTED HERE
import { UserPreferencesContext } from '../contexts/UserPreferencesContext';
import Button from './Button';

const SettingsPage = ({ onBack }) => {
    const { preferences, updatePreferences } = useContext(UserPreferencesContext);

    // Local state for input fields to ensure smooth typing
    const [cookbookNameInput, setCookbookNameInput] = useState(preferences.cookbookName || '');
    const [userNameInput, setUserNameInput] = useState(preferences.userName || '');

    // Sync local state with preferences from context when preferences change (e.g., loaded from Firestore)
    useEffect(() => {
        setCookbookNameInput(preferences.cookbookName || '');
        setUserNameInput(preferences.userName || '');
    }, [preferences.cookbookName, preferences.userName]); // Dependencies for this effect

    // Ref to hold debounce timeouts for each input key
    const debounceTimeoutRef = useRef({});


    const themeOptions = [
        { name: 'Light Gray (Default)', type: 'color', value: '#f3f4f6' },
        { name: 'Warm Beige', type: 'color', value: '#F5F5DC' },
        { name: 'Soft Green', type: 'color', value: '#E8F5E9' },
        { name: 'Cozy Wood (Texture)', type: 'image', value: 'https://placehold.co/1920x1080/D2B48C/5C4033?text=Wood+Texture', className: 'bg-cover bg-center' },
        { name: 'Abstract Blue (Gradient)', type: 'gradient', value: 'linear-gradient(to bottom right, #ADD8E6, #87CEEB)' },
        { name: 'Warm Autumn Palette', type: 'color', value: '#f2af29' }, // Your custom theme option
    ];

    const handleThemeChange = (theme) => {
        updatePreferences({ theme: theme });
    };

    // Generic debounce function for preference updates
    const debounceUpdatePreference = (key, value, delay = 500) => { // Delay increased to 500ms
        if (debounceTimeoutRef.current[key]) {
            clearTimeout(debounceTimeoutRef.current[key]);
        }
        debounceTimeoutRef.current[key] = setTimeout(() => {
            updatePreferences({ [key]: value });
        }, delay);
    };

    // Handler for cookbook name change
    const handleCookbookNameChange = (e) => {
        setCookbookNameInput(e.target.value); // Update local input state immediately
        debounceUpdatePreference('cookbookName', e.target.value); // Debounce update to context/Firestore
    };

    // Handler for user name change
    const handleUserNameChange = (e) => {
        setUserNameInput(e.target.value); // Update local input state immediately
        debounceUpdatePreference('userName', e.target.value); // Debounce update to context/Firestore
    };

    const currentThemeValue = preferences.theme ? preferences.theme.value : '#f3f4f6';

    return (
        <div className="p-8 rounded-2xl shadow-xl mb-6 max-w-4xl mx-auto border border-gray-200 bg-transparent">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <Button
                    onClick={onBack}
                    className="bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-300 flex items-center"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Home
                </Button>
                <h2 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight flex-grow ml-4">Settings</h2>
            </div>

            {/* --- SECTION FOR COOKBOOK NAME INPUT --- */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 10h.01M15 10h.01M9 14h.01M15 14h.01M9 18h.01M15 18h.01"></path></svg>
                Cookbook Name
            </h3>
            <div className="mb-8">
                <label htmlFor="cookbookName" className="block text-gray-700 text-base font-bold mb-2">Your Cookbook Title:</label>
                <input
                    type="text"
                    id="cookbookName"
                    value={cookbookNameInput} // USING LOCAL STATE
                    onChange={handleCookbookNameChange}
                    autocomplete="off" // FIX FOR AUTOCOMPLETE WARNING
                    className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                    placeholder="e.g., Grandma's Secret Recipes"
                />
            </div>
            {/* --- END SECTION --- */}

            {/* --- SECTION FOR USER NAME INPUT --- */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Your Display Name
            </h3>
            <div className="mb-8 bg-transparent">
                <label htmlFor="userName" className="block text-gray-700 text-base font-bold mb-2">How should we call you?</label>
                <input
                    type="text"
                    id="userName"
                    value={userNameInput} // USING LOCAL STATE
                    onChange={handleUserNameChange}
                    autoComplete="off"
                    className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-transparent"
                    placeholder="e.g., Matthew, Chef Hannah, Home Cook"
                />
            </div>
            {/* --- END NEW SECTION --- */}

            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Background Themes
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {themeOptions.map((theme, index) => (
                    <div
                        key={index}
                        className={`relative p-2 border-2 rounded-lg cursor-pointer transition transform hover:scale-105 duration-150
                                    ${currentThemeValue === theme.value ? 'border-green-500 shadow-md' : 'border-gray-200'}`}
                        onClick={() => handleThemeChange(theme)}
                    >
                        <div
                            className={`w-full h-24 rounded-md flex items-center justify-center text-xs font-semibold text-gray-900 overflow-hidden`
                                + (theme.type === 'color' ? ` bg-[${theme.value}]` : '') + (theme.className ? ` ${theme.className}` : '')}
                            style={theme.type !== 'color' ? { backgroundImage: `url(${theme.value})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundColor: theme.value }}
                        >
                            {/* Only show a short label or icon if needed, or leave empty for color swatches */}
                        </div>
                        <p className="text-center mt-2 text-sm text-gray-700 truncate overflow-hidden" title={theme.name}>{theme.name.replace(' (Texture)', '').replace(' (Gradient)', '')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;