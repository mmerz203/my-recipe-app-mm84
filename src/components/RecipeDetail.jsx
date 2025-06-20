// src/components/RecipeDetail.jsx
import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import Modal from './Modal'; // Import Modal (from same folder)
import ServingSizeConverter from './ServingSizeConverter'; // Import ServingSizeConverter (from same folder)
import { formatFraction } from '../utils/helpers';

const RecipeDetail = ({ recipe, onBack, onEdit }) => {
    const { userId } = useContext(AuthContext);
    const [showShareModal, setShowShareModal] = useState(false);
    const shareLinkRef = useRef(null);
    const [copyMessage, setCopyMessage] = useState('');

    if (!recipe) {
        return (
            <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
                <p className="text-center text-gray-600 text-lg">Recipe not found.</p>
                <button
                    onClick={onBack}
                    className="mt-6 mx-auto block px-7 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition ease-in-out duration-150 shadow-md font-semibold"
                >
                    &larr; Back to List
                </button>
            </div>
        );
    }

    // Use the actual appId from your environment.
    const appId = import.meta.env.VITE_APP_ID; // Assuming appId is consistently accessible

    const generateShareLink = () => {
        return `Recipe ID: ${recipe.id} (App ID: <span class="math-inline">\{appId\}</span>{recipe.isPublic ? ', Public' : ', Private: ' + userId})`;
    };

    const handleCopyLink = () => {
        if (shareLinkRef.current) {
            shareLinkRef.current.select();
            document.execCommand('copy');
            setCopyMessage('Copied!');
            setTimeout(() => setCopyMessage(''), 2000);
        }
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl mb-6 max-w-5xl mx-auto border border-gray-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition ease-in-out duration-150 shadow-md font-semibold flex items-center"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to All Recipes
                </button>
                {recipe.userId === userId && (
                    <button
                        onClick={onEdit}
                        className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition ease-in-out duration-150 shadow-md font-semibold flex items-center"
                    >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L15.232 5.232z"></path></svg>
                        Edit Recipe
                    </button>
                )}
            </div>

            <Modal
                show={showShareModal}
                title="Share Recipe"
                message={
                    <div className="flex flex-col items-center">
                        <p className="text-gray-700 mb-4 text-base">You can share this recipe using the ID below:</p>
                        <input
                            type="text"
                            ref={shareLinkRef}
                            readOnly
                            value={generateShareLink()}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-3 text-sm bg-gray-100"
                        />
                        <button
                            onClick={handleCopyLink}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out duration-150 shadow-md text-sm flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2.5a2.5 2.5 0 012.5 2.5v10a2.5 2.5 0 01-2.5 2.5h-10A2.5 2.5 0 016 17.5v-10A2.5 2.5 0 018.5 5h-2z"></path></svg>
                            {copyMessage || 'Copy Link'}
                        </button>
                        <p className="text-xs text-gray-500 mt-2">
                            Note: For a fully functional shareable link on a live website, this would be a direct URL.
                        </p>
                    </div>
                }
                onClose={() => setShowShareModal(false)}
            />

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">{recipe.name}</h1>
            <p className="text-gray-600 text-center mb-6">Category: <span className="font-semibold">{recipe.category}</span></p>

            {recipe.imageUrl && (
                <div className="mb-6 rounded-lg overflow-hidden shadow-xl">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="w-full h-96 object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x600/D4EDDA/3C8A4B?text=Recipe+Image`; }}
                    />
                </div>
            )}

            <ServingSizeConverter ingredients={recipe.ingredients} originalServings={parseFloat(recipe.servings)} />

            <div className="mb-6 bg-gray-50 p-5 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Ingredients:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {recipe.ingredients && recipe.ingredients.map((ing, index) => (
                        <li key={index}>{ing}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-6 bg-gray-50 p-5 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Instructions:</h3>
                <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                    {recipe.instructions && recipe.instructions.map((inst, index) => (
                        <li key={index}>{inst}</li>
                    ))}
                </ol>
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setShowShareModal(true)}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition ease-in-out duration-150 shadow-md font-semibold flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 115.367 2.684 3 3 0 01-5.367-2.684zm-7.316 2.684c0 .482.114.938.316 1.342m-.316-1.342a3 3 0 100 2.684m0-2.684l6.632 3.316m-6.632-6.632l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 115.367 2.684 3 3 0 01-5.367-2.684z"></path></svg>
                    Share Recipe
                </button>
            </div>
            <div className="text-center text-sm text-gray-500 mt-4">
                Recipe created by User ID: <span className="font-mono break-all">{recipe.userId}</span>
            </div>
        </div>
    );
};

export default RecipeDetail; // Add this line