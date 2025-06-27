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


    // Example: Add more palettes by duplicating the object and changing the name/colors
    const themeOptions = [
        {
            name: 'Teal Sunset',
            type: 'roles',
            value: [
                { role: 'Primary Accent', name: 'Warm Orange', hex: '#f2af29' },
                { role: 'Primary Text', name: 'Black', hex: '#000000' },
                { role: 'Danger', name: 'Red', hex: '#d36060' },
                { role: 'Secondary Accent', name: 'Teal', hex: '#388697' },
                { role: 'Background', name: 'Light Gray', hex: '#e0e0ce' },
            ]
        },
        {
            name: 'Fresh Ocean Palette',
            type: 'roles',
            value: [
                { role: 'Primary Accent', name: 'Fresh Blue', hex: '#5c9ead' },         // primary-fresh
                { role: 'Primary Text', name: 'Dark Ocean', hex: '#326273' },           // text-dark-fresh
                { role: 'Secondary Accent', name: 'Warm Sand', hex: '#e39774' },        // secondary-warm
                { role: 'Neutral Subtle', name: 'Subtle Gray', hex: '#eeeeee' },        // neutral-subtle
                { role: 'Background', name: 'Fresh White', hex: '#ffffff' },            // background-light-fresh
            ]
        },
        {
            name: 'Soothing Sage Palette',
            type: 'roles',
            value: [
                { role: 'Primary Accent', name: 'Sage Green', hex: '#708b75' },         // primary-sage
                { role: 'Primary Text', name: 'Deep Sage', hex: '#3d315b' },            // text-sage-dark
                { role: 'Secondary Accent', name: 'Indigo Sage', hex: '#444b6e' },      // secondary-sage
                { role: 'Neutral Sage', name: 'Soft Sage', hex: '#9ab87a' },            // neutral-sage
                { role: 'Background', name: 'Sage Light', hex: '#f8f991' },             // background-sage-light
            ]
        },
        // Future palettes can be added here:
        // {
        //     name: 'Sunset Dream',
        //     type: 'roles',
        //     value: [ ...5 colors... ]
        // },
    ];

    // Handler to apply a palette (all 5 roles/colors)
    const handlePaletteSelect = (palette) => {
        updatePreferences({ theme: { name: palette.name, type: 'roles', value: palette.value } });
    };

    // Determine which palette is currently active
    const currentTheme = preferences.theme && preferences.theme.type === 'roles' ? preferences.theme : null;

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

    // Render palette colors as individual swatches for selection
    const handlePaletteColorChange = (color) => {
        updatePreferences({ theme: { name: 'Brand Palette', type: 'color', value: color.hex } });
    };

    return (
        <div className="p-8 rounded-2xl shadow-xl mb-6 max-w-4xl mx-auto border border-gray-200 bg-background-light">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <Button
                    onClick={onBack}
                    className="bg-primary-brand text-text-dark hover:bg-secondary-brand focus:ring-primary-brand flex items-center"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Home
                </Button>
                <h2 className="text-4xl font-extrabold text-text-dark text-center tracking-tight flex-grow ml-4">Settings</h2>
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
            <div className="flex flex-col gap-8 mb-8">
                {themeOptions.map((palette, pIdx) => (
                    <div key={palette.name} className="flex flex-col items-start gap-2">
                        {/* Preview Button with theme name, now functional */}
                        <Button
                            style={{
                                background: palette.value[0].hex, // Primary Accent
                                color: palette.value[1].hex,      // Primary Text
                                border: `2px solid ${palette.value[3].hex}` // Secondary Accent as border
                            }}
                            className={`font-semibold rounded shadow px-6 py-3 text-lg mb-2 ${currentTheme && currentTheme.name === palette.name ? 'ring-2 ring-green-500 scale-105' : ''}`}
                            onClick={() => handlePaletteSelect(palette)}
                        >
                            {palette.name}
                        </Button>
                        {/* Only show 'Selected' if this palette is active */}
                        {currentTheme && currentTheme.name === palette.name && false && (
                            <span className="text-green-600 font-bold ml-1 mt-1">Selected</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;