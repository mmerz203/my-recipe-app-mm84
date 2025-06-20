// src/components/HomeComponent.jsx
import React from 'react';

const HomeComponent = ({ onAddRecipe, onViewAllRecipes, onCustomize }) => {
    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Welcome to Your Family Cookbook!
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed">
                Preserve, organize, and share your cherished family recipes with ease.
                From handwritten classics to new culinary adventures, keep your kitchen's heart guarded and vibrant.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                    onClick={onViewAllRecipes}
                    className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-200 shadow-lg font-bold text-lg flex items-center justify-center"
                >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13.486m0-13.486a4.5 4.5 0 014.5 4.5v3.486a4.5 4.5 0 01-4.5 4.5m0-13.486a4.5 4.5 0 00-4.5 4.5v3.486a4.5 4.5 0 004.5 4.5m-4.5 0h9"></path></svg>
                    View All Recipes
                </button>
                <button
                    onClick={onAddRecipe}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-200 shadow-lg font-bold text-lg flex items-center justify-center"
                >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Add New Recipe
                </button>
                <button
                    onClick={onCustomize}
                    className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-200 shadow-lg font-bold text-lg flex items-center justify-center"
                >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Customize
                </button>
            </div>
        </div>
    );
};

export default HomeComponent; // Add this line