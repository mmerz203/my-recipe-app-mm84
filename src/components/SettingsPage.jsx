// src/components/SettingsPage.jsx
import React, { useContext } from 'react';
import { UserPreferencesContext } from '../contexts/UserPreferencesContext'; // Import UserPreferencesContext

const SettingsPage = ({ onBack }) => {
    const { preferences, updatePreferences } = useContext(UserPreferencesContext);

    const themeOptions = [
        { name: 'Light Gray (Default)', type: 'color', value: '#f3f4f6' },
        { name: 'Warm Beige', type: 'color', value: '#F5F5DC' },
        { name: 'Soft Green', type: 'color', value: '#E8F5E9' },
        { name: 'Cozy Wood (Texture)', type: 'image', value: 'https://placehold.co/1920x1080/D2B48C/5C4033?text=Wood+Texture', className: 'bg-cover bg-center' },
        { name: 'Abstract Blue (Gradient)', type: 'gradient', value: 'linear-gradient(to bottom right, #ADD8E6, #87CEEB)' },
        { name: 'Warm Autumn Palette', type: 'color', value: '#f2af29'}, // Matthew Custom Palette Choice

    ];
 
    const handleThemeChange = (theme) => {
        updatePreferences({ theme: theme });
    };

    const currentThemeValue = preferences.theme ? preferences.theme.value : '#f3f4f6';

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl mb-6 max-w-4xl mx-auto border border-gray-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition ease-in-out duration-150 shadow-md font-semibold flex items-center"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Home
                </button>
                <h2 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight flex-grow ml-4">Settings</h2>
            </div>

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
                            className={`w-full h-24 rounded-md flex items-center justify-center text-xs font-semibold text-gray-900 overflow-hidden
                                        ${theme.type === 'color' ? `bg-[${theme.value}]` : ''} ${theme.className || ''}`}
                            style={theme.type !== 'color' ? { backgroundImage: `url(${theme.value})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundColor: theme.value }}
                        >
                            {theme.name.includes('(Texture)') || theme.name.includes('(Gradient)') ? (
                                <span className="text-white text-shadow-sm p-1 rounded bg-black bg-opacity-30">
                                    {theme.name.replace(' (Texture)', '').replace(' (Gradient)', '')}
                                </span>
                            ) : (
                                theme.name
                            )}
                        </div>
                        <p className="text-center mt-2 text-sm text-gray-700">{theme.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage; // Add this line